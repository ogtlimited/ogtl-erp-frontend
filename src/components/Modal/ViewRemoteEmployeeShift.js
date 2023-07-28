import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";

export const ViewRemoteEmployeeShift = ({ employeeShifts, userID }) => {

  const [createMondayShift, setCreateMondayShift] = useState({});
  const [createTuesdayShift, setCreateTuesdayShift] = useState({});
  const [createWednesdayShift, setCreateWednesdayShift] = useState({});
  const [createThursdayShift, setCreateThursdayShift] = useState({});
  const [createFridayShift, setCreateFridayShift] = useState({});
  const [createSaturdayShift, setCreateSaturdayShift] = useState({});
  const [createSundayShift, setCreateSundayShift] = useState({});

  useEffect(() => {

    const formattedEmployeeShifts = employeeShifts?.map((shift) => ({
      day: shift.day,
      start_time: shift.start_time,
      end_time: shift.end_time,
      off: shift.off,
      huddle: shift.huddle,
      huddle_time: shift.huddle_time,
      hr_user_id: shift.hr_user_id,
      id: shift.id,
    }));

    let monday = {};
    const monday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "mon"
    );
    for (let i = 0; i < monday_shifts?.length; i++) {
      monday = monday_shifts[i];
    }
    setCreateMondayShift(monday);

    let tuesday = {};
    const tuesday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "tue"
    );
    for (let i = 0; i < tuesday_shifts?.length; i++) {
      tuesday = tuesday_shifts[i];
    }
    setCreateTuesdayShift(tuesday);

    let wednesday = {};
    const wednesday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "wed"
    );
    for (let i = 0; i < wednesday_shifts?.length; i++) {
      wednesday = wednesday_shifts[i];
    }
    setCreateWednesdayShift(wednesday);

    let thursday = {};
    const thursday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "thu"
    );
    for (let i = 0; i < thursday_shifts?.length; i++) {
      thursday = thursday_shifts[i];
    }
    setCreateThursdayShift(thursday);

    let friday = {};
    const friday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "fri"
    );
    for (let i = 0; i < friday_shifts?.length; i++) {
      friday = friday_shifts[i];
    }
    setCreateFridayShift(friday);

    let saturday = {};
    const saturday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "sat"
    );
    for (let i = 0; i < saturday_shifts?.length; i++) {
      saturday = saturday_shifts[i];
    }
    setCreateSaturdayShift(saturday);

    let sunday = {};
    const sunday_shifts = formattedEmployeeShifts?.filter(
      (shift) => shift?.day === "sun"
    );
    for (let i = 0; i < sunday_shifts?.length; i++) {
      sunday = sunday_shifts[i];
    }
    setCreateSundayShift(sunday);
  }, [employeeShifts]);

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="col" style={{ marginBottom: "30px" }}>
            <h4>Shifts</h4>
          </div>

          {employeeShifts.length ? (
            <div className="modal-body">
              <div>
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
                        checked={!createMondayShift?.off}
                        value={createMondayShift?.off}
                        disabled={true}
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
                        checked={!createTuesdayShift?.off}
                        value={createTuesdayShift.off}
                        disabled={true}
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
                        value={
                          createWednesdayShift.day === "wed" && "Wednesday"
                        }
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
                        checked={!createWednesdayShift?.off}
                        value={createWednesdayShift.off}
                        disabled={true}
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
                        checked={!createThursdayShift?.off}
                        value={createThursdayShift.off}
                        disabled={true}
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
                        checked={!createFridayShift?.off}
                        value={createFridayShift.off}
                        disabled={true}
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
                        checked={!createSaturdayShift?.off}
                        value={createSaturdayShift.off}
                        disabled={true}
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
                        checked={!createSundayShift?.off}
                        value={createSundayShift.off}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>

                <br />
              </div>
            </div>
          ) : (
            <div className="col">
              <h4 style={{ fontSize: 16 }}>
                You haven't being assigned shifts, reach out to your Supervisor
                or Team lead{" "}
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
