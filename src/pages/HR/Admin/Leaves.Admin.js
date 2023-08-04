/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import AdminLeavesTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable";
import AdminLeavesHistoryTable from "../../../components/Tables/EmployeeTables/Leaves/AdminLeaveHistoryTable";
import male from "../../../assets/img/male_avater.png";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
// import tokenService from '../../../services/token.service';
import ViewModal from "../../../components/Modal/ViewModal";
import LeaveApplicationContent from "../../../components/ModalContents/LeaveApplicationContent";
import RejectAdminLeaveModal from "../../../components/Modal/RejectAdminLeaveModal";
import moment from "moment";

const LeavesAdmin = () => {
  // const user = tokenService.getUser();
  const [allLeaves, setallLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const { showAlert, fetchHRLeavesNotificationCount, user, ErrorHandler } =
    useAppContext();
  const [onLeave, setOnLeave] = useState(0);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [hrReject, setHrReject] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [historyPage, setHistoryPage] = useState(1);
  const [historySizePerPage, setHistorySizePerPage] = useState(10);
  const [totalHistoryPages, setTotalHistoryPages] = useState("");

  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [officeFilter, setOfficeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
  const fetchHRLeaves = async () => {
    setLoading(true);
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
            page: page,
            limit: sizePerPage,
            search: searchTerm,
            // operation_office_id: officeFilter,
            // hr_designation_id: designationFilter,
          },
        }
      );

      const resData = response?.data?.data?.leaves;
      const totalPages = response?.data?.data?.total_pages;

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
        date_applied: moment(leave?.leave?.created_at).format("Do MMMM, YYYY"),
      }));

      setallLeaves(formatted);

      setLoading(false);
    } catch (error) {
      const component = "Pending Leaves Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  // All Leaves at HR stage - History
  const fetchHRLeaveHistory = async () => {
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
            page: historyPage,
            limit: historySizePerPage,
            status: "approved" || "rejected",
          },
        }
      );

      const resData = response?.data?.data?.leaves;
      const totalHistoryPages = response?.data?.data?.total_pages;

      const thisPageLimit = historySizePerPage;
      const thisTotalPageSize = totalHistoryPages;

      setHistorySizePerPage(thisPageLimit);
      setTotalHistoryPages(thisTotalPageSize);

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
      }));

      setLeaveHistory(formatted);

      setLoading(false);
    } catch (error) {
      const component = "Leave History Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

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

  // All Offices:
  const fetchAllOffices = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      const formattedCampaigns = allCampaigns
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setDepartments(formattedDepartments);
      setCampaigns(formattedCampaigns);
    } catch (error) {
      console.log("All Offices error:", error);
    }
  };

  // All Leave Types:
  const fetchLeavesType = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/leave_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.types;

      const formatted = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setLeaveTypes(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isHr) {
      fetchHRLeaves();
      fetchHRLeaveHistory();
      fetchAllEmpOnLeave();
      fetchAllOffices();
      fetchLeavesType();
    } else {
      fetchLeavesType();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const columns = [
    {
      dataField: "full_name",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "20%" },
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
      headerStyle: { width: "20%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "12%" },
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
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
    },
    {
      dataField: "from_date",
      text: "From",
      sort: true,
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
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
                >
                  Leave History
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
            columns={columns}
            data={allLeaves}
            setData={setallLeaves}
            loading={loading}
            setLoading={setLoading}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            campaignFilter={campaignFilter}
            setCampaignFilter={setCampaignFilter}
            leaveTypeFilter={leaveTypeFilter}
            setLeaveTypeFilter={setLeaveTypeFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departments={departments}
            campaigns={campaigns}
            leaveTypes={leaveTypes}
          />
        </div>

        <div id="tab_hr-leave-history" className="col-12 tab-pane">
          <AdminLeavesHistoryTable
            columns={columns}
            data={leaveHistory}
            setData={setLeaveHistory}
            loading={loading}
            setLoading={setLoading}
            page={historyPage}
            setPage={setHistoryPage}
            sizePerPage={historySizePerPage}
            setSizePerPage={setHistorySizePerPage}
            totalPages={totalHistoryPages}
            setTotalPages={setTotalHistoryPages}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            leaveTypeFilter={leaveTypeFilter}
            setLeaveTypeFilter={setLeaveTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departments={departments}
            leaveTypes={leaveTypes}
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
