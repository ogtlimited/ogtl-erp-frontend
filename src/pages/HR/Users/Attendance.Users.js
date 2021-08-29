import React from 'react'
import Activity from '../../../components/attendance/activity'
import AttendanceTable from '../../../components/attendance/attendance-table'
import Stats from '../../../components/attendance/stats'
import Timesheet from '../../../components/attendance/timesheet'
import PageHeader from '../../../components/Misc/PageHeader'
import GeneralTable from '../../../components/Tables/Table'
import attendance from '../../../db/attendance.json'

const EmployeeAttendance = () => {
    const columns = [
        
        {
          dataField: "date",
          text: "Date",
          sort: true,
          headerStyle: { minWidth: "100px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
        },
        {
          dataField: "punch_in_time",
          text: "Punch In",
          sort: true,
          headerStyle: { minWidth: "50px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
        },
        {
          dataField: "punch_out_time",
          text: "Punch Out",
          sort: true,
          headerStyle: { minWidth: "60px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
        },
        {
          dataField: "total_hours_worked",
          text: "Total Hours",
          sort: true,
          headerStyle: { minWidth: "100px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
        },
        {
          dataField: "break",
          text: "Break",
          sort: true,
          headerStyle: { minWidth: "120px" },
          style: {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
        {
          dataField: "over_time",
          text: "Overtime",
          headerStyle: { minWidth: "100px" },
          sort: true,
          style: {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
      ];
    const breadcrumb = 'Attendance'
    return (
        <>
        <PageHeader breadcrumb={breadcrumb}/>
        <div class="row">
            <Timesheet />
            <Stats />
            <Activity />
        </div>
        <div class="row">
          <div className="col-lg-12" />
          <GeneralTable
            data={attendance}
            columns={columns}
          />
        </div>
     </>
    )
}
export default EmployeeAttendance