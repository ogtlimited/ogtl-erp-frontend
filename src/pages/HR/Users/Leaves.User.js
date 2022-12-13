/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import ReporteeLeavesTable from '../../../components/Tables/EmployeeTables/Leaves/ReporteeLeaveTable';
import tokenService from '../../../services/token.service';
import axiosInstance from '../../../services/api';
import ViewModal from '../../../components/Modal/ViewModal';
import { ApplyLeaveModal } from '../../../components/Modal/ApplyLeaveModal';
import { EditLeaveModal } from '../../../components/Modal/EditLeaveModal';
import { useAppContext } from '../../../Context/AppContext';
import LeaveApplicationContent from '../../../components/ModalContents/LeaveApplicationContent';
import RejectLeaveModal from '../../../components/Modal/RejectLeaveModal';

const LeavesUser = () => {
  const { showAlert } = useAppContext();
  const [userId, setuserId] = useState('');
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [user, setuser] = useState(null);
  const [usedLeaves, setUsedLeaves] = useState(0);
  const [allLeaves, setallLeaves] = useState([]);
  const [allReporteesLeaves, setAllReporteesLeaves] = useState([]);
  const [remainingLeaves, setRemainingLeaves] = useState(0);
  const [rejectModal, setRejectModal] = useState(false);
  const [isLead, setIsLead] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editLeave, setEditLeave] = useState([]);
  const [otherLeaves, setOtherLeaves] = useState(0);
  const [rejectLeave, setRejectLeave] = useState([]);
  const [medicalLeave, setMedicalLeave] = useState(0);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = tokenService.getUser();

  const checkUserLevel = async () => {
    try {
      const response = await axiosInstance.get('is-user-a-lead');
      const data = response.data.data;
      setIsLead(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYourLeaves = async () => {
    const id = currentUser._id;
    try {
      const response = await axiosInstance.get(`leave-application/${id}`);
      const leaves = response?.data?.data;

      const formatter = leaves.map((leave) => ({
        ...leave,
        from_date: new Date(leave.from_date).toDateString(),
        to_date: new Date(leave.to_date).toDateString(),
        requested_leave_days: Math.ceil(
          (new Date(leave.to_date) - new Date(leave.from_date)) /
            (1000 * 3600 * 24)
        ),
      }));

      // const medic = leaves.filter((e) => e.leave_type === 'Sick').length;

      // setMedicalLeave(medic);
      setallLeaves(formatter);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const fetchReporteesLeaves = async () => {
  //   try {
  //     const response = await axiosInstance.get(`leads-leave-applications`);
  //     const leaves = response?.data?.data?.application;
  //     console.log("Reportees's leave", response?.data)

  //     const formatter = leaves.map((leave) => ({
  //       ...leave,
  //       full_name:
  //         leave?.employee.first_name +
  //         ' ' +
  //         leave?.employee.middle_name +
  //         ' ' +
  //         leave?.employee.last_name,
  //       reportee_department: leave?.department?.department,
  //       from_date: new Date(leave.from_date).toDateString(),
  //       to_date: new Date(leave.to_date).toDateString(),
  //       requested_leave_days: Math.ceil(
  //         (new Date(leave.to_date) - new Date(leave.from_date)) /
  //           (1000 * 3600 * 24)
  //       ),
  //     }));

  //     setAllReporteesLeaves(formatter);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const fetchReporteesLeaves = useCallback(() => {
    axiosInstance
      .get(`leads-leave-applications`, {
        params: {
          department: departmentFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.application;
        console.log("Reportees", res?.data)
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
          department: leave?.department?.department,
          from_date: new Date(leave.from_date).toDateString(),
          to_date: new Date(leave.to_date).toDateString(),
          requested_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setAllReporteesLeaves(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [departmentFilter, page, searchTerm, sizePerPage]);

  const fetchRemainingLeaves = async () => {
    try {
      const response = await axiosInstance.get(`leave-count/remaining-leaves`);
      const resData = response?.data?.data;

      setRemainingLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOtherLeaves = async () => {
    try {
      const response = await axiosInstance.get(`leave-count/other-used-leaves`);
      const resData = response?.data?.data;

      setOtherLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMedicalLeaves = async () => {
    try {
      const response = await axiosInstance.get(
        `leave-count/used-medical-leaves`
      );
      const resData = response?.data?.data;

      setMedicalLeave(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsedLeaves = async () => {
    try {
      const response = await axiosInstance.get(`leave-count/used-leaves`);
      console.log("Used Leaves", response?.data);
      const resData = response?.data?.data;

      setUsedLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserLevel();
    fetchReporteesLeaves();
    fetchRemainingLeaves();
    fetchOtherLeaves();
    fetchMedicalLeaves();
    fetchUsedLeaves();

    let user = tokenService.getUser();
    setuser(user);
    setuserId(user._id);
    if (userId) {
      fetchYourLeaves();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchReporteesLeaves, userId]);

  const handleApproveLeave = async (row) => {
    const id = row._id;
    console.log('approve this req:', row._id);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(`leads-leave-approval/${id}`);
      console.log('Leave Approval Response', response?.data);
      showAlert(true, 'Leave Approved', 'alert alert-success');
      fetchReporteesLeaves();
    } catch (error) {
      console.log('Leave approval error:', error.response);
    }
  };

  const handleRejectLeave = (row) => {
    setRejectLeave(row);
    setRejectModal(true);
  };

  const handleEditApplication = (row) => {
    setEditLeave(row);
  };

  const userColumns = [
    {
      dataField: 'leave_type',
      text: 'Leave Type',
      sort: true,
      formatter: (val, row) => <p>{val + ' leave'}</p>,
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
      dataField: 'status',
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

            {row.status === "pending" && (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditModal"
                onClick={() => handleEditApplication(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Edit
              </a>
            )}
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
      formatter: (val, row) => <p>{val + ' leave'}</p>,
    },
    {
      dataField: 'from_date',
      text: 'From Date',
      sort: true,
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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
      dataField: 'status',
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
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {rejectModal && (
        <RejectLeaveModal
          rejectLeave={rejectLeave}
          closeModal={setRejectModal}
          fetchReporteesLeaves={fetchReporteesLeaves}
        />
      )}
      <ApplyLeaveModal fetchYourLeaves={fetchYourLeaves} />
      <EditLeaveModal editLeave={editLeave} fetchYourLeaves={fetchYourLeaves} />
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
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Apply Leave
            </a>
          </div>
        </div>
      </div>
      {isLead && (
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
                    Leaves by Reportees
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className=" tab-content">
          <div id="tab_leaves" className="col-12 tab-pane show active">
            <div className="row">
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Used Leave</h6>
                  <h4>{usedLeaves}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Medical Leave</h6>
                  <h4>{medicalLeave}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Other Leave</h6>
                  <h4>{otherLeaves}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{remainingLeaves}</h4>
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
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setLoading={setLoading}
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
    </>
  );
};

export default LeavesUser;
