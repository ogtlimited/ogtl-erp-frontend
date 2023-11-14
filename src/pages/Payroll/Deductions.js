// *IN USE

import React from "react";
import Deductions from "../../components/payroll-tabs/salary-deductions";
import ReversedDeductions from "../../components/payroll-tabs/reversed-salary-deductions";
import DeductionType from "../../components/payroll-tabs/salary-deductiontypes";

const PayrollItems = () => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Deductions</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Payroll</li>
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
                >
                  Deductions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_reversed_deductions"
                >
                  Reversed Deductions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_deduction_types"
                >
                  Deduction Types
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row tab-content">
        <div id="tab_deductions" className="col-12 tab-pane show active">
          <Deductions />
        </div>

        <div id="tab_reversed_deductions" className="col-12 tab-pane">
          <ReversedDeductions />
        </div>

        <div id="tab_deduction_types" className="col-12 tab-pane">
          <DeductionType />
        </div>
      </div>
    </>
  );
};

export default PayrollItems;
