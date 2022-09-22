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
        console.log(res);
        setPaySlip(res.data.data.employeeSlip);
        const earnings = {};
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
        console.log("TOTAL", totalDeduction);
        setemployee(employeeSalary.employeeId);
        delete employeeSalary.createdAt;
        delete employeeSalary.updatedAt;
        delete employeeSalary.employeeId;
        delete employeeSalary._id;
        delete employeeSalary.__v;
        Object.keys(employeeSalary).forEach((e) => {
          switch (e) {
            case "monthlySalary":
              earnings["Pension"] = employeeSalary[e] * 0.08;
              // earnings["Monthly Salary"] = employeeSalary[e];
              break;
            case "monthlyIncomeTax":
              earnings["Tax"] = employeeSalary[e];
              break;
            case "medical":
              earnings["Medical"] = employeeSalary[e] / 12;
              break;
            case "housing":
              earnings["Housing"] = employeeSalary[e]  / 12;
              break;
            case "transport":
              earnings["Transport"] = employeeSalary[e]  / 12;
              break;
            case "otherAllowances":
              earnings["Other Allowances"] = employeeSalary[e]  / 12;
              break;
            default:
              let key = e.charAt(0).toUpperCase() + e.slice(1);
              break;
          }
        });
        setEarnings(earnings);
        setfetched(true);
        console.log(earnings);
      } catch (error) {
        console.log(error);
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
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Payslip</li>
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
                      <tbody>
                        {fetched &&
                          Object.keys(earnings).map((earning, index) => (
                            <tr key={index}>
                              <td>
                                <strong>{earning}</strong>{" "}
                                {earning != "department" ? (
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
