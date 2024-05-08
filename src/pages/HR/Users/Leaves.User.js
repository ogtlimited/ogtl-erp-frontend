// *IN USE

/* eslint-disable no-unused-vars */
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";
import ViewModal from "../../../components/Modal/ViewModal";
import { ApplyLeaveModal } from "../../../components/Modal/ApplyLeaveModal";
import { useAppContext } from "../../../Context/AppContext";
import LeaveApplicationContent from "../../../components/ModalContents/LeaveApplicationContent";
import RejectLeaveModal from "../../../components/Modal/RejectLeaveModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import UniversalTable from "../../../components/Tables/UniversalTable";
import UniversalPaginatedTable from "./../../../components/Tables/UniversalPaginatedTable";
import moment from "moment";
import AlertSvg from "../../../layouts/AlertSvg";
import $ from "jquery";

const LeavesUser = () => {
  const {
    showAlert,
    fetchHRLeavesNotificationCount,
    user,
    ErrorHandler,
    goToTop,
    selectDepartments,
    getAvatarColor,
    loadingUserResignation,
    userResignations,
  } = useAppContext();
  const [leaveApplicationCount, setLeaveApplicationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [isResolving, setIsResolving] = useState(false);

  const [allLeaves, setallLeaves] = useState([]);
  const [allReporteesLeaves, setAllReporteesLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [departmentLeaveHistory, setDepartmentLeaveHistory] = useState([]);

  const [rejectModal, setRejectModal] = useState(false);
  const [rejectLeave, setRejectLeave] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [deptPage, setDeptPage] = useState(1);
  const [deptSizePerPage, setDeptSizePerPage] = useState(10);
  const [deptTotalPages, setDeptTotalPages] = useState("");

  const time = new Date().toDateString();
  const today_date = moment(time).utc().format("yyyy-MM-DD");

  const currentUserIsLead = user?.employee_info?.is_lead;
  const currentUserOffice = user?.office?.title.toUpperCase();
  const CurrentUserRoles = user?.employee_info?.roles;
  const departmentId = user?.office?.id;

  const managers = selectDepartments.map((item) => {
    const modifiedLabel =
      item.label.toLowerCase().replace(/\s/g, "_") + "_manager";
    return modifiedLabel;
  });

  const CurrentUserCanViewDepartmentLeaves = CurrentUserRoles.some((role) =>
    managers.includes(role)
  );

  // Calculates Leave Days for Business Days:
  function calcBusinessDays(startDate, endDate) {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, "day")) {
      if (day.day() !== 0 && day.day() !== 6) businessDays++;
      day.add(1, "d");
    }
    return businessDays;
  }

  // User Leaves:
  const fetchYourLeaves = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/leaves.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.leaves;

      const formatted = resData.map((leave) => ({
        ...leave?.leave,
        status_action: leave?.leave?.status,
        leave_type: leave?.leave_type,
        from_date: moment(leave?.leave?.start_date)
          .utc()
          .format("ddd MMM Do, YYYY"),
        to_date: moment(leave?.leave?.end_date)
          .utc()
          .format("ddd MMM Do, YYYY"),
        requested_leave_days: calcBusinessDays(
          leave?.leave?.start_date,
          leave?.leave?.end_date
        ),
        date_applied: moment(leave?.leave?.created_at)
          .utc()
          .format("Do MMM, YYYY"),
        leave_marker:
          moment(leave?.leave?.end_date).utc().format("yyyy-MM-DD") < today_date
            ? "Leave Ended"
            : today_date <
                moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") &&
              moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") !==
                today_date
            ? "Scheduled Leave"
            : "On Leave",
        proofs: leave?.proofs,
      }));

      setallLeaves(formatted);
    } catch (error) {
      const component = "Leaves Error | ";
      ErrorHandler(error, component);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Team Leaves:
  const fetchReporteesLeaves = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/team_leaves.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.leaves;

      const formatted = resData.map((leave) => ({
        ...leave,
        full_name:
          leave.first_name.toUpperCase() + " " + leave.last_name.toUpperCase(),
        status_action: leave?.status,
        office: leave.office.toUpperCase(),
        leave_type: leave?.leave_type,
        from_date: moment(leave?.start_date).utc().format("ddd MMM Do, YYYY"),
        to_date: moment(leave?.end_date).utc().format("ddd MMM Do, YYYY"),
        requested_leave_days: calcBusinessDays(
          leave?.start_date,
          leave?.end_date
        ),
        date_applied: moment(leave?.created_at).utc().format("Do MMM, YYYY"),
        proofs: leave?.proofs,
      }));

      const reporteeLeaves = resData.length;
      setAllReporteesLeaves(formatted);
      setLeaveApplicationCount(reporteeLeaves);
    } catch (error) {
      const component = "Team Leaves Error | ";
      ErrorHandler(error, component);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Team Leave History:
  const fetchTeamLeaveHistory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/team_leads_leave_histories.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.leave_histories;

      const formatted = resData.map((leave) => ({
        ...leave,
        full_name:
          leave?.user?.first_name?.toUpperCase() +
          " " +
          leave?.user?.last_name?.toUpperCase(),
        office: leave?.office?.toUpperCase(),
        from_date: moment(leave?.leave?.start_date)
          .utc()
          .format("ddd MMM Do, YYYY"),
        to_date: moment(leave?.leave?.end_date)
          .utc()
          .format("ddd MMM Do, YYYY"),
        status: leave?.leave?.status,
        total_leave_days: calcBusinessDays(
          leave?.leave?.start_date,
          leave?.leave?.end_date
        ),
        reason: leave?.leave?.reason,
        rejection_reason: leave?.leave?.rejection_reason,
        reason_for_cancellation: leave?.leave?.reason_for_cancellation,
        date_applied: moment(leave?.leave?.created_at)
          .utc()
          .format("Do MMM, YYYY"),
        proofs: leave?.proofs,
        leave_marker:
          moment(leave?.leave?.end_date).utc().format("yyyy-MM-DD") < today_date
            ? "Leave Ended"
            : today_date <
                moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") &&
              moment(leave?.leave?.start_date).utc().format("yyyy-MM-DD") !==
                today_date
            ? "Scheduled Leave"
            : "On Leave",
      }));

      setLeaveHistory(formatted);
    } catch (error) {
      const component = "Team Leave History Error | ";
      ErrorHandler(error, component);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today_date]);

  // Department Leave History:
  const fetchDepartmentLeaveHistory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/departments_leave_history.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: deptPage,
            limit: deptSizePerPage,
            department_id: departmentId,
          },
        }
      );

      const resData = response?.data?.data?.leaves?.leave_records;
      const deptTotalPages = response?.data?.data?.leaves?.pages;

      setDeptSizePerPage(deptSizePerPage);
      setDeptTotalPages(deptTotalPages);

      const formatted = resData.map((leave) => ({
        ...leave,
        full_name:
          leave?.first_name.toUpperCase() +
          " " +
          leave?.last_name.toUpperCase(),
        office: leave?.office?.toUpperCase(),
        from_date: moment(leave?.start_date).utc().format("ddd MMM Do, YYYY"),
        to_date: moment(leave?.end_date).utc().format("ddd MMM Do, YYYY"),
        status: leave?.status,
        total_leave_days: calcBusinessDays(leave?.start_date, leave?.end_date),
        reason: leave?.reason,
        rejection_reason: leave?.rejection_reason,
        reason_for_cancellation: leave?.reason_for_cancellation,
        date_applied: moment(leave?.created_at).utc().format("Do MMM, YYYY"),
        proofs: leave?.proofs,
        leave_marker:
          moment(leave?.end_date).utc().format("yyyy-MM-DD") < today_date
            ? "Leave Ended"
            : today_date <
                moment(leave?.start_date).utc().format("yyyy-MM-DD") &&
              moment(leave?.start_date).utc().format("yyyy-MM-DD") !==
                today_date
            ? "Scheduled Leave"
            : "On Leave",
      }));

      setDepartmentLeaveHistory(formatted);
    } catch (error) {
      const component = "Department Leave History Error | ";
      ErrorHandler(error, component);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId, deptPage, deptSizePerPage, today_date]);

  useEffect(() => {
    fetchYourLeaves();
    if (currentUserIsLead) {
      fetchReporteesLeaves();
      fetchTeamLeaveHistory();
    }

    if (CurrentUserCanViewDepartmentLeaves) {
      fetchDepartmentLeaveHistory();
    }
  }, [
    currentUserIsLead,
    fetchYourLeaves,
    fetchReporteesLeaves,
    fetchTeamLeaveHistory,
    fetchDepartmentLeaveHistory,
    CurrentUserCanViewDepartmentLeaves,
  ]);

  // Handle Approve Leave:
  const handleApproveLeave = async (row) => {
    const id = row.id;

    const firstName = row?.first_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
    const lastName = row?.last_name
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());

    const fullName = firstName + " " + lastName;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/approve_subordinate_leave/${id}.json`
      );
      showAlert(
        true,
        `Success! ${fullName} Leave Request has been Approved.`,
        "alert alert-success"
      );
      fetchReporteesLeaves();
      fetchHRLeavesNotificationCount();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  // Handle Reject Leave:
  const handleRejectLeave = (row) => {
    setRejectLeave(row);
    setRejectModal(true);
  };

  // Handle Cancel Leave:
  const handleCancelLeaveApplication = async (row) => {
    setIsResolving(true);
    try {
      const response = await axiosInstance.patch(
        `/api/v1/leaves/${selectedRow.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            status: "cancelled",
          },
        }
      );
      showAlert(true, "Leave Cancelled", "alert alert-info");
      fetchYourLeaves();
      goToTop();
      setIsResolving(false);
      $("#exampleModal").modal("toggle");
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      goToTop();
      setIsResolving(false);
      $("#exampleModal").modal("toggle");
    }
  };

  const userColumns = [
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "15%" },
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
      dataField: "leave_marker",
      text: "Leave Progress",
      sort: true,
      headerStyle: { width: "100%", textAlign: "center" },
      formatter: (value, row) => (
        <>
          {row?.status === "approved" ? (
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
      dataField: "from_date",
      text: "From",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "requested_leave_days",
      text: "Requested Leave Days",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {row.requested_leave_days > 1
            ? row.requested_leave_days + " days"
            : row.requested_leave_days + " day"}
        </>
      ),
    },
    {
      dataField: "proofs",
      text: "Proofs",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {row?.proofs ? (
            <>
              {row?.proofs.length > 1 ? (
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Downloads
                  </button>
                  <div className="dropdown-menu">
                    {row?.proofs.map((proof, index) => (
                      <a
                        key={index}
                        href={proof}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-item"
                        download
                      >
                        <i className="fa fa-download"></i> Download {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={value[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                  download
                >
                  <i className="fa fa-download"></i> Download
                </a>
              )}
            </>
          ) : null}
        </>
      ),
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setModalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {row.status === "pending" && row.acted_on === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setModalType("cancel");
                  setSelectedRow(row);
                }}
              >
                <i className="fa fa-remove m-r-5"></i> Cancel
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  const reporteeColumns = [
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <p>{val}</p>,
    },
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
            {value} <span>{row?.ogid}</span>
          </div>
        </h2>
      ),
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val}</span>,
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "from_date",
      text: "From",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
      headerStyle: { width: "100%" },
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
      dataField: "requested_leave_days",
      text: "Requested Leave Days",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {row.requested_leave_days > 1
            ? row.requested_leave_days + " days"
            : row.requested_leave_days + " day"}
        </>
      ),
    },
    {
      dataField: "proofs",
      text: "Proofs",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {row?.proofs ? (
            <>
              {row?.proofs.length > 1 ? (
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Downloads
                  </button>
                  <div className="dropdown-menu">
                    {row?.proofs.map((proof, index) => (
                      <a
                        key={index}
                        href={proof}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-item"
                        download
                      >
                        <i className="fa fa-download"></i> Download {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={value[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                  download
                >
                  <i className="fa fa-download"></i> Download
                </a>
              )}
            </>
          ) : null}
        </>
      ),
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setModalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {value === "pending" ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {value === "pending" ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRejectLeave(row)}
              >
                <i className="fa fa-ban m-r-5"></i> Reject
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  const historyColumns = [
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "20%" },
    },
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
            {value} <span>{row?.office}</span>
          </div>
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
      text: "Leave Progress",
      sort: true,
      headerStyle: { width: "100%", textAlign: "center" },
      formatter: (value, row) => (
        <>
          {row?.status === "approved" ? (
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
      dataField: "from_date",
      text: "From",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "total_leave_days",
      text: "Total Leave Days",
      sort: true,
      headerStyle: { width: "100%", textAlign: "center" },
      formatter: (value, row) => (
        <>
          {row.total_leave_days > 1
            ? row.total_leave_days + " days"
            : row.total_leave_days + " day"}
        </>
      ),
    },
    {
      dataField: "proofs",
      text: "Proofs",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {row?.proofs ? (
            <>
              {row?.proofs.length > 1 ? (
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Downloads
                  </button>
                  <div className="dropdown-menu">
                    {row?.proofs.map((proof, index) => (
                      <a
                        key={index}
                        href={proof}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-item"
                        download
                      >
                        <i className="fa fa-download"></i> Download {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={value[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                  download
                >
                  <i className="fa fa-download"></i> Download
                </a>
              )}
            </>
          ) : null}
        </>
      ),
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setModalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {userResignations && userResignations?.pending_resignation ? (
        <div className="payroll_alert_container">
          <div
            className="alert alert-primary sliding-text payroll_alert_left"
            role="alert"
          >
            <div>
              <AlertSvg />
              <svg
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
              >
                <use xlinkHref="#info-fill" />
              </svg>
              <span className="pl-3" style={{ width: "150px" }}>
                <strong>Important Notice</strong>
              </span>
              <span className="pl-3">
                {" "}
                | &nbsp; Your pending resignation restricts the submission of
                new leave applications unless the resignation is retracted.
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leave Application</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Time Off</li>
              <li className="breadcrumb-item active">Leave</li>
            </ul>
          </div>
          {loadingUserResignation ? null : (
            <>
              {userResignations &&
              userResignations?.pending_resignation ? null : (
                <div className="col-auto float-right ml-auto">
                  <a
                    href="#"
                    className="btn add-btn m-r-5"
                    data-toggle="modal"
                    data-target="#FormModal"
                  >
                    Apply For Leave
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {currentUserIsLead && (
        <div className="page-menu">
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tab_leaves"
                  >
                    Your Leaves
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={
                      leaveApplicationCount > 0 ? "tla nav-link" : "nav-link"
                    }
                    data-toggle="tab"
                    href="#tab_subordinates-leaves"
                  >
                    Team Leave Applications{" "}
                    {leaveApplicationCount > 0 && (
                      <div id="leave-application-count-div">
                        <span id="leave-application-count">
                          {leaveApplicationCount}
                        </span>
                      </div>
                    )}
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_leave-history"
                  >
                    Team Leave History
                  </a>
                </li>

                {CurrentUserCanViewDepartmentLeaves ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab_department_leave-history"
                    >
                      Department Leave History{" "}
                      {user?.office?.office_type === "department" ? (
                        <span className="department_leave_history_span">
                          | {currentUserOffice}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="row tab-content">
          <div id="tab_leaves" className="col-12 tab-pane show active">
            <LeavesTable columns={userColumns} data={allLeaves} />
          </div>

          <div id="tab_subordinates-leaves" className="col-12 tab-pane">
            <UniversalTable
              columns={reporteeColumns}
              data={allReporteesLeaves}
              setData={setAllReporteesLeaves}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div id="tab_leave-history" className="col-12 tab-pane">
            <UniversalTable
              columns={historyColumns}
              data={leaveHistory}
              setData={setLeaveHistory}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div id="tab_department_leave-history" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={historyColumns}
              data={departmentLeaveHistory}
              setData={setDepartmentLeaveHistory}
              loading={loading}
              setLoading={setLoading}
              page={deptPage}
              setPage={setDeptPage}
              sizePerPage={deptSizePerPage}
              setSizePerPage={setDeptSizePerPage}
              totalPages={deptTotalPages}
              setTotalPages={setDeptTotalPages}
            />
          </div>
        </div>
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveApplicationContent leaveContent={viewRow} />}
        />
      ) : (
        ""
      )}

      {rejectModal && (
        <RejectLeaveModal
          rejectLeave={rejectLeave}
          closeModal={setRejectModal}
          loading={loading}
          setLoading={setLoading}
          fetchReporteesLeaves={fetchReporteesLeaves}
          fetchTeamLeaveHistory={fetchTeamLeaveHistory}
        />
      )}

      <ApplyLeaveModal fetchYourLeaves={fetchYourLeaves} />

      {modalType === "cancel" ? (
        <ConfirmModal
          title="Leave"
          selectedRow={selectedRow}
          deleteFunction={handleCancelLeaveApplication}
          modalType={modalType}
          message="Are you sure you want to cancel this leave application?"
          isLoading={isResolving}
        />
      ) : null}
    </>
  );
};

export default LeavesUser;
