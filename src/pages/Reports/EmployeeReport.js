import React from 'react'
import female from '../../assets/img/female_avatar.png'
  import female2 from '../../assets/img/female_avatar2.png'
  import female3 from '../../assets/img/female_avatar3.png'
  import male from '../../assets/img/male_avater.png'
  import male2 from '../../assets/img/male_avater2.png'
  import male3 from '../../assets/img/male_avater3.png'
import LeavesTable from '../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../db/employeeReport.json'
const EmployeeReport = () => {
    const imageUrl = 'https://erp.outsourceglobal.com'
    const males = [male,male2, male3]
    const females = [female, female2, female3]
    const columns = [
        {
          dataField: "employee_name",
          text: "Employee Name",
          sort: true,
          headerStyle: {minWidth: "250px"},
          formatter: (value, row) => (
            <h2 class="table-avatar"><a href="" class="avatar"><img alt=""
          src={ row.image ? imageUrl  + row.image : row.gender == 'Male' ?  males[Math.floor(Math.random() * males.length)] :  females[Math.floor(Math.random() * females.length)]} /></a><a href="">{value} <span>{row.designation}</span></a></h2>
          )    ,
          
        },
        {
            dataField: "company_email",
            text: "Company Email",
            sort: true,
            headerStyle: {minWidth: "100px"},
  
        },
        {
            dataField: "department",
            text: "Department",
            sort: true,
            headerStyle: {minWidth: "150px"},
            
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
            dataField: "dob",
            text: "DOB",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "marital_status",
            text: "Marital Status",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "gender",
            text: "Gender",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "terminated_date",
            text: "Terminated Date",
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
            dataField: "address",
            text: "Address",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "phone",
            text: "Phone",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "emergency_contact",
            text: "Emergency Contact",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },
          {
            dataField: "experience",
            text: "Experience",
            sort: true,
            headerStyle: {minWidth: "150px"},
          },

        {
          dataField: "status",
          text: "Status",
          sort: true,
          headerStyle: {minWidth: "120px"},
          formatter: (value, row) => (
            <>
            {value == 'Active' ?
            <a href="" class="pos-relative"> <span className="status-online"></span> <span className="ml-4 d-block">{value}</span></a>
            : value == 'Pending' ?
             <a href="" class="pos-relative"> <span className="status-pending"></span> <span className="ml-4 d-block">{value}</span></a>
             : value == 'Terminated' ?
             <a href="" class="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
             :
             <a href="" class="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
            }

            </>
          )    ,
        },
       
        {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: {minWidth: "70px", textAlign:"left"},
          formatter: (value, row) => (
            <div class="dropdown dropdown-action text-right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown"
      aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
  <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" onClick={() => (row)} href="#" data-toggle="modal"
          data-target="#edit_employee"><i class="fa fa-pencil m-r-5"></i> Edit</a><a class="dropdown-item" href="#"
          data-toggle="modal" data-target="#delete_employee"><i class="fa fa-download m-r-5"></i> Download Attendance</a></div>
</div>
          )    ,
        },

        
      ];
    return (
        <>
            <div class="page-header">
<div class="row">
<div class="col">
<h3 class="page-title">Employee Report</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
<li class="breadcrumb-item active">Employee Report</li>
</ul>
</div>
<div class="col-auto">
<a href="#" class="btn btn-primary">PDF</a>
</div>
</div>
</div>
<div class="row">
<div class="col-sm-12">
    <LeavesTable
        columns={columns}
        data={data}
    />
</div>
    
</div>
        </>
    )
}

export default EmployeeReport
