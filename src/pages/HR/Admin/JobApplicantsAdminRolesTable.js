/** @format */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import moment from "moment";
import usePagination from "./JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import secureLocalStorage from "react-secure-storage";
import { useAppContext } from "../../../Context/AppContext";
import csvDownload from "json-to-csv-export";

const JobApplicantsAdminRolesTable = ({
  data,
  setData,
  loading,
  setLoading,

  columns,
  context,
  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  searchTerm,
  setSearchTerm,
  jobOpenings,
  jobOpeningFilter,
  setJobOpeningFilter,
  processingStageFilter,
  setProcessingStageFilter,
}) => {
  const { showAlert, InterviewProcessStageOptions } = useAppContext();
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [show, setShow] = React.useState(false);
  const [dataToFilter, setDataToFilter] = useState("");
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  secureLocalStorage.setItem("fromDate", fromDate);
  secureLocalStorage.setItem("toDate", toDate);

  const ProcessStatusOptionsFallback = [
    { label: "Open", value: "Open" },
    { label: "Sieving", value: "Sieving" },
    { label: "Phone screening", value: "Phone screening" },
    { label: "Interview scheduled", value: "Interview scheduled" },
  ];

  const ProcessStatusOptions =
    InterviewProcessStageOptions || ProcessStatusOptionsFallback;

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
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data, setLoading]);

  // eslint-disable-next-line no-unused-vars
  const imageUrl = "https://erp.outsourceglobal.com";

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

  // Search Name:
  const MySearch = useCallback(
    (props) => {
      let input;

      const handleKeydown = (e) => {
        setLoading(true);
        if (e.key === "Enter") {
          setPage(1);
          props.onSearch(input.value);
          const searchTerm = input.value;
          setSearchTerm(searchTerm);
        }
        setLoading(false);
      };

      return (
        <div className="custom-search">
          <input
            className="custom-search-input"
            style={{
              backgroundColor: "#ffffff",
              width: "33.5%",
              marginRight: "20px",
            }}
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
    [setLoading, setPage, setSearchTerm]
  );

  // Filter by Job Opening:
  const handleJobOpeningFilter = (e) => {
    setJobOpeningFilter(e.target.value);
    setPage(1);
    setLoading(true);
    axiosInstance
      .get("/api/v1/job_applicants.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          job_opening_id: e.target.value,
          process_status: processingStageFilter,
          start_date: fromDate,
          end_date: toDate,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.job_applicants;
        const totalPages = e?.data?.data?.total_pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => ({
          ...emp,
          full_name: `${emp?.first_name} ${emp?.last_name}`,
          job_title: emp?.job_opening?.job_title,
          application_date: moment(emp?.created_at).format("Do MMMM, YYYY"),
          interview_date: emp?.interview_date
            ? moment(emp?.interview_date).format("Do MMMM, YYYY")
            : "Not Scheduled",
          resume: emp?.old_cv_url ? emp?.old_cv_url : emp?.resume,
        }));

        setData(mapp);
        setDataToFilter(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  // Filter by Process Stage:
  const handleProcessStageFilter = (e) => {
    setProcessingStageFilter(e.target.value);
    setPage(1);
    setLoading(true);
    axiosInstance
      .get("/api/v1/job_applicants.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          job_opening_id: jobOpeningFilter,
          process_status: e.target.value,
          start_date: fromDate,
          end_date: toDate,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.job_applicants;
        const totalPages = e?.data?.data?.total_pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => ({
          ...emp,
          full_name: `${emp?.first_name} ${emp?.last_name}`,
          job_title: emp?.job_opening?.job_title,
          application_date: moment(emp?.created_at).format("Do MMMM, YYYY"),
          interview_date: emp?.interview_date
            ? moment(emp?.interview_date).format("Do MMMM, YYYY")
            : "Not Scheduled",
          resume: emp?.old_cv_url ? emp?.old_cv_url : emp?.resume,
        }));

        setData(mapp);
        setDataToFilter(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  const handleDownloadCSV = async (e) => {
    e.preventDefault();

    setLoadingDownload(true);

    try {
      const response = await axiosInstance.get("/api/v1/job_applicants.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: 1,
          limit: 100000,
          name: searchTerm.length ? searchTerm : null,
          job_opening_id: jobOpeningFilter.length ? jobOpeningFilter : null,
          process_status: processingStageFilter ? processingStageFilter : null,
          start_date: fromDate,
          end_date: toDate,
        },
      });

      const resData = response?.data?.data?.job_applicants;

      const csvData = resData?.map((data) => ({
        "JOB APPLICANT": `${data?.first_name} ${data?.middle_name ?? ""} ${
          data?.last_name
        }`,
        EMAIL: data?.email,
        "PHONE NUMBER": data?.mobile_number,
        "JOB TITLE": data?.job_opening?.job_title,
        "ADMIN ROLE": data?.admin_role ? "Yes" : "No",
        "HIGHEST QUALIFICATION": data?.highest_qualification,
        CERTIFICATIONS: data?.certifications,
        "APPLICATION DATE": moment(data?.created_at).format(
          "ddd, Do MMM. YYYY"
        ),
        "INTERVIEW DATE": data?.interview_date
          ? moment(data?.interview_date).format("ddd, Do MMM. YYYY")
          : "Not Scheduled",
        "INTERVIEW STATUS": data?.interview_status,
        "PROCESS STAGE": data?.process_status,
        "JOB SIEVER": data?.rep_siever || "",
        RESUME: data?.old_cv_url ? data?.old_cv_url : data?.resume,
      }));

      const dataToConvert = {
        data: csvData,
        filename: `OGTL - Job Applications - ${moment(fromDate).format(
          "DD MMM, YYYY"
        )} to ${moment(toDate).format("DD MMM, YYYY")}`,
        delimiter: ",",
        useKeysAsHeaders: true,
      };

      csvDownload(dataToConvert);
      setLoadingDownload(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoadingDownload(false);
    }
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
              {data?.length ? (
                <button
                  onClick={handleDownloadCSV}
                  style={{ marginBottom: "10%" }}
                  className="float-right btn export-csv"
                >
                  {loadingDownload
                    ? "Exporting Job Applications..."
                    : "Export Job Applications (CSV)"}
                </button>
              ) : null}

              <div className="col-10">
                <MySearch
                  {...props.searchProps}
                  style={{ paddingLeft: "12%" }}
                  className="inputSearch"
                />
              </div>

              <div className="hr-filter-select col-12">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="fromDate">From</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={fromDate}
                      onChange={(e) => {
                        setFromDate(e.target.value);
                        secureLocalStorage.setItem("fromDate", e.target.value);
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
                        secureLocalStorage.setItem("toDate", e.target.value);
                      }}
                      className="form-control "
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="toDate">Filter By </label>
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleJobOpeningFilter(e)}
                    defaultValue={jobOpeningFilter}
                    value={jobOpeningFilter}
                  >
                    <option value="" disabled selected hidden>
                      Job Openings
                    </option>
                    {jobOpenings.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  {processingStageFilter.length ? (
                    <label htmlFor="toDate">Process Stage</label>
                  ) : (
                    <label htmlFor="toDate">Filter By </label>
                  )}
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleProcessStageFilter(e)}
                    defaultValue={processingStageFilter}
                    value={processingStageFilter}
                  >
                    <option value="" disabled selected hidden>
                      Process Stage
                    </option>
                    {ProcessStatusOptions?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
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

export default JobApplicantsAdminRolesTable;
