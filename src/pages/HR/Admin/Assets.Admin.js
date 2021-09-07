import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../../db/promotion.json'
import { AssetFormJson } from '../../../components/FormJSON/Assets/assets'
import FormModal from "../../../components/Modal/Modal";

const Asset = () => {
    const [template, setTemplate] = useState(AssetFormJson)
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
<h3 class="page-title">Assets</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><Link to="">Dashboard</Link></li>
<li class="breadcrumb-item active">Asset</li>
</ul>
</div>
<div class="col-auto float-right ml-auto">
<a href="#" class="btn add-btn" data-toggle="modal" data-target="#FormModal"><i class="fa fa-plus"></i> Add Asset</a>
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
<FormModal template={template} />
        </>
    )




}

export default Asset;