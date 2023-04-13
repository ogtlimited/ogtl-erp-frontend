/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { huddleOptions } from '../FormJSON/CreateShiftSchedule';
import { useAppContext } from '../../Context/AppContext';
import Select from 'react-select';
import axiosInstance from '../../services/api';
import Switch from '@mui/material/Switch';
import $ from 'jquery';

export const EditCampaignScheduleTimeModal = ({ fetchAllSchedule, editSchedule }) => {
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
    const formattedShiftSchedule = editSchedule?.map((shift) => ({
      day: shift.day,
      start: shift.start,
      end: shift.end,
      off: shift.off,
      huddles: shift.huddles,
      huddleTime: shift.huddleTime,
      _id: shift._id
    }) 
  )

    let monday = {};
    const monday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'mon');
    for(let i = 0; i < monday_shifts?.length; i++) {
      monday = monday_shifts[i]
    }
    setCreateMondayShift(monday);

    let tuesday = {}
    const tuesday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'tue');
    for(let i = 0; i < tuesday_shifts?.length; i++) {
      tuesday = tuesday_shifts[i]
    }
    setCreateTuesdayShift(tuesday);

    let wednesday = {}
    const wednesday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'wed');
    for(let i = 0; i < wednesday_shifts?.length; i++) {
      wednesday = wednesday_shifts[i]
    }
    setCreateWednesdayShift(wednesday);

    let thursday = {}
    const thursday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'thur');
    for(let i = 0; i < thursday_shifts?.length; i++) {
      thursday = thursday_shifts[i]
    }
    setCreateThursdayShift(thursday);

    let friday = {}
    const friday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'fri');
    for(let i = 0; i < friday_shifts?.length; i++) {
      friday = friday_shifts[i]
    }
    setCreateFridayShift(friday);

    let saturday = {}
    const saturday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'sat');
    for(let i = 0; i < saturday_shifts?.length; i++) {
      saturday = saturday_shifts[i]
    }
    setCreateSaturdayShift(saturday);

    let sunday = {}
    const sunday_shifts = formattedShiftSchedule?.filter((shift) => shift?.day === 'sun');
    for(let i = 0; i < sunday_shifts?.length; i++) {
      sunday = sunday_shifts[i]
    }
    setCreateSundayShift(sunday);

  }, [editSchedule]);

  const cancelEvent = () => {
    $('#EditCampaignScheduleTimeFormModal').modal('toggle');
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

      console.log("submit this:", shifts);

      const response = await axiosInstance.patch(`/campaign-schedule-items`, shifts);
      fetchAllSchedule();
  
      showAlert(
        true,
        `Campaign schedule time updated successfully!`,
        'alert alert-success'
        );
        $('#EditCampaignScheduleTimeFormModal').modal('toggle');
        setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      console.error(error?.response);
      setLoading(false);
    }
  };

  return (
    <>
    <div
        className="modal fade"
        id="EditCampaignScheduleTimeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
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
                          value={createMondayShift.start}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, start: e.target.value })
                          }
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
                          value={createMondayShift.end}
                          onChange={(e) =>
                            setCreateMondayShift({ ...createMondayShift, end: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createMondayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createMondayShift?.off} value={createMondayShift?.off} onChange={() => setCreateMondayShift({ ...createMondayShift, off: !createMondayShift?.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createMondayShift?.off && createMondayShift?.huddles} value={createMondayShift?.huddles} onChange={() => setCreateMondayShift({ ...createMondayShift, huddles: !createMondayShift?.huddles })} />
                     </div>
                  </div>
                  {!createMondayShift?.off && createMondayShift?.huddles && <div className="col-md-auto">
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createTuesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createTuesdayShift?.off} value={createTuesdayShift.off} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, off: !createTuesdayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createTuesdayShift?.off && createTuesdayShift?.huddles} value={createTuesdayShift?.huddles} onChange={() => setCreateTuesdayShift({ ...createTuesdayShift, huddles: !createTuesdayShift?.huddles })} />
                     </div>
                  </div>
                  {!createTuesdayShift?.off && createTuesdayShift?.huddles && <div className="col-md-auto">
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createWednesdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createWednesdayShift?.off} value={createWednesdayShift.off} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, off: !createWednesdayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createWednesdayShift?.off && createWednesdayShift?.huddles} value={createWednesdayShift?.huddles} onChange={() => setCreateWednesdayShift({ ...createWednesdayShift, huddles: !createWednesdayShift?.huddles })} />
                     </div>
                  </div>
                  {!createWednesdayShift?.off && createWednesdayShift?.huddles && <div className="col-md-auto">
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
                  <div className="col-md-3">
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
                    <div className="col-md-2">
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
                    <div className="col-md-2">
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
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createThursdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createThursdayShift?.off} value={createThursdayShift.off} onChange={() => setCreateThursdayShift({ ...createThursdayShift, off: !createThursdayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createThursdayShift?.off && createThursdayShift?.huddles} value={createThursdayShift?.huddles} onChange={() => setCreateThursdayShift({ ...createThursdayShift, huddles: !createThursdayShift?.huddles })} />
                     </div>
                  </div>
                  {!createThursdayShift?.off && createThursdayShift?.huddles && <div className="col-md-auto">
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createFridayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createFridayShift?.off} value={createFridayShift.off} onChange={() => setCreateFridayShift({ ...createFridayShift, off: !createFridayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createFridayShift?.off && createFridayShift?.huddles} value={createFridayShift?.huddles} onChange={() => setCreateFridayShift({ ...createFridayShift, huddles: !createFridayShift?.huddles })} />
                     </div>
                  </div>
                  {!createFridayShift?.off && createFridayShift?.huddles && <div className="col-md-auto">
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createSaturdayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createSaturdayShift?.off} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, off: !createSaturdayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createSaturdayShift?.off && createSaturdayShift?.huddles} value={createSaturdayShift?.huddles} onChange={() => setCreateSaturdayShift({ ...createSaturdayShift, huddles: !createSaturdayShift?.huddles })} />
                     </div>
                  </div>
                  {!createSaturdayShift?.off && createSaturdayShift?.huddles && <div className="col-md-auto">
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
                        />
                      </div>
                    </div>
                  }
                  <div className="col-md-auto shift-off-toggle">
                    <div className="btn-group">
                      {createSundayShift.off ? <label htmlFor="off"> Day Off</label> : <label htmlFor="off">Work Day</label>}
                       <Switch checked={!createSundayShift?.off} value={createSundayShift.off} onChange={() => setCreateSundayShift({ ...createSundayShift, off: !createSundayShift.off })} />
                     </div>
                  </div>
                  <div className="col-md-auto shift-item-toggle">
                    <div className="btn-group">
                      <label htmlFor="huddles">Huddle</label>
                       <Switch checked={!createSundayShift?.off && createSundayShift?.huddles} value={createSundayShift?.huddles} onChange={() => setCreateSundayShift({ ...createSundayShift, huddles: !createSundayShift?.huddles })} />
                     </div>
                  </div>
                  {!createSundayShift?.off && createSundayShift?.huddles && <div className="col-md-auto">
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
