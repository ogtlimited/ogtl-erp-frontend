import React from "react";
import logo from "../../assets/img/outsource.png";
// import PageHeader from "../../components/page-header";
import Pdf from "react-to-pdf";
import { Link } from "react-router-dom";
const ref = React.createRef();
const options = {
  // orientation: 'port',
  unit: "in",
  format: [4, 2],
};
const RightSide = () => {
  return (
    <div class="col-auto float-right ml-auto">
      <div class="btn-group btn-group-sm">
        <button class="btn btn-white">CSV</button>
        <Pdf targetRef={ref} filename="payslip.pdf" x={1} y={1} scale={0.8}>
          {({ toPdf }) => (
            <button class="btn btn-white" onClick={toPdf}>
              Pdf
            </button>
          )}
        </Pdf>
        <button onClick={() => window.print()} class="btn btn-white">
          <i class="fa fa-print fa-lg"></i> Print
        </button>
      </div>
    </div>
  );
};
const PaySlip = () => {
  const breadcrumb = "Payslip";
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Payslip</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Payslip</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-white">CSV</button>
              <button class="btn btn-white">PDF</button>
              <button class="btn btn-white">
                <i class="fa fa-print fa-lg"></i> Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} class="row justify-content-center">
        <div class="col-md-10 mt-5">
          <div class="card px-5 ">
            <div class="card-body">
              <h4 class="payslip-title">Payslip for the month of Feb 2019</h4>
              <div class="row">
                <div class="col-sm-6 m-b-20">
                  <img src={logo} class="inv-logo" alt="" />
                  <ul class="list-unstyled mb-3">
                    <li>Outsource Global Technologies</li>
                    <li> 2nd Floor, ASTA GALLERY Plot 1185, Mabushi </li>
                    <li>Abuja FCT, Nigeria</li>
                  </ul>
                </div>

                <div class="col-sm-6 mb-20">
                  <div class="invoice-details">
                    <h3 class="text-uppercase">Payslip #49029</h3>
                    <ul class="list-unstyled">
                      <li>
                        Salary Month: <span>March, 2019</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 m-b-20">
                  <ul class="list-unstyled">
                    <li>
                      <h5 class="mb-0">
                        <strong>Sir Abubakar</strong>
                      </h5>
                    </li>
                    <li>
                      <span>Web Designer</span>
                    </li>
                    <li>Employee ID: OG-1950</li>
                    <li>Joining Date: 1 Jan 2013</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div>
                    <h4 class="m-b-10">
                      <strong>Earnings</strong>
                    </h4>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Basic Salary</strong>{" "}
                            <span class="float-right">₦6500</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Hospital Allowance (H.R.A.)</strong>{" "}
                            <span class="float-right">₦55</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Work from home</strong>{" "}
                            <span class="float-right">₦55</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Other Allowance</strong>{" "}
                            <span class="float-right">₦55</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total Earnings</strong>{" "}
                            <span class="float-right">
                              <strong>₦55</strong>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div>
                    <h4 class="m-b-10">
                      <strong>Deductions</strong>
                    </h4>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Tax Deducted at Source (T.D.S.)</strong>{" "}
                            <span class="float-right">₦0</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Absent</strong>{" "}
                            <span class="float-right">₦0</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Lateness</strong>{" "}
                            <span class="float-right">₦0</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Loan</strong>{" "}
                            <span class="float-right">₦300</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total Deductions</strong>{" "}
                            <span class="float-right">
                              <strong>₦59698</strong>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-sm-12">
                  <p>
                    <strong>Net Salary: ₦59698</strong> (Fifty nine thousand six
                    hundred and ninety eight only.)
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
