/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import {jobOpeningFormJson} from "../../../components/FormJSON/HR/recruitment/JobOpening";
import {useAppContext} from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";


const JobOpening = () => {
    const [formValue, setFormValue] = useState({})
    const [template, setTemplate] = useState(jobOpeningFormJson)
    const [submitted, setSubmitted] = useState(false)
    const {combineRequest,showAlert}  = useAppContext()
    const [data,setData] = useState([])

    const fetchJobOpenings = () =>{
        axiosInstance.get('/api/jobOpening').then(res =>{
            console.log(res.data.data)
            setData(res.data.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(() =>{
        fetchJobOpenings()
    },[])


    useEffect(() => {
        combineRequest().then(res => {
            console.log(res)
            const {projects,designations} = res.data.createEmployeeFormSelection
            const projectsOpts = projects?.map(e => {
                return {
                    label: e.project_name,
                    value: e._id
                }
            })
            const designationOpts = designations?.map(e => {
                return {
                    label: e.designation,
                    value: e._id
                }
            })
            const finalForm = jobOpeningFormJson.Fields.map(field =>{
                if(field.name === 'designation_id'){
                    field.options = designationOpts
                    return field
                }else if(field.name === 'project_id'){
                    field.options = projectsOpts
                    return field
                }
                return field
            })
            setTemplate(
                {
                    title: jobOpeningFormJson.title,
                    Fields: finalForm
                }
            )
            console.log(template)
        }).catch(error =>{
            console.log(error)
        })
    },[])

    //create job opening
    useEffect(() => {
        console.log(submitted)
        if(submitted === true){
            axiosInstance.post('/api/jobOpening', formValue).then(res =>{
                setSubmitted(false);
                fetchJobOpenings()
                setData(prevData => [...data, res.data.data])

                showAlert(true,res.data.message,'alert alert-success')
            }).catch(error =>{
                console.log(error.response.data)
                showAlert(true,error.response.data.message,'alert alert-danger')
            })
        }
        console.log(formValue)
    }, [submitted])

    //delete job opening
    const deleteJobOpening = (row) =>{
        axiosInstance.delete(`/api/jobOpening/${row._id}`).then(res =>{
            console.log(res)
            setData(prevData => prevData.filter(pdata => pdata._id !== row._id))
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }
    //update jobOpening
    const updateJobOpening = (row) =>{
        axiosInstance.patch(`/api/jobOpening/${row._id}`,row).then(res =>{
            console.log(res)
            setData(prevData => [...data, res.data.data])
            fetchJobOpenings()
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }


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
        },
        {
            dataField: "designation_id",
            text: "Designation",
            sort: true,
            formatter: (value, row) => (
                <h2>{row?.designation_id?.designation}</h2>
            )
        },
        {
            dataField: "project_id",
            text: "Project",
            sort: true,
            formatter: (value, row) => (
                <h2>{row?.project_id?.project_name}</h2>
            )
        },
        {
            dataField: "description",
            text: "Description",
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
                        <Link className="dropdown-item" onClick={() => deleteJobOpening(row)} ><i className="fa fa-trash m-r-5"></i> Delete</Link>
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
            <FormModal setformValue={setFormValue} template={jobOpeningFormJson} setsubmitted={setSubmitted}  />
        </>
    );
};

export default JobOpening;
