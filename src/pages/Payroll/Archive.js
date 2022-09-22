import React, { useState, useEffect, useCallback } from "react";
import SalaryHistory from "../../components/payroll-tabs/salary-history";
import { useAppContext } from "../../Context/AppContext";

const Archive = () => {
  const [formType, setformType] = useState("");
  const [formValue, setformValue] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [path, setpath] = useState("/personal-details");
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [loadSelect, setloadSelect] = useState(false);
  const { createPayroll } = useAppContext();

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Archive</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Archive</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <SalaryHistory
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

export default Archive;
