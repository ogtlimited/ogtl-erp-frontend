/** @format */

import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
    Search,
    CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const OperationsTeamManager = () => {
    const [key, setKey] = useState("teamLeads");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loadingPayday, setLoadingPayday] = useState(false);
    const [loading, setLoading] = useState(false);

    // Sample data for reportees
    const reportees = [
        { id: 1, name: "John Doe", position: "Team Lead" },
        { id: 2, name: "Jane Smith", position: "Supervisor" },
        { id: 3, name: "Bob Johnson", position: "Manager" },
    ];

    // Table columns
    const columns = [
        {
            dataField: "name",
            text: "Name",
            sort: true,
        },
        {
            dataField: "position",
            text: "Position",
            sort: true,
        },
    ];

    // Table search and export components
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const showNullMessage = () => {
        return loading ? (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        ) : (
            "No Data Available"
        );
    };

    // Handle row click to navigate to a placeholder link
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // Navigate to a placeholder link with the user's ID
            window.location.href = `/dashboard/operations/operations-team-task-management-user/1`;
        },
    };

    // Custom row styling to set pointer cursor
    const rowStyle = (row, rowIndex) => {
        return {
            cursor: "pointer", // Set pointer cursor
        };
    };

    const renderTable = () => (
        <ToolkitProvider keyField="id" data={reportees} columns={columns} search exportCSV>
            {(props) => (
                <>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="fromDate">From</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="form-control"
                                    disabled={loadingPayday}
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
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="form-control"
                                    disabled={loadingPayday}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="custom-table-div">
                        <BootstrapTable
                            {...props.baseProps}
                            bordered={false}
                            filter={filterFactory()}
                            pagination={paginationFactory()}
                            noDataIndication={showNullMessage()}
                            headerClasses="header-class"
                            classes="table table-hover" // Add Bootstrap's hover effect
                            rowEvents={rowEvents} // Add row click event
                            rowStyle={rowStyle} // Set pointer cursor
                        />
                    </div>
                </>
            )}
        </ToolkitProvider>
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
                                    className="nav-link active"
                                    data-toggle="tab"
                                    href="#tab_team_leads"
                                >
                                    Team Leads
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#tab_supervisors"
                                >
                                    Supervisors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#tab_managers"
                                >
                                    Managers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#tab_operational_managers"
                                >
                                    Operational Managers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#tab_coo"
                                >
                                    COO
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row tab-content">
                <div id="tab_team_leads" className="col-12 tab-pane show active">
                    {renderTable()}
                </div>

                <div id="tab_supervisors" className="col-12 tab-pane">
                    {renderTable()}
                </div>

                <div id="tab_managers" className="col-12 tab-pane ">
                    {renderTable()}
                </div>

                <div id="tab_operational_managers" className="col-12 tab-pane">
                    {renderTable()}
                </div>

                <div id="tab_coo" className="col-12 tab-pane">
                    {renderTable()}
                </div>
            </div>
        </>
    );
};

export default OperationsTeamManager;
