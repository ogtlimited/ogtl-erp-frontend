/* eslint-disable jsx-a11y/anchor-is-valid */
/** @format */

import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import Select from "react-select";
import axiosInstance from "../../../services/api";
import filterFactory from "react-bootstrap-table2-filter";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import { Link, useParams } from "react-router-dom";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// import ToggleTable from '../toggleTable';
// import EditEmployeeModal from '../modals/EditEmployeeModal';
const CampaignAttendanceTable = ({
  data,
  setData,
  loading,
  setLoading,

  page,
  sizePerPage,
  totalPages,
  setPage,
  setSizePerPage,
  setTotalPages,

  date,
  setDate,
  columns,
  context,
}) => {
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [show, setShow] = useState(false);
  const [allEmployee, setAllEmployee] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = "https://erp.outsourceglobal.com";
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

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
              {allEmployee.length ? (
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
                      onChange={(e) => setDate(e?.target?.value)}
                      className="form-control "
                    />
                  </div>
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
              />

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

export default CampaignAttendanceTable;
