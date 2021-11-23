import moment from "moment";
import React, {useState, useEffect} from "react";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import tokenService from "../../services/token.service";

const Stats = () => {

  const {fetchEmployeeAttendance, employeeAttendance} = useAppContext()
  const [today, settoday] = useState(0)
  const [user, setuser] = useState(tokenService.getUser())
  useEffect(() => {
    if(employeeAttendance.length){
      let todayAttendance =  employeeAttendance.filter(e => moment(new Date().toLocaleDateString()).isSame(new Date(e.clockInTime).toLocaleDateString()))
      console.log(todayAttendance)
      if(todayAttendance.length){
        settoday(todayAttendance[0])
        const wt = helper.diffHours(new Date(todayAttendance?.clockInTime).toLocaleTimeString(), new Date().toLocaleTimeString())
        console.log(wt)
      const shiftEnd = user?.default_shift?.end_time;
      let endToSec = shiftEnd.split(':').reduce((acc,time) => (60 * acc) + +time) * 60
      let wtToSec = wt.split(':').reduce((acc,time) => (60 * acc) + +time) * 60
      console.log(wt, shiftEnd)
      console.log(endToSec, wtToSec)
      }
     }
   
  }, [])

	const pWidth = {
        width: '60%'
      }
  return (
    <div className="col-md-4">
      <div className="card att-statistics">
        <div className="card-body">
          <h5 className="card-title">Statistics</h5>
          <div className="stats-list">
            <div className="stats-info">
              <p>
                Today{" "}
                <strong>
                  3.45 <small>/ 8 hrs</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                This Week{" "}
                <strong>
                  28 <small>/ 40 hrs</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                This Month{" "}
                <strong>
                  90 <small>/ 160 hrs</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Remaining{" "}
                <strong>
                  90 <small>/ 160 hrs</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Overtime <strong>4</strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
