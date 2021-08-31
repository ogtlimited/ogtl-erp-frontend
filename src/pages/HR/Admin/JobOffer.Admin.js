/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/job-offer.json'
import FormModal from "../../../components/Modal/Modal";
import {jobOfferFormJson} from "../../../components/FormJSON/HR/recruitment/JobOffer";


const JobOffer = () => {
    const [formValue, setFormValue] = useState({})

    const columns = [
        {
            dataField: "job_applicant_id",
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
            dataField: "offer_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "designation_id",
            text: "Designation",
            sort: true,
            //   filter: dateFilter({
            //     style: { display: 'flex' },
            //     getFilter: (filter) => {
            //         attendanceDateFilter = filter;
            //     }
            //   }),

        },
        {
            dataField: "job_offer_terms",
            text: "Job Offer Terms",
            sort: true,
        },
        {
            dataField: "terms_and_conditions",
            text: "Term and Conditions",
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
                        <h3 className="page-title">Job Offer List</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/">Employees</Link>
                            </li>
                            <li className="breadcrumb-item active">Job Offer List</li>
                        </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                        <a
                            href="#"
                            className="btn add-btn m-r-5"
                            data-toggle="modal"
                            data-target="#FormModal"
                        >
                            Add Job Offer
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
            <FormModal setformValue={setFormValue} template={jobOfferFormJson}  />
        </>
    );
};

export default JobOffer;
