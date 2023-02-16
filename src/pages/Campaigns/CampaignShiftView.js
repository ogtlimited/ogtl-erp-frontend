/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import LeaveTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddCampaignShiftModal } from "../../components/Modal/AddCampaignShiftModal";
import { EditCampaignShiftModal } from "../../components/Modal/EditCampaignShiftModal";

const CampaignShiftView = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const [editShift, setEditShift] = useState([]);
  const [campaign, setCampaign] = useState('');

  const [allCampaignsShifts, setallCampaignShifts] = useState([]);

  const fetchCampaignShift = () => {
    const campaign = localStorage.getItem('campaign');
    setCampaign(campaign);

    axiosInstance.get(`/api/shiftType/office?campaignId=${id}`).then((e) => {
      const resData = e?.data?.shiftData;
      setallCampaignShifts(resData);
    });
  };


  useEffect(() => {
    fetchCampaignShift();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditShift = (row) => {
    const formatted = {};
    formatted._id = row._id
    formatted.start_time = row.start_time;
    formatted.end_time = row.end_time;
    formatted.shift_name = row.shift_name;
    setEditShift(formatted);
  }

  const columns = [
    {
      dataField: "shift_name",
      text: "Shift Name",
      sort: true,
      headerStyle: { width: "40%" },
    },
    {
      dataField: "start_time",
      text: "Start time",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "end_time",
      text: "End time",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: '',
      text: 'Action',
      headerStyle: { width: '10%' },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#EditCampaignShiftFormModal"
                onClick={() => handleEditShift(row)}
            >
              Edit
            </button>
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
            <h3 className="page-title">{campaign} Shifts</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Campaign</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#CampaignShiftFormModal"
              >
                <i className="fa fa-plus"></i> Add Shift
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <LeaveTable
          data={allCampaignsShifts}
          columns={columns}
        />
      </div>

      <AddCampaignShiftModal fetchCampaignShift={fetchCampaignShift} campaign={campaign} />
      <EditCampaignShiftModal fetchCampaignShift={fetchCampaignShift} campaign={campaign} editShift={editShift} />
    </>
  );
};

export default CampaignShiftView;
