import moment from "moment";
import React, {useState, useEffect} from "react";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import tokenService from "../../services/token.service";

const Stats = () => {

  const {fetchEmployeeAttendance, employeeAttendance} = useAppContext()
  const [today, settoday] = useState(0)
  const [totalDailyHours, settotalDailyHours] = useState(0)
  const [totalWeeklyHours, settotalWeeklyHours] = useState(0)
  const [totalMonthlyHours, settotalMonthlyHours] = useState(0)
  const [week, setweek] = useState(0)
  const [month, setmonth] = useState(0)
  const [user, setuser] = useState(tokenService.getUser())
  useEffect(() => {
    const startTime = moment(user?.default_shift?.start_time,"HH:mm");
    const endTime  = moment(user?.default_shift?.end_time,"HH:mm");
    let duration = moment.duration(endTime.diff(startTime))
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes())%60;
    settotalDailyHours(hours + '.' + minutes)
    let totalMin = (hours * 60 * 5) + (minutes * 5)
    let wkHours = (totalMin / 60) + '.' + (totalMin % 60);
    let mHours = (hours * 60 * 20) + (minutes * 20)
    settotalWeeklyHours(wkHours)
    settotalMonthlyHours((mHours / 60) + '.' + (mHours % 60))
    // console.log(hours + ' hour and '+ minutes+' minutes.')
  }, [])
  const calcWorkTime = (attendance) =>{
    const startTime = moment(new Date(attendance?.clockInTime));
    console.log(startTime)
    const endTime  = moment(new Date());
    let duration = moment.duration(endTime.diff(startTime))
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes())%60;
    let minStr = minutes < 10 ? '0'+minutes : minutes
    return hours + ":" + minStr
  }
  useEffect(() => {

    if(employeeAttendance.length){
      let todayAttendance =  employeeAttendance.filter(e => moment(new Date().toLocaleDateString()).isSame(new Date(e.clockInTime).toLocaleDateString()))[0]
      console.log(todayAttendance)
      if(todayAttendance){
        const wt = calcWorkTime(todayAttendance)
        settoday(wt)
        console.log(wt)

      const shiftEnd = user?.default_shift?.end_time;
      let endToSec = shiftEnd.split(':').reduce((acc,time) => (60 * acc) + +time) * 60
      let wtToSec = wt.split(':').reduce((acc,time) => (60 * acc) + +time) * 60
      console.log(wt, shiftEnd)
      console.log(endToSec, wtToSec)
      let weekAttendance = employeeAttendance.filter(att => moment(att.createdAt).isSame(new Date(), 'week'))
      console.log(weekAttendance)
    }
     }
   
  }, [today])

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
                  {today} <small>/ {totalDailyHours} hrs</small>
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
                  28 <small>/ {totalWeeklyHours} hrs</small>
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
                  90 <small>/ {totalMonthlyHours} hrs</small>
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
                  90 <small>/ {totalMonthlyHours} hrs</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Overtime <strong>0</strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                 
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
