/* eslint-disable no-unused-vars */
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import ReporteeLeavesTable from "../../../components/Tables/EmployeeTables/Leaves/ReporteeLeaveTable";
import LeadLeaveHistoryTable from "../../../components/Tables/EmployeeTables/Leaves/LeadLeaveHistoryTable";
import axiosInstance from "../../../services/api";
import ViewModal from "../../../components/Modal/ViewModal";
import { ApplyLeaveModal } from "../../../components/Modal/ApplyLeaveModal";
import { EditLeaveModal } from "../../../components/Modal/EditLeaveModal";
import { useAppContext } from "../../../Context/AppContext";
import LeaveApplicationContent from "../../../components/ModalContents/LeaveApplicationContent";
import RejectLeaveModal from "../../../components/Modal/RejectLeaveModal";
import RequestEditModal from "../../../components/Modal/RequestEditModal";
import AppealRejectionModal from "../../../components/Modal/AppealRejectionModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import UniversalTable from "../../../components/Tables/UniversalTable";
import moment from "moment";

const LeavesUser = () => {
  const { showAlert, fetchHRLeavesNotificationCount, user, ErrorHandler, goToTop } =
    useAppContext();
  const [leaveApplicationCount, setLeaveApplicationCount] = useState(0);
  const [appealedLeaveApplicationCount, setAppealedLeaveApplicationCount] =
    useState(0);
  const [modalType, setModalType] = useState("");
  const [viewRow, setViewRow] = useState(null);

  const [allLeaves, setallLeaves] = useState([]);
  const [allReporteesLeaves, setAllReporteesLeaves] = useState([]);
  const [allReporteesAppealedLeaves, setAllReporteesAppealedLeaves] = useState(
    []
  );
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [rejectModal, setRejectModal] = useState(false);
  const [requestEditModal, setRequestEditModal] = useState(false);
  const [appealRejectionModal, setAppealRejectionModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editLeave, setEditLeave] = useState([]);
  const [rejectLeave, setRejectLeave] = useState([]);
  const [requestEdit, setRequestEdit] = useState([]);
  const [appealRejection, setAppealRejection] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const currentUserIsLead = user?.employee_info?.is_lead;

  // Calculates Leave Days for Business Days
  function calcBusinessDays(startDate, endDate) {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, "day")) {
      if (day.day() !== 0 && day.day() !== 5) businessDays++;
      day.add(1, "d");
    }
    return businessDays;
  }

  const fetchYourLeaves = async () => {
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
        from_date: new Date(leave?.leave?.start_date).toDateString(),
        to_date: new Date(leave?.leave?.end_date).toDateString(),
        requested_leave_days: calcBusinessDays(
          leave?.leave?.start_date,
          leave?.leave?.end_date
        ),
        date_applied: moment(leave?.leave?.created_at).format("Do MMMM, YYYY"),
      }));

      setallLeaves(formatted);
    } catch (error) {
      const component = "Leaves Error:";
      ErrorHandler(error, component);
    }
    setLoading(false);
  };

  const fetchReporteesLeaves = async () => {
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
        full_name: leave.first_name + " " + leave.last_name,
        status_action: leave?.status,
        leave_type: leave?.leave_type,
        from_date: new Date(leave?.start_date).toDateString(),
        to_date: new Date(leave?.end_date).toDateString(),
        requested_leave_days: calcBusinessDays(
          leave?.start_date,
          leave?.end_date
        ),
        date_applied: moment(leave?.leave?.created_at).format("Do MMMM, YYYY"),
      }));

      const reporteeLeaves = resData.length;
      setAllReporteesLeaves(formatted);
      setLeaveApplicationCount(reporteeLeaves);
    } catch (error) {
      console.log(error?.response);
      const component = "Leave History Error:";
      ErrorHandler(error, component);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchYourLeaves();
    if (currentUserIsLead) {
      fetchReporteesLeaves();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApproveLeave = async (row) => {
    const id = row.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/approve_subordinate_leave/${id}.json`
      );
      showAlert(true, "Leave Approved", "alert alert-success");
      fetchReporteesLeaves();
      // fetchHRLeavesNotificationCount();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
  };

  const handleRejectLeave = (row) => {
    setRejectLeave(row);
    setRejectModal(true);
  };

  const handleCancelLeaveApplication = async (row) => {
    try {
      const response = await axiosInstance.patch(`/api/v1/leaves/${selectedRow.id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          status: "cancelled",
        },
      });
      showAlert(true, "Leave Cancelled", "alert alert-info");
      fetchYourLeaves();
      goToTop();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      goToTop();
    }
  };

  // const handleRequestModification = (row) => {
  //   setRequestEdit(row);
  //   setRequestEditModal(true);
  // };

  // const handleAppealRejection = (e, row) => {
  //   e.preventDefault();
  //   setAppealRejection(row);
  //   setAppealRejectionModal(true);
  // };

  // const handleEditApplication = (row) => {
  //   const formatted = {};
  //   formatted._id = row._id;
  //   formatted.from_date = row.from_date;
  //   formatted.to_date = row.to_date;
  //   formatted.leave_type_id = row.leave_type_id._id;
  //   formatted.reason_for_application = row.reason_for_application;
  //   setEditLeave(formatted);
  // };

  const userColumns = [
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <p>{val}</p>,
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
                <i className="fa fa-remove m-r-5"></i> Cancel Application
              </a>
            ) : null}

            {/* {row.status === "pending" && row.acted_on === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditModal"
                onClick={() => handleEditApplication(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Edit
              </a>
            ) : null} */}

            {/* {row.status === "rejected" && row.hr_stage === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#AppealModal"
                onClick={(e) => handleAppealRejection(e, row)}
              >
                <i className="fa fa-edit m-r-5"></i> Appeal Rejection
              </a>
            ) : null} */}
          </div>
        </div>
      ),
    },
  ];

  const reporteeColumns = [
    {
      dataField: "full_name",
      text: "Full Name",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
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

            {/* {value === "pending" ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRequestModification(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Request modification
              </a>
            ) : null} */}
          </div>
        </div>
      ),
    },
  ];

  // const reporteeHistoryColumns = [
  //   {
  //     dataField: "full_name",
  //     text: "Full Name",
  //     sort: true,
  //     headerStyle: { width: "150px" },
  //     formatter: (value, row) => <h2>{row?.full_name}</h2>,
  //   },
  //   {
  //     dataField: "department",
  //     text: "Department",
  //     sort: true,
  //     headerStyle: { width: "100px" },
  //   },
  //   {
  //     dataField: "leave_type",
  //     text: "Leave Type",
  //     sort: true,
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  //   {
  //     dataField: "from_date",
  //     text: "From Date",
  //     sort: true,
  //   },
  //   {
  //     dataField: "to_date",
  //     text: "To Date",
  //     sort: true,
  //   },
  //   {
  //     dataField: "status",
  //     text: "Status",
  //     sort: true,
  //     formatter: (value, row) => (
  //       <>
  //         {value === "approved" ? (
  //           <span className="btn btn-gray btn-sm btn-rounded">
  //             <i className="fa fa-dot-circle-o text-success"></i> {value}
  //           </span>
  //         ) : value === "cancelled" ? (
  //           <span className="btn btn-gray btn-sm btn-rounded">
  //             <i className="fa fa-dot-circle-o text-primary"></i> {value}
  //           </span>
  //         ) : value === "rejected" ? (
  //           <span className="btn btn-gray btn-sm btn-rounded">
  //             <i className="fa fa-dot-circle-o text-danger"></i> {value}
  //           </span>
  //         ) : value === "pending" ? (
  //           <span className="btn btn-gray btn-sm btn-rounded ">
  //             <i className="fa fa-dot-circle-o text-warning"></i> {value}
  //           </span>
  //         ) : null}
  //       </>
  //     ),
  //   },
  //   {
  //     dataField: "requested_leave_days",
  //     text: "Requested Leave Days",
  //     sort: true,
  //     headerStyle: { width: "100px" },
  //     formatter: (value, row) => (
  //       <>
  //         {row.requested_leave_days > 1
  //           ? row.requested_leave_days + " days"
  //           : row.requested_leave_days + " day"}
  //       </>
  //     ),
  //   },
  //   {
  //     dataField: "status_action",
  //     text: "Actions",
  //     sort: true,
  //     csvExport: false,
  //     headerStyle: { minWidth: "100px", textAlign: "center" },
  //     formatter: (value, row) => (
  //       <div className="text-center">
  //         <div className="leave-reportee-action-btns">
  //           <button
  //             className="btn btn-sm btn-primary leave-btn"
  //             data-toggle="modal"
  //             data-target="#generalModal"
  //             onClick={() => {
  //               setModalType("view-details");
  //               setViewRow(row);
  //             }}
  //           >
  //             View
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  const SilentRefresh = () => {
    if (currentUserIsLead) {
      fetchReporteesLeaves();
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.employee_info?.leave_count > 0 && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
              >
                Apply For Leave
              </a>
            )}
          </div>
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
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_subordinates-leaves"
                  >
                    Leave Applications{" "}
                    {leaveApplicationCount > 0 && (
                      <span id="leave-application-count">
                        {leaveApplicationCount}
                      </span>
                    )}
                  </a>
                </li>

                {/* <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_leave-history"
                  >
                    Leave History
                  </a>
                </li> */}

                {/* <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_leave-appeals"
                  >
                    Appealed Leaves{" "}
                    {appealedLeaveApplicationCount > 0 && (
                      <span id="leave-application-count">
                        {appealedLeaveApplicationCount}
                      </span>
                    )}
                  </a>
                </li> */}
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
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div>

          {/* <div id="tab_leave-history" className="col-12 tab-pane">
            <LeadLeaveHistoryTable
              columns={reporteeHistoryColumns}
              data={leaveHistory}
              setData={setLeaveHistory}
              loading={loading}
              setLoading={setLoading}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div> */}

          {/* <div id="tab_leave-appeals" className="col-12 tab-pane">
            <ReporteeLeavesTable
              columns={reporteeColumns}
              data={allReporteesAppealedLeaves}
              setData={setAllReporteesLeaves}
              loading={loading}
              setLoading={setLoading}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div> */}
        </div>
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveApplicationContent leaveContent={viewRow} />}
          handleRefresh={SilentRefresh}
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
        />
      )}

      {requestEditModal && (
        <RequestEditModal
          requestEdit={requestEdit}
          closeModal={setRequestEditModal}
          loading={loading}
          setLoading={setLoading}
          fetchReporteesLeaves={fetchReporteesLeaves}
        />
      )}

      {appealRejectionModal && (
        <AppealRejectionModal
          appealRejection={appealRejection}
          closeModal={setAppealRejectionModal}
          loading={loading}
          setLoading={setLoading}
          fetchYourLeaves={fetchYourLeaves}
          fetchReporteesLeaves={fetchReporteesLeaves}
        />
      )}

      <ApplyLeaveModal fetchYourLeaves={fetchYourLeaves} />
      <EditLeaveModal editLeave={editLeave} fetchYourLeaves={fetchYourLeaves} />

      {modalType === "cancel" ? (
        <ConfirmModal
          title="Leave"
          selectedRow={selectedRow}
          deleteFunction={handleCancelLeaveApplication}
          modalType={modalType}
          message="Are you sure you want to cancel this leave application?"
        />
      ) : null}
    </>
  );
};

export default LeavesUser;
