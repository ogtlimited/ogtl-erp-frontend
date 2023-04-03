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
} from '../FormJSON/CreateEmployeeShift';
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

  return (
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">

          <div className="modal-body">
            <form onSubmit={handleCreateEmployeeShift}>

              {/* Monday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createMondayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createMondayShift.off} onChange={() => setCreateMondayShift({ ...createMondayShift, off: !createMondayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Tuesday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createTuesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createTuesdayShift.off} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, off: !createTuesdayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Wednesday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createWednesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createWednesdayShift.off} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, off: !createWednesdayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Thursday */}
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="day">Day</label>
                    <input
                      className="form-control"
                      name="day"
                      type="text"
                      value={createThursdayShift.day === 'thur' && 'Thursday'}
                      readOnly
                    />
                  </div>
                </div>
                {!createThursdayShift.off && 
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="thur_start">Start</label>
                      <input
                        name="thur_start"
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
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="thur_end">End</label>
                      <input
                        name="thur_end"
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createThursdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createThursdayShift.off} onChange={() => setCreateThursdayShift({ ...createThursdayShift, off: !createThursdayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Friday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createFridayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createFridayShift.off} onChange={() => setCreateFridayShift({ ...createFridayShift, off: !createFridayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Saturday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createSaturdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createSaturdayShift.off} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, off: !createSaturdayShift.off })} />
                    </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="row">
                <div className="col-md-4">
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
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                <div className="col-md-2">
                  <div className="btn-group">
                    {createSundayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                      <Switch defaultChecked value={createSundayShift.off} onChange={() => setCreateSundayShift({ ...createSundayShift, off: !createSundayShift.off })} />
                    </div>
                </div>
              </div>

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
