import React from 'react'
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/male_avater.png'
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../../db/promotion.json'
const Promotion = () => {
    const columns = [
        {
          dataField: "employee_name",
          text: "Employee name",
          sort: true,
          headerStyle: { width: "350px" },
          formatter: (val, row)=>(
            <h2 class="table-avatar">
            <a href="profile.html" class="avatar"><img alt="" src={avater} /></a>
            <a href="profile.html">{val} <span>{row.designation}</span></a>
            </h2>
          )
        },
        {
          dataField: "department",
          text: "Department",
          sort: true,
          headerStyle: { minWidth: "150px" },
        },
        {
          dataField: "promotion_from",
          text: "Former Designation",
          sort: true,
          headerStyle: { minWidth: "100px" },
          
        },
        {
          dataField: "promotion_to",
          text: "New Designation",
          sort: true,
          headerStyle: { minWidth: "100px" },
        },
        {
          dataField: "date",
          text: "Promotion Date",
          sort: true,
          headerStyle: { minWidth: "100px" },
          
        },
        {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: { minWidth: "150px" },
          formatter: (val, row) =>(
            <div class="dropdown dropdown-action text-right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown"
                aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
            <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" onClick={() => console.log(row)} href="#" data-toggle="modal"
                    data-target="#edit_employee"><i class="fa fa-pencil m-r-5"></i> Edit</a><a class="dropdown-item" href="#"
                    data-toggle="modal" data-target="#delete_employee"><i class="fa fa-trash m-r-5"></i> Delete</a></div>
            </div>
          )
        
        },
      ];
    return (
        <>
          <div class="page-header">
<div class="row align-items-center">
<div class="col">
<h3 class="page-title">Promotion</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><Link to="">Dashboard</Link></li>
<li class="breadcrumb-item active">Promotion</li>
</ul>
</div>
<div class="col-auto float-right ml-auto">
<a href="#" class="btn add-btn" data-toggle="modal" data-target="#add_promotion"><i class="fa fa-plus"></i> Add Promotion</a>
</div>
</div>
</div> 
<div class="row">
<div class="col-sm-12">
    <LeavesTable
        data={data}
        columns={columns}
    />
</div> 
</div> 
        </>
    )
}

export default Promotion
