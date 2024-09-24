// *IN USE

import React from "react";
import LoansTab from "../../components/payroll-tabs/loans-tab";

const PayrollLoans = () => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Loans</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Payroll</li>
              <li className="breadcrumb-item active">Loans</li>
            </ul>
          </div>
        </div>
      </div>



      <div className="row tab-content">
        <div id="tab_deductions" className="col-12 tab-pane show active">
          <LoansTab />
        </div>


      </div>
    </>
  );
};

export default PayrollLoans;
