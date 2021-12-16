import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import welcome from '../../../assets/img/welcome.png'
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import holidays from './holidays.json'
import ogids from "./allEmployeeOgid.json";

import personal from "./personal.json";

const EmployeeUser = () => {
  const date = new Date().toUTCString();
  const { notifications, user } = useAppContext();
  const [leaveTaken, setLeaveTaken] = useState(0);
  const [leaveRemaining, setLeaveRemaining] = useState(0);

  const getNextHoliday = () =>{
    const year = new Date().getFullYear()
    const current = new Date().getTime()
    const mapHolidays = holidays.map(hol => new Date(hol.date + " " + year).getTime() )
    const greater = mapHolidays.filter(time => time >= current);
    const index = mapHolidays.findIndex(idx => idx === Math.min(...greater))
    console.log(Math.min(...greater), index)
    return holidays[index]
  }
  console.log(getNextHoliday())
  const calcShift = (time) =>{
    let split = time.split(":")
    if(parseInt(split[0]) < 12){
      return parseInt(split[0]) + ':' + split[1] + ' AM'
    }else{
      return parseInt(split[0]) + ':' + split[1] + ' PM'
    }
  }
  useEffect(() => {
    console.log(user)
    axiosInstance.get("/leave-application").then((e) => {
      console.log(e, "USERID");
      const leaves = e?.data?.data?.filter(
        (f) => f?.employee_id?._id === user._id
      );
      const open = leaves.filter((l) => l.status === "open").length;
      let count = 0;
      leaves.forEach((e) => {
        let a = moment(new Date(e.from_date));
        let b = moment(new Date(e.to_date));
        count += b.diff(a, "days") + 1;
      });
      setLeaveTaken(count);
      setLeaveRemaining(open);
    });
  }, [user._id]);

  // let arr = []
  // let unique = []
  // let allShifts = []
  // console.log(shifts)
  // raw.forEach(r =>{
  //  let index = allShift.findIndex(e => (e.start_time == r.actual_shift_start) && (e.end_time == r.actual_shift_end))
  //  unique.push({
  //    ...r,
  //    default_shift: allShift[index]?.shift_name
  //  })
  // })
  // console.log(unique)
  // console.log(arr)
  // shifts.forEach(e =>{
  //   axiosInstance.post("/api/shiftType", e)
  // })
  // let sort = shifts.sort((a,b) => parseInt(a.start_time) - parseInt(b.end_time))
  // shifts.forEach(e =>{
  //   if(parseInt(e.start_time) < 12){
  //     let s = {
  //       ...e,
  //       shift_name: 'Morning ' + parseInt(e.start_time) + ' AM to ' + parseInt(e.end_time),
  //       slug: slugify(e.shift_name)
  //     }
  //     allShifts.push(s)
  //   }else{
  //     let end = parseInt(e.end_time) < 12 ? parseInt(e.end_time) + ' AM' : parseInt(e.end_time) + ' PM'
  //     let s = {
  //       ...e,
  //       shift_name: 'Afternoon ' + parseInt(e.start_time) + ' PM to ' + end,
  //       slug: slugify(e.shift_name)
  //     }
  //     allShifts.push(s)
  //   }
  // })
  return (
    <>

      <div className="row">
      <div className="col-lg-8 col-md-8">
        <div className="row welcome-card p-5">
        <div className="col-md-9 left-card">
        <h4 class="welcome-text">Welcome back,<br />  {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}{" "}!</h4>
        <p class="welcome-p">If you havent punched in today, you need to do it right away</p>
        <Link class="go" to="/dashboard/hr/attendance">Go Now</Link>
        </div>
        <div className="col-md-3">
          <img style={{width: '100%'}} className="mt-4" src={welcome} />
        </div>
            
        </div>
        <div className="row mt-4">
        <div className="col-lg-12 col-md-12">
          <section className="dash-section">
            <h1 className="dash-sec-title">Today</h1>
            <div className="dash-sec-content">
            <div className="dash-sec-content">
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-clock"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>Your shift starts at {calcShift(user?.default_shift.start_time)} and ends at {calcShift(user?.default_shift.end_time)} </p>
                    </div>

                  </div>
                </div>
              </div>


            </div>
            </div>
          </section>

           <section className="dash-section">
            <h1 className="dash-sec-title">This Month</h1>
            <div className="dash-sec-content">
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-suitcase"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>You have 0 late attendance</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-user-plus"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>Your first day is going to be on Thursday</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="dash-info-list">
                <a href="" className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-calendar"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>It's Spring Bank Holiday on Monday</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section> 
        </div>
        </div>
      </div>
       
        <div className="col-lg-4 col-md-4">
          <div className="dash-sidebar">
            <section>
              <h5 className="dash-title">Projects</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>0</h4>
                      <p>Total Tasks</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>0</h4>
                      <p>Pending Tasks</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <div className="dash-stats-list">
                      <h4>{user.projectId ? 1 : 0}</h4>
                      <p>Total Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Your Leave</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>{leaveTaken}</h4>
                      <p>Leave Taken</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>{leaveRemaining}</h4>
                      <p>Remaining</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <Link to="/dashboard/hr/leaves" className="btn btn-primary">Apply Leave</Link>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Your time off allowance</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>0 Hours</h4>
                      <p>Approved</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>0 Hours</h4>
                      <p>Remaining</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <button className="btn btn-primary">Apply Time Off</button>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Upcoming Holiday</h5>
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="holiday-title mb-0">
                    {getNextHoliday().date} - {getNextHoliday().holiday_name}
                  </h4>
                </div>
              </div>
            </section>
          </div>
        </div>
        
      </div>
    
    </>
  );
};

export default EmployeeUser;
