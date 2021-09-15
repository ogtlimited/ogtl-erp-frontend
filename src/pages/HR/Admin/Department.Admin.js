import React, { useMemo, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import departments from "../../../db/departments.json";



import LeaveTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import { Link } from "react-router-dom";
import FormModal from "../../../components/Modal/Modal";
import { departmentFormJson } from "../../../components/FormJSON/HR/Employee/department";
import FormModal2 from "../../../components/Modal/FormModal2";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";

let qualityFilter;

const Departments = withRouter(({ history }) => {
  const [template, settemplate] = useState([]);
  const {formUpdate, setformUpdate} = useAppContext()
  const [submitted, setsubmitted] = useState(false)
  const [formValue, setformValue] = useState(null)
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null)
  const [deleteData, setdeleteData] = useState(null)
  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
 
  const [allDepartments, setallDepartments] = useState([]);

  const breadcrumb = "Departments";
  const fetchDept=  () =>{
    axiosInstance.get('/department').then(e =>{
      // console.log(e.data.data)
      setallDepartments(e?.data?.data)
    })
  }
  const editRow =(row)=>{
    // setformUpdate(null)
    setformUpdate(row)
    setclickedRow(row)
  }

  useEffect(() => {
    console.log(formValue)
    fetchDept()
    if(formValue){
      if(!editData){
        axiosInstance.post('/department', formValue).then(e =>{
          console.log(e)
          setformValue(null)
        }).catch(err =>{
          setformValue(null)
          console.log(err)
        })
      }else{
        console.log(editData)
        formValue._id = editData._id
        axiosInstance.put('/department/'+editData._id , formValue).then(e =>{
          console.log(e)
          setformValue(null)
          fetchDept()
        }).catch(err =>{
          setformValue(null)
          console.log(err)
        })
      }

    }
    setallDepartments(departments);
  }, [formValue]);
  useEffect(() => {
    seteditData(clickedRow)
  }, [clickedRow, submitted]);
  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex, )=>(
        <span>{rowIndex + 1}</span>
      )
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { width: "85%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
  aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
<div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" onClick={() => editRow(row)} href="#" data-toggle="modal"
      data-target="#FormModal"><i className="fa fa-pencil m-r-5"></i> Edit</a><a className="dropdown-item" onClick={() => setdeleteData(row)} href="#"
      data-toggle="modal" data-target="#FormModal"><i className="fa fa-trash m-r-5"></i> Delete</a>
      
      </div>
</div>)
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Department</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Department
            </a>
          </div>
        </div>
      </div>
      <div className="row">      
        <LeaveTable
        
          data={allDepartments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />

    
      </div>
      <FormModal2 title="Create Department" editData={editData} setformValue={setformValue} template={departmentFormJson} setsubmitted={setsubmitted} />
    </>
  );
});

export default Departments;
