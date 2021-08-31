/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/job-applicants.json'

const JobApplicants = () => {

    const columns = [
        {
            dataField: "applicant_name",
            text: "Job Applicant",
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
            dataField: "email_address",
            text: "Email Address",
            sort: true,
        },
        {
            dataField: "job_opening_id",
            text: "Job Opening",
            sort: true,
            //   filter: dateFilter({
            //     style: { display: 'flex' },
            //     getFilter: (filter) => {
            //         attendanceDateFilter = filter;
            //     }
            //   }),

        },
        {
            dataField: "application_source",
            text: "Application Source",
            sort: true,
        },
        {
            dataField: "resume_attachment",
            text: "Resume Attachment",
            sort: true,
        },
        {
            dataField: "cover_letter",
            text: "Cover Letter",
            sort: true,
        },
        {
            dataField: "video_attachment",
            text: "Video Attachment",
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
                        <h3 className="page-title">Job Applicants List</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/">Employees</Link>
                            </li>
                            <li className="breadcrumb-item active">Job Applicants List</li>
                        </ul>
                    </div>
                    {/*<div className="col-auto float-right ml-auto">*/}
                    {/*    <a*/}
                    {/*        href="#"*/}
                    {/*        className="btn add-btn m-r-5"*/}
                    {/*        data-toggle="modal"*/}
                    {/*        data-target="#FormModal"*/}
                    {/*    >*/}
                    {/*        Add Job Opening*/}
                    {/*    </a>*/}

                    {/*</div>*/}
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
        </>
    );
};

export default JobApplicants;
