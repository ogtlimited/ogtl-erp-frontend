import React, { useState, useEffect, useCallback } from "react";
import { salaryDeductionsFormJson } from "../../components/FormJSON/payroll/salary-deductions";
import { salaryDeductionTypesFormJson } from "../../components/FormJSON/payroll/salary-deductiontypes";
import FormModal from "../../components/Modal/Modal";
import Salary from "../../components/payroll-tabs/Salary";
import Deductions from "../../components/payroll-tabs/salary-deductions";
import DeductionType from "../../components/payroll-tabs/salary-deductiontypes";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

const PayrollItems = () => {
  const [formType, setformType] = useState("");
  const [template, settemplate] = useState(salaryDeductionsFormJson);
  const [formValue, setformValue] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [path, setpath] = useState("/personal-details");
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [loadSelect, setloadSelect] = useState(false);
  const [defaultView, setDefaultView] = useState(true);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Deductions</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Deductions</li>
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
                  href="#tab_deductions"
                  onClick={() => setDefaultView(false)}
                >
                  Deductions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_deduction_types"
                  onClick={() => setDefaultView(false)}
                >
                  Deduction Types
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
        {defaultView ? <Deductions/> : null}
      <div className="tab-content">
        <Deductions
          setformType={setformType}
          submitted={submitted}
          formValue={formValue}
          loadSelect={loadSelect}
        />
        <DeductionType
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
