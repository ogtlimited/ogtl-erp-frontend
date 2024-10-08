/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import usePagination from "../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axiosInstance from "../../services/api";
import csvDownload from "json-to-csv-export";
import moment from "moment";

const EvaluationTable = ({
  data,
  columns,
  loading,
  setLoading,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  csvExport,

  context,
}) => {
  const { title, id } = useParams();
  const { showAlert } = useAppContext();
  const [mobileView, setmobileView] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const today_date = moment().utc().format("yyyy-MM-DD");

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
        "/api/v1/hr_survey_responses.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            survey_id: id,
            page: 1,
            limit: 10000,
          },
        }
      );

      const resData =
        response?.data?.data?.survey_response_records?.survey_response;

      const csvData = resData.map((item) => ({
        STAFF: item.full_name,
        "SURVEY TITLE": item.survey_title,
        SCORE: item.score,
      }));

      const dataToConvert = {
        data: csvData,
        filename: `OGTL Survey - ${title} - ${moment(today_date).format(
          "DD MMM, YYYY"
        )} `,
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
              {data?.length && csvExport ? (
                <button
                  onClick={handleDownloadCSV}
                  style={{ marginBottom: "2rem" }}
                  className="float-right btn export-csv"
                >
                  Export Survey Scores (CSV)
                </button>
              ) : null}

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

export default EvaluationTable;
