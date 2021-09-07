/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/warning-letter.json'
import FormModal from "../../../components/Modal/Modal";
import {warningLetterFormJson} from "../../../components/FormJSON/HR/Performance/Warning";
import {useAppContext} from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const WarningLetter = () => {
    const [formValue, setFormValue] = useState({})
    const [template, setTemplate] = useState(warningLetterFormJson)
    const [submitted, setSubmitted] = useState(false)
    const [data,setData] = useState([])

    const {combineRequest,showAlert} = useAppContext();

    const fetchWarningLetter = () =>{
        axiosInstance.get('/api/warningLetter').then(res=>{
            console.log(res.data.data)
            setData(res.data.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(() =>{
        fetchWarningLetter()
    },[])

    useEffect(() => {
        combineRequest().then(res =>{
            console.log(res)
            const {employees} = res.data.createEmployeeFormSelection
            const employeeOpts = employees?.map(e => {
                return {
                    label: `${e.first_name} ${e.last_name}`,
                    value: e._id
                }
            })
            const finalForm = warningLetterFormJson.Fields.map(field =>{
                if(field.name === 'employee_id'){
                    field.options = employeeOpts
                    return field
                }
                return field
            })
            setTemplate(
                {
                    title: warningLetterFormJson.title,
                    Fields: finalForm
                }
            )
            console.log(template)
        })
    }, [])

    //delete aptitude test
    const deleteWarningLetter = (row) =>{
        axiosInstance.delete(`/api/warningLetter/${row._id}`).then(res =>{
            console.log(res)
            setData(prevData => prevData.filter(pdata => pdata._id !== row._id))
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }

    const columns = [
        {
            dataField: "employee_id",
            text: "Employee",
            sort: true,
            formatter: (value, row) => (
                <h2>{row?.employee_id?.first_name} {row?.employee_id?.last_name}</h2>
            )
        },

        {
            dataField: "hr_user_id",
            text: "HR User",
            sort: true,
            formatter: (value, row) => (
                <h2>{row?.hr_user_id?.first_name} {row?.hr_user_id?.last_name}</h2>
            )
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
            // formatter: (value, row) => (
            //     <>
            //         <div className="action-label">
            //             <a className="btn btn-white btn-sm btn-rounded" href="">
            //                 <i className="fa fa-dot-circle-o text-success"></i> {row.isInPip}
            //             </a>
            //         </div>
            //     </>
            // )    ,
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
                        <Link className="dropdown-item" onClick={() => deleteWarningLetter(row)} ><i className="fa fa-trash m-r-5"></i> Delete</Link>
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
                        <h3 className="page-title">Warning Letter List</h3>
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
            <FormModal setformValue={setFormValue} template={template} setsubmitted={setSubmitted} />
        </>
    );
};

export default WarningLetter;
