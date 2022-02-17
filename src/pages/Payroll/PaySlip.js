import React, { useEffect, useState } from "react";
import logo from "../../assets/img/outsource.png";
// import PageHeader from "../../components/page-header";
import Pdf from "react-to-pdf";
import { Link, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../services/api";
import moment from "moment";
import { formatter } from "../../services/numberFormatter";
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
  const [paySlip, setPaySlip] = useState(null);
  useEffect(() => {
    const fetchPaySlip = async () => {
      try {
        const res = await axiosInstance.get(`/api/salary-slip/${id}`);

        setPaySlip(res.data.data.employeeSlip);
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
                          {location?.state?.employee?.first_name}{" "}
                          {location?.state?.employee?.middle_name}{" "}
                          {location?.state?.employee?.last_name}
                        </strong>
                      </h5>
                    </li>
                    <li>{/* <span>Web Designer</span> */}</li>
                    <li>Employee ID: {location?.state?.employee?.ogid}</li>
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
                <div className="col-sm-6">
                  <div>
                    <h4 className="m-b-10">
                      <strong>Earnings</strong>
                    </h4>
                    <table className="table table-bordered">
                      <tbody>
                        {paySlip?.salaryStructure?.earnings.map(
                          (earning, index) => (
                            <tr key={index}>
                              <td>
                                <strong>{earning?.title}</strong>{" "}
                                <span className="float-right">
                                  {formatter.format(earning?.amount)}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <h4 className="m-b-10">
                      <strong>Deductions</strong>
                    </h4>
                    <table className="table table-bordered">
                      <tbody>
                        {paySlip?.salaryStructure?.deductions.map(
                          (deduction, index) => (
                            <tr key={index}>
                              <td>
                                <strong>{deduction?.title}</strong>{" "}
                                <span className="float-right">
                                  {formatter.format(deduction?.amount)}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                        <tr>
                          <td>
                            <strong>NCNS</strong>{" "}
                            <span className="float-right">
                              {formatter.format(
                                paySlip?.additionalDeductions?.NCNS
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Absent</strong>{" "}
                            <span className="float-right">
                              {formatter.format(
                                paySlip?.additionalDeductions?.absent
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Lateness</strong>{" "}
                            <span className="float-right">
                              {formatter.format(
                                paySlip?.additionalDeductions?.lateness
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Loan</strong>{" "}
                            <span className="float-right">
                              {formatter.format(
                                paySlip?.additionalDeductions?.loan || 0
                              )}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-12">
                  <p>
                    <strong>
                      Net Salary: {formatter.format(paySlip?.netPay)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaySlip;
