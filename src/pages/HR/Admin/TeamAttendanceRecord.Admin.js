// *IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import TeamAttendanceTable from "../../../components/Tables/EmployeeTables/TeamAttendanceTable";

const TeamAttendanceRecord = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [loadingOfficeType, setLoadingOfficeType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTeamAttendance, setAllTeamAttendance] = useState([]);

  const [officeType, setOfficeType] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState({
    id: "",
    title: "",
    office_type: "",
  });

  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");
  const [date, setDate] = useState(today_date);

  // Fetch logged in user offices:
  const fetchLoggedInUserOffices = useCallback(async () => {
    setLoadingOfficeType(true);
    try {
      const response = await axiosInstance.get("/api/v1/leaders_offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.office_details;

      if (resData?.office_type === "campaign") {
        setOfficeType(resData?.office_type);

        const formattedOffice = resData?.offices.map((office) => ({
          label: office?.title?.toUpperCase(),
          value: office?.id,
        }));

        setOffices(formattedOffice);
      } else if (resData?.office_type === "department") {
        setOfficeType(resData?.office_type);
        setSelectedOffice({
          id: resData?.office?.id,
          title: resData?.office?.title,
          office_type: resData?.office_type,
        });
      } else {
        return null;
      }

      setLoadingOfficeType(false);
    } catch (error) {
      const component = "Staff Offices Error | ";
      ErrorHandler(error, component);
      setLoadingOfficeType(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLoggedInUserOffices();
  }, [fetchLoggedInUserOffices]);

  // Team Attendance :
  const fetchEmployeeByOffice = useCallback(async () => {
    setLoading(true);
    try {
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
            office_type: selectedOffice?.office_type
              ? selectedOffice?.office_type
              : null,
            office: selectedOffice?.id ? selectedOffice?.id : null,
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
              formattedClockIn:
                e?.clock_in === "No Clock in"
                  ? e?.clock_in
                  : moment(e?.clock_in, "HH:mm:ss").format("hh:mma"),
              formattedClockOut:
                e?.clock_out === "No Clock out"
                  ? e?.clock_out
                  : moment(e?.clock_out, "HH:mm:ss").format("hh:mma"),
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

      setAllTeamAttendance(resData);
      setLoading(false);
    } catch (error) {
      const component = "Team Attendance | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedOffice?.id, selectedOffice?.office_type]);

  useEffect(() => {
    fetchEmployeeByOffice();
  }, [fetchEmployeeByOffice]);

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "20%" },
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
            {value?.toUpperCase()}
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "10%" },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "formattedClockIn",
      text: "Clock In",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock in" ? (
          <span className="text-danger">{value}</span>
        ) : (
          value
        );
      },
    },
    {
      dataField: "formattedClockOut",
      text: "Clock Out",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value) => {
        return value === "No Clock out" ? (
          <span className="text-danger">{value}</span>
        ) : (
          value
        );
      },
    },
    {
      dataField: "work_hours",
      text: "Work Hours",
      sort: true,
      headerStyle: { width: "15%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Team Attendance Record</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Team Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div className="col-12">
            <TeamAttendanceTable
              columns={columns}
              data={allTeamAttendance}
              loadingOfficeType={loadingOfficeType}
              loading={loading}
              setLoading={setLoading}
              date={date}
              setDate={setDate}
              officeType={officeType}
              offices={offices}
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamAttendanceRecord;
