
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import axiosInstance from '../../../services/api';
import moment from 'moment';

const AttendanceRecord = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const response = await axiosInstance.get('/api/project');
      const resData = response?.data?.data;
      console.log(resData);

      const formattedData = resData?.map((item, index) => ({
        ...item,
        sn: index + 1,
        createdAt: moment(item.createdAt).format('llll'),
        client: item.client_id?.client_name,
      }));

      setCampaigns(formattedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      const formattedData = resData?.map((item, index) => ({
        ...item,
        sn: index + 1,
        createdAt: moment(item.createdAt).format('llll'),

      }));

      setDepartments(formattedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchCampaigns();
  }, []);

  const campaignColumns = [
    {
      dataField: 'sn',
      text: 'S/N',
      sort: true,
      headerStyle: { width: '5px' },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'project_name',
      text: 'Campaign',
      sort: true,
      formatter: (val, row) => 
        <p>
          <Link to={`/dashboard/hr/campaign/employees/${row?.project_name}/${row._id}`} className='attendance-record-for-office'>
            {val}
          </Link>
        </p>
    },
    {
      dataField: 'client',
      text: 'Client',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'createdAt',
      text: 'Created',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
  ];

  const departmentColumns = [
    {
      dataField: 'sn',
      text: 'S/N',
      sort: true,
      headerStyle: { width: '5px' },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      formatter: (val, row) => 
      <p>
        <Link to={`/dashboard/hr/department/employees/${row?.department}/${row._id}`} className='attendance-record-for-office'>
          {val}
        </Link>
      </p>,
    },
    {
      dataField: 'createdAt',
      text: 'Created',
      sort: true,
      formatter: (val, row) => <p>{val}</p>,
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Attendance Record</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
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
                  href="#tab_campaigns"
                >
                  Campaigns{' '}
                    {/* {campaigns.length ? (
                      <span className="office-count">
                        {campaigns.length}
                      </span>
                    ) : null} */}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                >
                  Departments{' '}
                    {/* {departments.length ? (
                      <span className="office-count">
                        {departments.length}
                      </span>
                    ) : null} */}
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">

          <div id="tab_campaigns" className="col-12 tab-pane show active">
            <LeavesTable columns={campaignColumns} data={campaigns} loading={loading} />
          </div>

          <div id="tab_departments" className="col-12 tab-pane">
            <LeavesTable columns={departmentColumns} data={departments} loading={loading} />
          </div>

        </div>
      </div>
    </>
  );
};

export default AttendanceRecord;
