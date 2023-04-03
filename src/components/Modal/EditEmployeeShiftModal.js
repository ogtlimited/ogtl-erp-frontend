
import React, { useState, useEffect } from 'react';
import { } from '../FormJSON/CreateEmployeeShift';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import Switch from '@mui/material/Switch';

export const EditEmployeeShiftModal = ({ employeeShifts }) => {
  const { showAlert } = useAppContext();

  const [createMondayShift, setCreateMondayShift] = useState({});
  const [createTuesdayShift, setCreateTuesdayShift] = useState({});
  const [createWednesdayShift, setCreateWednesdayShift] = useState({});
  const [createThursdayShift, setCreateThursdayShift] = useState({});
  const [createFridayShift, setCreateFridayShift] = useState({});
  const [createSaturdayShift, setCreateSaturdayShift] = useState({});
  const [createSundayShift, setCreateSundayShift] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let monday = {}
    const monday_shifts = employeeShifts?.filter((shift) => shift.day === 'mon');
    for(let i = 0; i < monday_shifts?.length; i++) {
      monday.day = monday_shifts[i].day
      monday.start = monday_shifts[i].start
      monday.end = monday_shifts[i].end
      monday.off = monday_shifts[i].off
      monday._id = monday_shifts[i]._id
    }
    setCreateMondayShift(monday);

    let tuesday = {}
    const tuesday_shifts = employeeShifts?.filter((shift) => shift.day === 'tue');
    for(let i = 0; i < tuesday_shifts?.length; i++) {
      tuesday.day = tuesday_shifts[i].day
      tuesday.start = tuesday_shifts[i].start
      tuesday.end = tuesday_shifts[i].end
      tuesday.off = tuesday_shifts[i].off
      tuesday._id = tuesday_shifts[i]._id
    }
    setCreateTuesdayShift(tuesday);

    let wednesday = {}
    const wednesday_shifts = employeeShifts?.filter((shift) => shift.day === 'wed');
    for(let i = 0; i < wednesday_shifts?.length; i++) {
      wednesday.day = wednesday_shifts[i].day
      wednesday.start = wednesday_shifts[i].start
      wednesday.end = wednesday_shifts[i].end
      wednesday.off = wednesday_shifts[i].off
      wednesday._id = wednesday_shifts[i]._id
    }
    setCreateWednesdayShift(wednesday);

    let thursday = {}
    const thursday_shifts = employeeShifts?.filter((shift) => shift.day === 'thur');
    for(let i = 0; i < thursday_shifts?.length; i++) {
      thursday.day = thursday_shifts[i].day
      thursday.start = thursday_shifts[i].start
      thursday.end = thursday_shifts[i].end
      thursday.off = thursday_shifts[i].off
      thursday._id = thursday_shifts[i]._id
    }
    setCreateThursdayShift(thursday);

    let friday = {}
    const friday_shifts = employeeShifts?.filter((shift) => shift.day === 'fri');
    for(let i = 0; i < friday_shifts?.length; i++) {
      friday.day = friday_shifts[i].day
      friday.start = friday_shifts[i].start
      friday.end = friday_shifts[i].end
      friday.off = friday_shifts[i].off
      friday._id = friday_shifts[i]._id
    }
    setCreateFridayShift(friday);

    let saturday = {}
    const saturday_shifts = employeeShifts?.filter((shift) => shift.day === 'sat');
    for(let i = 0; i < saturday_shifts?.length; i++) {
      saturday.day = saturday_shifts[i].day
      saturday.start = saturday_shifts[i].start
      saturday.end = saturday_shifts[i].end
      saturday.off = saturday_shifts[i].off
      saturday._id = saturday_shifts[i]._id
    }
    setCreateSaturdayShift(saturday);

    let sunday = {}
    const sunday_shifts = employeeShifts?.filter((shift) => shift.day === 'sun');
    for(let i = 0; i < sunday_shifts?.length; i++) {
      sunday.day = sunday_shifts[i].day
      sunday.start = sunday_shifts[i].start
      sunday.end = sunday_shifts[i].end
      sunday.off = sunday_shifts[i].off
      sunday._id = sunday_shifts[i]._id
    }
    setCreateSundayShift(sunday);
  }, [employeeShifts]);

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
      const response = await axiosInstance.patch(`/api/employee-shift/`, shifts);
  
      setLoading(false);
      goToTop();
      showAlert(
        true,
        `Shift updated successfully!`,
        'alert alert-success'
      );
      
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
              <form onSubmit={handleEditEmployeeShift}>

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
                          value={createMondayShift.start}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, start: e.target.value })
                          }
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
                          value={createMondayShift.end}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, end: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createMondayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createMondayShift?.off} value={createMondayShift?.off} onChange={() => setCreateMondayShift({ ...createMondayShift, off: !createMondayShift?.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createTuesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createTuesdayShift?.off} value={createTuesdayShift.off} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, off: !createTuesdayShift.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createWednesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createWednesdayShift?.off} value={createWednesdayShift.off} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, off: !createWednesdayShift.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createThursdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createThursdayShift?.off} value={createThursdayShift.off} onChange={() => setCreateThursdayShift({ ...createThursdayShift, off: !createThursdayShift.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createFridayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createFridayShift?.off} value={createFridayShift.off} onChange={() => setCreateFridayShift({ ...createFridayShift, off: !createFridayShift.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createSaturdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createSaturdayShift?.off} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, off: !createSaturdayShift.off })} />
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-2">
                    <div className="btn-group">
                      {createSundayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createSundayShift?.off} value={createSundayShift.off} onChange={() => setCreateSundayShift({ ...createSundayShift, off: !createSundayShift.off })} />
                     </div>
                  </div>
                </div>

                <div className="modal-footer">
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
