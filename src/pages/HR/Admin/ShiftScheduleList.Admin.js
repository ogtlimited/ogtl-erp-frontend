// *IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { AddCampaignScheduleModal } from "../../../components/Modal/AddCampaignScheduleModal";
import { EditCampaignScheduleTitleModal } from "../../../components/Modal/EditCampaignScheduleTitleModal";
import { EditCampaignScheduleTimeModal } from "../../../components/Modal/EditCampaignScheduleTimeModal";
import { ViewCampaignScheduleTimeModal } from "../../../components/Modal/ViewCampaignScheduleTimeModal";
import ShiftScheduleListTable from "../../../components/Tables/EmployeeTables/shiftScheduleListTable";
import { AddShiftScheduleModal } from "../../../components/Modal/AddShiftScheduleModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useAppContext } from "../../../Context/AppContext";
import $ from "jquery";

import axiosInstance from "../../../services/api";

const ShiftScheduleList = () => {
  const { user, showAlert, ErrorHandler } = useAppContext();
  const [allSchedule, setAllSchedules] = useState([]);
  const [editScheduleTitle, setEditScheduleTitle] = useState([]);
  const [editScheduleTime, setEditScheduleTime] = useState([]);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("create");
  const [scheduleId, setScheduleId] = useState("");

  const fetchAllSchedule = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/employee_shifts_schedules.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.employee_shifts_schedules;
      setAllSchedules(resData);

      setLoading(false);
    } catch (error) {
      const component = "All Schedules:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllSchedule();
  }, [fetchAllSchedule, user]);

  const handleEditTitle = (row) => {
    setEditScheduleTitle(row);
  };

  const handleTimeAction = async (row, action) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/employee_shifts_schedules/${row.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.employee_shifts_schedule;
      console.log("Schedule time init:", resData);

      if (!resData.length) {
        setMode("add");
        setScheduleId(row.id);
        $("#ShiftScheduleFormModal").modal("show");
      } else {
        if (resData.length > 1) {
          if (action === "view") {
            $("#ViewCampaignScheduleTimeFormModal").modal("show");
            setEditScheduleTime(resData);
          } else if (action === "edit") {
            $("#EditCampaignScheduleTimeFormModal").modal("show");
            setEditScheduleTime(resData);
            setScheduleId(row.id);
          }
        }
      }
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
    }
    setLoading(false);
  };

  const deleteCampaignSchedule = (row) => {
    axiosInstance
      .delete(`/campaign-schedules/${row._id}`)
      .then((res) => {
        fetchAllSchedule();
        showAlert(true, "Campaign schedule deleted", "alert alert-info");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
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
              // data-target="#ViewCampaignScheduleTimeFormModal"
              onClick={() => handleTimeAction(row, "view")}
            >
              <i className="fa fa-eye m-r-5"></i> View Schedule
            </a>

            <a
              href="#"
              className="dropdown-item"
              data-toggle="modal"
              data-target="#EditCampaignScheduleTitleFormModal"
              onClick={() => handleEditTitle(row)}
            >
              <i className="fa fa-edit m-r-5"></i> Edit Title
            </a>

            <a
              href="#"
              className="dropdown-item"
              data-toggle="modal"
              // data-target="#EditCampaignScheduleTimeFormModal"
              onClick={() => handleTimeAction(row, "edit")}
            >
              <i className="fa fa-clock m-r-5"></i> Edit schedule
            </a>

            {/* <a
              href="#"
              className="dropdown-item"
              onClick={() => setDeleteData(row)}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a> */}
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
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Campaign Schedule</li>
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

      <AddCampaignScheduleModal
        fetchAllSchedule={fetchAllSchedule}
        mode={mode}
      />
      <AddShiftScheduleModal
        fetchAllSchedule={fetchAllSchedule}
        mode={mode}
        setMode={setMode}
        scheduleId={scheduleId}
      />

      <EditCampaignScheduleTitleModal
        fetchAllSchedule={fetchAllSchedule}
        editSchedule={editScheduleTitle}
      />

      <EditCampaignScheduleTimeModal
        fetchAllSchedule={fetchAllSchedule}
        editSchedule={editScheduleTime}
        loading={loading}
        scheduleId={scheduleId}
      />

      <ViewCampaignScheduleTimeModal
        fetchAllSchedule={fetchAllSchedule}
        editSchedule={editScheduleTime}
        loading={loading}
      />

      <ConfirmModal
        title="Campaign Schedule"
        selectedRow={deleteData}
        deleteFunction={deleteCampaignSchedule}
      />
    </>
  );
};

export default ShiftScheduleList;
