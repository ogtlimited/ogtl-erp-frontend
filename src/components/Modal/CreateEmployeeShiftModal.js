/*eslint-disable no-unused-vars*/

import React, { useState, useEffect, useRef } from 'react';
import { 
  mondayShifts,
  tuesdayShifts,
  wednesdayShifts,
  thursdayShifts,
  fridayShifts,
  saturdayShifts,
  sundayShifts,
  huddleOptions,
} from '../FormJSON/CreateEmployeeShift';
import Select from 'react-select'
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import Switch from '@mui/material/Switch';
import { createBrowserHistory } from 'history';

export const CreateEmployeeShiftModal = ({ userID, setMode, fetchEmployeeShift, setEmployeeShifts }) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState(
    mondayShifts
  );
  const [createTuesdayShift, setCreateTuesdayShift] = useState(
    tuesdayShifts
  );
  const [createWednesdayShift, setCreateWednesdayShift] = useState(
    wednesdayShifts
  );
  const [createThursdayShift, setCreateThursdayShift] = useState(
    thursdayShifts
  );
  const [createFridayShift, setCreateFridayShift] = useState(
    fridayShifts
  );
  const [createSaturdayShift, setCreateSaturdayShift] = useState(
    saturdayShifts
  );
  const [createSundayShift, setCreateSundayShift] = useState(
    sundayShifts
  );

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

      const employeeShifts = {
        "hr_user_id": userID,
        "days": [
          createSundayShift,
          createMondayShift,
          createTuesdayShift,
          createWednesdayShift,
          createThursdayShift,
          createFridayShift,
          createSaturdayShift,
        ]
      }

      const response = await axiosInstance.post(`/api/v1/shifts.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: employeeShifts,	
      });
  
      setLoading(false);
      goToTop();
      setMode('edit');
      showAlert(
        true,
        `Shift created successfully!`,
        'alert alert-success'
      );
      fetchEmployeeShift();
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }

  };

  const fetchOwnersSchedule = async () => {
    try {
      const schedules = await axiosInstance.get(`/campaign-schedules/owner`);
      const schedule = schedules?.data?.data;

      const scheduleOpts = schedule?.map((e) => {
        return {
          label: e.title,
          value: e._id,
        };
      });
      setScheduleOpts(scheduleOpts);
    } catch (error) {
      console.error(error?.response);
    }
  }

  useEffect(() => {
    fetchOwnersSchedule();
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
          huddle: e.huddle,
          huddle_time: e.huddle_time,
        }));

      setCreateMondayShift(formatted[0]);
      setCreateTuesdayShift(formatted[1]);
      setCreateWednesdayShift(formatted[2]);
      setCreateThursdayShift(formatted[3]);
      setCreateFridayShift(formatted[4]);
      setCreateSaturdayShift(formatted[5]);
      setCreateSundayShift(formatted[6]);
    });
  }

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="col" style={{marginBottom: '30px'}}>
            <h4>Create Employee Shift</h4>
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
                      value={createMondayShift.day === 1 && 'Monday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createMondayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="mon_start">Start</label>
                      <input
                        name="mon_start"
                        type="time"
                        className="form-control"
                        value={!createMondayShift.off && createMondayShift.start_time}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createMondayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="mon_end">End</label>
                      <input
                        name="mon_end"
                        type="time"
                        className="form-control"
                        value={!createMondayShift.off && createMondayShift.end_time}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createMondayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createMondayShift.off} onChange={() => setCreateMondayShift({ ...createMondayShift, off: !createMondayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createMondayShift.off && createMondayShift.huddle} value={createMondayShift.huddle} onChange={() => setCreateMondayShift({ ...createMondayShift, huddle: !createMondayShift.huddle })} />
                     </div>
                  </div>
                  {!createMondayShift.off && createMondayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createMondayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>

              {/* Tuesday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createTuesdayShift.day === 2 && 'Tuesday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createTuesdayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="tue_start">Start</label>
                      <input
                        name="tue_start"
                        type="time"
                        className="form-control"
                        value={!createTuesdayShift.off && createTuesdayShift.start_time}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createTuesdayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="tue_end">End</label>
                      <input
                        name="tue_end"
                        type="time"
                        className="form-control"
                        value={!createTuesdayShift.off && createTuesdayShift.end_time}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createTuesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createTuesdayShift.off} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, off: !createTuesdayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createTuesdayShift.off && createTuesdayShift.huddle} value={createTuesdayShift.huddle} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, huddle: !createTuesdayShift.huddle })} />
                     </div>
                  </div>
                  {!createTuesdayShift.off && createTuesdayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createTuesdayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>

              {/* Wednesday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createWednesdayShift.day === 3 && 'Wednesday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createWednesdayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="wed_start">Start</label>
                      <input
                        name="wed_start"
                        type="time"
                        className="form-control"
                        value={!createWednesdayShift.off && createWednesdayShift.start_time}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createWednesdayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="wed_end">End</label>
                      <input
                        name="wed_end"
                        type="time"
                        className="form-control"
                        value={!createWednesdayShift.off && createWednesdayShift.end_time}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createWednesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createWednesdayShift.off} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, off: !createWednesdayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createWednesdayShift.off && createWednesdayShift.huddle} value={createWednesdayShift.huddle} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, huddle: !createWednesdayShift.huddle })} />
                     </div>
                  </div>
                  {!createWednesdayShift.off && createWednesdayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createWednesdayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>

              {/* Thursday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createThursdayShift.day === 4 && 'Thursday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createThursdayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="thu_start">Start</label>
                      <input
                        name="thu_start"
                        type="time"
                        className="form-control"
                        value={!createThursdayShift.off && createThursdayShift.start_time}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createThursdayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="thu_end">End</label>
                      <input
                        name="thu_end"
                        type="time"
                        className="form-control"
                        value={!createThursdayShift.off && createThursdayShift.end_time}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createThursdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createThursdayShift.off} onChange={() => setCreateThursdayShift({ ...createThursdayShift, off: !createThursdayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createThursdayShift.off && createThursdayShift.huddle} value={createThursdayShift.huddle} onChange={() => setCreateThursdayShift({ ...createThursdayShift, huddle: !createThursdayShift.huddle })} />
                     </div>
                  </div>
                  {!createThursdayShift.off && createThursdayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createThursdayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>

              {/* Friday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createFridayShift.day === 5 && 'Friday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createFridayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="fri_start">Start</label>
                      <input
                        name="fri_start"
                        type="time"
                        className="form-control"
                        value={!createFridayShift.off && createFridayShift.start_time}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createFridayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="fri_end">End</label>
                      <input
                        name="fri_end"
                        type="time"
                        className="form-control"
                        value={!createFridayShift.off && createFridayShift.end_time}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createFridayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createFridayShift.off} onChange={() => setCreateFridayShift({ ...createFridayShift, off: !createFridayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createFridayShift.off && createFridayShift.huddle} value={createFridayShift.huddle} onChange={() => setCreateFridayShift({ ...createFridayShift, huddle: !createFridayShift.huddle })} />
                     </div>
                  </div>
                  {!createFridayShift.off && createFridayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createFridayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>

              {/* Saturday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createSaturdayShift.day === 6 && 'Saturday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createSaturdayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sat_start">Start</label>
                      <input
                        name="sat_start"
                        type="time"
                        className="form-control"
                        value={!createSaturdayShift.off && createSaturdayShift.start_time}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createSaturdayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sat_end">End</label>
                      <input
                        name="sat_end"
                        type="time"
                        className="form-control"
                        value={!createSaturdayShift.off && createSaturdayShift.end_time}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createSaturdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createSaturdayShift.off} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, off: !createSaturdayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createSaturdayShift.off && createSaturdayShift.huddle} value={createSaturdayShift.huddle} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, huddle: !createSaturdayShift.huddle })} />
                     </div>
                  </div>
                  {!createSaturdayShift.off && createSaturdayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createSaturdayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <hr/>
              
              {/* Sunday */}
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createSundayShift.day === 0 && 'Sunday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createSundayShift.off && 
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sun_start">Start</label>
                      <input
                        name="sun_start"
                        type="time"
                        className="form-control"
                        value={!createSundayShift.off && createSundayShift.start_time}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, start_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                {!createSundayShift.off &&
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="sun_end">End</label>
                      <input
                        name="sun_end"
                        type="time"
                        className="form-control"
                        value={!createSundayShift.off && createSundayShift.end_time}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
                <div className="col-md-auto shift-off-toggle">
                  <div className="btn-group">
                    {createSundayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createSundayShift.off} onChange={() => setCreateSundayShift({ ...createSundayShift, off: !createSundayShift.off })} />
                    </div>
                </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddle">Huddle</label>
                       <Switch checked={!createSundayShift.off && createSundayShift.huddle} value={createSundayShift.huddle} onChange={() => setCreateSundayShift({ ...createSundayShift, huddle: !createSundayShift.huddle })} />
                     </div>
                  </div>
                  {!createSundayShift.off && createSundayShift.huddle && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddle_time">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createSundayShift?.huddle_time)}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, huddle_time: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
              </div>

              <br/> 

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEvent}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    'Submit'
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
