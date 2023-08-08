/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import AdminLeavesTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable";
import AdminLeavesHistoryTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveHistoryTable";
import male from "../../../assets/img/male_avater.png";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ViewModal from "../../../components/Modal/ViewModal";
import LeaveApplicationContent from "../../../components/ModalContents/LeaveApplicationContent";
import RejectAdminLeaveModal from "../../../components/Modal/RejectAdminLeaveModal";
import moment from "moment";

const LeavesAdmin = () => {
  const [allLeaves, setallLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const { showAlert, fetchHRLeavesNotificationCount, user, ErrorHandler } =
    useAppContext();
  const [onLeave, setOnLeave] = useState(0);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [hrReject, setHrReject] = useState([]);
  const [historyStatus, setHistoryStatus] = useState("approved");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [historyPage, setHistoryPage] = useState(1);
  const [historySizePerPage, setHistorySizePerPage] = useState(10);
  const [historyTotalPages, setHistoryTotalPages] = useState("");

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");

  const isHr = user?.office?.title === "hr" ? true : false;

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
        full_name: leave?.first_name + " " + leave?.last_name,
        from_date: new Date(leave?.leave?.start_date).toDateString(),
        to_date: new Date(leave?.leave?.end_date).toDateString(),
        total_leave_days: calcBusinessDays(
          leave?.leave?.start_date,
          leave?.leave?.end_date
        ),
        date_applied: moment(leave?.leave?.created_at).format("Do MMMM, YYYY"),
      }));

      setallLeaves(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Pending Leaves Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  // All Leaves at HR stage - History
  const fetchHRLeaveHistory = useCallback(async () => {
    try {
      setLoadingHistory(true);
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
        full_name: leave?.first_name + " " + leave?.last_name,
        from_date: new Date(leave?.leave?.start_date).toDateString(),
        to_date: new Date(leave?.leave?.end_date).toDateString(),
        total_leave_days: calcBusinessDays(
          leave?.leave?.start_date,
          leave?.leave?.end_date
        ),
        date_applied: moment(leave?.leave?.created_at).format("Do MMMM, YYYY"),
        leave_marker:
          leave?.leave?.end_date < today_date
            ? "Leave Ended"
            : today_date < leave?.leave?.start_date &&
              today_date < leave?.leave?.end_date
            ? "Scheduled Leave"
            : "On Leave",
      }));

      setLeaveHistory(formatted);
      setLoadingHistory(false);
    } catch (error) {
      const component = "Leave History Error:";
      ErrorHandler(error, component);
      setLoadingHistory(false);
    }
  }, [historyPage, historySizePerPage, historyStatus, today_date]);

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
      const component = "Leave Count Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHr) {
      fetchHRLeaves();
      fetchHRLeaveHistory();
      fetchAllEmpOnLeave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHRLeaveHistory, fetchHRLeaves, isHr]);

  const handleApproveLeave = async (row) => {
    const id = row.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/hr_approve_leave/${id}.json`
      );
      showAlert(true, "Leave Approved", "alert alert-success");
      fetchHRLeaves();
      fetchAllEmpOnLeave();
      fetchHRLeaveHistory();
      fetchHRLeavesNotificationCount();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  const handleRejectLeave = (row) => {
    setHrReject(row);
    setRejectModal(true);
  };

  const pendingColumns = [
    {
      dataField: "full_name",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="#" className="avatar">
            <img alt="" src={male} />
          </a>
          <a href="#">
            {row?.full_name} <span>{row?.ogid}</span>
          </a>
        </h2>
      ),
    },
    {
      dataField: "office",
      text: "Office",
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
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "from_date",
      text: "From",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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

            {row.status === "pending" ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {row.status === "pending" ? (
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
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="#" className="avatar">
            <img alt="" src={male} />
          </a>
          <a href="#">
            {row?.full_name} <span>{row?.ogid}</span>
          </a>
        </h2>
      ),
    },
    {
      dataField: "office",
      text: "Office",
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
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
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
                  <i className="fa fa-dot-circle-o text-secondary"></i> {value}
                </span>
              ) : null}
            </>
          ) : (
            <>
              <span className="btn btn-gray btn-sm btn-rounded">
                <i className="fa fa-dot-circle-o text-danger"></i> Not Approved
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
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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

            {row.status === "pending" ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {row.status === "pending" ? (
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

  return (
    <>
      {rejectModal && (
        <RejectAdminLeaveModal
          hrReject={hrReject}
          closeModal={setRejectModal}
          fetchAllLeaves={fetchHRLeaves}
          fetchHRLeaveHistory={fetchHRLeaveHistory}
        />
      )}

      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leave Applications</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
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
                  onClick={() => setHistoryStatus("approved")}
                >
                  Approved Leave History
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_hr-leave-history"
                  onClick={() => setHistoryStatus("rejected")}
                >
                  Rejected Leave History
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
          <div className="Hr-cards">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Employees On Leave</h6>
                <h4>{onLeave}</h4>
              </div>
            </div>
          </div>

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
          />
        </div>

        <div id="tab_hr-leave-history" className="col-12 tab-pane">
          <AdminLeavesHistoryTable
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
          />
        </div>
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveApplicationContent leaveContent={viewRow} />}
          handleRefresh={fetchHRLeaves}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default LeavesAdmin;
