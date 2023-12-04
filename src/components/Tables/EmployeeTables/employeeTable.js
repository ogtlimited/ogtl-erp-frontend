/* eslint-disable no-unused-vars */
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axiosInstance from "../../../services/api";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import csvDownload from "json-to-csv-export";

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

  departmentFilter,
  setDepartmentFilter,
  campaignFilter,
  setCampaignFilter,
  officeFilter,
  setOfficeFilter,
  designationFilter,
  setDesignationFilter,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,

  setModalType,
  setSelectedRow,

  fetchAllEmployees,
  context,
}) => {
  const status = [
    {
      code: "active",
      label: "ACTIVE",
    },
    {
      code: "left",
      label: "RESIGNED",
    },
    {
      code: "terminated",
      label: "TERMINATED",
    },
    {
      code: "deactivated",
      label: "DEACTIVATED",
    },
  ];

  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const [dataToFilter, setDataToFilter] = useState("");
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = "https://erp.outsourceglobal.com";
  const { setIsFromBiometrics, showAlert, user, getAvatarColor } =
    useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10,
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

  useEffect(() => {
    setDataToFilter(data);
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
            "ngrok-skip-browser-warning": "69420",
          },
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
      dataField: "fullName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar" onClick={handleNavigate}>
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
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
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
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
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office",
      text: "Office Type",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "officeName",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "company_email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "100%" },
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
      ),
    },
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
          setOfficeFilter("");
          setCampaignFilter("");
          setDepartmentFilter("");
          setDesignationFilter("");
          setStatusFilter("");
          setSearchTerm(searchTerm);
        }
        setLoading(false);
      };

      return (
        <div className="custom-search">
          <input
            className="custom-search-input"
            style={{
              backgroundColor: "#fff",
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
              setOfficeFilter("");
              setCampaignFilter("");
              setDepartmentFilter("");
              setDesignationFilter("");
              setStatusFilter("");
              setPage(1);
              setLoading(true);
            }}
          >
            Reset
          </button>
        </div>
      );
    },
    [setCampaignFilter, setDepartmentFilter, setDesignationFilter, setLoading, setOfficeFilter, setPage, setSearchTerm, setStatusFilter]
  );

  // Filter by Departments:
  const handleDepartmentFilter = (e) => {
    setCampaignFilter("");
    setDesignationFilter("");
    setDepartmentFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm,
          operation_office_id: e.target.value,
          status: statusFilter.length ? statusFilter : null,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData?.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  // Filter by Campaigns:
  const handleCampaignFilter = (e) => {
    setDepartmentFilter("");
    setDesignationFilter("");
    setCampaignFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm,
          operation_office_id: e.target.value,
          status: statusFilter.length ? statusFilter : null,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData?.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  // Filter by Designation:
  const handleDesignationFilter = (e) => {
    setDesignationFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm,
          operation_office_id: officeFilter.length ? officeFilter : null,
          hr_designation_id: e.target.value,
          status: statusFilter.length ? statusFilter : null,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData?.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  // Filter by Status:
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          operation_office_id: officeFilter.length ? officeFilter : null,
          hr_designation_id: designationFilter.length
            ? designationFilter
            : null,
          status: e.target.value,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData?.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
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
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: 1000,
        },
      });

      const responseData = response?.data?.data?.employees;

      const formatted = responseData.map((data) => ({
        "Employee Name": data?.full_name,
        OGID: data?.ogid,
        "Office Type": data?.office?.office_type,
        Office: data?.office?.title,
        Designation: data?.designation,
        Email: data?.email,
      }));

      const dataToConvert = {
        data: formatted,
        filename: "OGTL - All Employees Record",
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
          data={loading ? [] : dataToFilter}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <div className="col-12">
                <button
                  onClick={handleDownloadCSV}
                  className="float-right btn export-csv"
                >
                  Export CSV
                </button>

                <MySearch
                  {...props.searchProps}
                  style={{ paddingLeft: "12%" }}
                  className="inputSearch"
                />
              </div>

              <div className="hr-filter-select col-12">
                {/* <div className="col-md-3">
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
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleCampaignFilter(e)}
                    defaultValue={campaignFilter}
                    value={campaignFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Campaign
                    </option>
                    {campaigns.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDesignationFilter(e)}
                    defaultValue={designationFilter}
                    value={designationFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Designation
                    </option>
                    {designations.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleStatusFilter(e)}
                    defaultValue={statusFilter}
                    value={statusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Status
                    </option>
                    {status.map((option, index) => (
                      <option key={index} value={option.code}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
