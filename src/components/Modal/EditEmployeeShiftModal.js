import React, { useState, useEffect } from "react";
import { huddleOptions } from "../FormJSON/CreateEmployeeShift";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import Select from "react-select";
import Switch from "@mui/material/Switch";

export const EditEmployeeShiftModal = ({
  employeeShifts,
  setEmployeeShifts,
  userID,
  employeeID,
  officeID,
}) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState({});
  const [createTuesdayShift, setCreateTuesdayShift] = useState({});
  const [createWednesdayShift, setCreateWednesdayShift] = useState({});
  const [createThursdayShift, setCreateThursdayShift] = useState({});
  const [createFridayShift, setCreateFridayShift] = useState({});
  const [createSaturdayShift, setCreateSaturdayShift] = useState({});
  const [createSundayShift, setCreateSundayShift] = useState({});

  const [loading, setLoading] = useState(false);
  const [scheduleOpts, setScheduleOpts] = useState([]);

  useEffect(() => {

    const formattedEmployeeShifts = employeeShifts?.map((shift) => ({
      day: shift.day,
      start_time: shift.start_time,
      end_time: shift.end_time,
      off: shift.off,
      huddle: shift.huddle,
      huddle_time: shift.huddle_time,
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
  }, [employeeShifts, officeID, userID]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEditEmployeeShift = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shifts = [];

      shifts.push(createMondayShift);
      shifts.push(createTuesdayShift);
      shifts.push(createWednesdayShift);
      shifts.push(createThursdayShift);
      shifts.push(createFridayShift);
      shifts.push(createSaturdayShift);
      shifts.push(createSundayShift);

      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/shifts/${employeeID}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            hr_user_id: userID,
            operation_office_id: officeID,
            days: shifts,
          },
        }
      );

      setLoading(false);
      goToTop();
      showAlert(true, `Shift updated successfully!`, "alert alert-success");
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      console.error(error?.response);
      setLoading(false);
    }
  };

  // const fetchOwnersSchedule = async () => {
  //   try {
  //     const schedules = await axiosInstance.get(`/campaign-schedules/owner`);
  //     const schedule = schedules?.data?.data;

  //     const scheduleOpts = schedule?.map((e) => {
  //       return {
  //         label: e.title,
  //         value: e.id,
  //       };
  //     });
  //     setScheduleOpts(scheduleOpts);
  //   } catch (error) {
  //     console.error(error?.response);
  //   }
  // }

  useEffect(() => {
    // fetchOwnersSchedule();
  }, []);

  const handleScheduleClick = (e) => {
    const scheduleId = e?.value;

    axiosInstance.get(`/campaign-schedule-items/${scheduleId}`).then((e) => {
      let resData = e?.data?.data;

      const formatted = resData?.map((e) => ({
        day: e.day,
        off: e.off,
        start_time: e.start_time,
        end_time: e.end_time,
        userID,
        huddle: e.huddle,
        huddle_time: e.huddle_time,
      }));

      let monday = {};
      const monday_shifts = formatted?.filter((shift) => shift?.day === "mon");
      for (let i = 0; i < monday_shifts?.length; i++) {
        monday = monday_shifts[i];
        monday.id = createMondayShift.id;
      }
      setCreateMondayShift(monday);

      let tuesday = {};
      const tuesday_shifts = formatted?.filter((shift) => shift?.day === "tue");
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
      const friday_shifts = formatted?.filter((shift) => shift?.day === "fri");
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
      const sunday_shifts = formatted?.filter((shift) => shift?.day === "sun");
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
            <h4>Edit Employee Shift</h4>
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

            <form onSubmit={handleEditEmployeeShift}>
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
                {!createMondayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="mon_start">Start</label>
                      <input
                        name="mon_start"
                        type="time"
                        className="form-control"
                        value={createMondayShift.start_time}
                        onChange={(e) =>
                          setCreateMondayShift({
                            ...createMondayShift,
                            start_time: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCreateMondayShift({
                            ...createMondayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateMondayShift({
                          ...createMondayShift,
                          off: !createMondayShift?.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createMondayShift?.off && createMondayShift?.huddle
                      }
                      value={createMondayShift?.huddle}
                      onChange={() =>
                        setCreateMondayShift({
                          ...createMondayShift,
                          huddle: !createMondayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createMondayShift?.off && createMondayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createMondayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateMondayShift({
                            ...createMondayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                        onChange={(e) =>
                          setCreateTuesdayShift({
                            ...createTuesdayShift,
                            start_time: e.target.value,
                          })
                        }
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
                          !createTuesdayShift.off && createTuesdayShift.end_time
                        }
                        onChange={(e) =>
                          setCreateTuesdayShift({
                            ...createTuesdayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateTuesdayShift({
                          ...createTuesdayShift,
                          off: !createTuesdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createTuesdayShift?.off && createTuesdayShift?.huddle
                      }
                      value={createTuesdayShift?.huddle}
                      onChange={() =>
                        setCreateTuesdayShift({
                          ...createTuesdayShift,
                          huddle: !createTuesdayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createTuesdayShift?.off && createTuesdayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createTuesdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateTuesdayShift({
                            ...createTuesdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                        onChange={(e) =>
                          setCreateWednesdayShift({
                            ...createWednesdayShift,
                            start_time: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCreateWednesdayShift({
                            ...createWednesdayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateWednesdayShift({
                          ...createWednesdayShift,
                          off: !createWednesdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createWednesdayShift?.off &&
                        createWednesdayShift?.huddle
                      }
                      value={createWednesdayShift?.huddle}
                      onChange={() =>
                        setCreateWednesdayShift({
                          ...createWednesdayShift,
                          huddle: !createWednesdayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createWednesdayShift?.off && createWednesdayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createWednesdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateWednesdayShift({
                            ...createWednesdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                        onChange={(e) =>
                          setCreateThursdayShift({
                            ...createThursdayShift,
                            start_time: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCreateThursdayShift({
                            ...createThursdayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateThursdayShift({
                          ...createThursdayShift,
                          off: !createThursdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createThursdayShift?.off && createThursdayShift?.huddle
                      }
                      value={createThursdayShift?.huddle}
                      onChange={() =>
                        setCreateThursdayShift({
                          ...createThursdayShift,
                          huddle: !createThursdayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createThursdayShift?.off && createThursdayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createThursdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateThursdayShift({
                            ...createThursdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                {!createFridayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="fri_start">Start</label>
                      <input
                        name="fri_start"
                        type="time"
                        className="form-control"
                        value={
                          !createFridayShift.off && createFridayShift.start_time
                        }
                        onChange={(e) =>
                          setCreateFridayShift({
                            ...createFridayShift,
                            start_time: e.target.value,
                          })
                        }
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
                          !createFridayShift.off && createFridayShift.end_time
                        }
                        onChange={(e) =>
                          setCreateFridayShift({
                            ...createFridayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateFridayShift({
                          ...createFridayShift,
                          off: !createFridayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createFridayShift?.off && createFridayShift?.huddle
                      }
                      value={createFridayShift?.huddle}
                      onChange={() =>
                        setCreateFridayShift({
                          ...createFridayShift,
                          huddle: !createFridayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createFridayShift?.off && createFridayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createFridayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateFridayShift({
                            ...createFridayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                        onChange={(e) =>
                          setCreateSaturdayShift({
                            ...createSaturdayShift,
                            start_time: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCreateSaturdayShift({
                            ...createSaturdayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateSaturdayShift({
                          ...createSaturdayShift,
                          off: !createSaturdayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createSaturdayShift?.off && createSaturdayShift?.huddle
                      }
                      value={createSaturdayShift?.huddle}
                      onChange={() =>
                        setCreateSaturdayShift({
                          ...createSaturdayShift,
                          huddle: !createSaturdayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createSaturdayShift?.off && createSaturdayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createSaturdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateSaturdayShift({
                            ...createSaturdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
                {!createSundayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sun_start">Start</label>
                      <input
                        name="sun_start"
                        type="time"
                        className="form-control"
                        value={
                          !createSundayShift.off && createSundayShift.start_time
                        }
                        onChange={(e) =>
                          setCreateSundayShift({
                            ...createSundayShift,
                            start_time: e.target.value,
                          })
                        }
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
                          !createSundayShift.off && createSundayShift.end_time
                        }
                        onChange={(e) =>
                          setCreateSundayShift({
                            ...createSundayShift,
                            end_time: e.target.value,
                          })
                        }
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
                      onChange={() =>
                        setCreateSundayShift({
                          ...createSundayShift,
                          off: !createSundayShift.off,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !createSundayShift?.off && createSundayShift?.huddle
                      }
                      value={createSundayShift?.huddle}
                      onChange={() =>
                        setCreateSundayShift({
                          ...createSundayShift,
                          huddle: !createSundayShift?.huddle,
                        })
                      }
                    />
                  </div>
                </div>
                {!createSundayShift?.off && createSundayShift?.huddle && (
                  <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === createSundayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setCreateSundayShift({
                            ...createSundayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                )}
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
