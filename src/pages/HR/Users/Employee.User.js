import moment from "moment";
import React, { useEffect, useState } from "react";

import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
// import axiosInstance from "../../../services/api";
// import shifts from './shift.json'
// import raw from './raw.json'
// import allShift from './allShift.json'
import ogids from "./allEmployeeOgid.json";
import emergency from "./emergency.json";
import personal from "./personal.json";

const EmployeeUser = () => {
  const date = new Date().toUTCString();
  const { notifications, user } = useAppContext();
  const [leaveTaken, setLeaveTaken] = useState(0);
  const [leaveRemaining, setLeaveRemaining] = useState(0);

  useEffect(() => {
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

  let formatted = [];
  ogids.forEach((e) => {
    let idx = personal.filter(
      (f) => e.first_name === f.first_name && e.last_name === f.last_name
    )[0];
    if (idx) {
      formatted.push({
        ogid: e.ogid,
        means_of_identification: idx.means_of_identification,
        emergency_phone: idx.emergency_phone,
        id_number: idx.id_number,
        date_of_issue: idx.date_of_issue,
        valid_upto: idx.valid_upto,
        place_of_issue: idx.place_of_issue,
        marital_status: idx.marital_status,
        blood_group: idx.blood_group,
      });
    }
  });
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
        <div className="col-md-12">
          <div className="welcome-box">
            <div className="welcome-img">
              <img alt="" src="assets/img/profiles/avatar-02.jpg" />
            </div>
            <div className="welcome-det">
              <h3>
                Welcome,{" "}
                {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}{" "}
              </h3>
              <p>{date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <section className="dash-section">
            <h1 className="dash-sec-title">Today</h1>
            <div className="dash-sec-content">
              {notifications.length ? (
                notifications.map((notification, index) => (
                  <div className="dash-info-list" key={index}>
                    <a className="dash-card  ">
                      <div className="dash-card-container">
                        <div className="dash-card-icon">
                          <i className="fa fa-hourglass-o"></i>
                        </div>
                        <div className="dash-card-content">
                          <p>A new {notification.module} was added</p>
                        </div>
                        <div className="dash-card-avatars">
                          <div className="e-avatar">
                            <img
                              src="assets/img/profiles/avatar-09.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <div className="card">
                  <div className="card-body">
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h3>No New Notifications</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* <section className="dash-section">
            <h1 className="dash-sec-title">Next seven days</h1>
            <div className="dash-sec-content">
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-suitcase"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>2 people are going to be away</p>
                    </div>
                    <div className="dash-card-avatars">
                      <Link className="e-avatar">
                        <img src="assets/img/profiles/avatar-05.jpg" alt="" />
                      </Link>
                      <Link className="e-avatar">
                        <img src="assets/img/profiles/avatar-07.jpg" alt="" />
                      </Link>
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
                    <div className="dash-card-avatars">
                      <div className="e-avatar">
                        <img src="assets/img/profiles/avatar-02.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-info-list">
                <Link href="" className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-calendar"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>It's Spring Bank Holiday on Monday</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section> */}
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="dash-sidebar">
            <section>
              <h5 className="dash-title">Projects</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>71</h4>
                      <p>Total Tasks</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>14</h4>
                      <p>Pending Tasks</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <div className="dash-stats-list">
                      <h4>2</h4>
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
                    <button className="btn btn-primary">Apply Leave</button>
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
                      <h4>5.0 Hours</h4>
                      <p>Approved</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>15 Hours</h4>
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
                    1 October 2021 - Independence
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
