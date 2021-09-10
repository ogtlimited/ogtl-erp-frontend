import React,{useState,useEffect} from "react";
import axiosInstance from "../../services/api";
import tokenService from "../../services/token.service";

const Timesheet = () => {
  const [punchedIn, sepunchedIn] = useState()
  const [monthAttendance, setmonthAttendance] = useState([])
  const [user, setuser] = useState(tokenService.getUser())
  const punchInOut = () =>{
    const currUser = user
    const obj = {
      ogId: currUser.ogid,
      clockInTime: new Date(),
      departmentId: currUser.department
    }
    axiosInstance.post('/api/attendance', obj).then(e =>{
      console.log(e)
    })
  }
  useEffect(() => {
    const user = tokenService.getUser()
    console.log(user)
  //  axiosInstance.post()
  }, [])
  return (
    <div class="col-md-4">
      <div class="card punch-status">
        <div class="card-body">
          <h5 class="card-title">
            Timesheet <small class="text-muted">11 Mar 2019</small>
          </h5>
          <div class="punch-det">
            <h6>Punch In at</h6>
            <p>Wed, 11th Mar 2019 10.00 AM</p>
          </div>
          <div class="punch-info">
            <div class="punch-hours">
              <span>3.45 hrs</span>
            </div>
          </div>
          <div class="punch-btn-section">
            <button onClick={() => punchInOut()} type="button" class="btn btn-primary punch-btn">
              Punch Out
            </button>
          </div>
          <div class="statistics">
            <div class="row">
              <div class="col-md-6 col-6 text-center">
                <div class="stats-box">
                  <p>Break</p>
                  <h6>1.21 hrs</h6>
                </div>
              </div>
              <div class="col-md-6 col-6 text-center">
                <div class="stats-box">
                  <p>Overtime</p>
                  <h6>3 hrs</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
