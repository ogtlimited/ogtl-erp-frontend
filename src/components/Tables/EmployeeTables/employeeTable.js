/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axiosInstance from "../../../services/api";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import csvDownload from "json-to-csv-export";
import Select from "react-select";

const initialState = {
  id: null,
  title: ""
};

const status = [
  {
    label: "ACTIVE",
    value: "active"
  },
  {
    label: "RESIGNED",
    value: "left"
  },
  {
    label: "TERMINATED",
    value: "terminated"
  },
  {
    label: "DEACTIVATED",
    value: "deactivated"
  }
];

const EmployeesTable = ({
  data,
  setData,
  loading,
  setLoading,

  departments,
  campaigns,
  designations,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  selectedOffice,
  setSelectedOffice,
  designationFilter,
  setDesignationFilter,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,

  setModalType,
  setSelectedRow,

  fetchAllEmployees,
  context
}) => {
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    setIsFromBiometrics,
    showAlert,
    user,
    getAvatarColor,
    selectOfficeTypes,
    selectDepartments,
    selectCampaigns
  } = useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10
  });

  const CurrentUserRoles = user?.employee_info?.roles;

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 7) {
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

  const handleNavigate = () => {
    setIsFromBiometrics(false);
  };

  //Reactivate Employee
  const handleActivateEmployee = async (row) => {
    const fullName = row.fullName;
    const userId = row?.ogid;

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/reactivate_employees/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      showAlert(true, fullName + ` is now Active`, "alert alert-success");

      fetchAllEmployees();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar" onClick={handleNavigate}>
          {row?.pic ? (
            <img src={row?.pic} alt="profile dp" className="avatar-span" />
          ) : (
            <span
              className="avatar-span"
              style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
            >
              {value?.charAt(0)}
            </span>
          )}
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      )
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {value === "active" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value?.toUpperCase()}</span>
            </a>
          ) : value === "left" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{"RESIGNED"}</span>
            </a>
          ) : value === "terminated" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value?.toUpperCase()}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value?.toUpperCase()}</span>
            </a>
          )}
        </>
      )
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val}</span>
    },
    {
      dataField: "email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "pensionable",
      text: "Pensionable",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i
              className={`fa fa-dot-circle-o ${
                value ? "text-success" : "text-secondary"
              } `}
              style={{ marginRight: "10px" }}
            ></i>{" "}
            {value ? "Yes" : "No"}
          </span>
        </>
      )
    },
    {
      dataField: "taxable",
      text: "Taxable",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i
              className={`fa fa-dot-circle-o ${
                value ? "text-success" : "text-secondary"
              } `}
              style={{ marginRight: "10px" }}
            ></i>{" "}
            {value ? "Yes" : "No"}
          </span>
        </>
      )
    },
    {
      dataField: "",
      text:
        CurrentUserRoles.includes("hr_manager") ||
        CurrentUserRoles.includes("senior_hr_associate")
          ? "Action"
          : "",
      csvExport: false,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {CurrentUserRoles.includes("hr_manager") ||
          CurrentUserRoles.includes("senior_hr_associate") ? (
            <div className="dropdown dropdown-action text-right">
              <a
                href="#"
                className="action-icon dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {row?.status !== "active" && (
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleActivateEmployee(row)}
                  >
                    <i className="fa fa-check m-r-5"></i>Reactivate
                  </a>
                )}

                {row?.status === "active" && (
                  <a
                    className="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      setModalType("deactivate");
                      setSelectedRow(row);
                    }}
                  >
                    <i className="fa fa-remove m-r-5"></i>Deactivate
                  </a>
                )}

                {row?.status === "active" && (
                  <a
                    className="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      setModalType("left");
                      setSelectedRow(row);
                    }}
                  >
                    <i className="fa fa-ban m-r-5"></i> Resigned
                  </a>
                )}

                {row?.status === "active" && (
                  <a
                    className="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      setModalType("terminated");
                      setSelectedRow(row);
                    }}
                  >
                    <i className="fa fa-ban m-r-5"></i> Terminated
                  </a>
                )}
              </div>
            </div>
          ) : null}
        </>
      )
    }
  ];

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
          setSelectedOffice({
            id: null,
            title: "",
            office_type: ""
          });
          setDesignationFilter(initialState);
          setStatusFilter(initialState);
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
              marginRight: "20px"
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
              setSelectedOffice({
                id: null,
                title: "",
                office_type: ""
              });
              setDesignationFilter(initialState);
              setStatusFilter(initialState);
              setPage(1);
            }}
          >
            Reset
          </button>
        </div>
      );
    },
    [
      setDesignationFilter,
      setLoading,
      setPage,
      setSearchTerm,
      setSelectedOffice,
      setStatusFilter
    ]
  );

  // // Filter by Status:
  // const handleStatusFilter = (e) => {
  //   setStatusFilter(e.target.value);
  //   setPage(1);
  //   setLoading(true);

  //   axiosInstance
  //     .get("/api/v1/employees.json", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420"
  //       },

  //       params: {
  //         page: page,
  //         limit: sizePerPage,
  //         name: searchTerm.length ? searchTerm : null,
  //         office_type: selectedOffice?.office_type,
  //         operation_office_id: selectedOffice?.office_type.length
  //           ? selectedOffice?.id
  //           : null,
  //         hr_designation_id: designationFilter.length
  //           ? designationFilter
  //           : null,
  //         status: e.target.value
  //       }
  //     })
  //     .then((e) => {
  //       const resData = e?.data?.data?.employees;
  //       const totalPages = e?.data?.data?.pages;

  //       const thisPageLimit = sizePerPage;
  //       const thisTotalPageSize = totalPages;

  //       setSizePerPage(thisPageLimit);
  //       setTotalPages(thisTotalPageSize);

  //       const mapp = resData?.map((emp) => {
  //         return {
  //           ...emp,
  //           office: emp?.office?.toUpperCase(),
  //           designation: emp?.designation?.toUpperCase(),
  //           pic: emp?.profile_picture
  //         };
  //       });

  //       setData(mapp);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  //   setLoading(false);
  // };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  // const handleExportCSV = async (e) => {
  //   e.preventDefault();
  //   setIsDownloading(true);

  //   try {
  //     const response = await axiosInstance.get("/api/v1/exports/employees.xml", {
  //       headers: {
  //         "Content-Type": "application/xml; charset=utf-8",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420"
  //       },
  //       params: {
  //         status: statusFilter.length ? statusFilter : "active"
  //         // office_type: selectedOffice?.office_type,
  //         // operation_office_id: selectedOffice?.office_type.length
  //         //   ? selectedOffice?.id
  //         //   : null
  //       }
  //     });

  //     console.log("download this", response);

  //     setIsDownloading(false);
  //   } catch (error) {
  //     showAlert(
  //       true,
  //       error?.response?.data?.errors || "Error Exporting records",
  //       "alert alert-warning"
  //     );
  //     setIsDownloading(false);
  //   }
  // };

  const handleDownloadCSV = async (e) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: 1,
          limit: 4000,
          status: statusFilter.length ? statusFilter : "active"
          // office_type: selectedOffice?.office_type,
          // operation_office_id: selectedOffice?.office_type.length
          //   ? selectedOffice?.id
          //   : null
        }
      });

      const responseData = response?.data?.data?.employees;

      const formatted = responseData.map((data) => ({
        "EMPLOYEE NAME": data?.full_name,
        STATUS: data?.status.replace(/\b\w/g, (char) => char.toUpperCase()),
        OGID: data?.ogid,
        OFFICE: data?.office
          ?.toUpperCase()
          .replace(/_/g, " ")
          .replace(/^./, (str) => str.toUpperCase()),
        DESIGNATION: data?.designation?.toUpperCase(),
        EMAIL: data?.email,
        PENSIONABLE: data?.pensionable ? "Yes" : "No",
        TAXABLE: data?.taxable ? "Yes" : "No"
      }));

      const dataToConvert = {
        data: formatted,
        filename: `OGTL - All ${
          statusFilter.length
            ? statusFilter.replace(/\b\w/g, (char) => char.toUpperCase())
            : "Active"
        } Employees Record`,
        delimiter: ",",
        useKeysAsHeaders: true
      };

      csvDownload(dataToConvert);

      setIsDownloading(false);
    } catch (error) {
      showAlert(
        true,
        error?.response?.data?.errors || "Error Exporting records",
        "alert alert-warning"
      );
      setIsDownloading(false);
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
              <div className="col-12">
                {isDownloading ? (
                  <button
                    onClick={handleDownloadCSV}
                    className="float-right btn export-csv"
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "10px" }}
                    ></span>
                    Exporting records, please wait...
                  </button>
                ) : (
                  <>
                    {data?.length ? (
                      <button
                        onClick={handleDownloadCSV}
                        className="float-right btn export-csv"
                      >
                        Export Employee Records (CSV)
                      </button>
                    ) : null}
                  </>
                )}

                <MySearch
                  {...props.searchProps}
                  style={{ paddingLeft: "12%" }}
                  className="inputSearch"
                />
              </div>

              <div className="hr-filter-select col-12">
                {/* <div className="col-md-3">
                  <label htmlFor="officeType">Filter By</label>
                  <Select
                    options={selectOfficeTypes}
                    value={
                      selectedOffice?.office_type
                        ? {
                            label: selectedOffice?.office_type.replace(
                              /\b\w/g,
                              (char) => char.toUpperCase()
                            ),
                            value: selectedOffice?.office_type
                          }
                        : null
                    }
                    onChange={(e) => {
                      setSelectedOffice({
                        id: "",
                        title: "",
                        office_type: e.value
                      });
                    }}
                    placeholder="Office Type"
                    style={{ display: "inline-block" }}
                  />
                </div> */}

                {/* <div className="col-md-3">
                  <label htmlFor="office_id">
                    {selectedOffice?.office_type.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    ) || "Office"}
                  </label>
                  <Select
                    options={
                      selectedOffice?.office_type === "department"
                        ? selectDepartments
                        : selectedOffice?.office_type === "campaign"
                        ? selectCampaigns
                        : []
                    }
                    value={{
                      value: selectedOffice?.id,
                      label:
                        selectedOffice?.title.toUpperCase() || "Office Title"
                    }}
                    onChange={(e) =>
                      setSelectedOffice({
                        ...selectedOffice,
                        id: e?.value,
                        title: e?.label
                      })
                    }
                    placeholder="Office Title"
                    style={{ display: "inline-block" }}
                    isSearchable={true}
                  />
                </div> */}

                <div className="col-md-3">
                  <Select
                    options={designations}
                    value={
                      designationFilter?.title
                        ? {
                            label: designationFilter?.title?.toUpperCase(),
                            value: designationFilter?.id
                          }
                        : null
                    }
                    onChange={(e) => {
                      setDesignationFilter({
                        title: e.label,
                        id: e.value
                      });
                    }}
                    style={{ display: "inline-block" }}
                    placeholder={
                      !designations?.length
                        ? "fetching designations..."
                        : "Select Designation"
                    }
                  />
                </div>

                <div className="col-md-3">
                  <Select
                    options={status}
                    value={
                      statusFilter?.title
                        ? {
                            label: statusFilter?.title?.toUpperCase(),
                            value: statusFilter?.id
                          }
                        : null
                    }
                    onChange={(e) => {
                      setStatusFilter({
                        title: e.label,
                        id: e.value
                      });
                    }}
                    style={{ display: "inline-block" }}
                    placeholder={
                      !status?.length
                        ? "fetching status..."
                        : "Select Status"
                    }
                  />
                </div>
              </div>

              <div className="app-table-div">
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

export default EmployeesTable;
