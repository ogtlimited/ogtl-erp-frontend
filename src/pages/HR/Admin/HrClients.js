/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HrClientsTable from './HrClientsTable';
import axiosInstance from '../../../services/api';

const HrClients = () => {
  const [data, setData] = useState([]);

  const fetchClients = () => {
    axiosInstance
      .get('/api/client')
      .then((res) => {
        const resData = res.data.data;
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    {
      dataField: 'client_name',
      text: 'Name',
      sort: true,
      headerStyle: { width: '350px' },
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: '',
      text: 'Action',
      csvExport: false,
      headerStyle: { width: '120px' },
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-secondary"
          to={{
            pathname: `/dashboard/hr-client/${row?._id}`,
            state: { client: row?._id },
          }}
        >
          View Client
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Clients</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Clients</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <HrClientsTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default HrClients;
