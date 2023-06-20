/** @format */

import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/outsource.png';
// import PageHeader from "../../components/page-header";
import Pdf from 'react-to-pdf';
import { Link, useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/api';
import moment from 'moment';
import { formatter } from '../../services/numberFormatter';
import ViewModal from '../../components/Modal/ViewModal';
import SalaryAssignmentModal from '../../components/Modal/SalaryAssignmentModal';
import SalaryDeductionContent from '../../components/ModalContents/SalaryDeductionContent';
const ref = React.createRef();
const options = {
  // orientation: 'port',
  unit: 'in',
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
  const { id } = useParams();
  const [paySlip, setPaySlip] = useState({});
  const [earnings, setEarnings] = useState({});
  const [deductions, setDeductions] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalDeduction, settotalDeduction] = useState(0);
  const [deductionsBreakDown, setdeductionsBreakDown] = useState([]);

  useEffect(() => {
    const fetchPaySlip = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/v1/salary_slips/${id}.json`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        )

        const payslip = res?.data?.data?.slip
        console.log("my payslip:", res?.data?.data?.slip)
        
        setPaySlip(payslip)

        const earnings = {};
        const deductions ={};
        
        Object.keys(payslip).forEach((e) => {
          switch (e) {
            case 'monthly_pension':
              earnings['Pension'] = payslip[e];
              break;
            case 'monthly_income_tax':
              earnings['Tax'] = payslip[e];
              break;
            case 'monthly_salary':
              earnings['Salary'] = payslip[e];
              break;
            default:
              let key = e.charAt(0).toUpperCase() + e.slice(1);
              break;
          }
        });
        
        console.log("Earnings", earnings)
        setEarnings(earnings);

        deductions['Disciplinary Deductions'] = payslip.disciplinary_deductions;
        setDeductions(deductions);
        console.log("deductions", deductions)

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
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
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
                  Payslip for the month of{' '}
                  {moment(paySlip?.createdAt).format('MMMM YYYY')}
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
                          Salary Month:{' '}
                          <span>
                            {' '}
                            {moment(paySlip?.createdAt).format('MMMM, YYYY')}
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
                            {paySlip?.first_name} {paySlip?.middle_name}{' '}
                            {paySlip?.last_name}
                          </strong>
                        </h5>
                      </li>
                      <li>Employee ID: {paySlip?.ogid}</li>
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
                                  <strong>{earning}</strong>{' '}
                                  {earning !== 'department' ? (
                                    <span className="float-right">
                                      {formatter.format(earnings[earning])}
                                    </span>
                                  ) : (
                                    ''
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
                                  <strong>{deduction}</strong>{' '}
                                  <span className="float-right">
                                      {formatter.format(deductions[deduction])}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <p>
                      {/* {paySlip.netPay ? (
                        <strong>
                          Net Salary: {formatter.format(paySlip?.netPay)}
                        </strong>
                      ) : null} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
