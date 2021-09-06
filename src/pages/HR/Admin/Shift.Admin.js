/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/shift.json'
import FormModal from "../../../components/Modal/Modal";
import {shiftTypeFormJson} from "../../../components/FormJSON/HR/shift/ShiftType";
import {useAppContext} from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const ShiftAdmin = () => {
    const [formValue, setFormValue] = useState({})

    const [submitted, setSubmitted] = useState(false)

    const {fetchTypesShift}  = useAppContext()

    useEffect(()=>{
        fetchTypesShift().then(res =>{
            console.log("Shift types response",res)
        }).catch(error =>{
            console.log(error.response.data)
        })
    },[])

    useEffect(() => {
        console.log(submitted)
        if(submitted === true){
            axiosInstance.post('/api/shiftType', formValue).then(res =>{
                fetchTypesShift()
                setSubmitted(false);
                console.log(res)
            })
        }
        console.log(formValue)
    }, [submitted])


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
              data-target="#FormModal"
            >
              Add Shifts
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
        <FormModal setformValue={setFormValue} template={shiftTypeFormJson} setsubmitted={setSubmitted} />
    </>
  );
};

export default ShiftAdmin;
