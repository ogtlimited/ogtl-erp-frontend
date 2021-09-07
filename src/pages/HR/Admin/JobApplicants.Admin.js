/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";
import {useAppContext} from "../../../Context/AppContext";

const JobApplicants = () => {
    const [data,setData] = useState([])
    const {showAlert} = useAppContext();
    const fetchJobApplicants = () =>{
        axiosInstance.get('/api/jobApplicant').then(res =>{
            console.log(res.data.data)
            setData(res.data.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(() =>{
        fetchJobApplicants()
    },[])

    //delete job opening
    const deleteJobApplicant = (row) =>{
        axiosInstance.delete(`/api/jobApplicant/${row._id}`).then(res =>{
            console.log(res)
            setData(prevData => prevData.filter(pdata => pdata._id !== row._id))
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }
    //update jobOpening
    const updateJobApplicant = (row) =>{
        axiosInstance.patch(`/api/jobApplicant/${row._id}`,row).then(res =>{
            console.log(res)
            setData(prevData => [...data, res.data.data])
            fetchJobApplicants()
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }

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

            formatter: (value, row) => (
                <>
                    <div className="action-label">
                        <a className="btn btn-white btn-sm btn-rounded" href="">
                            <i className="fa fa-dot-circle-o text-success"></i> {row?.status}
                        </a>
                    </div>
                </>
            )    ,
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
            formatter: (value, row) => (
                <h2>{row?.job_opening_id?.job_title}</h2>
            )

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
            sort: true,
            headerStyle: {minWidth: "70px", textAlign:"left"},
            formatter: (value, row) => (
                <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                        aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={() => {}} href="#" data-toggle="modal"
                           data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                        <Link className="dropdown-item" onClick={() => deleteJobApplicant(row)} ><i className="fa fa-trash m-r-5"></i> Delete</Link>
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
