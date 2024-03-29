/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import AdminLeavesTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable";

const AllLeaveStatusAdmin = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const imageUrl = "https://erp.outsourceglobal.com";

  const [allApplications, setallApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { id, from_date, to_date } = useParams();

  const time = new Date().toDateString();
  const today_date = moment(time).utc().format("yyyy-MM-DD");

  // const [departments, setDepartments] = useState([]);
  // const [leaveTypes, setLeaveTypes] = useState([]);
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculates Leave Days (Week Days Only)
  function calcBusinessDays(startDate, endDate) {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, "day")) {
      if (day.day() !== 0 && day.day() !== 6) businessDays++;
      day.add(1, "d");
    }
    return businessDays;
  }

  // Handle Leave params:
  const fetchParams = useCallback(() => {
    const header = id;
    const Header = header[0].toUpperCase() + header.substring(1);
    setHeader(Header);
    // setFrom(from_date);
    // setTo(to_date);
  }, [id]);

  // Fetch Leave Status:
  const fetchLeaveStatus = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/v1/hr_dashboard/leave_status.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          status: id,
        },
      })
      .then((res) => {
        const resData = res?.data?.data?.leave_status;
        const totalPages = res?.data?.data?.total_pages;

        setSizePerPage(sizePerPage);
        setTotalPages(totalPages);

        const formatted = resData.map((leave) => ({
          ...leave,
          ...leave?.leave,
          full_name: leave?.first_name + " " + leave?.last_name,
          from_date: moment(leave?.leave?.start_date)
            .utc()
            .format("ddd MMM Do, YYYY"),
          to_date: moment(leave?.leave?.end_date)
            .utc()
            .format("ddd MMM Do, YYYY"),
          total_leave_days: calcBusinessDays(
            leave?.leave?.start_date,
            leave?.leave?.end_date
          ),
          date_applied: moment(leave?.created_at).utc().format("Do MMM, YYYY"),
          current_approver: leave?.leave?.hr_stage
            ? "HR"
            : leave?.leave?.operation_team_stage
            ? "OPERATIONS"
            : leave?.leave?.workforce_stage
            ? "WORKFORCE"
            : leave?.current_stage_manager?.manager_full_name,
          leave_marker:
            moment(leave?.leave?.end_date).utc().format("yyyy-MM-DD") <
            today_date
              ? "Leave Ended"
              : today_date <
                  moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") &&
                moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") !==
                  today_date
              ? "Scheduled Leave"
              : "On Leave",
          leave_manager_name: leave?.manager
            ? leave?.manager?.manager_first_name +
              " " +
              leave?.manager?.manager_last_name
            : null,
          leave_manager_email: leave?.manager?.manager_email,
        }));

        // console.log("Leave Tracker:", formatted);

        setallApplications(formatted);
        setLoading(false);
      })
      .catch((error) => {
        const component = `${id} Error | `;
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, sizePerPage, searchTerm]);

  // const fetchDepartment = async () => {
  //   try {
  //     const response = await axiosInstance.get('/department');
  //     const resData = response?.data?.data;

  //     const formatted = resData.map((e) => ({
  //       department: e.department,
  //     }));

  //     setDepartments(formatted);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const fetchLeavesType = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/leave-type`);
  //     const resData = response?.data?.data;

  //     const formatted = resData.map((e) => ({
  //       leave_type: e.leave_type,
  //     }));

  //     setLeaveTypes(formatted);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchLeaveStatus();
    // fetchDepartment();
    // fetchLeavesType();
    fetchParams();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [fetchLeaveStatus, fetchParams]);

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <div>
            {value?.toUpperCase()} <span>{row?.ogid}</span>
          </div>
        </h2>
      ),
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <span>{value ? value.toUpperCase() : value}</span>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {value === "approved" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === "cancelled" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : value === "rejected" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === "pending" ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "leave_marker",
      text: "Leave",
      sort: true,
      headerStyle: { width: "100%", textAlign: "center" },
      formatter: (value, row) => (
        <>
          {id === "approved" ? (
            <>
              {value === "Scheduled Leave" ? (
                <span className="btn btn-gray btn-sm btn-rounded">
                  <i className="fa fa-dot-circle-o text-warning"></i> {value}
                </span>
              ) : value === "On Leave" ? (
                <span className="btn btn-gray btn-sm btn-rounded">
                  <i className="fa fa-dot-circle-o text-success"></i> {value}
                </span>
              ) : value === "Leave Ended" ? (
                <span className="btn btn-gray btn-sm btn-rounded">
                  <i className="fa fa-dot-circle-o text-danger"></i> {value}
                </span>
              ) : null}
            </>
          ) : (
            <>
              <span className="btn btn-gray btn-sm btn-rounded">
                <i className="fa fa-dot-circle-o text-secondary"></i> Not
                Approved
              </span>
            </>
          )}
        </>
      ),
    },
    {
      dataField: "current_approver",
      text: "Current Leave Approver",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "leave_manager_name",
      text: "Manager",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "leave_manager_email",
      text: "Manager's Email",
      sort: true,
      headerStyle: { width: "100%" },
    },
    // {
    //   dataField: "from_date",
    //   text: "From Date",
    //   sort: true,
    //   headerStyle: { width: "100%" },
    //   formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    // },
    // {
    //   dataField: "to_date",
    //   text: "To Date",
    //   sort: true,
    //   headerStyle: { width: "100%" },
    //   formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    // },
    // {
    //   dataField: "total_leave_days",
    //   text: "Total Leave Days",
    //   sort: true,
    //   headerStyle: { width: "100%", textAlign: "center" },
    //   formatter: (value, row) => (
    //     <>
    //       {row.total_leave_days > 1
    //         ? row.total_leave_days + " days"
    //         : row.total_leave_days + " day"}
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{header} Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr-dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leave Status</li>
            </ul>
          </div>
        </div>
      </div>

      <AdminLeavesTable
        data={allApplications}
        setData={setallApplications}
        columns={columns}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // departments={departments}
        // leaveTypes={leaveTypes}
      />
    </>
  );
};

export default AllLeaveStatusAdmin;
