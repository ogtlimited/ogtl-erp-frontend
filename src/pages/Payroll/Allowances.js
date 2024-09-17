import React from "react";
import AllowancesTab from "../../components/payroll-tabs/allowances-tab";


const PayrollItems = () => {
    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">Allowances</h3> {/* Changed to Allowances */}
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">Payroll</li>
                            <li className="breadcrumb-item active">Allowances</li> {/* Changed to Allowances */}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row tab-content">
                <div id="tab_allowances" className="col-12 tab-pane show active">
                    <AllowancesTab />
                </div>

                {/* Add tabs for reversed allowances and allowance types if necessary */}
            </div>
        </>
    );
};

export default PayrollItems;
