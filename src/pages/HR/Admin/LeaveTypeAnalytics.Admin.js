/*slint-disable eqeqeq*/
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LeaveTypeTable from '../../../components/Tables/EmployeeTables/leaveTypeTable';
import axiosInstance from '../../../services/api';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import ViewModal from '../../../components/Modal/ViewModal';
import LeaveStatusContent from '../../../components/ModalContents/LeaveStatusContent';

const AllLeaveTypeAdmin = () => {
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const imageUrl = 'https://erp.outsourceglobal.com';
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [allApplications, setallApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState('');
  const  id  = localStorage.getItem('leave type');;

  const [departments, setDepartments] = useState([]);

  const fetchTypeHeader = async () => {
    const header = localStorage.getItem('leave type');
    setHeader(header);
  };

  const fetchLeaveType = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`/hr-leave-applications/leave-type/employees?leave_type=${id}`)
      .then((res) => {
        let resData = res?.data?.data;
        console.log('Leave Type Response Data:', resData);

        const formatted = resData.map((leave) => ({
          ...leave,
          full_name:
            leave?.employee_id.first_name +
            ' ' +
            leave?.employee_id.middle_name +
            ' ' +
            leave?.employee_id.last_name,
          gender: leave?.employee_id.gender[0].toUpperCase() + leave?.employee_id.gender.substring(1),
          email: leave?.employee_id.company_email,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          department: leave?.employee_id?.department?.department,
          from_date: new Date(leave.from_date).toDateString(),
          to_date: new Date(leave.to_date).toDateString(),
          total_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setallApplications(formatted);
        console.log('Leave Type Response Formatted Data:', formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  
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

  useEffect(() => {
    fetchTypeHeader();
    fetchLeaveType();
    fetchDepartment();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [fetchLeaveType]);

  const columns = [
    {
      dataField: 'full_name',
      text: 'Employee Name',
      sort: true,
      headerStyle: { width: '80px' },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row.gender === 'Male'
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to=''>
            {value} <span>{row?.email}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { minWidth: '130px' },
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
      headerStyle: { minWidth: '100px' },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: 'to_date',
      text: 'To Date',
      sort: true,
      headerStyle: { minWidth: '100px' },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
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
    {
      dataField: 'status_action',
      text: 'Action',
      csvExport: false,
      headerStyle: { width: '10%' },

      formatter: (value, row) => (
        <>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setmodalType('view-details');
              setViewRow(row);
            }}
            href="#"
            data-toggle="modal"
            data-target="#generalModal"
          >
            <i className="fa fa-eye m-r-5"></i> View
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{header}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leave Type</li>
            </ul>
          </div>
        </div>
      </div>

      <LeaveTypeTable
        columns={columns}
        departments={departments}
        data={allApplications}
        setData={setallApplications}
        loading={loading}
        setLoading={setLoading}
      />

      {modalType === 'view-details' ? (
        <ViewModal
          title="Leave Application Details"
          content={<LeaveStatusContent leaveContent={viewRow} />}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default AllLeaveTypeAdmin;
