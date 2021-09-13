import moment from "moment";
import React,{useState,useEffect} from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import helper from "../../services/helper";
import tokenService from "../../services/token.service";
const MINUTE_MS = 60000;
const Timesheet = () => {
  const [punchedIn, sepunchedIn] = useState()
  const [monthAttendance, setmonthAttendance] = useState([])
  const [workedTime, setworkedTime] = useState('0:00')
  const [user, setuser] = useState(tokenService.getUser())
  const {fetchEmployeeAttendance} = useAppContext()
  const [attendance, setattendance] = useState(tokenService.getAttendance())
  const punchInOut = () =>{
    console.log(attendance)
    const currUser = user
    
    if(!attendance){
      const obj = {
        ogId: currUser.ogid,
        clockInTime: new Date(),
        
        departmentId: currUser.department
      }
      axiosInstance.post('/api/attendance', obj).then(e =>{
        fetchEmployeeAttendance()
        const att = e.data.data.attendance
        console.log(att);
        setattendance(att)
        tokenService.setAttendance(att)
      })
    }else{
      const obj = {
        attendanceId: attendance._id,
        clockOutTime: new Date()
      }
      axiosInstance.patch('/api/attendance', obj).then(e =>{
        console.log(e.data.data.attendance);
        tokenService.removeAttendance()
        fetchEmployeeAttendance()
      })
      console.log(obj)
    }
  }
  useEffect(() => {
    const wt = helper.diffHours(new Date(attendance?.clockInTime).toLocaleTimeString(), new Date().toLocaleTimeString())
    setworkedTime(wt)
    const interval = setInterval(() => {
      const wt = helper.diffHours(new Date(attendance?.clockInTime).toLocaleTimeString(), new Date().toLocaleTimeString())
      console.log('Logs every minute');
      setworkedTime(wt)
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  useEffect(() => {
    const user = tokenService.getUser()
    console.log(user)
  //  axiosInstance.post()
  }, [attendance])
  return (
    <div className="col-md-4">
      <div className="card punch-status">
        <div className="card-body">
          <h5 className="card-title">
            Timesheet <small className="text-muted">{moment().format('ll')}</small>
          </h5>
          <div className="punch-det">
            <h6>{attendance && 'Punch In at'}</h6>
            <p>{attendance ? moment(attendance.clockInTime).format('ll h:mm a') : 'You havent clocked in today'}</p>
          </div>
          <div className="punch-info">
            <div className="punch-hours">
              <span>{attendance ? workedTime : '0:00'} hrs</span>
              
            </div>
          </div>
          <div className="punch-btn-section">
            <button onClick={() => punchInOut()} type="button" className="btn btn-primary punch-btn">
              {attendance ? 'Punch Out': 'Punch In'}
            </button>
          </div>
          <div className="statistics">
            <div className="row">
              <div className="col-md-6 col-6 text-center">
                <div className="stats-box">
                  <p>Break</p>
                  <h6>1 hrs</h6>
                </div>
              </div>
              <div className="col-md-6 col-6 text-center">
                <div className="stats-box">
                  <p>Overtime</p>
                  <h6>0 hrs</h6>
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