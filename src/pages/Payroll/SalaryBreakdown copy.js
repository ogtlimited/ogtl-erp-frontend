import React, { useEffect, useState } from "react";
import logo from "../../assets/img/outsource.png";
// import PageHeader from "../../components/page-header";
import Pdf from "react-to-pdf";
import { Link, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../services/api";
import moment from "moment";
import { formatter } from "../../services/numberFormatter";
import ViewModal from "../../components/Modal/ViewModal";
import SalaryAssignmentModal from "../../components/Modal/SalaryAssignmentModal";
import SalaryDeductionContent from "../../components/ModalContents/SalaryDeductionContent";
const ref = React.createRef();
const options = {
  // orientation: 'port',
  unit: "in",
  format: [4, 2],
};
const RightSide = () => {
  return (
    <div className="col-auto float-right ml-auto">
      <div className="btn-group btn-group-sm">
        <button className="btn btn-white">CSV</button>
        <Pdf targetRef={ref} filename="payslip.pdf" x={1} y={1} scale={0.8}>
          {({ toPdf }) => (
            <button className="btn btn-white" onClick={toPdf}>
              Pdf
            </button>
          )}
        </Pdf>
        <button onClick={() => window.print()} className="btn btn-white">
          <i className="fa fa-print fa-lg"></i> Print
        </button>
      </div>
    </div>
  );
};

const PaySlip = () => {
  const breadcrumb = "Payslip";
  const { id } = useParams();
  const location = useLocation();
  const [employee, setemployee] = useState({});
  const [paySlip, setPaySlip] = useState({});
  const [earnings, setEarnings] = useState({});
  const [deductions, setDeductions] = useState({});
  const [fetched, setfetched] = useState(false);
  const [totalDeduction, settotalDeduction] = useState(0);
  const [deductionsBreakDown, setdeductionsBreakDown] = useState([]);

  useEffect(() => {
    const fetchPaySlip = async () => {
      try {
        const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
        console.log(startOfMonth, endOfMonth);
        const res = await axiosInstance.get(
          `/api/salary-slip/employee-report?empId=${id}&startOfMonth=${startOfMonth}&endOfMonth=${endOfMonth}`
        );
        // const res = await axiosInstance.get(`/api/salary-slip/${id}`);
        // console.log("Salary Breakdown Response:", res?.data?.data?.employeeSlip);
        setPaySlip(res.data.data.employeeSlip);
        const earnings = {};
        const deductions = {};

        const { employeeSalary, deductionsBreakDown } =
          res.data.data.employeeSlip;

        setdeductionsBreakDown(deductionsBreakDown);

        if (paySlip?.additionalDeductions) {
          settotalDeduction(
            Object.values(paySlip?.additionalDeductions).reduce(
              (a, b) => a + b,
              0
            )
          );
        }

        const empSalary = [employeeSalary]
        const formattedSalary = empSalary.map((salary) => ({
          ...salary,
          leaveBuyout: 0,
          attendanceBonus: 0,
          WFHAllowance: 0,
          hourlyDeductions: 0,
          hourlyDeductionAmount: 0,
          hourlyDeductionDates: '',
          DailyDeductionsCount: 0,
          DailyDeductionsDays: '',
          DailyDeductionsAmount: 0,
          NCNSCount: 0,
          NCNSDays: '',
          NCNSAmount: 0,
          phoneOnCallFloorCount: 0,
          phoneOnCallFloorDays: '',
          phoneOnCallFloorAmount: 0,
          thirtyMinShiftCount: 0,
          oneHourShiftCount: 0,
          breakdownOfDaysWorked: 0,
          loanAndOtherDeductions: 0,
          totalDeductions: 0,
          loanAndOtherDeductionsExplanation: '',
          otherAdditions: 0,
          otherAdditionsExplanation: '',
        }))

        const employeeSalarySlip = formattedSalary[0]
        // console.log("EMPLOYEE SALARY:", employeeSalarySlip);
        setemployee(employeeSalarySlip.employeeId);
        delete employeeSalarySlip.createdAt;
        delete employeeSalarySlip.updatedAt;
        delete employeeSalarySlip.employeeId;
        delete employeeSalarySlip._id;
        delete employeeSalarySlip.__v;
        
        // Object.keys(employeeSalary).forEach((e) => {
        //   switch (e) {
        //     case "monthlySalary":
        //       earnings["Pension"] = employeeSalary[e] * 0.08;
        //       // earnings["Monthly Salary"] = employeeSalary[e];
        //       break;
        //     case "monthlyIncomeTax":
        //       earnings["Tax"] = employeeSalary[e];
        //       break;
        //     case "medical":
        //       earnings["Medical"] = employeeSalary[e] / 12;
        //       break;
        //     case "housing":
        //       earnings["Housing"] = employeeSalary[e]  / 12;
        //       break;
        //     case "transport":
        //       earnings["Transport"] = employeeSalary[e]  / 12;
        //       break;
        //     case "otherAllowances":
        //       earnings["Other Allowances"] = employeeSalary[e]  / 12;
        //       break;
        //     default:
        //       let key = e.charAt(0).toUpperCase() + e.slice(1);
        //       break;
        //   }
        // });

        Object.keys(employeeSalarySlip).forEach((e) => {
          switch (e) {
            case "monthlySalary":
              earnings["Monthly Salary"] = employeeSalary[e];
              break;
            case "transport":
              earnings["Transportation"] = employeeSalary[e];
              break;
            case "medical":
              earnings["HMO Coverage"] = employeeSalary[e];
              break;
            case "leaveBuyout":
              earnings["Leave Buyout"] = employeeSalary[e];
              break;
            case "attendanceBonus":
              earnings["Attendance Bonus"] = employeeSalary[e];
              break;
            case "WFHAllowance":
              earnings["WHF Allowance"] = employeeSalary[e];
              break;
            case "monthlyIncomeTax":
              deductions["Monthly Income Tax"] = employeeSalary[e];
              break;
            case "monthlyEmployeePension":
              deductions["Monthly Employee Pension"] = employeeSalary[e];
              break;
            case "hourlyDeductions":
              deductions["Hourly Deductions"] = employeeSalary[e];
              break;
            case "hourlyDeductionAmount":
              deductions["Hourly Deduction Amount"] = employeeSalary[e];
              break;
            case "hourlyDeductionDates":
              deductions["Hourly Deduction Dates"] = employeeSalary[e];
              break;
            case "DailyDeductionsCount":
              deductions["Daily Deductions Count"] = employeeSalary[e];
              break;
            case "DailyDeductionsDays":
              deductions["Daily Deductions Days"] = employeeSalary[e];
              break;
            case "DailyDeductionsAmount":
              deductions["Daily Deductions Amount"] = employeeSalary[e];
              break;
            case "NCNSCount":
              deductions["NCNS Count"] = employeeSalary[e];
              break;
            case "NCNSDays":
              deductions["NCNS Days"] = employeeSalary[e];
              break;
            case "NCNSAmount":
              deductions["NCNS Amount"] = employeeSalary[e];
              break;
            case "phoneOnCallFloorCount":
              deductions["Phone on the call floor count"] = employeeSalary[e];
              break;
            case "phoneOnCallFloorDays":
              deductions["Phone on the call floor days"] = employeeSalary[e];
              break;
            case "phoneOnCallFloorAmount":
              deductions["Phone on the call floor amount"] = employeeSalary[e];
              break;
            case "thirtyMinShiftCount":
              deductions["30mins shift count (20th - 25th)"] = employeeSalary[e];
              break;
            case "oneHourShiftCount":
              deductions["1 hour shift count"] = employeeSalary[e];
              break;
            case "breakdownOfDaysWorked":
              deductions["Breakdown of days worked"] = employeeSalary[e];
              break;
            case "loanAndOtherDeductions":
              deductions["Loan & Other Deductions"] = employeeSalary[e];
              break;
            case "totalDeductions":
              deductions["Total Deductions"] = employeeSalary[e];
              break;
            case "loanAndOtherDeductionsExplanation":
              deductions["Loan & Other Deduction Explanation"] = employeeSalary[e];
              break;
            case "otherAdditions":
              deductions["Other Additions"] = employeeSalary[e];
              break;
            case "otherAdditionsExplanation":
              deductions["Other Addition Explanation"] = employeeSalary[e];
              break;
            case "netPay":
              deductions["Net Pay:"] = employeeSalary[e];
              break;
            default:
              let key = e.charAt(0).toUpperCase() + e.slice(1);
              break;
          }
        })

        setEarnings(earnings);
        setDeductions(deductions);
        setfetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaySlip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Salary Breakdown</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Salary Breakdown</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-white">CSV</button>
              <button className="btn btn-white">PDF</button>
              <button className="btn btn-white">
                <i className="fa fa-print fa-lg"></i> Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} className="row justify-content-center">
        <div className="col-md-10 mt-5">
          <div className="card px-5 ">
            <div className="card-body">
              <h4 className="payslip-title">
               Salary Breakdown
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
              </div>
              <div className="row">
                <div className="col-lg-12 m-b-20">
                  <ul className="list-unstyled">
                    <li>
                      <h5 className="mb-0">
                        <strong>
                          {employee?.first_name} {employee?.middle_name}{" "}
                          {employee?.last_name}
                        </strong>
                      </h5>
                    </li>
                    <li>{/* <span>Web Designer</span> */}</li>
                    <li>Employee ID: {employee?.ogid}</li>
                    <li>
                      Joining Date:{" "}
                      {moment(
                        location?.state?.employee?.date_of_joining
                      ).format("L")}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <h4 className="m-b-10">
                      <strong>Breakdown of Employee Salary</strong>
                    </h4>

                    <table className="table table-bordered">
                    <thead className="earnings-table-header">
                      Earnings
                    </thead>
                      <tbody>
                        {fetched &&
                          Object.keys(earnings).map((earning, index) => (
                            <tr key={index}>
                              <td>
                                <strong>{earning}</strong>{" "}
                                {earnings[earning] !== undefined ? (
                                  <span className="float-right">
                                    {formatter.format(earnings[earning])}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    <thead className="earnings-table-header">
                      Deductions
                    </thead>
                      <tbody>
                        {fetched &&
                          Object.keys(deductions).map((deduction, index) => (
                            <tr key={index}>
                              <td>
                                <strong>{deduction}</strong>{" "}
                                {deductions[deduction] !== undefined ? (
                                  <span className="float-right">
                                    {formatter.format(deductions[deduction])}
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
          </div>
        </div>
      </div>
      {fetched && (
        <ViewModal
          title="Salary Deduction Breakdown"
          content={
            <SalaryDeductionContent deductionsBreakDown={deductionsBreakDown} />
          }
        />
      )}
    </>
  );
};

export default PaySlip;
