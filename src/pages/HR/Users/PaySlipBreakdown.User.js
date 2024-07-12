// *IN USE

import React, { useEffect, useState, useMemo } from "react";
import logo from "../../../assets/img/outsource.png";
import { useLocation } from "react-router-dom";
import helper from "../../../services/helper";
const ref = React.createRef();

const PaySlipBreakdown = () => {
  const location = useLocation();
  const payslipBreakdown = useMemo(() => location?.state, [location?.state])

  const [paySlip, setPaySlip] = useState({});
  const [earnings, setEarnings] = useState({});
  const [grossSalary, setGrossSalary] = useState({});
  const [deductions, setDeductions] = useState({});
  const [totalDeductions, setTotalDeductions] = useState({});
  const [netSalary, setNetSalary] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const isEncrypted = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    const earnings = {};
    const grossSalary = {};
    const deductions = {};
    const totalDeductions = {};
    const netSalary = {};

    
    const empSalary = [payslipBreakdown];
    const formattedSalary = empSalary.map((salary) => ({
      ...salary,
      leaveBuyout: 0,
      attendanceBonus: 0,
      WFHAllowance: 0,
      hourlyDeductions: 0,
      hourlyDeductionAmount: 0,
      hourlyDeductionDates: null,
      DailyDeductionsCount: 0,
      DailyDeductionsDays: null,
      DailyDeductionsAmount: 0,
      NCNSCount: 0,
      NCNSDays: null,
      NCNSAmount: 0,
      phoneOnCallFloorCount: 0,
      phoneOnCallFloorDays: null,
      phoneOnCallFloorAmount: 0,
      thirtyMinShiftCount: 0,
      oneHourShiftCount: 0,
      breakdownOfDaysWorked: 0,
      loanAndOtherDeductions: 0,
      totalDeductions: 0,
      loanAndOtherDeductionsExplanation: null,
      otherAdditions: 0,
      otherAdditionsExplanation: null,
    }));
    
    const employeeSalarySlip = formattedSalary[0];
    setPaySlip(employeeSalarySlip);

    Object.keys(employeeSalarySlip).forEach((e) => {
      switch (e) {
        // Earnings:
        case "basic":
          earnings["Basic Salary"] = employeeSalarySlip[e];
          break;
        case "housing":
          earnings["Housing Allowance"] = employeeSalarySlip[e];
          break;
        case "medical":
          earnings["HMO Coverage"] = employeeSalarySlip[e];
          break;
        case "transport":
          earnings["Transportation"] = employeeSalarySlip[e];
          break;
        case "WFHAllowance":
          earnings["WFH Allowance"] = employeeSalarySlip[e];
          break;
        case "otherAllowances":
          earnings["Other Allowances"] = employeeSalarySlip[e];
          break;

        // Gross Salary:
        case "monthlySalary":
          grossSalary["Gross Salary"] = employeeSalarySlip[e];
          break;

        // Deductions:
        case "tax":
          deductions["Income Tax"] = employeeSalarySlip[e];
          break;
        case "pension":
          deductions["Employee Pension"] = employeeSalarySlip[e];
          break;
        case "attendance_deduction":
          deductions["Attendance Deduction"] = employeeSalarySlip[e];
          break;
        case "disciplinary_deductions":
          deductions["Disciplinary Deductions"] = employeeSalarySlip[e];
          break;

        // Total Deductions:
        case "totalDeductions":
          totalDeductions["Total Deductions"] =
            employeeSalarySlip.tax +
            employeeSalarySlip.pension +
            employeeSalarySlip.attendance_deduction +
            employeeSalarySlip.disciplinary_deductions;
          break;

        // Net Salary:
        case "netPay":
          netSalary["Net Salary"] = employeeSalarySlip[e];
          break;
        default:
          break;
      }
    });

    
    setEarnings(earnings);
    setGrossSalary(grossSalary);
    setDeductions(deductions);
    setTotalDeductions(totalDeductions);
    setNetSalary(netSalary);

    setFetched(true);
    setLoading(false);
  }, [payslipBreakdown])

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Payslip</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Reports</li>
              <li className="breadcrumb-item active">Payslip</li>
            </ul>
          </div>
        </div>
      </div>

      <div ref={ref} className="row justify-content-center">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="col-md-10 mt-5">
            <div className="card px-5 ">
              <div className="card-body">
                <h4 className="payslip-title">
                  Payslip for the month of{" "}
                  {paySlip?.payslipMonthAndYear}
                </h4>
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={logo} className="inv-logo" alt="" />
                    <ul className="list-unstyled mb-3">
                      <li>Outsource Global Technologies</li>
                      <li> 2nd Floor, ASTA GALLERY Plot 1185, Mabushi </li>
                      <li>Abuja FCT, Nigeria</li>
                    </ul>
                  </div>

                  <div className="col-sm-6 mb-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">Payslip</h3>
                      <ul className="list-unstyled">
                        <li>
                          Salary Month:{" "}
                          <span>
                            {" "}
                            {paySlip?.payslipMonthAndYear}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      {paySlip.net_pay ? (
                        <h4 className="m-b-10">
                          <strong>Earnings</strong>
                        </h4>
                      ) : null}
                      <table className="table table-bordered">
                        <tbody>
                          {fetched &&
                            Object.keys(earnings).map((earning, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{earning}</strong>{" "}
                                  {typeof earnings[earning] === "number" &&
                                  earnings[earning] !== 0 ? (
                                    <span
                                      className="float-right"
                                      style={{ color: "green" }}
                                    >
                                      {helper.handleMoneyFormat(
                                        earnings[earning], isEncrypted
                                      )}
                                    </span>
                                  ) : (
                                    <span className="float-right">
                                      {earnings[earning] === 0
                                        ? null
                                        : earnings[earning]}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Gross Salary */}
                    <div>
                      <table className="table table-bordered">
                        <tbody>
                          {fetched &&
                            Object.keys(grossSalary).map((gross, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{gross}</strong>{" "}
                                  {gross !== "department" ? (
                                    <span
                                      className="float-right"
                                      style={{ color: "green" }}
                                    >
                                      {helper.handleMoneyFormat(
                                        grossSalary[gross], isEncrypted
                                      )}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div>
                      {paySlip.net_pay ? (
                        <h4 className="m-b-10">
                          <strong>Deductions</strong>
                        </h4>
                      ) : null}
                      <table className="table table-bordered">
                        <tbody>
                          {fetched &&
                            Object.keys(deductions).map((deduction, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{deduction}</strong>{" "}
                                  {typeof deductions[deduction] === "number" &&
                                  deductions[deduction] !== 0 ? (
                                    <span
                                      className="float-right"
                                      style={{ color: "red" }}
                                    >
                                      {helper.handleMoneyFormat(
                                        deductions[deduction], isEncrypted
                                      )}
                                    </span>
                                  ) : (
                                    <span className="float-right">
                                      {deductions[deduction] === 0
                                        ? null
                                        : deductions[deduction]}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total Deductions */}
                    <div>
                      <table className="table table-bordered">
                        <tbody>
                          {fetched &&
                            Object.keys(totalDeductions).map(
                              (totalDeduction, index) => (
                                <tr key={index}>
                                  <td>
                                    <strong>{totalDeduction}</strong>
                                    <span
                                      className="float-right"
                                      style={{ color: "red" }}
                                    >
                                      {helper.handleMoneyFormat(
                                        totalDeductions[totalDeduction], isEncrypted
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div>
                  <table className="table table-bordered">
                    <tbody>
                      {fetched &&
                        Object.keys(netSalary).map((net, index) => (
                          <tr key={index}>
                            <td>
                              <strong>{net}</strong>{" "}
                              {net !== "department" ? (
                                <span className="float-right">
                                  {helper.handleMoneyFormat(netSalary[net], isEncrypted)}
                                </span>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaySlipBreakdown;
