import React, { useState, useEffect, useCallback } from "react";
import { salaryAssignmentFormJson } from "../../components/FormJSON/payroll/salary-assignments";
import { salaryComponentsFormJson } from "../../components/FormJSON/payroll/salary-component";
import { salarySettingsFormJson } from "../../components/FormJSON/payroll/salary-settings";
import { salaryStructureFormJson } from "../../components/FormJSON/payroll/salary-structure";
import FormModal from "../../components/Modal/Modal";
import Salary from "../../components/payroll-tabs/Salary";
import SalaryAssignment from "../../components/payroll-tabs/salary-assignment";
import SalaryComponents from "../../components/payroll-tabs/salary-components";
import SalarySettings from "../../components/payroll-tabs/salary-settings";
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
  const [loadSelect, setloadSelect] = useState(false);
  const { createPayroll } = useAppContext();

  useEffect(() => {
    if (formType === "components") {
      settemplate(salaryComponentsFormJson);
    } else if (formType === "structure") {
      settemplate(salaryStructureFormJson);
    } else if (formType === "assignment") {
      settemplate(salaryAssignmentFormJson);
    } else if (formType === "settings") {
      settemplate(salarySettingsFormJson);
    }
  }, [formType, template]);

  const fetchedCombineRequest = useCallback(() => {
    createPayroll().then((res) => {
      const { departments, projects } = res.data.createPayrollForm;
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
      if (template !== null) {
        setloadSelect(true);
      }
    });
  }, [template, createPayroll, loadSelect]);

  useEffect(() => {
    fetchedCombineRequest();
  }, []);

  const fetchSalaryStructures = () => {
    axiosInstance
      .get("/api/salary-structure")
      .then((res) => {
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
                  href="#tab_salaries"
                >
                  Salary
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_settings">
                  Salary Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <Salary
          setformType={setformType}
          submitted={submitted}
          formValue={formValue}
          loadSelect={loadSelect}
        />

        <SalarySettings
          setformType={setformType}
          submitted={submitted}
          formValue={formValue}
          loadSelect={loadSelect}
          setsubmitted={setsubmitted}
        />
      </div>

    </>
  );
};

export default PayrollItems;
