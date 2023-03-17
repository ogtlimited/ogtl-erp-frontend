/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import tokenService from '../../../services/token.service';
import axiosInstance from '../../../services/api';
import ViewModal from '../../../components/Modal/ViewModal';
import { ApplyResignationModal } from '../../../components/Modal/ApplyResignationModal';
// import { EditLeaveModal } from '../../../components/Modal/EditLeaveModal';
import ResignationContent from '../../../components/ModalContents/ResignationContent';
import moment from 'moment';

const ResignationUser = () => {
  const [data, setData] = useState([]);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const user = tokenService.getUser();

  const fetchResignation = () => {
    axiosInstance
      .get(`/Exit`)
      .then((res) => {
        const resData = res?.data?.data.filter(e => e.employee_id._id === user._id)

        const map = resData.map(e => {
          return {
            ...e,
            fullName: `${e?.employee_id?.first_name} ${e?.employee_id?.last_name}`,
            effective_date: new Date(e?.effective_date).toDateString(),

          }
        })
        setData(map);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchResignation();
  }, []);

  const userColumns = [
    {
      dataField: "fullName",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "300px" },
    },
    {
      dataField: "effective_date",
      text: "Effective Resignation Date",
      sort: true,
      headerStyle: { width: "250px" },
    },
    {
      dataField: "reason_for_resignation",
      text: "Reason for Resignation",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
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
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#ResignationFormModal"
              >
                <i className="fa fa-plus"></i> Apply Resignation
              </a>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={userColumns} />
        </div>
      </div>

      {modalType === 'view-details' ? (
        <ViewModal
          title="Resignation Details"
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ''
      )}

      <ApplyResignationModal />
      {/* <EditLeaveModal editLeave={editLeave} fetchYourLeaves={fetchYourLeaves} /> */}
    </>
  );
};

export default ResignationUser;
