import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axiosInstance from "../../../services/api";
import Select from "react-select";
import { useAppContext } from "../../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const OperationsTeamManager = () => {
    const [key, setKey] = useState("teamLeads"); // Track active tab
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [reportees, setReportees] = useState([]);
    const [page, setPage] = useState(1); // Added pagination handling
    const [sizePerPage, setSizePerPage] = useState(10); // For pagination
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null); // Track hovered row index
    const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);

    const {
        ErrorHandler,
        selectDepartments,
        selectCampaigns,
        selectTeams,
        officeType,
        setOfficeType,
        selectedOffice,
        setSelectedOffice,
        officeTypeOptions,
        getAvatarColor
    } = useAppContext();

    const route = useNavigate();

    // Define the API endpoints based on the key/tab selected
    const endpoints = {
        teamLeads: `/api/v1/employee_task_reportees/team_leaders?office=${officeType?.toLowerCase()}&office_id=${selectedOffice?.value}.json`,
        supervisors: `/api/v1/employee_task_reportees/supervisors?office=${officeType?.toLowerCase()}&office_id=${selectedOffice?.value}.json`, // Adjust campaign or department id dynamically
        managers: "/api/v1/employee_task_reportees/managers.json",
        operationalManagers: "/api/v1/employee_task_reportees/operations_manager.json",
        coo: "/api/v1/employee_task_reportees/chief_operation_officers.json",
    };

    // Fetch data dynamically based on the selected tab (key)
    const fetchReportees = useCallback(async () => {
        console.log("Fetching data for tab:", key);  // Log the current tab for debug
        setLoading(true); // Set loading to true before fetching

        try {
            const response = await axiosInstance.get(endpoints[key], {
                params: {
                    page: page,
                    limit: sizePerPage, // Added pagination parameters
                },
            }); // Fetch data based on active tab
            console.log(`Response for ${key}:`, response?.data);  // Log the response here
            setReportees(response?.data?.data || []); // Set fetched data to state
        } catch (error) {
            console.error("Error fetching reportees:", error); // Error handling
        } finally {
            setLoading(false); // Stop loading when data is fetched or failed
        }
    }, [key, page, sizePerPage]); // Added pagination as dependencies

    // Fetch data on tab key or pagination change
    useEffect(() => {
        fetchReportees(); // Trigger data fetching based on current key (tab) and pagination
    }, [fetchReportees]);

    // Table columns configuration
    const columns = [
        {
            dataField: "first_name",
            text: "First Name",
            sort: true,
            formatter: (value, row) => (
                <h2 className="table-avatar">
                    <span
                        className="avatar-span"
                        style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
                    >
                        {value?.charAt(0)}
                    </span>
                    <p className="mt-3">
                        {value?.toUpperCase()}
                    </p>
                </h2>
            ),
        },
        {
            dataField: "last_name",
            text: "Last Name",
            sort: true,
        },
    ];

    // Handle row hover event
    const rowEvents = {
        onMouseEnter: (e, row, rowIndex) => {
            setHoveredRowIndex(rowIndex); // Set hovered row index
        },
        onMouseLeave: () => {
            setHoveredRowIndex(null); // Reset hovered row index
        },
        onClick: (e, row, rowIndex) => {
            route(`/dashboard/operations/operations-team-task-management/tasks/${row?.ogid}`);
        },
    };

    // Dynamically set row classes
    const rowClasses = (row, rowIndex) => {
        return hoveredRowIndex === rowIndex ? "text-primary" : "";
    };

    useEffect(() => {
        if (officeType) {
            setIsOfficeTypeSelected(true);
            fetchReportees();
            setSelectedOffice(selectedOffice || null);
        }
    }, [officeType, selectedOffice]);

    // Handle office type change (e.g., "Department", "Campaign")
    const handleOfficeTypeChange = (e) => {
        setOfficeType(e.label); // Update global state for office type
        setIsOfficeTypeSelected(true);
    };

    // Handle office selection based on the selected office type
    const handleOfficeChange = (e) => {
        setSelectedOffice(e); // Update global state for selected office
    };

    // Render the table for reportees
    const renderTable = () => (
        <div>
            <div className="w-100 mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Office Type</label>
                            <Select
                                options={officeTypeOptions}
                                value={officeType ? { label: officeType, value: officeType } : null}
                                onChange={handleOfficeTypeChange}
                            />
                        </div>
                    </div>

                    {isOfficeTypeSelected && (
                        <div className="col-md-4">
                            <label>{officeType}</label>
                            <Select
                                options={
                                    officeType === "Department"
                                        ? selectDepartments
                                        : officeType === "Campaign"
                                            ? selectCampaigns
                                            : selectTeams
                                }
                                isSearchable={true}
                                value={selectedOffice}
                                onChange={handleOfficeChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ToolkitProvider keyField="id" data={loading ? [] : reportees} columns={columns} search exportCSV>
                {(props) => (
                    <>
                        <BootstrapTable
                            {...props.baseProps}
                            bordered={false}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                page: page,
                                sizePerPage: sizePerPage,
                                totalSize: reportees.length,
                                onPageChange: (newPage) => setPage(newPage),
                            })}
                            noDataIndication={loading ? (
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : "No Data Available"}
                            headerClasses="header-class"
                            rowEvents={rowEvents}
                            rowClasses={rowClasses} // Apply dynamic row classes here
                            classes="table table-hover"
                        />
                    </>
                )}
            </ToolkitProvider>
        </div>
    );

    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">Operations Team Manager</h3>
                    </div>
                </div>
            </div>

            <div className="page-menu">
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs nav-tabs-bottom">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${key === "teamLeads" ? "active" : ""}`}
                                    onClick={() => {
                                        setKey("teamLeads");
                                        setPage(1);
                                    }}
                                    href="#tab_team_leads"
                                >
                                    Team Leads
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${key === "supervisors" ? "active" : ""}`}
                                    onClick={() => {
                                        setKey("supervisors");
                                        setPage(1); // Reset pagination on tab switch
                                    }}
                                    href="#tab_supervisors"
                                >
                                    Supervisors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${key === "managers" ? "active" : ""}`}
                                    onClick={() => {
                                        setKey("managers");
                                        setPage(1); // Reset pagination on tab switch
                                    }}
                                    href="#tab_managers"
                                >
                                    Managers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${key === "operationalManagers" ? "active" : ""}`}
                                    onClick={() => {
                                        setKey("operationalManagers");
                                        setPage(1); // Reset pagination on tab switch
                                    }}
                                    href="#tab_operational_managers"
                                >
                                    Operational Managers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${key === "coo" ? "active" : ""}`}
                                    onClick={() => {
                                        setKey("coo");
                                        setPage(1); // Reset pagination on tab switch
                                    }}
                                    href="#tab_coo"
                                >
                                    COO
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {renderTable()}
        </>
    );
};

export default OperationsTeamManager;
