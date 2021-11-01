import React, {useState, useEffect} from "react";
import { useAppContext } from "../../Context/AppContext";
import moment from 'moment';
const Activity = () => {
  const { employeeAttendance } = useAppContext();
  const [activities, setactivities] = useState([])
  useEffect(() => {
   if(employeeAttendance.length){
     setactivities(employeeAttendance.reverse().slice(0,3))
   }
  }, [])
  console.log(employeeAttendance.reverse())
  return (
    <div className="col-md-4">
      <div className="card recent-activity">
        <div className="card-body">
          <h5 className="card-title">Activities</h5>
          <ul className="res-activity-list">
           {activities.length && activities.map(act=> (
             <>
             <li>
             <p className="mb-0">Punch In at</p>
             <p className="res-activity-time">
               <i className="fa fa-clock-o pr-1"></i>
               {act.clockInTime ? moment(new Date(act.clockInTime)).format('h:mm A'): 'Not Available'}
             </p>
           </li>
             <li>
             <p className="mb-0">Punch Out at</p>
             <p className="res-activity-time">
               <i className="fa fa-clock-o pr-1"></i>
               {act.clockOutTime ? moment(new Date(act.clockOutTime)).format('h:mm A'): 'Not Available'}
             </p>
           </li>
             </>
           ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Activity;
