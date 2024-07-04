/** @format */

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";

const DeductionTable = ({
  data,
  columns,
  loading,
  setLoading,
  emptyDataMessage,
  context,

  fromDate,
  toDate,
  today,
  setFromDate,
  setToDate,
  date,
  setDate,
}) => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [mobileView, setmobileView] = useState(false);
  const [show, setShow] = useState(false);

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 8) {
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
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 10000);
    return (
      <>
        {show ? (
          <>{emptyDataMessage ? emptyDataMessage : "No Data Available"}</>
        ) : null}
      </>
    );
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
              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="row">
                <SearchBar
                  {...props.searchProps}
                  style={{
                    paddingLeft: "12%",
                    margin: "2rem 1rem 0 0",
                  }}
                  className="inputSearch"
                />

                {/* <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="month"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e?.target?.value)}
                      className="form-control "
                    />
                  </div>
                </div> */}

                <div
                  className="col-md-3"
                  style={{
                    marginLeft: "1rem",
                  }}
                >
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
                <div className="col-md-3">
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

              <div className="custom-table-div">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  // selectRow={selectRow}
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
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      showNullMessage()
                    )
                  }
                  pagination={paginationFactory()}

                  // defaultSorted={defaultSorted}
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default DeductionTable;
