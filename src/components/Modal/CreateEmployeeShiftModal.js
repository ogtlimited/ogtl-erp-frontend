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

export const CreateEmployeeShiftModal = ({ ogid, setMode, setEmployeeShifts }) => {
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

      const shifts = [];
  
      shifts.push({ ...createMondayShift, ogid: ogid });
      shifts.push({ ...createTuesdayShift, ogid: ogid });
      shifts.push({ ...createWednesdayShift, ogid: ogid });
      shifts.push({ ...createThursdayShift, ogid: ogid });
      shifts.push({ ...createFridayShift, ogid: ogid });
      shifts.push({ ...createSaturdayShift, ogid: ogid });
      shifts.push({ ...createSundayShift, ogid: ogid });

      console.log("create this shifts:", shifts)
      const response = await axiosInstance.post(`/api/employee-shift`, shifts);
  
      setLoading(false);
      goToTop();
      setMode('edit');
      showAlert(
        true,
        `Shift created successfully!`,
        'alert alert-success'
      );
      setEmployeeShifts(response?.data?.data);
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      console.error(error?.response);
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

      console.log("This schedule:", resData);

      const formatted = resData?.map((e) => ({
          day: e.day,
          off: e.off,
          start: e.start,
          end: e.end,
          huddles: e.huddles,
          huddleTime: e.huddleTime,
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
                      value={createMondayShift.day === 'mon' && 'Monday'}
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
                        value={!createMondayShift.off && createMondayShift.start}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, start: e.target.value })
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
                        value={!createMondayShift.off && createMondayShift.end}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createMondayShift.off && createMondayShift.huddles} value={createMondayShift.huddles} onChange={() => setCreateMondayShift({ ...createMondayShift, huddles: !createMondayShift.huddles })} />
                     </div>
                  </div>
                  {!createMondayShift.off && createMondayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createMondayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, huddleTime: e?.value })
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
                      value={createTuesdayShift.day === 'tue' && 'Tuesday'}
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
                        value={!createTuesdayShift.off && createTuesdayShift.start}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, start: e.target.value })
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
                        value={!createTuesdayShift.off && createTuesdayShift.end}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createTuesdayShift.off && createTuesdayShift.huddles} value={createTuesdayShift.huddles} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, huddles: !createTuesdayShift.huddles })} />
                     </div>
                  </div>
                  {!createTuesdayShift.off && createTuesdayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createTuesdayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, huddleTime: e?.value })
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
                      value={createWednesdayShift.day === 'wed' && 'Wednesday'}
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
                        value={!createWednesdayShift.off && createWednesdayShift.start}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, start: e.target.value })
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
                        value={!createWednesdayShift.off && createWednesdayShift.end}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createWednesdayShift.off && createWednesdayShift.huddles} value={createWednesdayShift.huddles} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, huddles: !createWednesdayShift.huddles })} />
                     </div>
                  </div>
                  {!createWednesdayShift.off && createWednesdayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createWednesdayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, huddleTime: e?.value })
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
                      value={createThursdayShift.day === 'thu' && 'Thursday'}
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
                        value={!createThursdayShift.off && createThursdayShift.start}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, start: e.target.value })
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
                        value={!createThursdayShift.off && createThursdayShift.end}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createThursdayShift.off && createThursdayShift.huddles} value={createThursdayShift.huddles} onChange={() => setCreateThursdayShift({ ...createThursdayShift, huddles: !createThursdayShift.huddles })} />
                     </div>
                  </div>
                  {!createThursdayShift.off && createThursdayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createThursdayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, huddleTime: e?.value })
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
                      value={createFridayShift.day === 'fri' && 'Friday'}
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
                        value={!createFridayShift.off && createFridayShift.start}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, start: e.target.value })
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
                        value={!createFridayShift.off && createFridayShift.end}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createFridayShift.off && createFridayShift.huddles} value={createFridayShift.huddles} onChange={() => setCreateFridayShift({ ...createFridayShift, huddles: !createFridayShift.huddles })} />
                     </div>
                  </div>
                  {!createFridayShift.off && createFridayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createFridayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, huddleTime: e?.value })
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
                      value={createSaturdayShift.day === 'sat' && 'Saturday'}
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
                        value={!createSaturdayShift.off && createSaturdayShift.start}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, start: e.target.value })
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
                        value={!createSaturdayShift.off && createSaturdayShift.end}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createSaturdayShift.off && createSaturdayShift.huddles} value={createSaturdayShift.huddles} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, huddles: !createSaturdayShift.huddles })} />
                     </div>
                  </div>
                  {!createSaturdayShift.off && createSaturdayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createSaturdayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, huddleTime: e?.value })
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
                      value={createSundayShift.day === 'sun' && 'Sunday'}
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
                        value={!createSundayShift.off && createSundayShift.start}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, start: e.target.value })
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
                        value={!createSundayShift.off && createSundayShift.end}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, end: e.target.value })
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
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createSundayShift.off && createSundayShift.huddles} value={createSundayShift.huddles} onChange={() => setCreateSundayShift({ ...createSundayShift, huddles: !createSundayShift.huddles })} />
                     </div>
                  </div>
                  {!createSundayShift.off && createSundayShift.huddles && <div className="col-md-auto">
                    <div className="form-group">
                      <label htmlFor="huddleTime">
                        Huddle Time
                      </label>
                      <Select
                        options={huddleOptions}
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={huddleOptions.find((option) => option.value === createSundayShift?.huddleTime)}
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, huddleTime: e?.value })
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
