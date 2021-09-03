/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/shift.json'
import FormModal from "../../../components/Modal/Modal";
import {shiftTypeFormJson} from "../../../components/FormJSON/HR/shift/ShiftType";
import {shiftAssignmentFormJson} from "../../../components/FormJSON/HR/shift/ShiftAssignment";

const ShiftAdmin = () => {
    const [formType, setFormType] = useState('')
    const [template, setTemplate] = useState(shiftTypeFormJson)
    useEffect(()=>{
        if(formType === 'ShiftType'){
            setTemplate(shiftTypeFormJson)
        }else if(formType === 'ShiftAssignment'){
            setTemplate(shiftAssignmentFormJson)
        }
    },[formType])

    const handleChange = (type) =>{
        console.log(type)
        setFormType(type)
    }

    const columns = [
        {
          dataField: "shift_name",
          text: "Shift Name",
          sort: true,
         
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
         
          formatter: (value, row) => (
              <>
                <div className="action-label">
                    <a className="btn btn-white btn-sm btn-rounded" href="">
                        <i className="fa fa-dot-circle-o text-success"></i> Active
                    </a>
                </div>
            </>
            )    ,
          
          
        },
        {
          dataField: "start_time",
          text: "Start time",
          sort: true,
          
          
        },
        {
            dataField: "end_time",
            text: "End time",
            sort: true,
          //   filter: dateFilter({
          //     style: { display: 'flex' },
          //     getFilter: (filter) => {
          //         attendanceDateFilter = filter;
          //     }
          //   }),
           
          },
          {
            dataField: "break_time",
            text: "Break time",
            sort: true,
          },
        {
            dataField: "",
            text: "Action",
            sort: true,
            headerStyle: {minWidth: "70px", textAlign:"left"},
            formatter: (value, row) => (
                <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                    aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={() => {}} href="#" data-toggle="modal"
                                                                      data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                     </div>
                </div>
            )    ,
        },

      ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Shift List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Shift List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              onClick={() => handleChange('ShiftType')}
              data-target="#FormModal"
            >
              Add Shifts
            </a>
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => handleChange('ShiftAssignment')}
            >
              {" "}
              Assign Shifts
            </a>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="col-12">
              <LeavesTable
                data={data}
                columns={columns}
              />
          </div>
      </div>
        <FormModal template={template} />
    </>
  );
};

export default ShiftAdmin;
