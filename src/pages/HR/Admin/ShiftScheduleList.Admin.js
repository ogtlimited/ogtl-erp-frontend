/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AddCampaignScheduleModal } from '../../../components/Modal/AddCampaignScheduleModal';
import ShiftScheduleListTable from '../../../components/Tables/EmployeeTables/shiftScheduleListTable';
import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';

const ShiftScheduleList = () => {
  const [allSchedule, setAllSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppContext();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [searchTerm, setSearchTerm] = useState('');


  const fetchAllSchedule = useCallback(() => {
    axiosInstance
      .get('/campaign-schedules/owner')
      .then((e) => {
        let resData = e?.data?.data;
        console.log("campaign schedule:", resData);

        setAllSchedules(resData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    fetchAllSchedule();
  }, [fetchAllSchedule, user]);

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      sort: true,
      headerStyle: { minWidth: '150px' },
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
              href="#"
              className="dropdown-item"
              // onClick={() => handleApproveLeave(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>

            <a
              href="#"
              className="dropdown-item"
              // onClick={() => handleRejectLeave(row)}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
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
            <h3 className="page-title">Campaign Schedule List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leadership</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  data-target="#CampaignScheduleFormModal"
                >
                  <i className="fa fa-clock"></i> Add Schedule
                </a>
              </>
          </div>
        </div>
      </div>

      <ShiftScheduleListTable
        loading={loading}
        data={allSchedule}
        setData={setAllSchedules}
        columns={columns}

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
      
      <AddCampaignScheduleModal />
    </>
  );
};

export default ShiftScheduleList;