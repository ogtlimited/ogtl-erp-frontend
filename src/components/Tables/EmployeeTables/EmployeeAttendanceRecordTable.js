/* eslint-disable jsx-a11y/anchor-is-valid */
/** @format */

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const EmployeeAttendanceRecordTable = ({
  designation,
  data,
  setData,
  loading,
  setLoading,
  context,
  
  fromDate,
  toDate,
  today,
  setFromDate,
  setToDate,
}) => {
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;
  const [show, setShow] = React.useState(false);
  const [allEmployee, setAllEmployee] = useState([]);
  const [mobileView, setmobileView] = useState(false);

  useEffect(() => {
    setAllEmployee(data);
  }, [data]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setmobileView(false);
      } else {
        setmobileView(true);
      }
    });
  }, [mobileView]);

  const columns = [
    {
      dataField: "idx",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
  ];

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? <strong>No record for date</strong> : null}</>;
  };

  return (
    <>
      {allEmployee && (
        <ToolkitProvider
          keyField="id"
          data={allEmployee}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <SearchBar
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: "5%", width: "310px" }}
                className="inputSearch"
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="fromDate">From</label>
                      <input
                        type="date"
                        name="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="form-control "
                        max={today}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="toDate">To</label>
                      <input
                        type="date"
                        name="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="form-control "
                        max={today}
                      />
                    </div>
                  </div>
                </div>

                <div className="float-right">
                  <ExportCSVButton
                    style={{ width: "120%" }}
                    className="float-right btn export-csv"
                    {...props.csvProps}
                  >
                    Export CSV
                  </ExportCSVButton>
                </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={
                  !mobileView
                    ? "table "
                    : context
                    ? "table table-responsive"
                    : "table table-responsive"
                }
                noDataIndication={
                  loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    showNullMessage()
                  )
                }
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default EmployeeAttendanceRecordTable;
