// *IN USE

import React, { useEffect, useState } from "react";
import logo from "../../assets/img/outsource.png";
// import PageHeader from "../../components/page-header";
// import Pdf from "react-to-pdf";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import moment from "moment";
import helper from "../../services/helper";
// import ViewModal from "../../components/Modal/ViewModal";
// import SalaryAssignmentModal from "../../components/Modal/SalaryAssignmentModal";
// import SalaryDeductionContent from "../../components/ModalContents/SalaryDeductionContent";
// import Salary from "./../../components/payroll-tabs/Salary";
const ref = React.createRef();

// const RightSide = () => {
//   return (
//     <div className="col-auto float-right ml-auto">
//       <div className="btn-group btn-group-sm">
//         <button className="btn btn-white">CSV</button>
//         <Pdf targetRef={ref} filename="payslip.pdf" x={1} y={1} scale={0.8}>
//           {({ toPdf }) => (
//             <button className="btn btn-white" onClick={toPdf}>
//               Pdf
//             </button>
//           )}
//         </Pdf>
//         <button onClick={() => window.print()} className="btn btn-white">
//           <i className="fa fa-print fa-lg"></i> Print
//         </button>
//       </div>
//     </div>
//   );
// };

const PaySlip = () => {
  const { id } = useParams();
  const [paySlip, setPaySlip] = useState({});
  const [earnings, setEarnings] = useState({});
  const [grossSalary, setGrossSalary] = useState({});
  const [deductions, setDeductions] = useState({});
  const [netSalary, setNetSalary] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  // const [totalDeduction, setTotalDeduction] = useState(0);
  // const [deductionsBreakDown, setDeductionsBreakDown] = useState([]);

  useEffect(() => {
    const fetchPaySlip = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/salary_slips/${id}.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        const earnings = {};
        const grossSalary = {};
        const deductions = {};
        const netSalary = {};

        const payslip = res?.data?.data?.slip;

        const empSalary = [payslip];
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
            case "other_allowances":
              earnings["Other Allowances"] = employeeSalarySlip[e];
              break;
            // case "monthly_salary":
            //   earnings["Gross Salary"] = employeeSalarySlip[e];
            //   break;
            // case "leaveBuyout":
            //   earnings["Leave Buyout"] = employeeSalarySlip[e];
            //   break;
            // case "attendanceBonus":
            //   earnings["Attendance Bonus"] = employeeSalarySlip[e];
            //   break;
            // case "WFHAllowance":
            //   earnings["WHF Allowance"] = employeeSalarySlip[e];
            //   break;

            // Gross Salary:
            case "monthly_salary":
              grossSalary[""] = employeeSalarySlip[e];
              break;

            // Deductions:
            case "monthly_income_tax":
              deductions["Income Tax"] = employeeSalarySlip[e];
              break;
            case "monthly_pension":
              deductions["Employee Pension"] = employeeSalarySlip[e];
              break;
            case "disciplinary_deductions":
              deductions["Disciplinary Deductions"] = employeeSalarySlip[e];
              break;
            // case "hourlyDeductions":
            //   deductions["Hourly Deductions"] = employeeSalarySlip[e];
            //   break;
            // case "hourlyDeductionAmount":
            //   deductions["Hourly Deduction Amount"] = employeeSalarySlip[e];
            //   break;
            // case "hourlyDeductionDates":
            //   deductions["Hourly Deduction Dates"] = employeeSalarySlip[e];
            //   break;
            // case "DailyDeductionsCount":
            //   deductions["Daily Deductions Count"] = employeeSalarySlip[e];
            //   break;
            // case "DailyDeductionsDays":
            //   deductions["Daily Deductions Days"] = employeeSalarySlip[e];
            //   break;
            // case "DailyDeductionsAmount":
            //   deductions["Daily Deductions Amount"] = employeeSalarySlip[e];
            //   break;
            // case "NCNSCount":
            //   deductions["NCNS Count"] = employeeSalarySlip[e];
            //   break;
            // case "NCNSDays":
            //   deductions["NCNS Days"] = employeeSalarySlip[e];
            //   break;
            // case "NCNSAmount":
            //   deductions["NCNS Amount"] = employeeSalarySlip[e];
            //   break;
            // case "phoneOnCallFloorCount":
            //   deductions["Phone on the call floor count"] =
            //     employeeSalarySlip[e];
            //   break;
            // case "phoneOnCallFloorDays":
            //   deductions["Phone on the call floor days"] =
            //     employeeSalarySlip[e];
            //   break;
            // case "phoneOnCallFloorAmount":
            //   deductions["Phone on the call floor amount"] =
            //     employeeSalarySlip[e];
            //   break;
            // case "thirtyMinShiftCount":
            //   deductions["30mins shift count (20th - 25th)"] =
            //     employeeSalarySlip[e];
            //   break;
            // case "oneHourShiftCount":
            //   deductions["1 hour shift count"] = employeeSalarySlip[e];
            //   break;
            // case "breakdownOfDaysWorked":
            //   deductions["Breakdown of days worked"] = employeeSalarySlip[e];
            //   break;
            // case "loanAndOtherDeductions":
            //   deductions["Loan & Other Deductions"] = employeeSalarySlip[e];
            //   break;
            // case "loanAndOtherDeductionsExplanation":
            //   deductions["Loan & Other Deduction Explanation"] =
            //     employeeSalarySlip[e];
            //   break;
            // case "otherAdditions":
            //   deductions["Other Additions"] = employeeSalarySlip[e];
            //   break;
            // case "otherAdditionsExplanation":
            //   deductions["Other Addition Explanation"] = employeeSalarySlip[e];
            //   break;
            // case "totalDeductions":
            //   deductions["Total Deductions"] = employeeSalarySlip[e];
            //   break;
            case "totalDeductions":
              deductions["Total Deductions"] =
                employeeSalarySlip.monthly_income_tax +
                employeeSalarySlip.monthly_pension +
                employeeSalarySlip.disciplinary_deductions;
              break;

            // Net Salary:
            case "net_pay":
              netSalary[""] = employeeSalarySlip[e];
              break;
            default:
              break;
          }
        });

        setEarnings(earnings);
        setGrossSalary(grossSalary);
        setDeductions(deductions);
        setNetSalary(netSalary);

        setFetched(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPaySlip();
  }, [id]);

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
          {/* <div className="col-auto float-right ml-auto">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-white">CSV</button>
              <button className="btn btn-white">PDF</button>
              <button className="btn btn-white">
                <i className="fa fa-print fa-lg"></i> Print
              </button>
            </div>
          </div> */}
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
                  {moment(paySlip?.createdAt).format("MMMM YYYY")}
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
                            {moment(paySlip?.createdAt).format("MMMM, YYYY")}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 m-b-20">
                    <ul className="list-unstyled">
                      <li>
                        <h5 className="mb-0">
                          <strong>
                            {paySlip?.first_name} {paySlip?.middle_name}{" "}
                            {paySlip?.last_name}
                          </strong>
                        </h5>
                      </li>
                      <li>Employee ID: {paySlip?.ogid}</li>
                      <li>Designation: {paySlip?.designation}</li>
                    </ul>
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
                                        earnings[earning]
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

                    <div>
                      {paySlip.net_pay ? (
                        <h5 className="m-b-10">
                          <strong>Gross Salary</strong>
                        </h5>
                      ) : null}
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
                                        grossSalary[gross]
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
                                        deductions[deduction]
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
                  </div>
                </div>
                <div>
                  {paySlip.net_pay ? (
                    <h5 className="m-b-10">
                      <strong>Net Salary</strong>
                    </h5>
                  ) : null}
                  <table className="table table-bordered">
                    <tbody>
                      {fetched &&
                        Object.keys(netSalary).map((net, index) => (
                          <tr key={index}>
                            <td>
                              <strong>{net}</strong>{" "}
                              {net !== "department" ? (
                                <span className="float-right">
                                  {helper.handleMoneyFormat(netSalary[net])}
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

      {/* 
      {fetched && (
        <ViewModal
          title="Salary Deduction Breakdown"
          content={
            <SalaryDeductionContent deductionsBreakDown={deductionsBreakDown} />
          }
        />
      )} */}
    </>
  );
};

export default PaySlip;
