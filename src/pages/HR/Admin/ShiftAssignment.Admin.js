/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/shift-assignment.json'
import FormModal from "../../../components/Modal/Modal";
import {shiftAssignmentFormJson} from "../../../components/FormJSON/HR/shift/ShiftAssignment";
import {useAppContext} from "../../../Context/AppContext";

const ShiftAssignment = () => {
    const [formValue, setFormValue] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [template, setTemplate] = useState(shiftAssignmentFormJson)


    const {fetchShiftAssignment,combineRequest}  = useAppContext()

    useEffect(() =>{
        fetchShiftAssignment().then(res =>{
            console.log("shift assignments", res)
        }).catch(error =>{
            console.log(error)
        })
    },[])

    useEffect(() => {
        combineRequest().then(res =>{
            console.log(res)
            const {shifts, employees} = res.data.createEmployeeFormSelection
            const shiftsOpts = shifts?.map(e => {
                return {
                    label: e.shift_name,
                    value: e._id
                }
            })
            const employeeOpts = employees?.map(e => {
                return {
                    label: `${e.first_name} ${e.last_name}`,
                    value: e._id
                }
            })
            const finalForm = shiftAssignmentFormJson.Fields.map(field =>{
                if(field.name === 'employee_id'){
                    field.options = employeeOpts
                    return field
                }else if(field.name === 'shift_type_id'){
                    field.options = shiftsOpts
                    return field
                }
                return field
            })
            setTemplate(
                {
                    title: shiftAssignmentFormJson.title,
                    Fields: finalForm
                }
            )
            console.log(template)
        })
    }, [])

    const columns = [
        {
            dataField: "employee_id",
            text: "Employee",
            sort: true,

        },
        {
            dataField: "shift_type_id",
            text: "Shift Type",
            sort: true,
        },
        {
            dataField: "assignment_date",
            text: "Assignment Date",
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
                            <li className="breadcrumb-item active">Shift Assignment List</li>
                        </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a
                            href="#"
                            className="btn add-btn m-r-5"
                            data-toggle="modal"

                            data-target="#FormModal"
                        >
                            Add Shift Assignment
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
            <FormModal setformValue={setFormValue} template={template} setsubmitted={setSubmitted} />
        </>
    );
};

export default ShiftAssignment;
