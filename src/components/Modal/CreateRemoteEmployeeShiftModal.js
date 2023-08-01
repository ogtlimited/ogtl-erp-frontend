/*eslint-disable no-unused-vars*/

import React, { useState, useEffect, useRef } from "react";
import {
  mondayShifts,
  tuesdayShifts,
  wednesdayShifts,
  thursdayShifts,
  fridayShifts,
  saturdayShifts,
  sundayShifts,
} from "../FormJSON/CreateRemoteEmployeeShift";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import Switch from "@mui/material/Switch";
import { createBrowserHistory } from "history";

export const CreateRemoteEmployeeShiftModal = ({
  userID,
  setMode,
  fetchEmployeeRemoteShift,
}) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState(mondayShifts);
  const [createTuesdayShift, setCreateTuesdayShift] = useState(tuesdayShifts);
  const [createWednesdayShift, setCreateWednesdayShift] =
    useState(wednesdayShifts);
  const [createThursdayShift, setCreateThursdayShift] =
    useState(thursdayShifts);
  const [createFridayShift, setCreateFridayShift] = useState(fridayShifts);
  const [createSaturdayShift, setCreateSaturdayShift] =
    useState(saturdayShifts);
  const [createSundayShift, setCreateSundayShift] = useState(sundayShifts);

  const [loading, setLoading] = useState(false);
  const [scheduleOpts, setScheduleOpts] = useState([]);

  const cancelEvent = () => {
    setCreateMondayShift(mondayShifts);
    setCreateTuesdayShift(tuesdayShifts);
    setCreateWednesdayShift(wednesdayShifts);
    setCreateThursdayShift(thursdayShifts);
    setCreateFridayShift(fridayShifts);
    setCreateSaturdayShift(saturdayShifts);
    setCreateSundayShift(sundayShifts);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCreateEmployeeShift = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const employeeRemoteShifts = {
        hr_user_id: userID,
        days: [
          createSundayShift,
          createMondayShift,
          createTuesdayShift,
          createWednesdayShift,
          createThursdayShift,
          createFridayShift,
          createSaturdayShift,
        ],
      };

      const response = await axiosInstance.post(`/api/v1/remote_attendance_shifts.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: employeeRemoteShifts,
      });

      setLoading(false);
      goToTop();
      setMode("edit");
      showAlert(true, `Remote shift created successfully!`, "alert alert-success");
      fetchEmployeeRemoteShift();
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const fetchOwnersSchedule = async () => {
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

      const schedule = response?.data?.data?.employee_shifts_schedules;

      const scheduleOpts = schedule?.map((e) => {
        return {
          label: e.title,
          value: e.id,
        };
      });
      setScheduleOpts(scheduleOpts);
    } catch (error) {
      console.error(error?.response);
    }
  };

  useEffect(() => {
    fetchOwnersSchedule();
  }, []);

  const handleScheduleClick = (e) => {
    const scheduleId = e?.value;

    axiosInstance
      .get(`/api/v1/employee_shifts_schedules/${scheduleId}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employee_shifts_schedule;

        const formatted = resData?.map((e) => ({
          day: e.day,
          off: e.off ? e.off : false,
          id: e.id,
        }));

        let monday = {};
        const monday_shifts = formatted?.filter(
          (shift) => shift?.day === "mon"
        );
        for (let i = 0; i < monday_shifts?.length; i++) {
          monday = monday_shifts[i];
          monday.id = createMondayShift.id;
        }
        setCreateMondayShift(monday);

        let tuesday = {};
        const tuesday_shifts = formatted?.filter(
          (shift) => shift?.day === "tue"
        );
        for (let i = 0; i < tuesday_shifts?.length; i++) {
          tuesday = tuesday_shifts[i];
          tuesday.id = createTuesdayShift.id;
        }
        setCreateTuesdayShift(tuesday);

        let wednesday = {};
        const wednesday_shifts = formatted?.filter(
          (shift) => shift?.day === "wed"
        );
        for (let i = 0; i < wednesday_shifts?.length; i++) {
          wednesday = wednesday_shifts[i];
          wednesday.id = createWednesdayShift.id;
        }
        setCreateWednesdayShift(wednesday);

        let thursday = {};
        const thursday_shifts = formatted?.filter(
          (shift) => shift?.day === "thu"
        );
        for (let i = 0; i < thursday_shifts?.length; i++) {
          thursday = thursday_shifts[i];
          thursday.id = createThursdayShift.id;
        }
        setCreateThursdayShift(thursday);

        let friday = {};
        const friday_shifts = formatted?.filter(
          (shift) => shift?.day === "fri"
        );
        for (let i = 0; i < friday_shifts?.length; i++) {
          friday = friday_shifts[i];
          friday.id = createFridayShift.id;
        }
        setCreateFridayShift(friday);

        let saturday = {};
        const saturday_shifts = formatted?.filter(
          (shift) => shift?.day === "sat"
        );
        for (let i = 0; i < saturday_shifts?.length; i++) {
          saturday = saturday_shifts[i];
          saturday.id = createSaturdayShift.id;
        }
        setCreateSaturdayShift(saturday);

        let sunday = {};
        const sunday_shifts = formatted?.filter(
          (shift) => shift?.day === "sun"
        );
        for (let i = 0; i < sunday_shifts?.length; i++) {
          sunday = sunday_shifts[i];
          sunday.id = createSundayShift.id;
        }
        setCreateSundayShift(sunday);
      });
  };

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="col" style={{ marginBottom: "30px" }}>
            <h4>Create Remote Employee Shift</h4>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="schedule">Shift Schedules</label>
                  <Select
                    options={scheduleOpts}
                    isSearchable={true}
                    placeholder="Select a shift schedule..."
                    onChange={(e) => handleScheduleClick(e)}
                    style={{ display: "inline-block" }}
                  />
                </div>
              </div>
            </div>

            <hr />

            <form onSubmit={handleCreateEmployeeShift}>
              {/* Monday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createMondayShift.day === "mon" && "Monday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createMondayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createMondayShift.off}
                      onChange={() =>
                        setCreateMondayShift({
                          ...createMondayShift,
                          off: !createMondayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Tuesday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createTuesdayShift.day === "tue" && "Tuesday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createTuesdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createTuesdayShift.off}
                      onChange={() =>
                        setCreateTuesdayShift({
                          ...createTuesdayShift,
                          off: !createTuesdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Wednesday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createWednesdayShift.day === "wed" && "Wednesday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createWednesdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createWednesdayShift.off}
                      onChange={() =>
                        setCreateWednesdayShift({
                          ...createWednesdayShift,
                          off: !createWednesdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Thursday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createThursdayShift.day === "thu" && "Thursday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createThursdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createThursdayShift.off}
                      onChange={() =>
                        setCreateThursdayShift({
                          ...createThursdayShift,
                          off: !createThursdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Friday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createFridayShift.day === "fri" && "Friday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createFridayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createFridayShift.off}
                      onChange={() =>
                        setCreateFridayShift({
                          ...createFridayShift,
                          off: !createFridayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Saturday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createSaturdayShift.day === "sat" && "Saturday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createSaturdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createSaturdayShift.off}
                      onChange={() =>
                        setCreateSaturdayShift({
                          ...createSaturdayShift,
                          off: !createSaturdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              {/* Sunday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createSundayShift.day === "sun" && "Sunday"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="btn-group">
                    {createSundayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      defaultChecked
                      value={createSundayShift.off}
                      onChange={() =>
                        setCreateSundayShift({
                          ...createSundayShift,
                          off: !createSundayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
