/*eslint-disable no-unused-vars*/

import React, { useState, useEffect, useRef } from 'react';
import { 
  monday_shifts, 
  mondayOptions,
  tuesday_shifts,
  tuesdayOptions,
  wednesday_shifts,
  wednesdayOptions,
  thursday_shifts,
  thursdayOptions,
  friday_shifts,
  fridayOptions,
  saturday_shifts,
  saturdayOptions,
  sunday_shifts,
  sundayOptions,
} from '../FormJSON/CreateEmployeeShift';
import { useAppContext } from '../../Context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/api';
import Select from 'react-select';
import $ from 'jquery';

export const EditEmployeeShiftModal = ({ employee, setEmployee }) => {
  const { showAlert } = useAppContext();

  useEffect(() => {
    console.log('Employee shifts:', employee.shifts)
  }, [employee.shifts]);

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

  const [loading, setLoading] = useState(false);

  const cancelEvent = () => {
    $("#EditEmployeeShiftFormModal").modal("toggle");
  };

  const handleEditEmployeeShift = async (e) => {
    e.preventDefault();

    const shifts = [];

    shifts.push(createMondayShift);
    shifts.push(createTuesdayShift);
    shifts.push(createWednesdayShift);
    shifts.push(createThursdayShift);
    shifts.push(createFridayShift);
    shifts.push(createSaturdayShift);
    shifts.push(createSundayShift);

    console.log('All shifts:', shifts);

    setEmployee({ ...employee, shifts: shifts });

    showAlert(
          true,
          `Shift edited successfully!`,
          'alert alert-success'
        );
          $('#EditEmployeeShiftFormModal').modal('toggle');
  };

  const handleMondayShift = (e) => {
    setCreateMondayShift({ ...createMondayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateMondayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleTuesdayShift = (e) => {
    setCreateTuesdayShift({ ...createTuesdayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateTuesdayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleWednesdayShift = (e) => {
    setCreateWednesdayShift({ ...createWednesdayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateWednesdayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleThursdayShift = (e) => {
    setCreateThursdayShift({ ...createThursdayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateThursdayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleFridayShift = (e) => {
    setCreateFridayShift({ ...createFridayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateFridayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleSaturdayShift = (e) => {
    setCreateSaturdayShift({ ...createSaturdayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateSaturdayShift({ day: e?.value, start: null, end: null });
    }
  };

  const handleSundayShift = (e) => {
    setCreateSundayShift({ ...createSundayShift, day: e?.value });

    if (e?.value === 'off') {
      setCreateSundayShift({ day: e?.value, start: null, end: null });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="EditEmployeeShiftFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit shifts
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
              <form onSubmit={handleEditEmployeeShift}>

                {/* Monday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Monday)</span>
                      </label>
                      <Select
                        options={mondayOptions}
                        isSearchable={true}
                        onChange={(e) => handleMondayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createMondayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="mon_start">Start</label>
                        <input
                          name="mon_start"
                          type="time"
                          className="form-control"
                          value={createMondayShift.day === 'mon' && createMondayShift.start}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createMondayShift.day !== 'off' &&
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="mon_end">End</label>
                        <input
                          name="mon_end"
                          type="time"
                          className="form-control"
                          value={createMondayShift.day === 'mon' && createMondayShift.end}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Tuesday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Tuesday)</span>
                      </label>
                      <Select
                        options={tuesdayOptions}
                        isSearchable={true}
                        onChange={(e) => handleTuesdayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createTuesdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="tue_start">Start</label>
                        <input
                          name="tue_start"
                          type="time"
                          className="form-control"
                          value={createTuesdayShift.day === 'tue' && createTuesdayShift.start}
                          onChange={(e) =>
                            setCreateTuesdayShift({ ...createTuesdayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createTuesdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="tue_end">End</label>
                        <input
                          name="tue_end"
                          type="time"
                          className="form-control"
                          value={createTuesdayShift.day === 'tue' && createTuesdayShift.end}
                          onChange={(e) =>
                            setCreateTuesdayShift({ ...createTuesdayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Wednesday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Wednesday)</span>
                      </label>
                      <Select
                        options={wednesdayOptions}
                        isSearchable={true}
                        onChange={(e) => handleWednesdayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createWednesdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="wed_start">Start</label>
                        <input
                          name="wed_start"
                          type="time"
                          className="form-control"
                          value={createWednesdayShift.day === 'wed' && createWednesdayShift.start}
                          onChange={(e) =>
                            setCreateWednesdayShift({ ...createWednesdayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createWednesdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="wed_end">End</label>
                        <input
                          name="wed_end"
                          type="time"
                          className="form-control"
                          value={createWednesdayShift.day === 'wed' && createWednesdayShift.end}
                          onChange={(e) =>
                            setCreateWednesdayShift({ ...createWednesdayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Thursday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Thursday)</span>
                      </label>
                      <Select
                        options={thursdayOptions}
                        isSearchable={true}
                        onChange={(e) => handleThursdayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createThursdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="thur_start">Start</label>
                        <input
                          name="thur_start"
                          type="time"
                          className="form-control"
                          value={createThursdayShift.day === 'thur' && createThursdayShift.start}
                          onChange={(e) =>
                            setCreateThursdayShift({ ...createThursdayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createThursdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="thur_end">End</label>
                        <input
                          name="thur_end"
                          type="time"
                          className="form-control"
                          value={createThursdayShift.day === 'thur' && createThursdayShift.end}
                          onChange={(e) =>
                            setCreateThursdayShift({ ...createThursdayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Friday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Friday)</span>
                      </label>
                      <Select
                        options={fridayOptions}
                        isSearchable={true}
                        onChange={(e) => handleFridayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createFridayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="fri_start">Start</label>
                        <input
                          name="fri_start"
                          type="time"
                          className="form-control"
                          value={createFridayShift.day === 'fri' && createFridayShift.start}
                          onChange={(e) =>
                            setCreateFridayShift({ ...createFridayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createFridayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="fri_end">End</label>
                        <input
                          name="fri_end"
                          type="time"
                          className="form-control"
                          value={createFridayShift.day === 'fri' && createFridayShift.end}
                          onChange={(e) =>
                            setCreateFridayShift({ ...createFridayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Saturday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Saturday)</span>
                      </label>
                      <Select
                        options={saturdayOptions}
                        isSearchable={true}
                        onChange={(e) => handleSaturdayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createSaturdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="sat_start">Start</label>
                        <input
                          name="sat_start"
                          type="time"
                          className="form-control"
                          value={createSaturdayShift.day === 'sat' && createSaturdayShift.start}
                          onChange={(e) =>
                            setCreateSaturdayShift({ ...createSaturdayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createSaturdayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="sat_end">End</label>
                        <input
                          name="sat_end"
                          type="time"
                          className="form-control"
                          value={createSaturdayShift.day === 'sat' && createSaturdayShift.end}
                          onChange={(e) =>
                            setCreateSaturdayShift({ ...createSaturdayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                {/* Sunday */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="day">Day{' '} 
                        <span style={{ color: '#999', fontSize: '12px' }}>(Sunday)</span>
                      </label>
                      <Select
                        options={sundayOptions}
                        isSearchable={true}
                        onChange={(e) => handleSundayShift(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {createSundayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="sun_start">Start</label>
                        <input
                          name="sun_start"
                          type="time"
                          className="form-control"
                          value={createSundayShift.day === 'sun' && createSundayShift.start}
                          onChange={(e) =>
                            setCreateSundayShift({ ...createSundayShift, start: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                  {createSundayShift.day !== 'off' && 
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="sun_end">End</label>
                        <input
                          name="sun_end"
                          type="time"
                          className="form-control"
                          value={createSundayShift.day === 'sun' && createSundayShift.end}
                          onChange={(e) =>
                            setCreateSundayShift({ ...createSundayShift, end: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  }
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
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
      </div>
    </>
  );
};
