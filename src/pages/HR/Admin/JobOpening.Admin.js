/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/job-opening.json'
import FormModal from "../../../components/Modal/Modal";
import {jobOpeningFormJson} from "../../../components/FormJSON/HR/recruitment/JobOpening";


const JobOpening = () => {
    const [formValue, setFormValue] = useState({})

    const columns = [
        {
            dataField: "job_title",
            text: "Job Title",
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
            dataField: "designation_id",
            text: "Designation",
            sort: true,
        },
        {
            dataField: "campaign_id",
            text: "Campaign",
            sort: true,
            //   filter: dateFilter({
            //     style: { display: 'flex' },
            //     getFilter: (filter) => {
            //         attendanceDateFilter = filter;
            //     }
            //   }),

        },
        {
            dataField: "description",
            text: "Description",
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
                        <h3 className="page-title">Job Opening List</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/">Employees</Link>
                            </li>
                            <li className="breadcrumb-item active">Job Opening List</li>
                        </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a
                            href="#"
                            className="btn add-btn m-r-5"
                            data-toggle="modal"
                            data-target="#FormModal"
                        >
                            Add Job Opening
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
            <FormModal setformValue={setFormValue} template={jobOpeningFormJson}  />
        </>
    );
};

export default JobOpening;
