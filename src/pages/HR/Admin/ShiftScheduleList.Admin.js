/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AddCampaignScheduleModal } from '../../../components/Modal/AddCampaignScheduleModal';
import { EditCampaignScheduleTitleModal } from '../../../components/Modal/EditCampaignScheduleTitleModal';
import { EditCampaignScheduleTimeModal } from '../../../components/Modal/EditCampaignScheduleTimeModal';
import ShiftScheduleListTable from '../../../components/Tables/EmployeeTables/shiftScheduleListTable';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';

const ShiftScheduleList = () => {
  const [allSchedule, setAllSchedules] = useState([]);
  const [editScheduleTitle, setEditScheduleTitle] = useState([]);
  const [editScheduleTime, setEditScheduleTime] = useState([]);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, showAlert } = useAppContext();

  const fetchAllSchedule = useCallback(() => {
    axiosInstance
      .get('/campaign-schedules/owner')
      .then((e) => {
        let resData = e?.data?.data;

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

  const handleEditTitle = (row) => {
    setEditScheduleTitle(row);
  };

  const handleEditTime = (row) => {
    axiosInstance.get(`/campaign-schedule-items/${row._id}`).then((e) => {
      let resData = e?.data?.data;
      setEditScheduleTime(resData);
    });
  };
  
  const deleteCampaignSchedule = (row) => {
    axiosInstance
      .delete(`/campaign-schedules/${row._id}`)
      .then((res) => {
        fetchAllSchedule();
        showAlert(true, 'Campaign schedule deleted', 'alert alert-info');
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
  };

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
              data-toggle="modal"
              data-target="#EditCampaignScheduleTitleFormModal"
              onClick={() => handleEditTitle(row)}
            >
              <i className="fa fa-edit m-r-5"></i> Edit title
            </a>

            <a
              href="#"
              className="dropdown-item"
              data-toggle="modal"
              data-target="#EditCampaignScheduleTimeFormModal"
              onClick={() => handleEditTime(row)}
            >
              <i className="fa fa-clock m-r-5"></i> Edit schedule
            </a>

            <a
              href="#"
              className="dropdown-item"
              onClick={() => setDeleteData(row)}
              data-toggle="modal"
              data-target="#exampleModal"
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
        setLoading={setLoading}
      />
      
      <AddCampaignScheduleModal fetchAllSchedule={fetchAllSchedule} />
      <EditCampaignScheduleTitleModal fetchAllSchedule={fetchAllSchedule}  editSchedule={editScheduleTitle} />
      <EditCampaignScheduleTimeModal fetchAllSchedule={fetchAllSchedule}  editSchedule={editScheduleTime} />
      
      <ConfirmModal
        title="Campaign Schedule"
        selectedRow={deleteData}
        deleteFunction={deleteCampaignSchedule}
      />
    </>
  );
};

export default ShiftScheduleList;