import React from "react";
import { Link } from "react-router-dom";

const DashboardTable = ({title}) => {
  return (
    <>
      <div class="col-md-6 d-flex">
        <div class="card card-table flex-fill">
          <div class="card-header">
            <h3 class="card-title mb-0">{title}</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-nowrap custom-table mb-0">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Client</th>
                    <th>Due Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to="invoice-view">#INV-0001</Link>
                    </td>
                    <td>
                      <h2>
                        <Link>Outsource Global Technologies</Link>
                      </h2>
                    </td>
                    <td>11 Mar 2019</td>
                    <td>$380</td>
                    <td>
                      <span class="badge bg-inverse-warning">
                        Partially Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="invoice-view">#INV-0002</Link>
                    </td>
                    <td>
                      <h2>
                        <Link to="#">Parkway</Link>
                      </h2>
                    </td>
                    <td>8 Feb 2019</td>
                    <td>$500</td>
                    <td>
                      <span class="badge bg-inverse-success">Paid</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="invoice-view">#INV-0003</Link>
                    </td>
                    <td>
                      <h2>
                        <Link to="#">Blue Tag</Link>
                      </h2>
                    </td>
                    <td>23 Jan 2019</td>
                    <td>$60</td>
                    <td>
                      <span class="badge bg-inverse-danger">Unpaid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <Link to="invoices">View all {title}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
