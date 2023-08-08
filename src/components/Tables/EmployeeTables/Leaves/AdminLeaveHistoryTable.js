/** @format */

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axiosInstance from "../../../../services/api";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import usePagination from "../../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AdminLeavesHistoryTable = ({
  data,
  setData,
  columns,
  context,
  loading,
  setLoading,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
}) => {
  // const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [show, setShow] = useState(false);
  const [dataToFilter, setDataToFilter] = useState("");
  const [mobileView, setmobileView] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

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
    setunfiltered(data);
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {}, 7000);
  }, [data]);


  // Pagination
  const count = totalPages;
  const _DATA = usePagination(data, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  return (
    <>
      {dataToFilter && (
        <ToolkitProvider
          keyField="id"
          data={loading ? [] : dataToFilter}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              {/* <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              /> */}

              <ExportCSVButton
                className="float-right btn export-csv"
                style={{ marginBottom: 15 }}
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              {/* <div className="hr-filter-select">
                <div>
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDepartmentFilter(e)}
                    defaultValue={departmentFilter}
                    value={departmentFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Department
                    </option>
                    {departments.map((option, idx) => (
                      <option key={idx}>{option.department}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleLeaveTypeFilter(e)}
                    defaultValue={leaveTypeFilter}
                    value={leaveTypeFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Leave Type
                    </option>
                    {leaveTypes.map((option, index) => (
                      <option key={index}>{option.leave_type}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleLeaveStatusFilter(e)}
                    defaultValue={statusFilter}
                    value={statusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Status
                    </option>
                    {status.map((option, index) => (
                      <option key={index} value={option.code}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="hr-filter-select col-12"></div>

              <div className="custom-table-div">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  // selectRow={selectRow}
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
                />
              </div>

              <select
                className="application-table-sizePerPage"
                name="sizePerPage"
                value={info.sizePerPage}
                onChange={handleChangeSizePerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <div className="application-table-pagination">
                <Stack className="application-table-pagination-stack">
                  <Pagination
                    className="job-applicant-pagination"
                    count={count}
                    page={page}
                    boundaryCount={4}
                    onChange={handleChange}
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
      )}
    </>
  );
};

export default AdminLeavesHistoryTable;
