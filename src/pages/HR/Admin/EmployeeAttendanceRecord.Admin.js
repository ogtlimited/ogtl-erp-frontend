
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployeeAttendanceRecordTable from '../../../components/Tables/EmployeeTables/EmployeeAttendanceRecordTable';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import moment from 'moment';

const EmployeeAttendanceRecordAdmin = () => {
  const { ErrorHandler } = useAppContext();
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
  
  const fetchEmployeeAttendanceRecords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/v1/employee_attendances/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            start_date: fromDate,
            end_date: toDate,
            limit: 400,
          },
        }
      );

      const resData =
        response?.data?.data?.result === "no record for date range"
          ? []
          : response?.data?.data?.result.map((e, index) => ({
              ...e,
              idx: index + 1,
              date: moment(e?.date).format("Do MMMM, YYYY"),
            }));

      setEmployeeAttendance(resData);
      setLoading(false);
    } catch (error) {
      const component = "Employee Attendance:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Link to={`/dashboard/user/profile/${id}`}>Employee</Link>
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
