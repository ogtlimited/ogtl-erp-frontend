
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { employeeFormJson } from '../../../components/FormJSON/HR/Employee/employee'
import PageHeader from '../../../components/Misc/PageHeader'
import FormModal from '../../../components/Modal/Modal'
import EmployeesTable from '../../../components/Tables/EmployeeTables/employeeTable'
import GeneralTable from '../../../components/Tables/Table'
import { useAppContext } from '../../../Context/AppContext'

import designation from '../../../db/designation.json'
import { employeeList } from '../../../db/employee'
const AllEmployeesAdmin = () => {
    const breadcrumb = "All Employees"
    const {newEmployee, allEmployees, combineRequest} = useAppContext()
    const [selectedOption, setSelectedOption] = useState(null);
    const [formValue, setformValue] = useState({})
    const [template, settemplate] = useState(employeeFormJson)
    const [submitted, setsubmitted] = useState(false)
    console.log(allEmployees)

    useEffect(() => {
      combineRequest().then(res =>{
        console.log(res)
        const {shifts, designations} = res.data.createEmployeeFormSelection
        const shiftsopts = shifts?.map(e => {
          return {
            label: e.shift_name,
            value: e._id
          }
        })
        const designationOpts = designations?.map(e => {
          return {
            label: e.designation,
            value: e._id
          }
        })
        const finalForm = employeeFormJson.Fields.map(field =>{
          if(field.name === 'designation'){
           field.options = designationOpts
           return field
          }else if(field.name === 'default_shift'){
            field.options = shiftsopts
            return field
          }
          return field
        })
        settemplate(
          {
            title: employeeFormJson.title,
            Fields: finalForm
          }
        )
        console.log(template)
      })
    }, [])
    useEffect(() => {
      console.log(submitted)
      if(submitted == true){
        formValue.image = ""
        newEmployee(formValue).then(res =>{
          setsubmitted(false);
          console.log(res)
        })

      }
     console.log(formValue)
    }, [submitted])
    const defaultSorted = [
        {
          dataField: "designation",
          order: "desc",
        },
      ];
    return (
        <>
          <div class="page-header">
<div class="row align-items-center">
<div class="col">
<h3 class="page-title">Employee</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
<li class="breadcrumb-item active">Employee</li>
</ul>
</div>
<div class="col-auto float-right ml-auto">
<a href="#" class="btn add-btn" data-toggle="modal" data-target="#FormModal"><i class="fa fa-plus"></i> Add Employee</a>
<div class="view-icons">
<a href="employees.html" class="grid-view btn btn-link active"><i class="fa fa-th"></i></a>
<a href="employees-list.html" class="list-view btn btn-link"><i class="fa fa-bars"></i></a>
</div>
</div>
</div>
</div>
           <EmployeesTable
            data={allEmployees} 
            departments={designation} 
            defaultSorted={defaultSorted}
            selectedOption={selectedOption}
           />
           <FormModal setformValue={setformValue} template={template} setsubmitted={setsubmitted} />
        </>
    )
}

export default AllEmployeesAdmin
