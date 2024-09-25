import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "react-select";
import axiosInstance from "../../../../services/api";
import { useAppContext } from "../../../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

const TaskManagementConfigTable = () => {
    const { ExportCSVButton } = CSVExport;

    // Initialize task configs, all inactive by default
    const [taskConfigs, setTaskConfigs] = useState([
        { id: 1, name: "Task Config 1", active: false },
        { id: 2, name: "Task Config 2", active: true },
        { id: 3, name: "Task Config 3", active: false },
    ]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [info, setInfo] = useState({ sizePerPage: 10 });
    const [mobileView, setMobileView] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [offices, setOffices] = useState([]);
    const [officeType, setOfficeType] = useState(null);
    const [loadingOfficeType, setLoadingOfficeType] = useState(false);
    const { ErrorHandler, getAvatarColor } = useAppContext();

    const fetchLoggedInUserOffices = useCallback(async () => {
        setLoadingOfficeType(true);
        try {
            const response = await axiosInstance.get("/api/v1/leaders_offices.json", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420",
                },
            });

            const resData = response?.data?.data?.office_details;

            if (resData?.office_type === "campaign") {
                setOfficeType(resData?.office_type);

                const formattedOffice = resData?.offices.map((office) => ({
                    label: office?.title?.toUpperCase(),
                    value: office?.id,
                }));

                setOffices(formattedOffice);
            } else if (resData?.office_type === "department") {
                setOfficeType(resData?.office_type);
                setSelectedOffice({
                    id: resData?.office?.id,
                    title: resData?.office?.title,
                    office_type: resData?.office_type,
                });
            } else {
                return null;
            }

            setLoadingOfficeType(false);
        } catch (error) {
            const component = "Staff Offices Error | ";
            ErrorHandler(error, component);
            setLoadingOfficeType(false);
        }
    }, [ErrorHandler]);

    useEffect(() => {
        fetchLoggedInUserOffices();
    }, [fetchLoggedInUserOffices]);

    // Function to handle activation/deactivation of a task config
    const handleToggle = (id) => {
        setTaskConfigs(prevConfigs =>
            prevConfigs.map(config => ({
                ...config,
                active: config.id === id ? true : false, // Only the selected task config becomes active
            }))
        );
        // API call to update the backend can go here if necessary
    };

    const columns = [
        {
            dataField: "name",
            text: "Task Config Name",
            sort: true,
            formatter: (val, row) => (
                <p>
                    <Link
                        to={`/dashboard/operations/operation-team-task-management/1`}
                        className="attendance-record-for-office"
                    >
                        {val?.toUpperCase()}
                    </Link>
                </p>
            ),
        },
        {
            dataField: "active",
            text: "Status",
            formatter: (cell, row) => (
                <div>
                    <Switch
                        checked={cell}
                        onChange={() => handleToggle(row.id)}
                        color="primary"
                    />
                    <span className={`badge text-white w-25 p-2 ${cell ? "bg-success" : "bg-danger"}`}>
                        {cell ? "Active" : "Inactive"}
                    </span>
                </div>
            ),
        },
        {
            dataField: "edit",
            text: "Actions",
            formatter: (cellContent, row) => (
                <>
                    <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => editTask(row.id)}
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ];

    const resizeTable = () => {
        setMobileView(window.innerWidth <= 768 || columns.length > 7);
    };

    useEffect(() => {
        resizeTable();
        window.addEventListener("resize", resizeTable);
        return () => window.removeEventListener("resize", resizeTable);
    }, [columns]);

    const editTask = (id) => {
        alert(`Editing task with id: ${id}`);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSizePerPageChange = (event) => {
        setSizePerPage(Number(event.target.value));
        setPage(1);
    };

    return (
        <div>
            <h3>Operation Task Management</h3>
            <ToolkitProvider
                keyField="id"
                data={loading ? [] : taskConfigs}
                columns={columns}
                search
                exportCSV
            >
                {(props) => (
                    <div className="col-12">
                        <div className="col-12 p-0" style={{ marginTop: 30 }}>
                            {/* <ExportCSVButton className="float-right btn export-csv" {...props.csvProps}>
                                Export CSV
                            </ExportCSVButton> */}

                            <div className="col-md-4">
                                {!loadingOfficeType ? (
                                    <label htmlFor="officeType">
                                        {officeType?.replace(/\b\w/g, (char) =>
                                            char.toUpperCase()
                                        ) || "Office"}
                                    </label>
                                ) : (
                                    <label htmlFor="officeType">
                                        <>
                                            <FontAwesomeIcon
                                                icon={faSpinner}
                                                spin
                                                pulse
                                                style={{ marginRight: "10px" }}
                                            />{" "}
                                            Fetching offices...
                                        </>
                                    </label>
                                )}
                                <Select
                                    options={offices}
                                    isSearchable={true}
                                    value={{
                                        value: selectedOffice?.id,
                                        label: selectedOffice?.title.toUpperCase(),
                                    }}
                                    onChange={(e) =>
                                        setSelectedOffice({
                                            id: e?.value,
                                            title: e?.label,
                                            office_type: officeType,
                                        })
                                    }
                                    style={{ display: "inline-block" }}
                                />
                            </div>
                        </div>

                        <div className="custom-table-div" style={{ marginTop: 30 }}>
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                headerClasses="header-class"
                                classes={mobileView ? "table table-responsive" : "table"}
                                noDataIndication={loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : "No Data Available"}
                            />
                        </div>

                        <select
                            className="application-table-sizePerPage"
                            name="sizePerPage"
                            value={info.sizePerPage}
                            onChange={handleSizePerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                        <div className="application-table-pagination">
                            <Stack className="application-table-pagination-stack">
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </Stack>
                        </div>
                    </div>
                )}
            </ToolkitProvider>
        </div>
    );
};

export default TaskManagementConfigTable;
