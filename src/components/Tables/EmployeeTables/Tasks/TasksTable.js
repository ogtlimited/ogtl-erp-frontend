import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "react-bootstrap/Modal";
import axios from "axios"; // Ensure axios is imported
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../services/api";
import { useAppContext } from "../../../../Context/AppContext";
import moment from "moment"; // Import moment for date handling
import TaskDetailModal from "../../../Modal/TaskDetailModal";
const TaskTable = ({ tasks, loading, totalPages, page, sizePerPage, setPage, setSizePerPage, fetchData, ogId }) => {

    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dailyTasks, setDailyTasks] = useState([]); // Store daily tasks
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [header, setHeader] = useState("")
    const [loadingData, setLoadingData] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const { user } = useAppContext();
    const employeeOgId = user?.employee_info?.ogid;


    // Define columns for the table based on the new API structure
    const columns = [
        { dataField: "id", text: "Task ID", sort: true },
        { dataField: "task_date", text: "Task Date", sort: true },
        { dataField: "total_tasks", text: "Total Tasks", sort: true },
        { dataField: "completed_tasks", text: "Completed Tasks", sort: true },
        {
            dataField: "status",
            text: "Status",
            formatter: (cell, row) => (
                <div>
                    <span
                        className={`badge text-white w-100 p-2 ${row.completed_tasks === row.total_tasks ? "bg-success" : "bg-warning"
                            }`}
                    >
                        {row.completed_tasks === row.total_tasks ? "Completed" : "Pending"}
                    </span>
                </div>
            ),
        },
        {
            dataField: "view",
            text: "Actions",
            formatter: (cell, row) => (
                <div className="form-group">

                    <button className="btn btn-primary" onClick={() => handleRowClick(row)}>
                        View Task
                    </button>

                </div>
            ),
        },
    ];


    // Resize the table for mobile views
    const resizeTable = () => {
        setMobileView(window.innerWidth <= 768 || columns.length > 7);
    };

    useEffect(() => {
        resizeTable();
        window.addEventListener("resize", resizeTable);
        return () => window.removeEventListener("resize", resizeTable);
    }, [columns]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSizePerPageChange = (event) => {
        setSizePerPage(Number(event.target.value));
        setPage(1);
    };



    // Handle row click event
    const handleRowClick = async (task) => {
        setSelectedTask(task);

        setLoadingData(true);
        setShowModal(true);

        try {
            const response = await axiosInstance.get(`/api/v1/employee_daily_task_list.json?date=${task?.task_date}&ogid=${ogId}`);
            setDailyTasks(response.data || []);
        } catch (error) {
            console.error("Error fetching daily tasks:", error);
        }


        setLoadingData(false);

    };




    return (
        <div>
            <h4>Task Table for Employee</h4>




            <ToolkitProvider keyField="id" data={loading ? [] : tasks} columns={columns} search>


                {(props) => (
                    <div className="col-12">
                        <div className="p-10"></div>
                        {/* <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="fromDate">From</label>
                                    <input
                                        type="date"
                                        name="fromDate"
                                        value={fromDate}
                                        onChange={(e) => {
                                            setFromDate(e.target.value);
                                        }}
                                        className="form-control "
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="toDate">To</label>
                                    <input
                                        type="date"
                                        name="toDate"
                                        value={toDate}
                                        onChange={(e) => {
                                            setToDate(e.target.value);
                                        }}
                                        className="form-control "
                                    />
                                </div>
                            </div>
                        </div> */}

                        <div className="custom-table-div pt-5" style={{ marginTop: 30 }}>
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

            <TaskDetailModal showModal={showModal} setShowModal={setShowModal} selectedTask={selectedTask} dailyTasks={dailyTasks} fetchData={fetchData} ogId={ogId} loading={loadingData} />
        </div>
    );
};

export default TaskTable;
