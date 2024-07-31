/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import AdminLeavesTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable";
import AdminLeavesHistoryTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveHistoryTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ViewModal from "../../../components/Modal/ViewModal";
import LeaveApplicationContent from "../../../components/ModalContents/LeaveApplicationContent";
import RejectAdminLeaveModal from "../../../components/Modal/RejectAdminLeaveModal";
import CancelAdminLeaveModal from "../../../components/Modal/CancelAdminLeaveModal";
import EditAdminLeaveModal from "../../../components/Modal/EditAdminLeaveModal";
import moment from "moment";
import { CreateLeaveModal } from "../../../components/Modal/CreateLeaveModal";

const LeavesAdmin = () => {
  const {
    showAlert,
    fetchHRLeavesNotificationCount,
    user,
    ErrorHandler,
    getAvatarColor,
  } = useAppContext();
  const [allLeaves, setallLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [onLeave, setOnLeave] = useState(0);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [hrReject, setHrReject] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [hrCancel, setHrCancel] = useState([]);
  const [hrEdit, setHrEdit] = useState([]);

  const [historyStatus, setHistoryStatus] = useState("approved");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [historyPage, setHistoryPage] = useState(1);
  const [historySizePerPage, setHistorySizePerPage] = useState(10);
  const [historyTotalPages, setHistoryTotalPages] = useState("");
  const [historySearchTerm, setHistorySearchTerm] = useState("");

  const time = new Date().toDateString();
  const today_date = moment(time).utc().format("yyyy-MM-DD");

  const isHr = user?.office?.title.toLowerCase() === "hr" ? true : false;

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "senior_hr_associate", "hr_leave_approver"];

  const CurrentUserCanCreateAndActOnLeave = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

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

  // All Leaves at HR stage - Pending
  const fetchHRLeaves = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_dashboard/leaves.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: page,
            limit: sizePerPage,
            name: searchTerm.length ? searchTerm : null,
          },
        }
      );
      const resData = response?.data?.data?.leaves;
      const totalPages = response?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((leave) => ({
        ...leave,
        ...leave?.leave,
        office: leave?.office?.toUpperCase(),
        full_name:
          leave?.first_name.toUpperCase() +
          " " +
          leave?.last_name.toUpperCase(),
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
        date_applied: moment(leave?.leave?.created_at)
          .utc()
          .format("Do MMM, YYYY"),
      }));

      setallLeaves(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Pending Leaves Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, sizePerPage]);

  useEffect(() => {
    isHr && fetchHRLeaves();
  }, [fetchHRLeaves, isHr]);

  // All Leaves at HR stage - History (Approved, Rejected, & Cancelled)
  const fetchHRLeaveHistory = useCallback(async () => {
    setLoadingHistory(true);

    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/leaves.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: historyPage,
            limit: historySizePerPage,
            name: historySearchTerm.length ? historySearchTerm : null,
            status: historyStatus,
          },
        }
      );

      const resData = response?.data?.data?.leaves;
      const totalHistoryPages = response?.data?.data?.total_pages;

      const thisPageLimit = historySizePerPage;
      const thisTotalPageSize = totalHistoryPages;

      setHistorySizePerPage(thisPageLimit);
      setHistoryTotalPages(thisTotalPageSize);

      const formatted = resData.map((leave) => ({
        ...leave,
        full_name:
          leave?.first_name.toUpperCase() +
          " " +
          leave?.last_name.toUpperCase(),
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
        office: leave?.office?.toUpperCase(),
        date_applied: moment(leave?.leave?.created_at)
          .utc()
          .format("Do MMM, YYYY"),
        ["date_" + historyStatus]: moment(leave?.leave?.updated_at)
          .utc()
          .format("YYYY, MM (MMM), Do - h:mma"),
        reason: leave?.leave?.reason,
        rejection_reason: leave?.leave?.rejection_reason,
        reason_for_cancellation: leave?.leave?.reason_for_cancellation,
        reasons_for_update: leave?.leave?.reasons_for_update,
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
      setLoadingHistory(false);
    } catch (error) {
      const component = "Leave History Error | ";
      ErrorHandler(error, component);
      setLoadingHistory(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    historyPage,
    historySizePerPage,
    historyStatus,
    historySearchTerm,
    today_date,
  ]);

  useEffect(() => {
    isHr && fetchHRLeaveHistory();
  }, [fetchHRLeaveHistory, isHr]);

  // All Active Leave Count:
  const fetchAllEmpOnLeave = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/active_leaves.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.active_leaves;
      setOnLeave(resData);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
        `/api/v1/hr_approve_leave/${id}.json`
      );
      showAlert(
        true,
        `Success! ${fullName} Leave Request has been Approved.`,
        "alert alert-success"
      );

      fetchHRLeaves();
      fetchAllEmpOnLeave();
      fetchHRLeaveHistory();
      fetchHRLeavesNotificationCount();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  // Handle Reject Leave:
  const handleRejectLeave = (row) => {
    setHrReject(row);
    setRejectModal(true);
  };

  // Handle Edit Leave:
  const handleEditLeave = (row) => {
    setHrEdit(row);
  };

  // Handle Cancel Leave:
  const handleCancelLeave = (row) => {
    setHrCancel(row);
    setCancelModal(true);
  };

  // Handle Viewing Approved Leaves:
  const handleViewingApproved = () => {
    setHistoryStatus("approved");
    setHistoryPage(1);
  };

  // Handle Viewing Rejected Leaves:
  const handleViewingRejected = () => {
    setHistoryStatus("rejected");
    setHistoryPage(1);
  };

  // Handle Viewing Cancelled Leaves:
  const handleViewingCancelled = () => {
    setHistoryStatus("cancelled");
    setHistoryPage(1);
  };

  const pendingColumns = [
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
            {row?.full_name} <span>{row?.ogid}</span>
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
      formatter: (val, row) => <span>{val}</span>,
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
      headerStyle: { width: "100%" },
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
                setmodalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {row.status === "pending" && CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditLeaveModal"
                onClick={() => handleEditLeave(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Update
              </a>
            ) : null}

            {row.status === "pending" && CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {row.status === "pending" && CurrentUserCanCreateAndActOnLeave ? (
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
            {row?.full_name} <span>{row?.ogid}</span>
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
      dataField: ["date_" + historyStatus],
      text: `Date ${
        historyStatus.charAt(0).toUpperCase() + historyStatus.slice(1)
      }`,
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val}</span>,
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
          {historyStatus === "approved" ? (
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
      headerStyle: { width: "100%" },
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
                setmodalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {row.status === "approved" &&
            row?.leave_marker !== "Leave Ended" &&
            CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditLeaveModal"
                onClick={() => handleEditLeave(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Update
              </a>
            ) : null}

            {row.status === "pending" && CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {row.status === "pending" && CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRejectLeave(row)}
              >
                <i className="fa fa-ban m-r-5"></i> Reject
              </a>
            ) : null}

            {row.status === "approved" &&
            row?.leave_marker !== "Leave Ended" &&
            CurrentUserCanCreateAndActOnLeave ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleCancelLeave(row)}
              >
                <i className="fa fa-remove m-r-5"></i> Cancel
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leave Applications</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leave</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndActOnLeave && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#CreateLeaveModal"
              >
                Create Leave
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_hr-leave-application"
                >
                  Leave Applications
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_hr-leave-history"
                  onClick={handleViewingApproved}
                >
                  Approved Leaves
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_hr-leave-history"
                  onClick={handleViewingRejected}
                >
                  Rejected Leaves
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_hr-leave-history"
                  onClick={handleViewingCancelled}
                >
                  Cancelled Leaves
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row tab-content">
        <div
          id="tab_hr-leave-application"
          className="col-12 tab-pane show active"
        >
          {/* <div className="Hr-cards">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Employees On Leave</h6>
                <h4>{onLeave}</h4>
              </div>
            </div>
          </div> */}

          <AdminLeavesTable
            data={allLeaves}
            columns={pendingColumns}
            setData={setallLeaves}
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
          />
        </div>

        <div id="tab_hr-leave-history" className="col-12 tab-pane">
          <AdminLeavesTable
            columns={historyColumns}
            data={leaveHistory}
            setData={setLeaveHistory}
            loading={loadingHistory}
            setLoading={setLoadingHistory}
            page={historyPage}
            setPage={setHistoryPage}
            sizePerPage={historySizePerPage}
            setSizePerPage={setHistorySizePerPage}
            totalPages={historyTotalPages}
            setTotalPages={setHistoryTotalPages}
            searchTerm={historySearchTerm}
            setSearchTerm={setHistorySearchTerm}
          />
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

      <CreateLeaveModal
        fetchHRLeaves={fetchHRLeaves}
        fetchHRLeaveHistory={fetchHRLeaveHistory}
        fetchAllEmpOnLeave={fetchAllEmpOnLeave}
      />

      {rejectModal && (
        <RejectAdminLeaveModal
          hrReject={hrReject}
          closeModal={setRejectModal}
          fetchAllLeaves={fetchHRLeaves}
          fetchHRLeaveHistory={fetchHRLeaveHistory}
        />
      )}

      {cancelModal && (
        <CancelAdminLeaveModal
          hrCancel={hrCancel}
          closeModal={setCancelModal}
          fetchAllLeaves={fetchHRLeaves}
          fetchHRLeaveHistory={fetchHRLeaveHistory}
        />
      )}

      <EditAdminLeaveModal
        hrEdit={hrEdit}
        fetchAllLeaves={fetchHRLeaves}
        fetchHRLeaveHistory={fetchHRLeaveHistory}
      />
    </>
  );
};

export default LeavesAdmin;
