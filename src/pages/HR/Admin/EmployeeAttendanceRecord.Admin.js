
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployeeAttendanceRecordTable from '../../../components/Tables/EmployeeTables/EmployeeAttendanceRecordTable';
import axiosInstance from '../../../services/api';
import moment from 'moment';

const EmployeeAttendanceRecordAdmin = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const { employee } = useParams();
  const { id } = useParams();

  const firstDay = moment().startOf('month').format('YYYY-MM-DD');
  const lastDay = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
	const [today, setToday] = useState(null);

  useEffect(() => {
		const time = new Date().toDateString();
		const today_date = moment(time).format("yyyy-MM-DD");
		setToday(today_date);
	}, []);
  
  const fetchEmployeeAttendanceRecords = useCallback(() => {
    setLoading(true);
    axiosInstance
    .get('/api/attendance/from-postgres/for-hr', {
      params: {
        ogid: id,
        from: fromDate,
        to: toDate,
      },
    })
      .then((res) => {
        let resData = res?.data?.data

        let formatted = resData.map((e) => ({
          ClockIn: e?.ClockIn ? moment(e?.ClockIn, "HH:mm:ss").format("LT") : 'No Clock In',
          ClockOut: e?.ClockOut ? moment(e?.ClockOut, "HH:mm:ss").format("LT") : 'No Clock Out',
          Date: e?.Date ? moment(e?.Date).format("ddd, MMMM D, YYYY") : 'No Date',
        }));

        setEmployeeAttendance(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [fromDate, id, toDate]);

  useEffect(() => {
    fetchEmployeeAttendanceRecords();
  }, [fetchEmployeeAttendanceRecords]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{employee}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Employee</Link>
              </li>
              <li className="breadcrumb-item active">Attendance Record</li>
            </ul>
          </div>
        </div>
      </div>
    
      <EmployeeAttendanceRecordTable
        data={employeeAttendance}
        setData={setEmployeeAttendance}
        loading={loading}
        setLoading={setLoading}
        
        fromDate={fromDate}
        toDate={toDate}
        today={today}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
         
    </>
  );
};

export default EmployeeAttendanceRecordAdmin;
