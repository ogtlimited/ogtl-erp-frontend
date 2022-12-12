/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import AdminLeavesTable from '../../../components/Tables/EmployeeTables/Leaves/AdminLeaveTable';
import male from '../../../assets/img/male_avater.png';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import tokenService from '../../../services/token.service';
import ViewModal from '../../../components/Modal/ViewModal';
import LeaveApplicationContent from '../../../components/ModalContents/LeaveApplicationContent';
import RejectAdminLeaveModal from '../../../components/Modal/RejectAdminLeaveModal';

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
  const { showAlert, allEmployees, combineRequest } = useAppContext();
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectedLeaves, setRejectedLeaves] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [onLeave, setOnLeave] = useState(0);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(false);
  const [hrReject, setHrReject] = useState([]);
  const user = tokenService.getUser();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // const fetchHRLeaves = async () => {
  //   try {
  //     const response = await axiosInstance.get(`hr-leave-applications`);
  //     const resData = response?.data?.data?.application;

  //     const formatter = resData.map((leave) => ({
  //       ...leave,
  //       full_name:
  //         leave?.employee.first_name +
  //         ' ' +
  //         leave?.employee.middle_name +
  //         ' ' +
  //         leave?.employee.last_name,
  //       department: leave?.department?.department,
  //       from_date: new Date(leave.from_date).toDateString(),
  //       to_date: new Date(leave.to_date).toDateString(),
  //       total_leave_days: Math.ceil(
  //         (new Date(leave.to_date) - new Date(leave.from_date)) /
  //           (1000 * 3600 * 24)
  //       ),
  //     }));

  //     setallLeaves(formatter);
  //     console.log('This leave', formatter);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const fetchHRLeaves = useCallback(() => {
    axiosInstance
      .get('hr-leave-applications', {
        params: {
          department: departmentFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.application;
        console.log('Reportees', res?.data);
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
          total_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setallLeaves(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [departmentFilter, page, searchTerm, sizePerPage]);

  // const fetchAllLeaves = async () => {
  //   try {
  //     const response = await axiosInstance.get(`leave-application`);
  //     const resData = response?.data?.data;

  //     const formatter = resData.map((leave) => ({
  //       ...leave,
  //       full_name: leave?.employee_id?.first_name +
  //       ' ' +
  //       leave?.employee_id.middle_name +
  //       ' ' +
  //       leave?.employee_id.last_name,
  //       emp_department: leave?.department?.department,
  //       reportee_department: leave?.department?.department,
  //       from_date: new Date(leave.from_date).toDateString(),
  //       to_date: new Date(leave.to_date).toDateString(),
  //       total_leave_days: Math.ceil(
  //         (new Date(leave.to_date) - new Date(leave.from_date)) /
  //           (1000 * 3600 * 24)
  //       ),

  //     }))

  //     setallLeaves(formatter);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }

  // };

  const fetchAllHrApproved = async () => {
    try {
      const response = await axiosInstance.get(
        `hr-leave-applications/approved`
      );
      const resData = response?.data?.data;

      setApprovedLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllHrRejected = async () => {
    try {
      const response = await axiosInstance.get(
        `hr-leave-applications/rejected`
      );
      const resData = response?.data?.data;

      setRejectedLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllHrPending = async () => {
    try {
      const response = await axiosInstance.get(`hr-leave-applications/pending`);
      const resData = response?.data?.data;

      setPendingLeaves(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEmpOnLeave = async () => {
    try {
      const response = await axiosInstance.get(
        `hr-leave-applications/on-leave`
      );
      const resData = response?.data?.data;

      setOnLeave(resData);
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
    // fetchAllLeaves();
    fetchAllHrApproved();
    fetchAllHrRejected();
    fetchAllHrPending();
    fetchAllEmpOnLeave();
    fetchHRLeaves();
    // fetchDepartment()
  }, [fetchHRLeaves]);

  const handleApproveLeave = async (row) => {
    const id = row._id;
    console.log('approve this req:', row._id);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `hr-leave-applications/approve/${id}`
      );
      console.log('HR Leave Approval Response', response?.data);
      showAlert(true, 'Leave Approved', 'alert alert-success');
      fetchHRLeaves();
    } catch (error) {
      console.log('HR Leave approval error:', error.response);
    }
  };

  const handleRejectLeave = (row) => {
    setHrReject(row);
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
            {row?.full_name}
            {/* <span>{row?.employee_id?.designation?.designation}</span> */}
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
      dataField: 'leave_type',
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
      formatter: (value, row) => (
        <>
          {row.total_leave_days > 1
            ? row.total_leave_days + ' days'
            : row.total_leave_days + ' day'}
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
        <RejectAdminLeaveModal
          hrReject={hrReject}
          closeModal={setRejectModal}
          fetchAllLeaves={fetchHRLeaves}
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
                  {onLeave} / {allEmployees.length}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Pending Requests</h6>
                <h4>{pendingLeaves}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Approved Leaves</h6>
                <h4>{approvedLeaves}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Rejected Leaves</h6>
                <h4>{rejectedLeaves} &nbsp;</h4>
              </div>
            </div>
          </div>
          <AdminLeavesTable
            columns={columns}
            data={allLeaves}
            setData={setallLeaves}
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
