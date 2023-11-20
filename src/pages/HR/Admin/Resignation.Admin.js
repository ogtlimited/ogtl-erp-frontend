/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import male from '../../../assets/img/male_avater.png';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import ViewModal from '../../../components/Modal/ViewModal';
import ResignationContent from '../../../components/ModalContents/ResignationContent';
import AdminResignationTable from '../../../components/Tables/EmployeeTables/AdminResignationTable';
import moment from 'moment';

const ResignationAdmin = () => {
  const [data, setData] = useState([]);
  const [resignationHistory, setResignationHistory] = useState([]);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const fetchHRResignation = useCallback(() => {
    axiosInstance
      .get('/Exit/paginated', {
        params: {
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.employees;
        let resOptions = res?.data?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const map = resData.map(e => {
          return {
            ...e,
            fullName: `${e?.employee_id?.first_name} ${e?.employee_id?.last_name}`,
            effective_date: new Date(e?.effective_date).toDateString(),

          }
        })

        setData(map);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.response);
        setLoading(false);
      });
  }, [page, searchTerm, sizePerPage]);
  
  useEffect(() => {
    fetchHRResignation();
  }, [fetchHRResignation]);
  
  const columns = [
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
            <h3 className="page-title">Resignations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Resignation</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>

      <div className="row tab-content">
        <div id="tab_hr-leave-application" className="col-12 tab-pane show active">
          <AdminResignationTable
            columns={columns}
            data={data}
            setData={setData}
            loading={loading}
            
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setLoading={setLoading}
          />
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
    </>
  );
};

export default ResignationAdmin;
