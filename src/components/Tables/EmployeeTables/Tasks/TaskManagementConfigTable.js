import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "react-select";
import axiosInstance from "../../../../services/api";
import { useAppContext } from "../../../../Context/AppContext";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import { officeTypeOptions } from "../../../FormJSON/AddLoan";

const TaskManagementConfigTable = () => {
    const { ExportCSVButton } = CSVExport;

    const [taskConfigs, setTaskConfigs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [officeType, setOfficeType] = useState(null);
    const [loadingOffices, setLoadingOffices] = useState(false);
    const { ErrorHandler, selectDepartments, selectCampaigns, selectTeams } = useAppContext();

    // Fetch task configs from API based on selected office and type
    const fetchTaskConfigs = useCallback(async () => {
        if (!selectedOffice || !officeType) return; // Ensure both are selected before calling API

        setLoading(true);
        try {
            const response = await axiosInstance.get("/api/v1/office_task_configs", {
                params: {
                    office_id: selectedOffice.value, // Use the selected office ID
                    office_type: officeType.toLowerCase(), // Convert officeType to lowercase
                }
            });
            const fetchedData = response?.data?.config_data || [];
            console.log(response?.data)
            setTaskConfigs(fetchedData);
            setTotalPages(Math.ceil(fetchedData.length / sizePerPage)); // Calculate total pages based on response
            setLoading(false);
        } catch (error) {
            const component = "Task Configs Fetch Error | ";
            ErrorHandler(error, component);
            setLoading(false);
        }
    }, [selectedOffice, officeType, sizePerPage, ErrorHandler]);

    const activateTaskConfig = async (id) => {
        try {
            const response = await axiosInstance.put(`/api/v1/office_task_configs/${id}/activate`)
        }
        catch (error) {
            const component = "Activate Task Config Error | ";
            ErrorHandler(error, component);
        }
    }

    const deactivateTaskConfig = async (id) => {
        try {
            const response = await axiosInstance.put(`/api/v1/office_task_configs/${id}/deactivate`)
        }
        catch (error) {
            const component = "Deactivate Task Config Error | ";
            ErrorHandler(error, component);
        }
    }
    // Trigger data fetching when selectedOffice or officeType changes
    useEffect(() => {
        fetchTaskConfigs();
    }, [fetchTaskConfigs]);

    // Handle office type change (e.g., "Department", "Campaign")
    const handleOfficeTypeChange = (e) => {
        setOfficeType(e.label);
        setIsOfficeTypeSelected(true);
        setSelectedOffice(null); // Reset office selection on type change
    };

    // Handle office selection based on the selected office type
    const handleOfficeChange = (e) => {
        setSelectedOffice(e); // Set selected office
    };

    const handleToggle = async (config, id) => {
        try {
            if (!config.active) {
                // If the clicked config is being activated
                // Deactivate all other configs before activating the clicked one
                const deactivateOthers = taskConfigs.map(taskConfig => {
                    if (taskConfig.id !== id && taskConfig.active) {
                        return axiosInstance.put(`/api/v1/office_task_configs/${taskConfig.id}/deactivate`);
                    }
                    return null;
                });

                // Wait for all deactivations to complete
                await Promise.all(deactivateOthers);

                // Now activate the selected config
                await activateTaskConfig(id);
            } else {
                // If the clicked config is being deactivated
                await deactivateTaskConfig(id);
            }

            // Update the local state after successful API call
            setTaskConfigs(prevConfigs =>
                prevConfigs.map(taskConfig => ({
                    ...taskConfig,
                    active: taskConfig.id === id ? !taskConfig.active : false, // Set the clicked one as active and others as inactive
                }))
            );
        } catch (error) {
            const component = "Toggle Task Config Error | ";
            ErrorHandler(error, component);
        }
    };


    const columns = [
        {
            dataField: "title",
            text: "Task Config Name",
            sort: true,
            formatter: (val, row) => (
                <p>
                    <Link
                        to={`/dashboard/operations/operation-team-task-management/view`}
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
                        onChange={() => handleToggle(row, row.id)}
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

    const editTask = (id) => {
        window.location.href = (`/dashboard/operations/operation-team-task-management/Edit/${id}`);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSizePerPageChange = (event) => {
        setSizePerPage(Number(event.target.value));
        setPage(1);
    };
    console.log()
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

                        {/* Table for displaying task configs */}
                        <div className="custom-table-div" style={{ marginTop: 30 }}>
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                headerClasses="header-class"
                                classes="table"
                                noDataIndication={
                                    loading ? (
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        "No Data Available"
                                    )
                                }
                            />
                        </div>

                        {/* Pagination and size per page controls */}
                        <select
                            className="application-table-sizePerPage"
                            value={sizePerPage}
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
