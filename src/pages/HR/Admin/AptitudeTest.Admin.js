/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/aptitude-test.json'
import FormModal from "../../../components/Modal/Modal";
import {applicationTestFormJson} from "../../../components/FormJSON/HR/recruitment/ApplicationTest";

const AptitudeTest = () => {
    const [formValue, setFormValue] = useState({})

    const columns = [
        {
            dataField: "test_type",
            text: "Test Type",
            sort: true,

        },
        {
            dataField: "status",
            text: "Status",
            sort: true,

            // formatter: (value, row) => (
            //     <>
            //         <div className="action-label">
            //             <a className="btn btn-white btn-sm btn-rounded" href="">
            //                 <i className="fa fa-dot-circle-o text-success"></i> Active
            //             </a>
            //         </div>
            //     </>
            // )    ,
        },
        {
            dataField: "job_applicant_id",
            text: "Job Applicant",
            sort: true,
        },
        {
            dataField: "hr_user",
            text: "HR User",
            sort: true,
            //   filter: dateFilter({
            //     style: { display: 'flex' },
            //     getFilter: (filter) => {
            //         attendanceDateFilter = filter;
            //     }
            //   }),

        },
        {
            dataField: "score",
            text: "Score",
            sort: true,
        },
        {
            dataField: "interview_date",
            text: "Interview Date",
            sort: true,
        },
        {
            dataField: "phone_number",
            text: "Phone Number",
            sort: true,
        },
        {
            dataField: "notes",
            text: "Notes",
            sort: true,
        },
        {
            dataField: "",
            text: "Action",
            sort: false,

        },

    ];
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col">
                        <h3 className="page-title">Aptitude Test List</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/">Employees</Link>
                            </li>
                            <li className="breadcrumb-item active">Aptitude Test List</li>
                        </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a
                            href="#"
                            className="btn add-btn m-r-5"
                            data-toggle="modal"
                            data-target="#FormModal"
                        >
                            Add Aptitude Test
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
            <FormModal setformValue={setFormValue} template={applicationTestFormJson}  />
        </>
    );
};

export default AptitudeTest;
