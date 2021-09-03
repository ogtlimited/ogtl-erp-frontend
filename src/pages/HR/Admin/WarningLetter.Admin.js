/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/warning-letter.json'
import FormModal from "../../../components/Modal/Modal";
import {warningLetterFormJson} from "../../../components/FormJSON/HR/Performance/Warning";

const WarningLetter = () => {
    const [formValue, setFormValue] = useState({})

    const columns = [
        {
            dataField: "employee_id",
            text: "Employee",
            sort: true,

        },

        {
            dataField: "hr_user_id",
            text: "HR User",
            sort: true,
        },
        {
            dataField: "reason",
            text: "Reason",
            sort: true,
        },
        {
            dataField: "details",
            text: "Details",
            sort: true,
        },
        {
            dataField: "actions",
            text: "Actions",
            sort: true,
        },
        {
            dataField: "date_issued",
            text: "Date Issued",
            sort: true,
        },
        {
            dataField: "warningCount",
            text: "Warning Count",
            sort: true,
        },
        {
            dataField: "isInPip",
            text: "PIP Status",
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
                            <li className="breadcrumb-item active">Warning Letter List</li>
                        </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a
                            href="#"
                            className="btn add-btn m-r-5"
                            data-toggle="modal"
                            data-target="#FormModal"
                        >
                            Add Warning Letter
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
            <FormModal setformValue={setFormValue} template={warningLetterFormJson} />
        </>
    );
};

export default WarningLetter;
