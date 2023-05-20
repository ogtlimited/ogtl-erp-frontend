
import React, { useState, useEffect, useRef } from 'react';
import { 
  monday_shifts,
  tuesday_shifts,
  wednesday_shifts,
  thursday_shifts,
  friday_shifts,
  saturday_shifts,
  sunday_shifts,
  huddleOptions,
} from '../FormJSON/CreateEmployeeShift';
import Select from 'react-select'
import { useAppContext } from '../../Context/AppContext';
import Switch from '@mui/material/Switch';
import $ from 'jquery';

export const AddEmployeeShiftModal = ({ 
  employee, 
  setEmployee, 
  isSubmitted,
  setIsSubmitted, 
}) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState(
    monday_shifts
  );
  const [createTuesdayShift, setCreateTuesdayShift] = useState(
    tuesday_shifts
  );
  const [createWednesdayShift, setCreateWednesdayShift] = useState(
    wednesday_shifts
  );
  const [createThursdayShift, setCreateThursdayShift] = useState(
    thursday_shifts
  );
  const [createFridayShift, setCreateFridayShift] = useState(
    friday_shifts
  );
  const [createSaturdayShift, setCreateSaturdayShift] = useState(
    saturday_shifts
  );
  const [createSundayShift, setCreateSundayShift] = useState(
    sunday_shifts
  );

  const cancelEvent = () => {
    setCreateMondayShift(monday_shifts);
    setCreateTuesdayShift(tuesday_shifts);
    setCreateWednesdayShift(wednesday_shifts);
    setCreateThursdayShift(thursday_shifts);
    setCreateFridayShift(friday_shifts);
    setCreateSaturdayShift(saturday_shifts);
    setCreateSundayShift(sunday_shifts);
  };

  useEffect(() => {
    if (isSubmitted) {
      cancelEvent();
      setIsSubmitted(false);
    }
  },[isSubmitted, setIsSubmitted])

  const handleAddEmployeeSifts = async (e) => {
    e.preventDefault();

    const shifts = [];

    shifts.push(createMondayShift);
    shifts.push(createTuesdayShift);
    shifts.push(createWednesdayShift);
    shifts.push(createThursdayShift);
    shifts.push(createFridayShift);
    shifts.push(createSaturdayShift);
    shifts.push(createSundayShift);

    setEmployee({ ...employee, shifts: shifts });

    showAlert(
          true,
          `Employee shifts confirmed!`,
          'alert alert-success'
        );
          $('#EmployeeShiftFormModal').modal('toggle');
  };

  return (
    <>
      <div
        className="modal fade"
        id="EmployeeShiftFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add shifts
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

            <div className="modal-body">
              <form onSubmit={handleAddEmployeeSifts}>

                {/* Monday */}
                <div className="row">
                  <div className="col-md-3">
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
                        onChange={(e) =>
                          setCreateMondayShift({ ...createMondayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateTuesdayShift({ ...createTuesdayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateWednesdayShift({ ...createWednesdayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateThursdayShift({ ...createThursdayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateFridayShift({ ...createFridayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateSaturdayShift({ ...createSaturdayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
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
                        onChange={(e) =>
                          setCreateSundayShift({ ...createSundayShift, huddleTime: e?.value })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>}
                </div>

                <br />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={cancelEvent}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
