/*slint-disable eqeqeq*/
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import LeaveStatusTable from "../../../components/Tables/EmployeeTables/leaveStatusTable";
import axiosInstance from "../../../services/api";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import ViewModal from "../../../components/Modal/ViewModal";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import LeaveStatusContent from "../../../components/ModalContents/LeaveStatusContent";

const AllLeaveStatusAdmin = () => {
  const males = [male, male2, male3];
  const { ErrorHandler } = useAppContext();
  const females = [female, female2, female3];
  const imageUrl = "https://erp.outsourceglobal.com";
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [allApplications, setallApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  const { id, from_date, to_date } = useParams();

  const [departments, setDepartments] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // Calculates Leave Days (Week Days Only)
  function calcBusinessDays(startDate, endDate) {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, "day")) {
      if (day.day() !== 0 && day.day() !== 5) businessDays++;
      day.add(1, "d");
    }
    return businessDays;
  }

  // Handle Leave params:
  const fetchParams = useCallback(() => {
    const header = id;
    const Header = header[0].toUpperCase() + header.substring(1);
    setHeader(Header);
    setFrom(from_date);
    setTo(to_date);
  }, [from_date, id, to_date]);

  // Fetch Leave Status:
  const fetchLeaveStatus = useCallback(() => {
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
          status: id === "pending" ? null : id,
        },
      })
      .then((res) => {
        const resData = res?.data?.data?.leaves;
        const totalPages = res?.data?.data?.total_pages;

        console.log("This enterred data:", res?.data?.data);

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formatted = resData.map((leave) => ({
          ...leave,
          ...leave?.leave,
          full_name: leave?.first_name + " " + leave?.last_name,
          from_date: new Date(leave?.leave?.start_date).toDateString(),
          to_date: new Date(leave?.leave?.end_date).toDateString(),
          total_leave_days: calcBusinessDays(
            leave?.leave?.start_date,
            leave?.leave?.end_date
          ),
          date_applied: moment(leave?.leave?.created_at).format(
            "Do MMMM, YYYY"
          ),
        }));

        setallApplications(formatted);
        console.log("Status Response Formatted Data:", formatted);
        setLoading(false);
      })
      .catch((error) => {
        const component = `${id} Error:`;
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, sizePerPage]);

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
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row.gender === "Male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to="">
            {value} <span>{row?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "120px" },
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
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "from_date",
      text: "From Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "to_date",
      text: "To Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "total_leave_days",
      text: "Total Leave Days",
      sort: true,
      headerStyle: { minWidth: "80px", textAlign: "center" },
      formatter: (value, row) => (
        <>
          {row.total_leave_days > 1
            ? row.total_leave_days + " days"
            : row.total_leave_days + " day"}
        </>
      ),
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { minWidth: "100px" },

      formatter: (value, row) => (
        <>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setmodalType("view-details");
              setViewRow(row);
            }}
            href="#"
            data-toggle="modal"
            data-target="#generalModal"
          >
            <i className="fa fa-eye m-r-5"></i> View
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{header}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leave Status</li>
            </ul>
          </div>
        </div>
      </div>

      <LeaveStatusTable
        columns={columns}
        departments={departments}
        leaveTypes={leaveTypes}
        data={allApplications}
        setData={setallApplications}
        loading={loading}
        setLoading={setLoading}
      />

      {modalType === "view-details" ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveStatusContent leaveContent={viewRow} />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AllLeaveStatusAdmin;
