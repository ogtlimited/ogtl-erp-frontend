/** @format */

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import usePagination from "../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import csvDownload from "json-to-csv-export";
import moment from "moment";

const MonthlyAttendanceTable = ({
  data,
  columns,
  loading,
  setLoading,

  fromDate,
  toDate,
  setFromDate,
  setToDate,
  officeType,
  setOfficeType,
  officeId,
  setOfficeId,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  context,
}) => {
  const { selectOfficeTypes, selectDepartments, selectCampaigns, showAlert } =
    useAppContext();
  const [mobileView, setmobileView] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    setmobileView(true);
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
    }, 6000);
    return <>{show ? "No Data Available" : null}</>;
  };

  const handleDownloadCSV = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.get(
        "/api/v1/office_employees_attendances.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            office_type: officeType,
            office_id: officeId,
            start_date: fromDate,
            end_date: toDate,
            page: 1,
            limit: 5000,
          },
        }
      );

      const attendanceRecords =
        typeof response?.data?.data === "string"
          ? []
          : response?.data?.data?.records;

      const dataArray = Object.keys(attendanceRecords).map((key) => ({
        days: attendanceRecords[key].days,
        user: attendanceRecords[key].user,
      }));

      const formattedData = dataArray.map((data) => ({
        staffName: data?.user?.full_name,
        ogid: data?.user?.staff_unique_Id,
        email: data?.user?.email,
        attendance: Object.keys(data?.days).map((key) => ({
          date: key,
          clock_in: data?.days[key]?.clock_in
            ? data?.days[key]?.clock_in
            : null,
          clock_out: data?.days[key]?.clock_out
            ? data?.days[key]?.clock_out
            : null,
          status:
            !data?.days[key]?.clock_in && !data?.days[key]?.clock_out
              ? "Absent"
              : "Present",
        })),
      }));

      const csvData = formattedData.map((item) => ({
        STAFF: item.staffName,
        "EMPLOYEE ID": item.ogid,
        EMAIL: item.email,
      }));

      const dataToConvert = {
        data: csvData,
        filename: `OGTL - Employee Monthly Attendance Record - ${moment(
          fromDate
        ).format("DD MMM, YYYY")} to ${moment(toDate).format("DD MMM, YYYY")}`,
        delimiter: ",",
        useKeysAsHeaders: true,
      };

      csvDownload(dataToConvert);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  return (
    <>
      {data && (
        <ToolkitProvider
          keyField="id"
          data={loading ? [] : data}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              {data?.length ? (
                <button
                  onClick={handleDownloadCSV}
                  style={{ marginBottom: "10%" }}
                  className="float-right btn export-csv"
                >
                  Export Monthly Attendance (CSV)
                </button>
              ) : null}

              <div
                className="row hr-filter-select col-12"
                style={{ marginTop: "10%" }}
              >
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

                <div className="col-md-3">
                  <label htmlFor="officeType">Filter By</label>
                  <select
                    className="leave-filter-control"
                    onChange={(e) => {
                      setOfficeType(e.target.value);
                      setOfficeId("");
                    }}
                    defaultValue={officeType}
                    value={officeType}
                  >
                    <option value="" disabled selected hidden>
                      Office Type
                    </option>
                    {selectOfficeTypes.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="office_id">
                    {officeType.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    ) || "Office"}
                  </label>
                  <select
                    className="leave-filter-control"
                    onChange={(e) => setOfficeId(e.target.value)}
                    defaultValue={officeId}
                    value={officeId}
                  >
                    <option value="" disabled selected hidden>
                      Office Title
                    </option>
                    {officeType === "department"
                      ? selectDepartments.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : officeType === "campaign"
                      ? selectCampaigns.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : null}
                  </select>
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
                      ? "table table-responsive monthly-attendance-table"
                      : "table table-responsive monthly-attendance-table"
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

export default MonthlyAttendanceTable;
