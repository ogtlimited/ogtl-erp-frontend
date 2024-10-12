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

const TaskTable = ({ startDailyTask }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dailyTasks, setDailyTasks] = useState([]); // Store daily tasks
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const { showAlert, ErrorHandler, user } = useAppContext();
    const employeeOgid = user?.employee_info?.ogid;

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

    // Check if the selected task date is today's date
    const isToday = (date) => {
        const today = moment().format("YYYY-MM-DD");
        return moment(date).isSame(today, "day");
    };

    // Handle row click event
    const handleRowClick = async (task) => {
        setSelectedTask(task);
        setShowModal(true);

        // Clear any previous daily tasks
        setDailyTasks([]);

        console.log(task.task_date)
        // If the task is for the current day, fetch the daily task list
        if (isToday(task.task_date)) {
            try {
                const response = await axiosInstance.get(`/api/v1/employee_daily_task_list.json?date=${task?.task_date}`);
                setDailyTasks(response.data || []);
            } catch (error) {
                console.error("Error fetching daily tasks:", error);
            }
        }
    };

    // Fetch tasks for the given employee using the API
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/v1/employees/${employeeOgid}/employee_tasks.json`);
            const fetchedData = response?.data || [];

            // Process the fetched data to fit into the table structure
            const processedTasks = fetchedData.map((task, index) => ({
                id: index + 1, // Assign an index as task ID
                task_date: task.task_date,
                total_tasks: task.total_tasks,
                completed_tasks: task.completed_tasks,
                status: task.completed_tasks === task.total_tasks ? "Completed" : "Pending",
            }));

            setTasks(processedTasks);
            setTotalPages(Math.ceil(fetchedData.length / sizePerPage));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks", error);
            setLoading(false);
        }
    }, [employeeOgid, sizePerPage]);

    useEffect(() => {
        if (employeeOgid) {
            fetchTasks(); // Fetch tasks when the component mounts or the employeeOgid changes
        }
    }, [fetchTasks, employeeOgid]);

    return (
        <div>
            <h4>Task Table for Employee</h4>
            <div className="col-auto float-right ml-auto">

                {(!loading && !tasks.length) && (
                    <div className="col-auto float-right ml-auto">
                        <button

                            className="btn add-btn m-r-5"
                            onClick={startDailyTask}
                        >
                            Start Daily Task
                        </button>
                    </div>
                )}
            </div>
            <ToolkitProvider keyField="id" data={loading ? [] : tasks} columns={columns} search>
                {(props) => (
                    <div className="col-12">
                        <div className="row">
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

            {/* Modal for Task Details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTask && dailyTasks.length > 0 ? (
                        // Render daily task details if available
                        <div>
                            <h5>Daily Tasks for Today</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Created At</th>
                                        <th>Notes</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dailyTasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.task}</td>
                                            <td>{task.created_at}</td>
                                            <td>{task.note || "No notes"}</td>
                                            <td>{task.completed ? "Completed" : "Pending"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : selectedTask ? (
                        // Render standard task details
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Task Date</th>
                                    <th>Total Tasks</th>
                                    <th>Completed Tasks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedTask.task_date}</td>
                                    <td>{selectedTask.total_tasks}</td>
                                    <td>{selectedTask.completed_tasks}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>No Task Details Available</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskTable;
