/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { huddleOptions } from "../FormJSON/CreateShiftSchedule";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";
import axiosInstance from "../../services/api";
import Switch from "@mui/material/Switch";
import $ from "jquery";

export const ViewCampaignScheduleTimeModal = ({
  fetchAllSchedule,
  editSchedule,
  loading,
}) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState({});
  const [createTuesdayShift, setCreateTuesdayShift] = useState({});
  const [createWednesdayShift, setCreateWednesdayShift] = useState({});
  const [createThursdayShift, setCreateThursdayShift] = useState({});
  const [createFridayShift, setCreateFridayShift] = useState({});
  const [createSaturdayShift, setCreateSaturdayShift] = useState({});
  const [createSundayShift, setCreateSundayShift] = useState({});

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    console.log("Edit this schedule time:", editSchedule);

    const formattedShiftSchedule = editSchedule?.map((shift) => ({
      day: shift.day,
      start_time: shift.start_time,
      end_time: shift.end_time,
      off: shift.off,
      huddle: shift.huddle,
      huddle_time: shift.huddle_time,
      id: shift.id,
    }));
    console.log("Edit formatted schedule time:", formattedShiftSchedule);

    let monday = {};
    const monday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "mon"
    );
    for (let i = 0; i < monday_shifts?.length; i++) {
      monday = monday_shifts[i];
    }
    setCreateMondayShift(monday);

    let tuesday = {};
    const tuesday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "tue"
    );
    for (let i = 0; i < tuesday_shifts?.length; i++) {
      tuesday = tuesday_shifts[i];
    }
    setCreateTuesdayShift(tuesday);

    let wednesday = {};
    const wednesday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "wed"
    );
    for (let i = 0; i < wednesday_shifts?.length; i++) {
      wednesday = wednesday_shifts[i];
    }
    setCreateWednesdayShift(wednesday);

    let thursday = {};
    const thursday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "thu"
    );
    for (let i = 0; i < thursday_shifts?.length; i++) {
      thursday = thursday_shifts[i];
    }
    setCreateThursdayShift(thursday);

    let friday = {};
    const friday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "fri"
    );
    for (let i = 0; i < friday_shifts?.length; i++) {
      friday = friday_shifts[i];
    }
    setCreateFridayShift(friday);

    let saturday = {};
    const saturday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "sat"
    );
    for (let i = 0; i < saturday_shifts?.length; i++) {
      saturday = saturday_shifts[i];
    }
    setCreateSaturdayShift(saturday);

    let sunday = {};
    const sunday_shifts = formattedShiftSchedule?.filter(
      (shift) => shift?.day === "sun"
    );
    for (let i = 0; i < sunday_shifts?.length; i++) {
      sunday = sunday_shifts[i];
    }
    setCreateSundayShift(sunday);
  }, [editSchedule]);


  return (
    <>
      <div
        className="modal fade"
        id="ViewCampaignScheduleTimeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                View schedule time
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {loading ? (
              <div
                style={{
                  padding: "20px 20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <div>
                  {/* Monday */}
                  <div className="row">
                    <div className="col-md-3">
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
                    {!createMondayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="mon_start">Start</label>
                          <input
                            name="mon_start"
                            type="time"
                            className="form-control"
                            value={createMondayShift.start_time}
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createMondayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="mon_end">End</label>
                          <input
                            name="mon_end"
                            type="time"
                            className="form-control"
                            value={createMondayShift.end_time}
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createMondayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createMondayShift?.off}
                          value={createMondayShift?.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createMondayShift?.off &&
                            createMondayShift?.huddles
                          }
                          value={createMondayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createMondayShift?.off && createMondayShift?.huddles && (
                      <div className="col-md-auto">
                        <div className="form-group">
                          <label htmlFor="huddleTime">Huddle Time</label>
                          <Select
                            options={huddleOptions}
                            isSearchable={true}
                            isClearable={true}
                            defaultValue={huddleOptions.find(
                              (option) =>
                                option.value === createMondayShift?.huddleTime
                            )}
                            disabled={true}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <hr />

                  {/* Tuesday */}
                  <div className="row">
                    <div className="col-md-3">
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
                    {!createTuesdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="tue_start">Start</label>
                          <input
                            name="tue_start"
                            type="time"
                            className="form-control"
                            value={
                              !createTuesdayShift.off &&
                              createTuesdayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createTuesdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="tue_end">End</label>
                          <input
                            name="tue_end"
                            type="time"
                            className="form-control"
                            value={
                              !createTuesdayShift.off &&
                              createTuesdayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createTuesdayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createTuesdayShift?.off}
                          value={createTuesdayShift.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createTuesdayShift?.off &&
                            createTuesdayShift?.huddles
                          }
                          value={createTuesdayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createTuesdayShift?.off &&
                      createTuesdayShift?.huddles && (
                        <div className="col-md-auto">
                          <div className="form-group">
                            <label htmlFor="huddleTime">Huddle Time</label>
                            <Select
                              options={huddleOptions}
                              isSearchable={true}
                              isClearable={true}
                              defaultValue={huddleOptions.find(
                                (option) =>
                                  option.value ===
                                  createTuesdayShift?.huddleTime
                              )}
                              disabled={true}
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
                      )}
                  </div>

                  <hr />

                  {/* Wednesday */}
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="day">Day</label>
                        <input
                          className="form-control"
                          name="day"
                          type="text"
                          value={
                            createWednesdayShift.day === "wed" && "Wednesday"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    {!createWednesdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="wed_start">Start</label>
                          <input
                            name="wed_start"
                            type="time"
                            className="form-control"
                            value={
                              !createWednesdayShift.off &&
                              createWednesdayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createWednesdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="wed_end">End</label>
                          <input
                            name="wed_end"
                            type="time"
                            className="form-control"
                            value={
                              !createWednesdayShift.off &&
                              createWednesdayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createWednesdayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createWednesdayShift?.off}
                          value={createWednesdayShift.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createWednesdayShift?.off &&
                            createWednesdayShift?.huddles
                          }
                          value={createWednesdayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createWednesdayShift?.off &&
                      createWednesdayShift?.huddles && (
                        <div className="col-md-auto">
                          <div className="form-group">
                            <label htmlFor="huddleTime">Huddle Time</label>
                            <Select
                              options={huddleOptions}
                              isSearchable={true}
                              isClearable={true}
                              defaultValue={huddleOptions.find(
                                (option) =>
                                  option.value ===
                                  createWednesdayShift?.huddleTime
                              )}
                              disabled={true}
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
                      )}
                  </div>

                  <hr />

                  {/* Thursday */}
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="day">Day</label>
                        <input
                          className="form-control"
                          name="day"
                          type="text"
                          value={
                            createThursdayShift.day === "thu" && "Thursday"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    {!createThursdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="thu_start">Start</label>
                          <input
                            name="thu_start"
                            type="time"
                            className="form-control"
                            value={
                              !createThursdayShift.off &&
                              createThursdayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createThursdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="thu_end">End</label>
                          <input
                            name="thu_end"
                            type="time"
                            className="form-control"
                            value={
                              !createThursdayShift.off &&
                              createThursdayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createThursdayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createThursdayShift?.off}
                          value={createThursdayShift.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createThursdayShift?.off &&
                            createThursdayShift?.huddles
                          }
                          value={createThursdayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createThursdayShift?.off &&
                      createThursdayShift?.huddles && (
                        <div className="col-md-auto">
                          <div className="form-group">
                            <label htmlFor="huddleTime">Huddle Time</label>
                            <Select
                              options={huddleOptions}
                              isSearchable={true}
                              isClearable={true}
                              defaultValue={huddleOptions.find(
                                (option) =>
                                  option.value ===
                                  createThursdayShift?.huddleTime
                              )}
                              disabled={true}
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
                      )}
                  </div>

                  <hr />

                  {/* Friday */}
                  <div className="row">
                    <div className="col-md-3">
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
                    {!createFridayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="fri_start">Start</label>
                          <input
                            name="fri_start"
                            type="time"
                            className="form-control"
                            value={
                              !createFridayShift.off &&
                              createFridayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createFridayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="fri_end">End</label>
                          <input
                            name="fri_end"
                            type="time"
                            className="form-control"
                            value={
                              !createFridayShift.off &&
                              createFridayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createFridayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createFridayShift?.off}
                          value={createFridayShift.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createFridayShift?.off &&
                            createFridayShift?.huddles
                          }
                          value={createFridayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createFridayShift?.off && createFridayShift?.huddles && (
                      <div className="col-md-auto">
                        <div className="form-group">
                          <label htmlFor="huddleTime">Huddle Time</label>
                          <Select
                            options={huddleOptions}
                            isSearchable={true}
                            isClearable={true}
                            defaultValue={huddleOptions.find(
                              (option) =>
                                option.value === createFridayShift?.huddleTime
                            )}
                            disabled={true}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <hr />

                  {/* Saturday */}
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="day">Day</label>
                        <input
                          className="form-control"
                          name="day"
                          type="text"
                          value={
                            createSaturdayShift.day === "sat" && "Saturday"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    {!createSaturdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="sat_start">Start</label>
                          <input
                            name="sat_start"
                            type="time"
                            className="form-control"
                            value={
                              !createSaturdayShift.off &&
                              createSaturdayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createSaturdayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="sat_end">End</label>
                          <input
                            name="sat_end"
                            type="time"
                            className="form-control"
                            value={
                              !createSaturdayShift.off &&
                              createSaturdayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createSaturdayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createSaturdayShift?.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createSaturdayShift?.off &&
                            createSaturdayShift?.huddles
                          }
                          value={createSaturdayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createSaturdayShift?.off &&
                      createSaturdayShift?.huddles && (
                        <div className="col-md-auto">
                          <div className="form-group">
                            <label htmlFor="huddleTime">Huddle Time</label>
                            <Select
                              options={huddleOptions}
                              isSearchable={true}
                              isClearable={true}
                              defaultValue={huddleOptions.find(
                                (option) =>
                                  option.value ===
                                  createSaturdayShift?.huddleTime
                              )}
                              disabled={true}
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        </div>
                      )}
                  </div>

                  <hr />

                  {/* Sunday */}
                  <div className="row">
                    <div className="col-md-3">
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
                    {!createSundayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="sun_start">Start</label>
                          <input
                            name="sun_start"
                            type="time"
                            className="form-control"
                            value={
                              !createSundayShift.off &&
                              createSundayShift.start_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    {!createSundayShift.off && (
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="sun_end">End</label>
                          <input
                            name="sun_end"
                            type="time"
                            className="form-control"
                            value={
                              !createSundayShift.off &&
                              createSundayShift.end_time
                            }
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-auto shift-off-toggle">
                      <div className="btn-group">
                        {createSundayShift.off ? (
                          <label htmlFor="off"> Day Off</label>
                        ) : (
                          <label htmlFor="off">Work Day</label>
                        )}
                        <Switch
                          checked={!createSundayShift?.off}
                          value={createSundayShift.off}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-auto shift-item-toggle">
                      <div className="btn-group">
                        <label htmlFor="huddles">Huddle</label>
                        <Switch
                          checked={
                            !createSundayShift?.off &&
                            createSundayShift?.huddles
                          }
                          value={createSundayShift?.huddles}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {!createSundayShift?.off && createSundayShift?.huddles && (
                      <div className="col-md-auto">
                        <div className="form-group">
                          <label htmlFor="huddleTime">Huddle Time</label>
                          <Select
                            options={huddleOptions}
                            isSearchable={true}
                            isClearable={true}
                            defaultValue={huddleOptions.find(
                              (option) =>
                                option.value === createSundayShift?.huddleTime
                            )}
                            disabled={true}
                            style={{ display: "inline-block" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
