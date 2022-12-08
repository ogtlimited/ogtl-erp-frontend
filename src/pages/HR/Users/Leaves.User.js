/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import AdminLeavesTable from '../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable';
import tokenService from '../../../services/token.service';
import axiosInstance from '../../../services/api';
import axios from 'axios';
import ViewModal from '../../../components/Modal/ViewModal';
import { ApplyLeaveModal } from '../../../components/Modal/ApplyLeaveModal';
import { EditLeaveModal } from '../../../components/Modal/EditLeaveModal';
import { LeaveApplicationFormJSON } from '../../../components/FormJSON/HR/Leave/application';
import { useAppContext } from '../../../Context/AppContext';
import LeaveApplicationContent from '../../../components/ModalContents/LeaveApplicationContent';
import helper from '../../../services/helper';
import RejectLeaveModal from '../../../components/Modal/RejectLeaveModal';
import moment from 'moment';
import LeaveJSON from './leaves.json';

const LeavesUser = () => {
  const { allEmployees, combineRequest, showAlert } = useAppContext();
  const [userId, setuserId] = useState('');
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [user, setuser] = useState(null);
  const [usedLeaves, setusedLeaves] = useState(0);
  const [template, settemplate] = useState(null);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [allLeaves, setallLeaves] = useState([]);
  const [allReporteesLeaves, setAllReporteesLeaves] = useState([]);
  const [annual, setannual] = useState(0);
  const [casual, setcasual] = useState(0);
  const [medical, setmedical] = useState(0);
  const [Subordinatesannual, setSubordinatesannual] = useState(0);
  const [Subordinatescasual, setSubordinatescasual] = useState(0);
  const [Subordinatesmedical, setSubordinatesmedical] = useState(0);
  const [remaining, setremaining] = useState(0);
  const [formMode, setformMode] = useState('add');
  const [fetched, setfetched] = useState(false);
  const [loadedSelect, setloadedSelect] = useState(false);
  const [loadLeaves, setloadLeaves] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const currentUser = tokenService.getUser();

  // const fetchLeaves = () => {
  //   axiosInstance
  //     .get(`/leave-application?employee_id=${currentUser?._id}`)
  //     .then((e) => {
  //       const leaves = e?.data?.data?.filter(
  //         (f) => f?.employee_id?._id == userId
  //       );

  //       const casual = leaves.filter((e) => e.leave_type_id !== "Sick").length;
  //       const medic = leaves.filter((e) => e.leave_type_id === "Sick").length;
  //       const open = leaves.filter((l) => l.status === "open").length;
  //       let count = 0;
  //       leaves.forEach((e) => {
  //         let a = moment(new Date(e.from_date));
  //         let b = moment(new Date(e.to_date));
  //         count += b.diff(a, "days") + 1;
  //       });

  //       setusedLeaves(count);
  //       setannual(annual);
  //       setcasual(casual);
  //       setmedical(medic);

  //       setallLeaves(leaves);
  //       if (allLeaves.length) {
  //         setloadLeaves(true);
  //       }
  //     });

  //   axiosInstance
  //     .get(`/leave-application?leave_approver=${currentUser?._id}`)
  //     .then((e) => {
  //       const leaves = e.data.data;

  //       const casual = leaves.filter((e) => e.leave_type_id !== "Sick").length;
  //       const medic = leaves.filter((e) => e.leave_type_id === "Sick").length;

  //       setSubordinatesannual(annual);
  //       setSubordinatescasual(casual);
  //       setSubordinatesmedical(medic);
  //       setallSubordinatesLeaves(e.data.data);
  //       // setapprovedSubordinatesLeaves(approved);
  //       // setSubordinatesPlanned(open);
  //       // setSubordinatesPresent(allEmployees.length - approved);
  //       // setfetched(true);
  //     });
  // };

  const fetchYourLeaves = async () => {
    try {
      // const response = axios.get(
      //   'https://my.api.mockaroo.com/leave_model.json?key=9ae185d0'
      // );
      const resData = LeaveJSON;
      // const resData = response?.data;
      console.log('all leaves to get my leaves:', resData);

      const leaves = resData.filter((f) => f?.employee_id === 1);
      console.log('My Leaves', leaves);

      const formatter = leaves.map((leave) => ({
        ...leave,
        requested_leave_days:
          new Date(leave.to_date) -
          new Date(leave.from_date) / (1000 * 3600 * 24),
      }));

      const annual = leaves.filter((e) => e.leave_type_id === 'Annual').length;
      console.log('Annual Leave', annual);
      const casual = leaves.filter((e) => e.leave_type_id !== 'Sick').length;
      console.log('Casual Leave', casual);
      const medic = leaves.filter((e) => e.leave_type_id === 'Sick').length;
      console.log('Medical Leave', medic);

      setannual(annual);
      setcasual(casual);
      setmedical(medic);

      setallLeaves(formatter);

      if (allLeaves.length) {
        setloadLeaves(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReporteesLeaves = async () => {
    try {
      // const response = axios.get(
      //   'https://my.api.mockaroo.com/leave_model.json?key=9ae185d0'
      // );
      const resData = LeaveJSON;
      // const resData = response?.data;
      console.log('all leaves', resData);

      const leaves = resData.filter((f) => f?.approval_level === 1 && f?.status === "pending");

      const formatter = leaves.map((leave) => ({
        ...leave,
        requested_leave_days:
          new Date(leave.to_date) -
          new Date(leave.from_date) / (1000 * 3600 * 24),
      }));

      setAllReporteesLeaves(formatter);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   let user = tokenService.getUser();
  //   setuser(user);
  //   setuserId(user._id);
  //   if (userId) {
  //     fetchLeaves();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId]);

  useEffect(() => {
    fetchReporteesLeaves();

    let user = tokenService.getUser();
    setuser(user);
    setuserId(user._id);
    if (userId) {
      fetchYourLeaves();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // useEffect(() => {
  //   if (!fetched) {
  //     fetchLeaves();
  //   }
  // }, [allEmployees, fetched]);

  const handleApproveLeave = () => {
    console.log("Approve this leave!")
    showAlert(true, 'Leave Approved', 'alert alert-success');
  }

  const handleRejectLeave = () => {
    setRejectModal(true);
  }

  const userColumns = [
    {
      dataField: 'leave_type_id',
      text: 'Leave Type',
      sort: true,
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
          {/* {row.requested_leave_days} */}
          {4 + ' days'}
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

            <a
              href="#"
              className="dropdown-item"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-edit m-r-5"></i> Edit
            </a>
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
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'leave_type_id',
      text: 'Leave Type',
      sort: true,
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
          {/* {row.requested_leave_days} */}
          {4 + ' days'}
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

            {value === "pending" ? <a
              href="#"
              className="dropdown-item"
              onClick={() => handleApproveLeave()}
            >
              <i className="fa fa-check m-r-5"></i> Approve
            </a> : null}

            {value === "pending" ? <a
              href="#"
              className="dropdown-item"
              onClick={() => handleRejectLeave()}
            >
              <i className="fa fa-ban m-r-5"></i> Reject
            </a> : null}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>{rejectModal && (
      <RejectLeaveModal
        // id={employee_id}
        closeModal={setRejectModal}
        fetchYourLeaves={fetchYourLeaves}
        fetchReporteesLeaves={fetchReporteesLeaves}
      />
    )}
      <ApplyLeaveModal />
      <EditLeaveModal allLeaves={allLeaves} />
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
                  <h4>{medical}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Other Leave</h6>
                  <h4>{casual}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{user?.leaveCount}</h4>
                </div>
              </div>
            </div>
            <LeavesTable columns={userColumns} data={allLeaves} />
          </div>

          <div id="tab_subordinates-leaves" className="col-12 tab-pane">
            {/* <div className="row">
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Used Leave</h6>
                  <h4>{usedLeaves}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Medical Leave</h6>
                  <h4>{Subordinatesmedical}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Other Leave</h6>
                  <h4>{Subordinatescasual}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{user?.leaveCount}</h4>
                </div>
              </div>
            </div> */}
            <AdminLeavesTable columns={reporteeColumns} data={allReporteesLeaves} />
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
