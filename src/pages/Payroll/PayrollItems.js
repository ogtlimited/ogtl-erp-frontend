import React, { useState, useEffect, useCallback } from "react";
import { salaryAssignmentFormJson } from "../../components/FormJSON/payroll/salary-assignments";
import { salaryComponentsFormJson } from "../../components/FormJSON/payroll/salary-component";
import { salaryStructureFormJson } from "../../components/FormJSON/payroll/salary-structure";
import FormModal from "../../components/Modal/Modal";
import SalaryAssignment from "../../components/payroll-tabs/salary-assignment";
import SalaryComponents from "../../components/payroll-tabs/salary-components";
import SalaryStructure from "../../components/payroll-tabs/salary-structure";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

const PayrollItems = () => {
  const [formType, setformType] = useState("");
  const [template, settemplate] = useState(salaryComponentsFormJson);
  const [formValue, setformValue] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [path, setpath] = useState("/personal-details");
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);

  const { combineRequest } = useAppContext();

  useEffect(() => {
    console.log(formType);
    if (formType === "components") {
      settemplate(salaryComponentsFormJson);
    } else if (formType === "structure") {
      settemplate(salaryStructureFormJson);
    } else if (formType === "assignment") {
      settemplate(salaryAssignmentFormJson);
    }
  }, [formType, template]);

  const fetchedCombineRequest = useCallback(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { departments, projects } = res.data.createEmployeeFormSelection;
      const departmentsOpts = departments?.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      const projectsOpts = projects?.map((e) => {
        return {
          label: e.project_name,
          value: e._id,
        };
      });
      const finalForm = template.Fields.map((field) => {
        if (field.name === "departmentId") {
          field.options = departmentsOpts;
          return field;
        } else if (field.name === "projectId") {
          field.options = projectsOpts;
          return field;
        }
        return field;
      });
      settemplate({
        title: template.title,
        Fields: finalForm,
      });
      console.log("my template", template);
    });
  }, [template, combineRequest]);

  useEffect(() => {
    fetchedCombineRequest();
  }, []);

  const fetchSalaryStructures = () => {
    axiosInstance
      .get("/api/salary-structure")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryStructures();
  }, []);
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
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_components"
                >
                  Salary Components
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_structure">
                  Salary Structure
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_assignment"
                >
                  Salary Assigment
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <SalaryComponents
          setformType={setformType}
          submitted={submitted}
          formValue={formValue}
        />
        <SalaryStructure
          data={data}
          fetchSalaryStructures={fetchSalaryStructures}
        />
        <SalaryAssignment salaryStructure={data} />
      </div>
      <FormModal
        editData={editData}
        setformValue={setformValue}
        settemplate={settemplate}
        template={template}
        setsubmitted={setsubmitted}
      />
    </>
  );
};

export default PayrollItems;
