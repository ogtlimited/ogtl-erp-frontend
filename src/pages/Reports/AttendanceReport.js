import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { textFilter, selectFilter  } from 'react-bootstrap-table2-filter';
import LeavesTable from '../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import data from '../../db/attendace-report.json'
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import moment from 'moment';
const AttendanceReport = () => {
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [depts, setdepts] = useState([])
  const [attendance, setattendance] = useState([])
 const [campaign, setcampaign] = useState([])
 const [query, setquery] = useState(null)
 const [queryType, setqueryType] = useState('departmentId')
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

    useEffect(() => {
      combineRequest()
      .then((res) => {
        console.log(res)
        const { projects, dept } = res.data.createEmployeeFormSelection;
        const projectsOpts = projects?.map((e) => {
          return {
            label: e.project_name,
            value: e._id,
          };
        });
        const deptOpts = dept?.map((e) => {
          return {
            label: e.designation,
            value: e._id,
          };
        });
       setcampaign(projectsOpts)
       setdepts(deptOpts)
       setquery(projectsOpts[0].value)
       if(query){
         axiosInstance.get(`/api/attendance?startOfMonth=2021-11-01&endOfMonth=2021-11-31&departmentId=613a7d5b8f7b0734ccfa1f50`).then( res =>{
           console.log(res.data)
           let data = res.data.data
           setattendance(data)
           for (const i of data) {
             console.log(i)
             
           }
         })
        // const startOfMonth= new Date(moment().startOf('M')).toLocaleDateString()
        //  const endOfMonth= new Date(moment().endOf('M')).toLocaleDateString()
        //  axiosInstance.get(`/api/attendance?startOfMonth=${startOfMonth}&endOfMonth=${endOfMonth}&${queryType}=${query}`).then( res =>{
        //    console.log(res.data)
        //  })
       }
       console.log(query)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [query])
    useEffect(() => {
     console.log(attendance)
    }, [attendance])
    const empOpts = Object.assign({}, data.map(e => e.employee_name))
    const monthOptions = Object.assign({}, monthNames)
    const getHour = (e) =>{
        let hour = e.split(":")[0]
        return parseInt(hour)
    }
    const d = new Date();
    const columns = [
        {
          dataField: "first_name",
          text: "Employee name",
          headerStyle: { width: "450px" },
          // filter:  selectFilter({
          //   options: empOpts
          // }),
          formatter: (value,row) =>(
            <span>{row.first_name } {row.last_name}</span>
        )
        },
        {
          dataField: "ogid",
          text: "OGID",
          sort: true,
          headerStyle: { minWidth: "100px" },
        },
        {
          dataField: "attendance.total_hours",
          text: "Total Hours",
          sort: true,
          headerStyle: { minWidth: "100px" },
        //   formatter: (value, row) =>(
        //     <span>{getHour(row.clock_out) - getHour(row.clock_in) }</span>
        // )
        },
        {
          dataField: "attendance.month",
          text: "Month",
          sort: true,
          headerStyle: { minWidth: "200px" },
          filter: selectFilter({
            options: monthOptions
          }),

        },
        {
          dataField: "attendance.year",
          text: "Year",
          sort: true,
          headerStyle: { minWidth: "100px" },
        },

      ];
    return (
        <>
         <div className="row">
<div className="col-sm-12">
<h3 className="page-title">Attendance Reports</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
<li className="breadcrumb-item active">Attendance Reports</li>
</ul>
</div>
</div>   
         <div className="row">
<div className="col-sm-12">
        <LeavesTable data={attendance} columns={columns} />
</div>
</div>   
        </>
    )
}

export default AttendanceReport
