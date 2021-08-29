import React, { useMemo, useState, useEffect, useContext } from "react";
import BootstrapTable from 'react-bootstrap-table-next';  
// import { AppContext } from "../../context/AppContext";

// import attendanceList from './attendance.json'
const AttendanceTable = () => {
  const {attendance} = useContext({})
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
    return (
        <BootstrapTable 
        striped  
        hover
        keyField='id'
        data={ attendance }
        columns={ columns } ></BootstrapTable>
        )
}

export default AttendanceTable
