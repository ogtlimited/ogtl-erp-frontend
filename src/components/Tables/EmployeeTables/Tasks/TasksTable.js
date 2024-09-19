import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskTable = () => {
    const [tasks, setTasks] = useState([
        { id: 1, date: "2023-09-01", status: true, completed: 5, taskDetails: [{ name: "Subtask 1", status: "Completed" }, { name: "Subtask 2", status: "Failed" }] },
        { id: 2, date: "2023-09-02", status: false, completed: 3, taskDetails: [{ name: "Subtask 1", status: "Completed" }, { name: "Subtask 2", status: "Failed" }] },
        { id: 3, date: "2023-09-03", status: true, completed: 8, taskDetails: [{ name: "Subtask 1", status: "Completed" }, { name: "Subtask 2", status: "Failed" }] },
    ]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const columns = [
        { dataField: "id", text: "Task ID", sort: true },
        { dataField: "date", text: "Date of Task", sort: true },
        {
            dataField: "status",
            text: "Status",
            formatter: (cell, row) => (
                <div>
                    <span className={`badge text-white w-50 p-2 ${cell ? "bg-success" : "bg-danger"}`}>
                        {cell ? "Active" : "Inactive"}
                    </span>
                </div>
            ),
        },
        { dataField: "completed", text: "Number Completed", sort: true },
    ];

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

    const handleRowClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    return (
        <div>
            <h3>Task Table</h3>
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
                                rowEvents={{
                                    onClick: (e, row, rowIndex) => handleRowClick(row),
                                }}
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
                <Modal.Header closeButton>
                    <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTask ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTask.taskDetails.map((taskDetail, index) => (
                                    <tr key={index}>
                                        <td>{taskDetail.name}</td>
                                        <td>
                                            <span className={`badge ${taskDetail.status === "Completed" ? "bg-success" : "bg-danger"}`}>
                                                {taskDetail.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Task Details Available</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskTable;
