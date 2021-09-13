import React, {useState, useEffect} from "react";
import { salaryAssignmentFormJson } from "../../components/FormJSON/payroll/salary-assignments";
import { salaryComponentsFormJson } from "../../components/FormJSON/payroll/salary-component";
import { salaryStructureFormJson } from "../../components/FormJSON/payroll/salary-structure";
import FormModal from "../../components/Modal/Modal";
import SalaryAssignment from "../../components/payroll-tabs/salary-assignment";
import SalaryComponents from "../../components/payroll-tabs/salary-components";
import SalaryStructure from "../../components/payroll-tabs/salary-structure";

const PayrollItems = () => {
  const [formType, setformType] = useState('')
  const [template, settemplate] = useState(salaryComponentsFormJson)
  const [formValue, setformValue] = useState({})
  const [submitted, setsubmitted] = useState(false)
  const [path, setpath] = useState('/personal-details')
  const [editData, seteditData] = useState({});
  useEffect(() => {
    console.log(formType)
    if(formType === 'components'){
      settemplate(salaryComponentsFormJson)
    }else if(formType === 'structure'){
      settemplate(salaryStructureFormJson)
    }else if(formType === 'assignment'){
      settemplate(salaryAssignmentFormJson)
    }
  }, [formType, template])
  useEffect(() => {
    if(submitted === true){
      console.log(formValue)
      setformValue({})
      setsubmitted(false)

    }
  }, [formValue])
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Payroll Items</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Payroll Items</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a   className="nav-link active"data-toggle="tab" href="#tab_components">
                  Salary Components
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_structure">
                  Salary Structure
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_assignment">
                  Salary Assigment
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
       <SalaryComponents setformType={setformType} />
        <SalaryStructure setformType={setformType} />
        <SalaryAssignment setformType={setformType} />
      </div>
      <FormModal editData={editData} setformValue={setformValue} settemplate={settemplate} template={template} setsubmitted={setsubmitted} />
    </>
  );
};

export default PayrollItems;
