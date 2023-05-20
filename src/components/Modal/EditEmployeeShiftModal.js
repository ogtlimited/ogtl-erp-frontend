
import React, { useState, useEffect } from 'react';
import { huddleOptions, } from '../FormJSON/CreateEmployeeShift';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import Select from 'react-select';
import Switch from '@mui/material/Switch';

export const EditEmployeeShiftModal = ({ employeeShifts, setEmployeeShifts }) => {
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
        start: shift.start,
        end: shift.end,
        off: shift.off,
        huddles: shift.huddles,
        huddleTime: shift.huddleTime,
        ogid: shift.ogid,
        _id: shift._id
      }) 
    )

    let monday = {};
    const monday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'mon');
    for(let i = 0; i < monday_shifts?.length; i++) {
      monday = monday_shifts[i]
    }
    setCreateMondayShift(monday);

    let tuesday = {};
    const tuesday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'tue');
    for(let i = 0; i < tuesday_shifts?.length; i++) {
      tuesday = tuesday_shifts[i]
    }
    setCreateTuesdayShift(tuesday);

    let wednesday = {};
    const wednesday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'wed');
    for(let i = 0; i < wednesday_shifts?.length; i++) {
      wednesday = wednesday_shifts[i]
    }
    setCreateWednesdayShift(wednesday);

    let thursday = {};
    const thursday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'thu');
    for(let i = 0; i < thursday_shifts?.length; i++) {
      thursday = thursday_shifts[i]
    }
    setCreateThursdayShift(thursday);

    let friday = {};
    const friday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'fri');
    for(let i = 0; i < friday_shifts?.length; i++) {
      friday = friday_shifts[i]
    }
    setCreateFridayShift(friday);

    let saturday = {};
    const saturday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'sat');
    for(let i = 0; i < saturday_shifts?.length; i++) {
      saturday = saturday_shifts[i]
    }
    setCreateSaturdayShift(saturday);

    let sunday = {};
    const sunday_shifts = formattedEmployeeShifts?.filter((shift) => shift?.day === 'sun');
    for(let i = 0; i < sunday_shifts?.length; i++) {
      sunday = sunday_shifts[i]
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

      console.log('Edited Shift', shifts)

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
          start: e.start,
          end: e.end,
          huddles: e.huddles,
          huddleTime: e.huddleTime,
        }));

      let monday = {};
      const monday_shifts = formatted?.filter((shift) => shift?.day === 'mon');
      for(let i = 0; i < monday_shifts?.length; i++) {
        monday.day = monday_shifts[i].day
        monday.off = monday_shifts[i].off
        monday.start = monday_shifts[i].start
        monday.end = monday_shifts[i].end
        monday.huddles = monday_shifts[i].huddles
        monday.huddleTime = monday_shifts[i].huddleTime
        monday._id = createMondayShift._id
      }
      setCreateMondayShift(monday);

      let tuesday = {};
      const tuesday_shifts = formatted?.filter((shift) => shift?.day === 'tue');
      for(let i = 0; i < tuesday_shifts?.length; i++) {
        tuesday.day = tuesday_shifts[i].day
        tuesday.off = tuesday_shifts[i].off
        tuesday.start = tuesday_shifts[i].start
        tuesday.end = tuesday_shifts[i].end
        tuesday.huddles = tuesday_shifts[i].huddles
        tuesday.huddleTime = tuesday_shifts[i].huddleTime
        tuesday._id = createTuesdayShift._id
      }
      setCreateTuesdayShift(tuesday);

      let wednesday = {};
      const wednesday_shifts = formatted?.filter((shift) => shift?.day === 'wed');
      for(let i = 0; i < wednesday_shifts?.length; i++) {
        wednesday.day = wednesday_shifts[i].day
        wednesday.off = wednesday_shifts[i].off
        wednesday.start = wednesday_shifts[i].start
        wednesday.end = wednesday_shifts[i].end
        wednesday.huddles = wednesday_shifts[i].huddles
        wednesday.huddleTime = wednesday_shifts[i].huddleTime
        wednesday._id = createWednesdayShift._id
      }
      setCreateWednesdayShift(wednesday);

      let thursday = {};
      const thursday_shifts = formatted?.filter((shift) => shift?.day === 'thu');
      for(let i = 0; i < thursday_shifts?.length; i++) {
        thursday.day = thursday_shifts[i].day
        thursday.off = thursday_shifts[i].off
        thursday.start = thursday_shifts[i].start
        thursday.end = thursday_shifts[i].end
        thursday.huddles = thursday_shifts[i].huddles
        thursday.huddleTime = thursday_shifts[i].huddleTime
        thursday._id = createThursdayShift._id
      }
      setCreateThursdayShift(thursday);

      let friday = {};
      const friday_shifts = formatted?.filter((shift) => shift?.day === 'fri');
      for(let i = 0; i < friday_shifts?.length; i++) {
        friday.day = friday_shifts[i].day
        friday.off = friday_shifts[i].off
        friday.start = friday_shifts[i].start
        friday.end = friday_shifts[i].end
        friday.huddles = friday_shifts[i].huddles
        friday.huddleTime = friday_shifts[i].huddleTime
        friday._id = createFridayShift._id
      }
      setCreateFridayShift(friday);

      let saturday = {};
      const saturday_shifts = formatted?.filter((shift) => shift?.day === 'sat');
      for(let i = 0; i < saturday_shifts?.length; i++) {
        saturday.day = saturday_shifts[i].day
        saturday.off = saturday_shifts[i].off
        saturday.start = saturday_shifts[i].start
        saturday.end = saturday_shifts[i].end
        saturday.huddles = saturday_shifts[i].huddles
        saturday.huddleTime = saturday_shifts[i].huddleTime
        saturday._id = createSaturdayShift._id
      }
      setCreateSaturdayShift(saturday);

      let sunday = {};
      const sunday_shifts = formatted?.filter((shift) => shift?.day === 'sun');
      for(let i = 0; i < sunday_shifts?.length; i++) {
        sunday.day = sunday_shifts[i].day
        sunday.off = sunday_shifts[i].off
        sunday.start = sunday_shifts[i].start
        sunday.end = sunday_shifts[i].end
        sunday.huddles = sunday_shifts[i].huddles
        sunday.huddleTime = sunday_shifts[i].huddleTime
        sunday._id = createSundayShift._id
      }
      setCreateSundayShift(sunday);
      
    });
  }

  return (
    <>
        <div className="card profile-box flex-fill">
          <div className="card-body">
          <div className="col" style={{marginBottom: '30px'}}>
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
