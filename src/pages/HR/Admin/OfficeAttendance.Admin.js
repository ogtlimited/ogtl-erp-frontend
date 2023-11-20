// *IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
// import CampaignAttendanceTable from '../../../components/Tables/EmployeeTables/CampaignAttendanceTable';
import DailyAttendanceTable from "../../../components/Tables/EmployeeTables/DailyAttendanceTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";

const OfficeAttendanceAdmin = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { office_type, office, id } = useParams();

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  const fetchEmployeeByOffice = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/v1/office_attendances.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            date: date,
            office_type: office_type,
            office: id,
            limit: 400,
          },
        }
      );

      const resData =
        response?.data?.data?.result === "no record for date"
          ? []
          : response?.data?.data?.result.map((e) => ({
              ...e,
              date: moment(e?.date).format("ddd, Do MMM. YYYY"),
            }));

      resData.forEach((attendance) => {
        const clockIn = new Date(`2000-01-01 ${attendance.clock_in}`);
        if (attendance.clock_out !== "No Clock out") {
          const clockOut = new Date(`2000-01-01 ${attendance.clock_out}`);
          const workHours = (clockOut - clockIn) / 1000 / 3600;

          const hours = Math.floor(workHours);
          const minutes = Math.round((workHours - hours) * 60);

          attendance.work_hours = `${hours}h ${minutes}m`;

          if (workHours < 0) {
            attendance.work_hours = `-`;
          }
        } else {
          attendance.work_hours = "No Clock out";
        }
      });

      setallEmployees(resData);
      setLoading(false);
    } catch (error) {
      const component = "Office Attendance | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, id]);

  useEffect(() => {
    fetchEmployeeByOffice();
  }, [fetchEmployeeByOffice]);

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to={`/dashboard/hr/office/employee-attendance/${row?.full_name}/${row?.ogid}`}
          >
            {value?.toUpperCase()} <span>{row?.ogid}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "clock_in",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock in" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      },
    },
    {
      dataField: "clock_out",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock out" ? (
          <span className="text-danger">{value}</span>
        ) : (
          moment(value, "HH:mm:ss").format("hh:mma")
        );
      },
    },
    {
      dataField: "work_hours",
      text: "Work Hours",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{office.toUpperCase()}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/attendance-record">
                  Attendance Records
                </Link>
              </li>
              <li className="breadcrumb-item active">Office</li>
            </ul>
          </div>
        </div>
      </div>

      <DailyAttendanceTable
        columns={columns}
        data={allEmployees}
        setData={setallEmployees}
        loading={loading}
        setLoading={setLoading}
        date={date}
        setDate={setDate}
      />
    </>
  );
};

export default OfficeAttendanceAdmin;
