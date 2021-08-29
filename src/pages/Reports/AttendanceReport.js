import React from 'react'
import { Link } from 'react-router-dom'
import { textFilter, selectFilter  } from 'react-bootstrap-table2-filter';
import LeavesTable from '../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import data from '../../db/attendace-report.json'
const AttendanceReport = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    const empOpts = Object.assign({}, data.map(e => e.employee_name))
    const monthOptions = Object.assign({}, monthNames)
    const getHour = (e) =>{
        let hour = e.split(":")[0]
        return parseInt(hour)
    }
    const d = new Date();
    const columns = [
        {
          dataField: "employee_name",
          text: "Employee name",
          headerStyle: { width: "450px" },
          filter:  selectFilter({
            options: empOpts
          })
        },
        {
          dataField: "clock_in",
          text: "Clock In",
          sort: true,
          headerStyle: { minWidth: "150px" },
        },
        {
          dataField: "clock_out",
          text: "Clock Out",
          sort: true,
          headerStyle: { minWidth: "100px" }
        },
        {
          dataField: "",
          text: "Total Hours",
          sort: true,
          headerStyle: { minWidth: "100px" },
          formatter: (value, row) =>(
            <span>{getHour(row.clock_out) - getHour(row.clock_in) }</span>
        )
        },
        {
          dataField: "",
          text: "Month",
          sort: true,
          headerStyle: { minWidth: "200px" },
          filter: selectFilter({
            options: monthOptions
          }),
          formatter: (value,row) =>(
            <span>{monthNames[new Date(row.date).getMonth()]}</span>
        )
        },
        {
          dataField: "",
          text: "Year",
          sort: true,
          headerStyle: { minWidth: "100px" },
          formatter: (value,row) =>(
            <span>{new Date(row.date).getFullYear() }</span>
        )
        },

      ];
    return (
        <>
         <div class="row">
<div class="col-sm-12">
<h3 class="page-title">Attendance Reports</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
<li class="breadcrumb-item active">Attendance Reports</li>
</ul>
</div>
</div>   
         <div class="row">
<div class="col-sm-12">
        <LeavesTable data={data} columns={columns} />
</div>
</div>   
        </>
    )
}

export default AttendanceReport
