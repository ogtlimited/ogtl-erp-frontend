import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TaskManagementConfigTable = () => {
    const { ExportCSVButton } = CSVExport;
    const [taskConfigs, setTaskConfigs] = useState([
        { id: 1, name: "Task Config 1", active: true },
        { id: 2, name: "Task Config 2", active: false },
        { id: 3, name: "Task Config 3", active: true },
    ]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [info, setInfo] = useState({ sizePerPage: 10 });
    const [mobileView, setMobileView] = useState(false);

    const columns = [
        { dataField: "name", text: "Task Config Name", sort: true },
        {
            dataField: "active",
            text: "Status",
            formatter: (cell) => (
                <span className={`badge ${cell ? "bg-success" : "bg-danger"}`}>
                    {cell ? "Active" : "Inactive"}
                </span>
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

    const MySearch = useCallback(
        (props) => {
            let input;

            const handleKeydown = (e) => {
                if (e.key === "Enter") {
                    setPage(1);
                    props.onSearch(input.value);
                    setSearchTerm(input.value);
                }
            };

            return (
                <div className="custom-search">
                    <input
                        className="custom-search-input"
                        style={{ backgroundColor: "#ffffff", width: "33.5%", marginRight: "20px" }}
                        ref={(n) => (input = n)}
                        type="search"
                        onKeyDown={handleKeydown}
                    />
                    <button
                        className="btn btn-secondary custom-search-btn"
                        onClick={() => {
                            input.value = "";
                            props.onSearch("");
                            setSearchTerm("");
                            setPage(1);
                        }}
                    >
                        Reset
                    </button>
                </div>
            );
        },
        [setPage, setSearchTerm]
    );

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
                        {/* <div className="col-12 p-0" style={{ marginTop: 30 }}>
                            <ExportCSVButton className="float-right btn export-csv" {...props.csvProps}>
                                Export CSV
                            </ExportCSVButton>
                            <MySearch {...props.searchProps} className="inputSearch" />
                        </div> */}

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
