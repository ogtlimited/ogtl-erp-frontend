import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../../db/promotion.json'
import { AssetFormJson } from '../../../components/FormJSON/Assets/assets'
import FormModal from "../../../components/Modal/Modal";

const Asset = () => {
    const [template, setTemplate] = useState(AssetFormJson)
    const [editData, seteditData] = useState({});
    useEffect(()=>{
        setTemplate(AssetFormJson)
        
    })
    const columns = [
        {
          dataField: "assetName",
          text: "Asset name",
          sort: true,
       
          
        },
        {
          dataField: "assigned_to",
          text: "Assigned to",
          sort: true,
        
        },
        {
          dataField: "manufacturer",
          text: "Manufacturer",
          sort: true,
        
          
        },
        {
          dataField: "supplier",
          text: "Supplier",
          sort: true,
       
        },
        {
          dataField: "model",
          text: "Model",
          sort: true,
       
          
        },
        {
            dataField: "serialNumber",
            text: "Serial Number",
            sort: true,
          
            
          },
          {
            dataField: "condition",
            text: "Condition",
            sort: true,
        
            
          },
          {
            dataField: "warranty",
            text: "Warranty",
            sort: true,
         
            
          },
          {
            dataField: "value",
            text: "Value",
            sort: true,
          
            
          },
          {
            dataField: "description",
            text: "Description",
            sort: true,
          
            
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
<h3 className="page-title">Assets</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><Link to="">Dashboard</Link></li>
<li className="breadcrumb-item active">Asset</li>
</ul>
</div>
<div className="col-auto float-right ml-auto">
<a href="#" className="btn add-btn" data-toggle="modal" data-target="#FormModal"><i className="fa fa-plus"></i> Add Asset</a>
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
<FormModal editData={editData} template={template} />
        </>
    )




}

export default Asset;