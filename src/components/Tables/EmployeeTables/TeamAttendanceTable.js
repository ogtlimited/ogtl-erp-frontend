import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const TeamAttendanceTable = ({
  columns,
  data,
  loading,
  setLoading,
  date,
  setDate,
  today,

  officeType,
  offices,
  selectedOffice,
  setSelectedOffice,

  context,
}) => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [mobileView, setmobileView] = useState(false);
  const [allAttendance, setAllAttendance] = useState([]);

  useEffect(() => {
    setAllAttendance(data);
  }, [data]);

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length > 8) {
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

  return (
    <>
      {allAttendance && (
        <ToolkitProvider
          keyField="id"
          data={allAttendance}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <SearchBar
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: "12%" }}
                className="inputSearch"
              />

              {allAttendance.length ? (
                <ExportCSVButton
                  className="float-right btn export-csv"
                  {...props.csvProps}
                >
                  Export Attendance Record (CSV)
                </ExportCSVButton>
              ) : null}

              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      max={today}
                      onChange={(e) => setDate(e?.target?.value)}
                      className="form-control "
                    />
                  </div>
                </div>

                {/* Office Type */}
                <div className="col-md-4">
                  <label htmlFor="officeType">
                    {officeType?.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    ) || (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          pulse
                          style={{ marginRight: "10px" }}
                        />{" "}
                        fetching offices...
                      </>
                    )}
                  </label>
                  <Select
                    options={offices}
                    isSearchable={true}
                    value={{
                      value: selectedOffice?.id,
                      label: selectedOffice?.title,
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

              <div className="custom-table-div">
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
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <strong>No record for date</strong>
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

export default TeamAttendanceTable;
