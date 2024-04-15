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

const EmployeeDeductionTable = ({
  data,
  columns,
  loading,
  setLoading,
  context,

  fromDate,
  toDate,
  today,
  setFromDate,
  setToDate,
  emptyDataMessage,
}) => {
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 6) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    resizeTable();
    setLoading(true);
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? <strong>{emptyDataMessage}</strong> : null}</>;
  };

  return (
    <>
      {data && (
        <ToolkitProvider
          keyField="id"
          data={data}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <SearchBar
                {...props.searchProps}
                style={{
                  marginBottom: 15,
                  paddingLeft: "5%",
                  width: "310px",
                  marginTop: "10px",
                }}
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

export default EmployeeDeductionTable;
