/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import AdminLeavesTable from '../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable';
import { leaveList } from '../../../db/leaves';
import male from '../../../assets/img/male_avater.png';
import FormModal from '../../../components/Modal/Modal';
import { LeaveApplicationFormJSON } from '../../../components/FormJSON/HR/Leave/application';
import axiosInstance from '../../../services/api';
import HelperService from '../../../services/helper';
import { useAppContext } from '../../../Context/AppContext';
import GeneralApproverBtn from '../../../components/Misc/GeneralApproverBtn';
import GeneralUpload from '../../../components/Modal/GeneralUpload';
import tokenService from '../../../services/token.service';
import LeaveJSON from '../../HR/Users/leaves.json';
import ViewModal from '../../../components/Modal/ViewModal';
import LeaveApplicationContent from '../../../components/ModalContents/LeaveApplicationContent';
import RejectLeaveModal from '../../../components/Modal/RejectLeaveModal';

const LeavesAdmin = () => {
  const [approval, setApproval] = useState([
    {
      title: 'approved by supervisor',
      color: 'text-info',
    },
    {
      title: 'approved',
      color: 'text-success',
    },
    {
      title: 'cancelled',
      color: 'text-warning',
    },
    {
      title: 'rejected',
      color: 'text-danger',
    },
  ]);
  const [allLeaves, setallLeaves] = useState([]);
  const [allSubordinatesLeaves, setallSubordinatesLeaves] = useState([]);
  const { showAlert, allEmployees, combineRequest } = useAppContext();
  const [template, settemplate] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [present, setpresent] = useState(0);
  const [planned, setplanned] = useState(0);
  const [approvedLeaves, setapprovedLeaves] = useState(0);
  const [subordinatespresent, setSubordinatesPresent] = useState(0);
  const [subordinatesplanned, setSubordinatesPlanned] = useState(0);
  const [approvedSubordinatesLeaves, setapprovedSubordinatesLeaves] =
    useState(0);
  const [toggleModal, settoggleModal] = useState(false);
  const [status, setStatus] = useState('');
  const [editData, seteditData] = useState({});
  const [formMode, setformMode] = useState('add');
  const [fetched, setfetched] = useState(false);
  const [statusRow, setstatusRow] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [rejectModal, setRejectModal] = useState(false);
  const [filters, setfilters] = useState([]);
  const [department, setDepartment] = useState([]);
  const user = tokenService.getUser();

  const fetchAllLeaves = async () => {
    try {
      // const response = await axiosInstance.get()
      const resData = LeaveJSON;
      // const leaves = resData
      const leaves = resData.filter((f) => f?.status !== 'cancelled');

      setallLeaves(leaves);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchDepartment = useCallback(() => {  
  //   axiosInstance
  //       .get(`/departments/employees/designations/${id}`)
  //       .then((res) => {
  //         let resData = res?.data?.data.designationsByDepartment;
  //         let formattedDesignation = resData.map((e) => e?._id?.designation);
  //         setDepartment(formattedDesignation);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  // }, []);

  useEffect(() => {
    fetchAllLeaves();
    // fetchDepartment()
  }, []);

  const handleApproveLeave = () => {
    console.log('Approve this leave!');
    showAlert(true, 'Leave Approved', 'alert alert-success');
  };

  const handleRejectLeave = () => {
    setRejectModal(true);
  };

  const columns = [
    {
      // dataField: "employee_id",
      dataField: 'full_name',
      text: 'Employee Name',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img alt="" src={male} />
          </a>
          {/* <a href="">
            {value?.first_name + " " + value?.last_name}{" "}
            <span>{value?.designation?.designation}</span>
          </a> */}
          <a href="">
            {row?.full_name} <span>{row?.designation}</span>
          </a>
        </h2>
      ),
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { minWidth: '180px' },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { minWidth: '150px' },
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
      dataField: 'leave_type_id',
      text: 'Leave Type',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'from_date',
      text: 'From Date',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    // {
    //   dataField: "leave_approver",
    //   text: "Approved By",
    //   sort: true,
    //   headerStyle: { minWidth: "100px", textAlign: "center" },
    //   formatter: (value, row) => (
    //     <h2 className="table-avatar">
    //       <a href="" className="avatar">
    //         <img alt="" src={male} />
    //       </a>
    //       <a href="">
    //         {value?.first_name + " " + value?.last_name}{" "}
    //         <span>{value?.designation?.designation}</span>
    //       </a>
    //     </h2>
    //   ),
    // },
    {
      dataField: 'total_leave_days',
      text: 'Total Leave Days',
      sort: true,
      headerStyle: { minWidth: '80px', textAlign: 'center' },
      formatter: (val, row) => (
        <p>{HelperService.diffDays(row.from_date, row.to_date)}</p>
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
                onClick={() => handleApproveLeave()}
              >
                <i className="fa fa-check m-r-5"></i> Approve
              </a>
            ) : null}

            {value === 'pending' ? (
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleRejectLeave()}
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
          // id={employee_id}
          closeModal={setRejectModal}
          fetchYourLeaves={fetchAllLeaves}
        />
      )}
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
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>

      <div className="row tab-content">
        <div id="tab_leaves" className="col-12 tab-pane show active">
          <div className="row">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Today Presents</h6>
                <h4>
                  {present} / {allEmployees.length}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Pending Requests</h6>
                {/* <h4> {planned}</h4> */}
                <h4>2</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Approved Leaves</h6>
                {/* <h4>{approvedLeaves}</h4> */}
                <h4>1</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Rejected Leaves</h6>
                {/* <h4>{planned} &nbsp;</h4> */}
                <h4>1</h4>
              </div>
            </div>
          </div>
          <AdminLeavesTable columns={columns} data={allLeaves} />
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

export default LeavesAdmin;
