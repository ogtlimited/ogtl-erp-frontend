/** @format */

import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axiosInstance from "../../../../services/api";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import usePagination from "../../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AdminLeavesTable = ({
  data,
  setData,
  columns,
  context,
  loading,
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
  leaveTypeFilter,
  setLeaveTypeFilter,
  searchTerm,
  setSearchTerm,
  setLoading,
  departments,
  campaigns,
  leaveTypes,
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
    if (columns.length > 7) {
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

  const handleDepartmentFilter = useCallback(
    (e) => {
      setDepartmentFilter(e.target.value);
      console.log("filter value:", e.target.value);
      console.log("Data to Filter:", dataToFilter);
      console.log("Dept. Filter:", departmentFilter);
      setPage(1);
      setLoading(true);

      axiosInstance
        .get("/api/v1/hr_dashboard/leaves.json", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },

          params: {
            page: page,
            limit: sizePerPage,
            search: searchTerm,
            operation_office_id: e.target.value,
            // hr_designation_id: designationFilter,
          },
        })
        .then((e) => {
          const resData = e?.data?.data?.employees;
          const totalPages = e?.data?.data?.pages;

          const thisPageLimit = sizePerPage;
          const thisTotalPageSize = totalPages;

          setSizePerPage(thisPageLimit);
          setTotalPages(thisTotalPageSize);

          const mapp = resData.map((emp) => {
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
          setunfiltered(mapp);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    },
    [
      dataToFilter,
      departmentFilter,
      page,
      searchTerm,
      setData,
      setDepartmentFilter,
      setLoading,
      setPage,
      setSizePerPage,
      setTotalPages,
      sizePerPage,
    ]
  );

  const handleCampaignFilter = useCallback(
    (e) => {
      setCampaignFilter(e.target.value);
      console.log("filter value:", e.target.value);
      console.log("Data to Filter:", dataToFilter);
      console.log("camp.. Filter:", campaignFilter);
      setPage(1);
      setLoading(true);

      axiosInstance
        .get("/api/v1/hr_dashboard/leaves.json", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },

          params: {
            page: page,
            limit: sizePerPage,
            search: searchTerm,
            operation_office_id: e.target.value,
            // hr_designation_id: designationFilter,
          },
        })
        .then((e) => {
          const resData = e?.data?.data?.employees;
          const totalPages = e?.data?.data?.pages;

          const thisPageLimit = sizePerPage;
          const thisTotalPageSize = totalPages;

          setSizePerPage(thisPageLimit);
          setTotalPages(thisTotalPageSize);

          const mapp = resData.map((emp) => {
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
          setunfiltered(mapp);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    },
    [
      campaignFilter,
      dataToFilter,
      page,
      searchTerm,
      setCampaignFilter,
      setData,
      setLoading,
      setPage,
      setSizePerPage,
      setTotalPages,
      sizePerPage,
    ]
  );

  const handleLeaveTypeFilter = (e) => {
    setLeaveTypeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get(`leads-leave-applications`, {
        params: {
          leave_type: e.target.value,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.application;
        let resOptions = res?.data?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formatted = resData.map((leave) => ({
          ...leave,
          full_name:
            leave?.employee.first_name +
            " " +
            leave?.employee.middle_name +
            " " +
            leave?.employee.last_name,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          department: leave?.department_id?.department,
          from_date: new Date(leave.from_date).toDateString(),
          to_date: new Date(leave.to_date).toDateString(),
          total_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setData(formatted);
        setunfiltered(formatted);
      });
    setLoading(false);
    setDepartmentFilter("");
  };

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {}, 5000);
  }, [data]);

  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      setPage(1);
      setLoading(true);
      props.onSearch(input.value);
      const searchTerm = input.value;
      setSearchTerm(searchTerm);

      if (page === 1) {
        axiosInstance
          .get(`leads-leave-applications`, {
            params: {
              search: searchTerm,
              page: page,
              limit: sizePerPage,
            },
          })
          .then((res) => {
            let resData = res?.data?.data?.application;
            let resOptions = res?.data?.data?.pagination;

            const thisPageLimit = sizePerPage;
            const thisTotalPageSize = resOptions?.numberOfPages;

            setSizePerPage(thisPageLimit);
            setTotalPages(thisTotalPageSize);

            const formatted = resData.map((leave) => ({
              ...leave,
              full_name:
                leave?.employee.first_name +
                " " +
                leave?.employee.middle_name +
                " " +
                leave?.employee.last_name,
              status_action: leave?.status,
              leave_type: leave?.leave_type_id?.leave_type,
              department: leave?.department_id?.department,
              from_date: new Date(leave.from_date).toDateString(),
              to_date: new Date(leave.to_date).toDateString(),
              total_leave_days: Math.ceil(
                (new Date(leave.to_date) - new Date(leave.from_date)) /
                  (1000 * 3600 * 24)
              ),
            }));

            setData(formatted);
            setDepartmentFilter("");
          });
      }
      setLoading(false);
    };

    return (
      <div className="job-app-search">
        <input
          className="form-control"
          style={{
            backgroundColor: "#fff",
            width: "33.5%",
            marginRight: "20px",
          }}
          ref={(n) => (input = n)}
          type="text"
        />
        <button className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
      </div>
    );
  };

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
          data={dataToFilter}
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
                
              <div className="col-md-3">
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
                      <option key={idx} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
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
                      <option key={idx} value={option.value}>{option.label}</option>
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
                      <option key={index} value={option.value}>{option.label}</option>
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

export default AdminLeavesTable;
