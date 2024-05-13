import React, { useState, useEffect } from "react";
import { huddleOptions } from "../FormJSON/CreateEmployeeShift";
import { useAppContext } from "../../Context/AppContext";
import { IoIosWarning } from "react-icons/io";
import axiosInstance from "../../services/api";
import Select from "react-select";
import Switch from "@mui/material/Switch";
import moment from "moment";

export const EditEmployeeShiftModal = ({
  employeeShifts,
  userID,
  employeeID,
  officeID,
}) => {
  const { showAlert } = useAppContext();

  const [updateMondayShift, setUpdateMondayShift] = useState({});
  const [updateTuesdayShift, setUpdateTuesdayShift] = useState({});
  const [updateWednesdayShift, setUpdateWednesdayShift] = useState({});
  const [updateThursdayShift, setUpdateThursdayShift] = useState({});
  const [updateFridayShift, setUpdateFridayShift] = useState({});
  const [updateSaturdayShift, setUpdateSaturdayShift] = useState({});
  const [updateSundayShift, setUpdateSundayShift] = useState({});

  const [loading, setLoading] = useState(false);
  const [scheduleOpts, setScheduleOpts] = useState([]);

  const currentDay = moment().format("dddd");

  // * OLD UPDATE FUNCTION!

  // useEffect(() => {

  //   const formattedEmployeeShifts = employeeShifts?.map((shift) => ({
  //     day: shift.day,
  //     start_time: shift.start_time,
  //     end_time: shift.end_time,
  //     off: shift.off,
  //     huddle: shift.huddle,
  //     huddle_time: shift.huddle_time,
  //     id: shift.id,
  //   }));

  //   let monday = {};
  //   const monday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "mon"
  //   );
  //   for (let i = 0; i < monday_shifts?.length; i++) {
  //     monday = monday_shifts[i];
  //   }
  //   setUpdateMondayShift(monday);

  //   let tuesday = {};
  //   const tuesday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "tue"
  //   );
  //   for (let i = 0; i < tuesday_shifts?.length; i++) {
  //     tuesday = tuesday_shifts[i];
  //   }
  //   setUpdateTuesdayShift(tuesday);

  //   let wednesday = {};
  //   const wednesday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "wed"
  //   );
  //   for (let i = 0; i < wednesday_shifts?.length; i++) {
  //     wednesday = wednesday_shifts[i];
  //   }
  //   setUpdateWednesdayShift(wednesday);

  //   let thursday = {};
  //   const thursday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "thu"
  //   );
  //   for (let i = 0; i < thursday_shifts?.length; i++) {
  //     thursday = thursday_shifts[i];
  //   }
  //   setUpdateThursdayShift(thursday);

  //   let friday = {};
  //   const friday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "fri"
  //   );
  //   for (let i = 0; i < friday_shifts?.length; i++) {
  //     friday = friday_shifts[i];
  //   }
  //   setUpdateFridayShift(friday);

  //   let saturday = {};
  //   const saturday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "sat"
  //   );
  //   for (let i = 0; i < saturday_shifts?.length; i++) {
  //     saturday = saturday_shifts[i];
  //   }
  //   setUpdateSaturdayShift(saturday);

  //   let sunday = {};
  //   const sunday_shifts = formattedEmployeeShifts?.filter(
  //     (shift) => shift?.day === "sun"
  //   );
  //   for (let i = 0; i < sunday_shifts?.length; i++) {
  //     sunday = sunday_shifts[i];
  //   }
  //   setUpdateSundayShift(sunday);
  // }, [employeeShifts, officeID, userID]);

  useEffect(() => {
    if (!employeeShifts) return;

    const formattedShiftsByDay = {
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    };

    employeeShifts.forEach((shift) => {
      formattedShiftsByDay[shift.day] = {
        day: shift.day,
        start_time: shift.start_time,
        end_time: shift.end_time,
        off: shift.off,
        huddle: shift.huddle,
        huddle_time: shift.huddle_time,
        id: shift.id,
      };
    });

    setUpdateMondayShift(formattedShiftsByDay.mon);
    setUpdateTuesdayShift(formattedShiftsByDay.tue);
    setUpdateWednesdayShift(formattedShiftsByDay.wed);
    setUpdateThursdayShift(formattedShiftsByDay.thu);
    setUpdateFridayShift(formattedShiftsByDay.fri);
    setUpdateSaturdayShift(formattedShiftsByDay.sat);
    setUpdateSundayShift(formattedShiftsByDay.sun);
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

      shifts.push(updateMondayShift);
      shifts.push(updateTuesdayShift);
      shifts.push(updateWednesdayShift);
      shifts.push(updateThursdayShift);
      shifts.push(updateFridayShift);
      shifts.push(updateSaturdayShift);
      shifts.push(updateSundayShift);

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
            days: shifts,
          },
        }
      );

      setLoading(false);
      goToTop();
      showAlert(true, `Shift updated successfully!`, "alert alert-success");
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      console.error(error?.response);
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

  // * OLD SCHEDULE FUNCTION!

  // const handleScheduleClick = (e) => {
  //   const scheduleId = e?.value;

  //   axiosInstance
  //     .get(`/api/v1/employee_shifts_schedules/${scheduleId}.json`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //     })
  //     .then((e) => {
  //       let resData = e?.data?.data?.employee_shifts_schedule;

  //       const formatted = resData?.map((e) => ({
  //         day: e.day,
  //         start_time: e.start_time,
  //         end_time: e.end_time,
  //         off: e.off,
  //         huddle: e.huddle,
  //         huddle_time: e.huddle_time,
  //         id: e.id,
  //       }));

  //       let monday = {};
  //       const monday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "mon"
  //       );
  //       for (let i = 0; i < monday_shifts?.length; i++) {
  //         monday = monday_shifts[i];
  //         monday.id = updateMondayShift.id;
  //       }
  //       setUpdateMondayShift(monday);

  //       let tuesday = {};
  //       const tuesday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "tue"
  //       );
  //       for (let i = 0; i < tuesday_shifts?.length; i++) {
  //         tuesday = tuesday_shifts[i];
  //         tuesday.id = updateTuesdayShift.id;
  //       }
  //       setUpdateTuesdayShift(tuesday);

  //       let wednesday = {};
  //       const wednesday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "wed"
  //       );
  //       for (let i = 0; i < wednesday_shifts?.length; i++) {
  //         wednesday = wednesday_shifts[i];
  //         wednesday.id = updateWednesdayShift.id;
  //       }
  //       setUpdateWednesdayShift(wednesday);

  //       let thursday = {};
  //       const thursday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "thu"
  //       );
  //       for (let i = 0; i < thursday_shifts?.length; i++) {
  //         thursday = thursday_shifts[i];
  //         thursday.id = updateThursdayShift.id;
  //       }
  //       setUpdateThursdayShift(thursday);

  //       let friday = {};
  //       const friday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "fri"
  //       );
  //       for (let i = 0; i < friday_shifts?.length; i++) {
  //         friday = friday_shifts[i];
  //         friday.id = updateFridayShift.id;
  //       }
  //       setUpdateFridayShift(friday);

  //       let saturday = {};
  //       const saturday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "sat"
  //       );
  //       for (let i = 0; i < saturday_shifts?.length; i++) {
  //         saturday = saturday_shifts[i];
  //         saturday.id = updateSaturdayShift.id;
  //       }
  //       setUpdateSaturdayShift(saturday);

  //       let sunday = {};
  //       const sunday_shifts = formatted?.filter(
  //         (shift) => shift?.day === "sun"
  //       );
  //       for (let i = 0; i < sunday_shifts?.length; i++) {
  //         sunday = sunday_shifts[i];
  //         sunday.id = updateSundayShift.id;
  //       }
  //       setUpdateSundayShift(sunday);
  //     });
  // };

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
      .then((response) => {
        const resData = response?.data?.data?.employee_shifts_schedule;

        const formatted = resData?.map((entry) => ({
          day: entry.day,
          start_time: entry.start_time,
          end_time: entry.end_time,
          off: entry.off,
          huddle: entry.huddle,
          huddle_time: entry.huddle_time,
          id: entry.id,
        }));

        const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

        const updatedShifts = {};

        daysOfWeek.forEach((day) => {
          const filteredShifts = formatted?.filter(
            (shift) => shift?.day === day
          );
          const updatedShift = filteredShifts[0] || {};
          updatedShift.id = updateShiftId(day);
          updatedShifts[day] = updatedShift;
        });

        setUpdateMondayShift(updatedShifts.mon);
        setUpdateTuesdayShift(updatedShifts.tue);
        setUpdateWednesdayShift(updatedShifts.wed);
        setUpdateThursdayShift(updatedShifts.thu);
        setUpdateFridayShift(updatedShifts.fri);
        setUpdateSaturdayShift(updatedShifts.sat);
        setUpdateSundayShift(updatedShifts.sun);
      });
  };

  const updateShiftId = (day) => {
    switch (day) {
      case "mon":
        return updateMondayShift.id;
      case "tue":
        return updateTuesdayShift.id;
      case "wed":
        return updateWednesdayShift.id;
      case "thu":
        return updateThursdayShift.id;
      case "fri":
        return updateFridayShift.id;
      case "sat":
        return updateSaturdayShift.id;
      case "sun":
        return updateSundayShift.id;
      default:
        return null;
    }
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

            <div className="shift_update_div">
              <IoIosWarning className="shift_update-warning text-warning" />
              <p>You can not update today's ({currentDay}) shift</p>
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
                      value={updateMondayShift.day === "mon" && "Monday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateMondayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="mon_start">Start</label>
                      <input
                        name="mon_start"
                        type="time"
                        className="form-control"
                        value={updateMondayShift.start_time}
                        onChange={(e) =>
                          setUpdateMondayShift({
                            ...updateMondayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Monday"}
                      />
                    </div>
                  </div>
                )}
                {!updateMondayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="mon_end">End</label>
                      <input
                        name="mon_end"
                        type="time"
                        className="form-control"
                        value={updateMondayShift.end_time}
                        onChange={(e) =>
                          setUpdateMondayShift({
                            ...updateMondayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Monday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateMondayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateMondayShift?.off}
                      value={updateMondayShift?.off}
                      onChange={() =>
                        setUpdateMondayShift({
                          ...updateMondayShift,
                          start_time: !updateMondayShift?.off && null,
                          end_time: !updateMondayShift?.off && null,
                          off: !updateMondayShift?.off,
                        })
                      }
                      disabled={currentDay === "Monday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateMondayShift?.off && updateMondayShift?.huddle
                      }
                      value={updateMondayShift?.huddle}
                      onChange={() =>
                        setUpdateMondayShift({
                          ...updateMondayShift,
                          huddle: !updateMondayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Monday"}
                    />
                  </div>
                </div>
                {!updateMondayShift?.off && updateMondayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateMondayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateMondayShift({
                            ...updateMondayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Monday"}
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
                      value={updateTuesdayShift.day === "tue" && "Tuesday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateTuesdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="tue_start">Start</label>
                      <input
                        name="tue_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateTuesdayShift.off &&
                          updateTuesdayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateTuesdayShift({
                            ...updateTuesdayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Tuesday"}
                      />
                    </div>
                  </div>
                )}
                {!updateTuesdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="tue_end">End</label>
                      <input
                        name="tue_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateTuesdayShift.off && updateTuesdayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateTuesdayShift({
                            ...updateTuesdayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Tuesday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateTuesdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateTuesdayShift?.off}
                      value={updateTuesdayShift.off}
                      onChange={() =>
                        setUpdateTuesdayShift({
                          ...updateTuesdayShift,
                          start_time: !updateTuesdayShift?.off && null,
                          end_time: !updateTuesdayShift?.off && null,
                          off: !updateTuesdayShift.off,
                        })
                      }
                      disabled={currentDay === "Tuesday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateTuesdayShift?.off && updateTuesdayShift?.huddle
                      }
                      value={updateTuesdayShift?.huddle}
                      onChange={() =>
                        setUpdateTuesdayShift({
                          ...updateTuesdayShift,
                          huddle: !updateTuesdayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Tuesday"}
                    />
                  </div>
                </div>
                {!updateTuesdayShift?.off && updateTuesdayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateTuesdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateTuesdayShift({
                            ...updateTuesdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Tuesday"}
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
                      value={updateWednesdayShift.day === "wed" && "Wednesday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateWednesdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="wed_start">Start</label>
                      <input
                        name="wed_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateWednesdayShift.off &&
                          updateWednesdayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateWednesdayShift({
                            ...updateWednesdayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Wednesday"}
                      />
                    </div>
                  </div>
                )}
                {!updateWednesdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="wed_end">End</label>
                      <input
                        name="wed_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateWednesdayShift.off &&
                          updateWednesdayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateWednesdayShift({
                            ...updateWednesdayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Wednesday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateWednesdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateWednesdayShift?.off}
                      value={updateWednesdayShift.off}
                      onChange={() =>
                        setUpdateWednesdayShift({
                          ...updateWednesdayShift,
                          start_time: !updateWednesdayShift?.off && null,
                          end_time: !updateWednesdayShift?.off && null,
                          off: !updateWednesdayShift.off,
                        })
                      }
                      disabled={currentDay === "Wednesday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateWednesdayShift?.off &&
                        updateWednesdayShift?.huddle
                      }
                      value={updateWednesdayShift?.huddle}
                      onChange={() =>
                        setUpdateWednesdayShift({
                          ...updateWednesdayShift,
                          huddle: !updateWednesdayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Wednesday"}
                    />
                  </div>
                </div>
                {!updateWednesdayShift?.off && updateWednesdayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateWednesdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateWednesdayShift({
                            ...updateWednesdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Wednesday"}
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
                      value={updateThursdayShift.day === "thu" && "Thursday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateThursdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="thu_start">Start</label>
                      <input
                        name="thu_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateThursdayShift.off &&
                          updateThursdayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateThursdayShift({
                            ...updateThursdayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Thursday"}
                      />
                    </div>
                  </div>
                )}
                {!updateThursdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="thu_end">End</label>
                      <input
                        name="thu_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateThursdayShift.off &&
                          updateThursdayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateThursdayShift({
                            ...updateThursdayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Thursday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateThursdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateThursdayShift?.off}
                      value={updateThursdayShift.off}
                      onChange={() =>
                        setUpdateThursdayShift({
                          ...updateThursdayShift,
                          start_time: !updateThursdayShift?.off && null,
                          end_time: !updateThursdayShift?.off && null,
                          off: !updateThursdayShift.off,
                        })
                      }
                      disabled={currentDay === "Thursday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateThursdayShift?.off && updateThursdayShift?.huddle
                      }
                      value={updateThursdayShift?.huddle}
                      onChange={() =>
                        setUpdateThursdayShift({
                          ...updateThursdayShift,
                          huddle: !updateThursdayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Thursday"}
                    />
                  </div>
                </div>
                {!updateThursdayShift?.off && updateThursdayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateThursdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateThursdayShift({
                            ...updateThursdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Thursday"}
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
                      value={updateFridayShift.day === "fri" && "Friday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateFridayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="fri_start">Start</label>
                      <input
                        name="fri_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateFridayShift.off && updateFridayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateFridayShift({
                            ...updateFridayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Friday"}
                      />
                    </div>
                  </div>
                )}
                {!updateFridayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="fri_end">End</label>
                      <input
                        name="fri_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateFridayShift.off && updateFridayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateFridayShift({
                            ...updateFridayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Friday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateFridayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateFridayShift?.off}
                      value={updateFridayShift.off}
                      onChange={() =>
                        setUpdateFridayShift({
                          ...updateFridayShift,
                          start_time: !updateFridayShift?.off && null,
                          end_time: !updateFridayShift?.off && null,
                          off: !updateFridayShift.off,
                        })
                      }
                      disabled={currentDay === "Friday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateFridayShift?.off && updateFridayShift?.huddle
                      }
                      value={updateFridayShift?.huddle}
                      onChange={() =>
                        setUpdateFridayShift({
                          ...updateFridayShift,
                          huddle: !updateFridayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Friday"}
                    />
                  </div>
                </div>
                {!updateFridayShift?.off && updateFridayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateFridayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateFridayShift({
                            ...updateFridayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Friday"}
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
                      value={updateSaturdayShift.day === "sat" && "Saturday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateSaturdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sat_start">Start</label>
                      <input
                        name="sat_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateSaturdayShift.off &&
                          updateSaturdayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateSaturdayShift({
                            ...updateSaturdayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Saturday"}
                      />
                    </div>
                  </div>
                )}
                {!updateSaturdayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sat_end">End</label>
                      <input
                        name="sat_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateSaturdayShift.off &&
                          updateSaturdayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateSaturdayShift({
                            ...updateSaturdayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Saturday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateSaturdayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateSaturdayShift?.off}
                      onChange={() =>
                        setUpdateSaturdayShift({
                          ...updateSaturdayShift,
                          start_time: !updateSaturdayShift?.off && null,
                          end_time: !updateSaturdayShift?.off && null,
                          off: !updateSaturdayShift.off,
                        })
                      }
                      disabled={currentDay === "Saturday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateSaturdayShift?.off && updateSaturdayShift?.huddle
                      }
                      value={updateSaturdayShift?.huddle}
                      onChange={() =>
                        setUpdateSaturdayShift({
                          ...updateSaturdayShift,
                          huddle: !updateSaturdayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Saturday"}
                    />
                  </div>
                </div>
                {!updateSaturdayShift?.off && updateSaturdayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateSaturdayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateSaturdayShift({
                            ...updateSaturdayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Saturday"}
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
                      value={updateSundayShift.day === "sun" && "Sunday"}
                      readOnly
                    />
                  </div>
                </div>
                {!updateSundayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sun_start">Start</label>
                      <input
                        name="sun_start"
                        type="time"
                        className="form-control"
                        value={
                          !updateSundayShift.off && updateSundayShift.start_time
                        }
                        onChange={(e) =>
                          setUpdateSundayShift({
                            ...updateSundayShift,
                            start_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Sunday"}
                      />
                    </div>
                  </div>
                )}
                {!updateSundayShift.off && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sun_end">End</label>
                      <input
                        name="sun_end"
                        type="time"
                        className="form-control"
                        value={
                          !updateSundayShift.off && updateSundayShift.end_time
                        }
                        onChange={(e) =>
                          setUpdateSundayShift({
                            ...updateSundayShift,
                            end_time: e.target.value,
                          })
                        }
                        required
                        readOnly={currentDay === "Sunday"}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {updateSundayShift.off ? (
                      <label htmlFor="off"> Day Off</label>
                    ) : (
                      <label htmlFor="off">Work Day</label>
                    )}
                    <Switch
                      checked={!updateSundayShift?.off}
                      value={updateSundayShift.off}
                      onChange={() =>
                        setUpdateSundayShift({
                          ...updateSundayShift,
                          start_time: !updateSundayShift?.off && null,
                          end_time: !updateSundayShift?.off && null,
                          off: !updateSundayShift.off,
                        })
                      }
                      disabled={currentDay === "Sunday"}
                    />
                  </div>
                </div>
                <div className="col-md-auto shift-item-toggle">
                  <div className="btn-group">
                    <label htmlFor="huddle">Huddle</label>
                    <Switch
                      checked={
                        !updateSundayShift?.off && updateSundayShift?.huddle
                      }
                      value={updateSundayShift?.huddle}
                      onChange={() =>
                        setUpdateSundayShift({
                          ...updateSundayShift,
                          huddle: !updateSundayShift?.huddle,
                        })
                      }
                      disabled={currentDay === "Sunday"}
                    />
                  </div>
                </div>
                {!updateSundayShift?.off && updateSundayShift?.huddle && (
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="huddle_time">Huddle Time</label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find(
                          (option) =>
                            option.value === updateSundayShift?.huddle_time
                        )}
                        onChange={(e) =>
                          setUpdateSundayShift({
                            ...updateSundayShift,
                            huddle_time: e?.value,
                          })
                        }
                        style={{ display: "inline-block" }}
                        isDisabled={currentDay === "Sunday"}
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
                    "Update"
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
