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
            <h2 className="table-avatar">
            <a href="profile.html" className="avatar"><img alt="" src={avater} /></a>
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
            <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
            <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" onClick={() => console.log(row)} href="#" data-toggle="modal"
                    data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a><a className="dropdown-item" href="#"
                    data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash m-r-5"></i> Delete</a></div>
            </div>
          )
        
        },
      ];
    return (
        <>
          <div className="page-header">
<div className="row align-items-center">
<div className="col">
<h3 className="page-title">Promotion</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><Link to="">Dashboard</Link></li>
<li className="breadcrumb-item active">Promotion</li>
</ul>
</div>
<div className="col-auto float-right ml-auto">
<a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_promotion"><i className="fa fa-plus"></i> Add Promotion</a>
</div>
</div>
</div> 
<div className="row">
<div className="col-sm-12">
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
