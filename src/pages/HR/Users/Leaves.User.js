/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import ReporteeLeavesTable from '../../../components/Tables/EmployeeTables/Leaves/ReporteeLeaveTable';
import LeadLeaveHistoryTable from '../../../components/Tables/EmployeeTables/Leaves/LeadLeaveHistoryTable';
import tokenService from '../../../services/token.service';
import axiosInstance from '../../../services/api';
import ViewModal from '../../../components/Modal/ViewModal';
import { ApplyLeaveModal } from '../../../components/Modal/ApplyLeaveModal';
import { EditLeaveModal } from '../../../components/Modal/EditLeaveModal';
import { useAppContext } from '../../../Context/AppContext';
import LeaveApplicationContent from '../../../components/ModalContents/LeaveApplicationContent';
import RejectLeaveModal from '../../../components/Modal/RejectLeaveModal';
import RequestEditModal from '../../../components/Modal/RequestEditModal';
import AppealRejectionModal from '../../../components/Modal/AppealRejectionModal';
import {
  FcApproval,
  FcRight,
  FcClock,
  FcBusinessman,
  FcBusinesswoman,
  FcCancel,
} from 'react-icons/fc';
import moment from 'moment';

const LeavesUser = () => {
  const { showAlert, fetchHRLeavesNotificationCount } = useAppContext();
  const [userId, setuserId] = useState('');
  const [leaveApplicationCount, setLeaveApplicationCount] = useState(0);
  const [appealedLeaveApplicationCount, setAppealedLeaveApplicationCount] =
    useState(0);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [user, setuser] = useState([]);
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

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userStatus, setUserStatus] = useState('');

  const [departments, setDepartments] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [leaveApprover, setLeaveApprover] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);

  const currentUser = tokenService.getUser();

  // Calculates Leave Days for Business Days
  function calcBusinessDays(startDate, endDate) {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, 'day')) {
      if (day.day() !== 0 && day.day() !== 6) businessDays++;
      day.add(1, 'd');
    }
    return businessDays;
  }

  const fetchLeaveApplicationProgress = async () => {
    try {
      const response = await axiosInstance.get(
        '/leave-application/leave-application-progress'
      );
      const resData = response?.data?.data;
      // console.log('Approver response:', response);
      // console.log('Approver:', resData);

      const approver = Object.keys(resData);
      const status = Object.values(resData);

      setLeaveApprover(approver);
      setLeaveStatus(status);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchYourLeaves = async () => {
    const id = currentUser._id;
    try {
      const response = await axiosInstance.get(`/leave-application`, {
        params: {
          employee_id: id,
        },
      });
      const leaves = response?.data?.data;

      const formatter = leaves.map((leave) => ({
        ...leave,
        status_action: leave?.status,
        leave_type: leave?.leave_type_id?.leave_type,
        from_date: new Date(leave?.from_date).toDateString(),
        to_date: new Date(leave?.to_date).toDateString(),
        requested_leave_days: calcBusinessDays(leave.from_date, leave.to_date),
      }));

      const status = leaves[0].status;
      setUserStatus(status);

      setallLeaves(formatter);
      console.log('Show my leaves:', formatter);
      fetchLeaveApplicationProgress();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchReporteesLeaves = useCallback(() => {
    axiosInstance
      .get(`leads-leave-applications`, {
        params: {
          department: departmentFilter,
          leave_type: leaveTypeFilter,
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
            ' ' +
            leave?.employee.middle_name +
            ' ' +
            leave?.employee.last_name,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          from_date: new Date(leave?.from_date).toDateString(),
          to_date: new Date(leave?.to_date).toDateString(),
          department: leave?.department_id?.department,
          requested_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave?.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setAllReporteesLeaves(formatted);
        setLeaveApplicationCount(formatted.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log('reportee error:', error);
        setLoading(false);
      });
  }, [departmentFilter, leaveTypeFilter, page, searchTerm, sizePerPage]);

  const fetchLeaveHistory = useCallback(() => {
    axiosInstance
      .get(`/leads-leave-applications/history`, {
        params: {
          department: departmentFilter,
          leave_type: leaveTypeFilter,
          status: statusFilter,
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
            ' ' +
            leave?.employee.middle_name +
            ' ' +
            leave?.employee.last_name,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          from_date: new Date(leave?.from_date).toDateString(),
          to_date: new Date(leave?.to_date).toDateString(),
          department: leave?.department_id?.department,
          requested_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave?.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setLeaveHistory(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log('reportee error:', error);
        setLoading(false);
      });
  }, [
    departmentFilter,
    leaveTypeFilter,
    page,
    searchTerm,
    sizePerPage,
    statusFilter,
  ]);

  const fetchReporteesAppealedLeaves = useCallback(() => {
    axiosInstance
      .get(`/leads-leave-applications/appealed-leaves`, {
        params: {
          department: departmentFilter,
          leave_type: leaveTypeFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.application;
        // console.log('Leave Appealed Leaves - isAppealed:', resData);
        let resOptions = res?.data?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formatted = resData.map((leave) => ({
          ...leave,
          full_name:
            leave?.employee.first_name +
            ' ' +
            leave?.employee.middle_name +
            ' ' +
            leave?.employee.last_name,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          from_date: new Date(leave?.from_date).toDateString(),
          to_date: new Date(leave?.to_date).toDateString(),
          department: leave?.department_id?.department,
          requested_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave?.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setAllReporteesAppealedLeaves(formatted);
        setAppealedLeaveApplicationCount(formatted.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log('reportee error:', error);
        setLoading(false);
      });
  }, [departmentFilter, leaveTypeFilter, page, searchTerm, sizePerPage]);

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        department: e.department,
      }));

      setDepartments(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLeavesType = async () => {
    try {
      const response = await axiosInstance.get(`/leave-type`);
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        leave_type: e.leave_type,
      }));

      setLeaveTypes(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReporteesLeaves();
    fetchReporteesAppealedLeaves();
    fetchLeaveHistory();
    fetchLeaveApplicationProgress();
    fetchDepartment();
    fetchLeavesType();

    let user = tokenService.getUser();
    setuser(user);
    setuserId(user._id);
    if (userId) {
      fetchYourLeaves();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchLeaveHistory,
    fetchReporteesAppealedLeaves,
    fetchReporteesLeaves,
    userId,
  ]);

  const handleApproveLeave = async (row) => {
    const id = row._id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(`leads-leave-approval/${id}`);
      showAlert(true, 'Leave Approved', 'alert alert-success');
      fetchReporteesLeaves();
      fetchReporteesAppealedLeaves();
      fetchLeaveHistory();
      fetchHRLeavesNotificationCount();
    } catch (error) {
      console.log('Leave approval error:', error.response);
    }
  };

  const handleRejectLeave = (row) => {
    setRejectLeave(row);
    setRejectModal(true);
  };

  const handleRequestModification = (row) => {
    setRequestEdit(row);
    setRequestEditModal(true);
  };

  const handleAppealRejection = (e, row) => {
    e.preventDefault();
    setAppealRejection(row);
    setAppealRejectionModal(true);
  };

  const handleEditApplication = (row) => {
    const formatted = {};
    formatted._id = row._id;
    formatted.from_date = row.from_date;
    formatted.to_date = row.to_date;
    formatted.leave_type_id = row.leave_type_id._id;
    formatted.reason_for_application = row.reason_for_application;
    setEditLeave(formatted);
  };

  const userColumns = [
    {
      dataField: 'leave_type',
      text: 'Leave Type',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'from_date',
      text: 'From Date',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (value, row) => (
        <>
          {value === 'approved' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === 'cancelled' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : value === 'rejected' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === 'pending' ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: 'requested_leave_days',
      text: 'Requested Leave Days',
      sort: true,
      headerStyle: { width: '100px' },
      formatter: (value, row) => (
        <>
          {row.requested_leave_days > 1
            ? row.requested_leave_days + ' days'
            : row.requested_leave_days + ' day'}
        </>
      ),
    },
    // {
    //   dataField: '',
    //   text: 'Actions',
    //   sort: true,
    //   csvExport: false,
    //   headerStyle: { minWidth: '70px', textAlign: 'center' },
    //   formatter: (value, row) => (
    //     <div className="text-center">
    //       <div className="leave-user-action-btns">
    //         <button
    //           className="btn btn-sm btn-primary"
    //           data-toggle="modal"
    //           data-target="#FormModal"
    //         >
    //           Edit
    //         </button>
    //         <button
    //           className="btn btn-sm btn-primary"
    //           data-toggle="modal"
    //           data-target="#generalModal"
    //           onClick={() => {
    //             setmodalType('view-details');
    //             setViewRow(row);
    //           }}
    //         >
    //           View
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      dataField: 'status_action',
      text: 'Action',
      csvExport: false,
      headerStyle: { width: '10%' },
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
                setmodalType('view-details');
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {row.status === 'pending' && row.acted_on === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditModal"
                onClick={() => handleEditApplication(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Edit
              </a>
            ) : null}

            {row.status === 'rejected' && row.hr_stage === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#AppealModal"
                onClick={(e) => handleAppealRejection(e, row)}
              >
                <i className="fa fa-edit m-r-5"></i> Appeal Rejection
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  const reporteeColumns = [
    {
      dataField: 'full_name',
      text: 'Full Name',
      sort: true,
      headerStyle: { width: '150px' },
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { width: '100px' },
    },
    {
      dataField: 'leave_type',
      text: 'Leave Type',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'from_date',
      text: 'From Date',
      sort: true,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (value, row) => (
        <>
          {value === 'approved' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === 'cancelled' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : value === 'rejected' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === 'pending' ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: 'requested_leave_days',
      text: 'Requested Leave Days',
      sort: true,
      headerStyle: { width: '100px' },
      formatter: (value, row) => (
        <>
          {row.requested_leave_days > 1
            ? row.requested_leave_days + ' days'
            : row.requested_leave_days + ' day'}
        </>
      ),
    },
    // {
    //   dataField: 'status',
    //   text: 'Actions',
    //   sort: true,
    //   csvExport: false,
    //   headerStyle: { minWidth: '100px', textAlign: 'center' },
    //   formatter: (value, row) => (
    //     <div className="text-center">
    //       <div className="leave-reportee-action-btns">
    //         {value === 'pending' ? (
    //           <button
    //             className="btn btn-sm btn-success leave-btn"
    //             onClick={() => handleApproveLeave()}
    //           >
    //             Approve
    //           </button>
    //         ) : (
    //           <button className="btn btn-sm btn-secondary leave-btn" disabled>
    //             Approve
    //           </button>
    //         )}
    //         {value === 'pending' ? (
    //           <button
    //             className="btn btn-sm btn-danger leave-btn"
    //             onClick={() => handleRejectLeave()}
    //           >
    //             Reject
    //           </button>
    //         ) : (
    //           <button className="btn btn-sm btn-secondary leave-btn" disabled>
    //             Reject
    //           </button>
    //         )}
    //         <button
    //           className="btn btn-sm btn-primary leave-btn"
    //           data-toggle="modal"
    //           data-target="#generalModal"
    //           onClick={() => {
    //             setmodalType('view-details');
    //             setViewRow(row);
    //           }}
    //         >
    //           View
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      dataField: 'status_action',
      text: 'Action',
      csvExport: false,
      headerStyle: { width: '10%' },
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
                setmodalType('view-details');
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {value === 'pending' ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleApproveLeave(row)}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {value === 'pending' ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRejectLeave(row)}
              >
                <i className="fa fa-ban m-r-5"></i> Reject
              </a>
            ) : null}

            {value === 'pending' ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRequestModification(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Request modification
              </a>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  const reporteeHistoryColumns = [
    {
      dataField: 'full_name',
      text: 'Full Name',
      sort: true,
      headerStyle: { width: '150px' },
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { width: '100px' },
    },
    {
      dataField: 'leave_type',
      text: 'Leave Type',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'from_date',
      text: 'From Date',
      sort: true,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (value, row) => (
        <>
          {value === 'approved' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === 'cancelled' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : value === 'rejected' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === 'pending' ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: 'requested_leave_days',
      text: 'Requested Leave Days',
      sort: true,
      headerStyle: { width: '100px' },
      formatter: (value, row) => (
        <>
          {row.requested_leave_days > 1
            ? row.requested_leave_days + ' days'
            : row.requested_leave_days + ' day'}
        </>
      ),
    },
    {
      dataField: 'status_action',
      text: 'Actions',
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: '100px', textAlign: 'center' },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-reportee-action-btns">
            <button
              className="btn btn-sm btn-primary leave-btn"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType('view-details');
                setViewRow(row);
              }}
            >
              View
            </button>
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
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.leaveCount > 0 && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
              >
                Apply Leave
              </a>
            )}
          </div>
        </div>
      </div>
      {user?.leaveApprover && (
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
                    Leaves Applications{' '}
                    {leaveApplicationCount > 0 && (
                      <span id="leave-application-count">
                        {leaveApplicationCount}
                      </span>
                    )}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_leave-history"
                  >
                    Leave History
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab_leave-appeals"
                  >
                    Appealed Leaves{' '}
                    {appealedLeaveApplicationCount > 0 && (
                      <span id="leave-application-count">
                        {appealedLeaveApplicationCount}
                      </span>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="row tab-content">
          <div id="tab_leaves" className="col-12 tab-pane show active">
            <div className="remaining-leave-row">
              <div className="remaining-leave-row-card">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{user.leaveCount}</h4>
                </div>
              </div>
              <div className="leave-application-progress">
                {/* {leaveApprover.length ? <p>Leave Application Progress</p> : null} */}
                <div>
                  {leaveApprover.length && user?.gender === 'male' ? (
                    <FcBusinessman className="approver-progress-user-icon" />
                  ) : leaveApprover.length && user?.gender === 'female' ? (
                    <FcBusinesswoman className="approver-progress-user-icon" />
                  ) : null}

                  {leaveApprover.map((item, index) => (
                    <div className="approver-progress-container" key={index}>
                      <FcRight className="approver-progress-icon" />
                      <div className="approver-progress">
                        <p className="approver-progress-name">
                          {leaveApprover[index]}
                        </p>
                        <p className="approver-progress-status">
                          {leaveStatus[index] === 'done' ? (
                            <FcApproval className="approver-status-icon" />
                          ) : leaveStatus[index] === 'rejected' ? (
                            <FcCancel className="approver-status-icon" /> 
                          ) : <FcClock className="approver-status-icon" /> }
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            <LeavesTable columns={userColumns} data={allLeaves} />
          </div>

          <div id="tab_subordinates-leaves" className="col-12 tab-pane">
            <ReporteeLeavesTable
              columns={reporteeColumns}
              data={allReporteesLeaves}
              setData={setAllReporteesLeaves}
              loading={loading}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              leaveTypeFilter={leaveTypeFilter}
              setLeaveTypeFilter={setLeaveTypeFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setLoading={setLoading}
              departments={departments}
              leaveTypes={leaveTypes}
            />
          </div>

          <div id="tab_leave-history" className="col-12 tab-pane">
            <LeadLeaveHistoryTable
              columns={reporteeHistoryColumns}
              data={leaveHistory}
              setData={setLeaveHistory}
              loading={loading}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              leaveTypeFilter={leaveTypeFilter}
              setLeaveTypeFilter={setLeaveTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setLoading={setLoading}
              departments={departments}
              leaveTypes={leaveTypes}
            />
          </div>

          <div id="tab_leave-appeals" className="col-12 tab-pane">
            <ReporteeLeavesTable
              columns={reporteeColumns}
              data={allReporteesAppealedLeaves}
              setData={setAllReporteesLeaves}
              loading={loading}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              leaveTypeFilter={leaveTypeFilter}
              setLeaveTypeFilter={setLeaveTypeFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setLoading={setLoading}
              departments={departments}
              leaveTypes={leaveTypes}
            />
          </div>
        </div>
      </div>

      {modalType === 'view-details' ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveApplicationContent leaveContent={viewRow} />}
        />
      ) : (
        ''
      )}

      {rejectModal && (
        <RejectLeaveModal
          rejectLeave={rejectLeave}
          closeModal={setRejectModal}
          loading={loading}
          setLoading={setLoading}
          fetchReporteesLeaves={fetchReporteesLeaves}
          fetchLeaveHistory={fetchLeaveHistory}
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
    </>
  );
};

export default LeavesUser;
