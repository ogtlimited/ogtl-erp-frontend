import React from 'react'
import { Link } from 'react-router-dom'
import LeavesTable from '../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import female from '../../assets/img/female_avatar.png'
  import female2 from '../../assets/img/female_avatar2.png'
  import female3 from '../../assets/img/female_avatar3.png'
  import male from '../../assets/img/male_avater.png'
  import male2 from '../../assets/img/male_avater2.png'
  import male3 from '../../assets/img/male_avater3.png'
import data from '../../db/employeeReport.json'
const EmployeeSalary = () => {

    const males = [male,male2, male3]
    const females = [female, female2, female3]
    const imageUrl = 'https://erp.outsourceglobal.com'
    const columns = [
        {
          dataField: "employee_name",
          text: "Employee Name",
          sort: true,
          headerStyle: {minWidth: "250px"},
          formatter: (value, row) => (
            <h2 className="table-avatar"><a href="" className="avatar"><img alt=""
          src={ row.image ? imageUrl  + row.image : row.gender == 'Male' ?  males[Math.floor(Math.random() * males.length)] :  females[Math.floor(Math.random() * females.length)]} /></a><a href="">{value} <span>{row.designation}</span></a></h2>
          )    ,
          
        },
        {
            dataField: "ogid",
            text: "Employee ID",
            sort: true,
            headerStyle: {minWidth: "100px"},
  
        },
        {
            dataField: "company_email",
            text: "Email",
            sort: true,
            headerStyle: {minWidth: "100px"},
  
        },
       
          {
            dataField: "designation",
            text: "Designation",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "joining_date",
            text: "Joining Date",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "salary",
            text: "Salary",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "payslip",
            text: "Payslip",
            sort: true,
            headerStyle: {minWidth: "150px"},
            formatter: (value, row) => (
              <Link className="btn btn-sm btn-primary" to="/admin/payslip">Generate Slip</Link>
            )    ,
          },
        {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: {minWidth: "70px", textAlign:"left"},
          formatter: (value, row) => (
            <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
      aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
  <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" onClick={() => (row)} href="#" data-toggle="modal"
          data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a><a className="dropdown-item" href="#"
          data-toggle="modal" data-target="#delete_employee"><i className="fa fa-download m-r-5"></i> Download Attendance</a></div>
</div>
          )    ,
        },

        
      ];
    return (
        <>
           <div className="page-header">
<div className="row align-items-center">
<div className="col">
<h3 className="page-title">Employee Salary</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
<li className="breadcrumb-item active">Salary</li>
</ul>
</div>
<div className="col-auto float-right ml-auto">
<a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_salary"><i className="fa fa-plus"></i> Add Salary</a>
</div>
</div>
</div> 
        <div className="row">
            <div className="col-md-12">
                <LeavesTable
                    data={data}
                    columns={columns}
                />
            </div>
        </div>
        </>
    )
}

export default EmployeeSalary
