/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/shift-request.json'
import FormModal from "../../../components/Modal/Modal";
import {useAppContext} from "../../../Context/AppContext";
import {shiftRequestFormJson} from "../../../components/FormJSON/HR/shift/ShiftRequest";

const ShiftRequest = () => {
    const [formValue, setFormValue] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const {fetchShiftRequests}  = useAppContext()

    useEffect(() =>{
        fetchShiftRequests().then(res =>{
            console.log("shift requests",res)
        }).catch(error=>{
            console.log(error)
        })
    },[])

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
            dataField: "from_date",
            text: "From Date",
            sort: true,

        },
        {
            dataField: "to_date",
            text: "To Date",
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
                            <li className="breadcrumb-item active">Shift Requests List</li>
                        </ul>
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
            <FormModal setformValue={setFormValue} template={shiftRequestFormJson} />
        </>
    );
};

export default ShiftRequest;
