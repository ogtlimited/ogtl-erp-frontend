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
import Select from "react-select";

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
  selectedOffice,
  setSelectedOffice,

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
            office_id: selectedOffice?.id,
            start_date: fromDate,
            end_date: toDate,
            page: 1,
            limit: 10000,
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
        total_hours: attendanceRecords[key].total_hours,
        lateness_and_absence: attendanceRecords[key].lateness_and_absence,
      }));

      const formattedData = dataArray.map((data) => ({
        staffName: data?.user?.full_name,
        ogid: data?.user?.staff_unique_Id,
        email: data?.user?.email,
        total_hours: data?.total_hours,
        lateness:
          data?.lateness_and_absence?.lateness !== undefined
            ? data.lateness_and_absence.lateness
            : 0,
        NCNS:
          data?.lateness_and_absence?.NCNS !== undefined
            ? data.lateness_and_absence.NCNS
            : 0,
        absent:
          data?.lateness_and_absence?.NCNS !== undefined
            ? data?.lateness_and_absence?.["NCNS(did not clock out)"]
            : 0,
        attendance: Object.keys(data?.days).map((key) => ({
          date: key,
          clock_in: data?.days[key]?.clock_in
            ? data?.days[key]?.clock_in
            : null,
          clock_out: data?.days[key]?.clock_out
            ? data?.days[key]?.clock_out
            : null,
          status:
            data?.days[key] === "absent"
              ? "Absent"
              : data?.days[key] === "leave"
              ? "Leave"
              : data?.days[key] === "off"
              ? "Day off"
              : data?.days[key] === "sick"
              ? "Sick"
              : data?.days[key] === "FAM/PER Emergency"
              ? "FAM/PER Emergency"
              : data?.days[key] === "holiday"
              ? "Holiday"
              : data?.days[key] === "---"
              ? "---"
              : "Present",
        })),
      }));

      const csvData = formattedData.map((item) => ({
        STAFF: item.staffName,
        "EMPLOYEE ID": item.ogid,
        EMAIL: item.email,
        "TOTAL HOURS": item.total_hours,
        LATENESS: item.lateness,
        NCNS: item.NCNS,
        "NCNS (did not clock out)": item.absent,

        ...item.attendance.reduce(
          (acc, curr) => ({
            ...acc,
            [moment(curr.date).format("DD-MMM-YYYY")]:
              curr.status !== "Present"
                ? curr.status
                : `IN: ${moment(curr.clock_in, "HH:mm:ss").format(
                    "hh:mma"
                  )} - OUT: ${
                    curr.clock_out
                      ? moment(curr.clock_out, "HH:mm:ss").format("hh:mma")
                      : "No clock out"
                  }`,
          }),
          {}
        ),
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
                  style={{ marginBottom: "2rem" }}
                  className="float-right btn export-csv"
                >
                  Export Monthly Attendance (CSV)
                </button>
              ) : null}

              <div
                className="row hr-filter-select col-12"
                style={{ marginTop: "2rem" }}
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
                  <Select
                    options={selectOfficeTypes}
                    value={selectOfficeTypes.find(
                      (option) => option.value === officeType
                    )}
                    onChange={(selectedOption) => {
                      setOfficeType(selectedOption.value);
                      setSelectedOffice({
                        id: null,
                        title: "",
                        office_type: "",
                      });
                    }}
                    placeholder="Office Type"
                    style={{ display: "inline-block" }}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="office_id">
                    {officeType.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    ) || "Office"}
                  </label>
                  <Select
                    options={
                      officeType === "department"
                        ? selectDepartments
                        : officeType === "campaign"
                        ? selectCampaigns
                        : []
                    }
                    value={{
                      value: selectedOffice?.id,
                      label: selectedOffice?.title.toUpperCase() || "Office Title",
                    }}
                    onChange={(e) =>
                      setSelectedOffice({
                        id: e?.value,
                        title: e?.label,
                        office_type: officeType,
                      })
                    }
                    placeholder="Office Title"
                    style={{ display: "inline-block" }}
                    isSearchable={true}
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
                      ? `table table-responsive monthly-attendance-table ${loading}`
                      : `table table-responsive monthly-attendance-table ${loading}`
                  }
                  noDataIndication={
                    loading ? (
                      <div
                        className="spinner-border text-primary monthly_attendance_spinner"
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
