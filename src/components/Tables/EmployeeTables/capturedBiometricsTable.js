/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import csvDownload from "json-to-csv-export";
import axiosInstance from "../../../services/api";
import malePlaceholder from "../../../assets/img/male-placeholder.jpeg";
import femalePlaceholder from "../../../assets/img/female-placeholder.jpg";

const CapturedBiometricsTable = ({
  data,
  setData,
  loading,
  setLoading,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  context,
}) => {
  const navigate = useNavigate();
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState("");
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = "https://erp.outsourceglobal.com";
  const { setIsFromBiometrics, showAlert } = useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 5) {
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
    // setTimeout(() => {
    //   setLoading(true);
    // }, 5000);
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

  const handleNavigate = (row) => {
    setIsFromBiometrics(true);
    navigate(`/dashboard/user/profile/${row.StaffUniqueId}`);
  };

  const columns = [
    {
      dataField: "FullName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "50%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row?.PictureUrl
                  ? row?.PictureUrl
                  : row.Gender === "Male"
                  ? malePlaceholder
                  : row.Gender === "Female"
                  ? femalePlaceholder
                  : "https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png"
              }
            />
          </a>
          <Link to={`/dashboard/user/profile/${row.StaffUniqueId}`}>
            {value?.toUpperCase()} <span>{row?.Role?.toUpperCase()}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "StaffUniqueId",
      text: "OGID",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "IsActive",
      text: "Status",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <>
          {value === true ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">ACTIVE</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">INACTIVE</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "StrictAttendance",
      text: "Attendance",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <>
          {value === true ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-strict"></span>{" "}
              <span className="ml-4 d-block">STRICT</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-flexible"></span>{" "}
              <span className="ml-4 d-block">REMOTE</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "Email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <div className="text-center">
            <div className="leave-user-action-btns">
              <button
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                onClick={() => handleNavigate(row)}
              >
                Edit Shift
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  const handleDownloadCSV = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/biometric_enrolled_staff.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: 1000,
          },
        }
      );

      const responseData = response?.data?.data?.staff;

      const formatted = responseData.map((data, index) => ({
        "S/N": index + 1,
        "Employee Name": data?.FullName,
        OGID: data?.StaffUniqueId,
        Role: data?.Role,
        Email: data?.Email,
      }));

      const dataToConvert = {
        data: formatted,
        filename: "OGTL - All Captured Biometrics",
        delimiter: ",",
        useKeysAsHeaders: true,
      };

      csvDownload(dataToConvert);

      setLoading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      {dataToFilter && (
        <ToolkitProvider
          keyField="id"
          data={dataToFilter}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <ExportCSVButton
                onClick={handleDownloadCSV}
                className="float-right btn export-csv"
                style={{ marginBottom: 15 }}
              >
                Export CSV
              </ExportCSVButton>

              <div className="hr-filter-select col-12"></div>

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

export default CapturedBiometricsTable;
