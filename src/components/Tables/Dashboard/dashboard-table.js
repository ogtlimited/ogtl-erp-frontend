import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatter } from "../../../services/numberFormatter";

const DashboardTable = ({ title, data }) => {
  return (
    <>
      <div className="col-md-6 d-flex">
        <div className="card card-table flex-fill">
          <div className="card-header">
            <h3 className="card-title mb-0">{title}</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-nowrap custom-table mb-0">
                <thead>
                  <tr>
                    <th>{title === "Invoices" ? "Invoice ID" : "Number"}</th>
                    <th>{title === "Invoices" ? "Client" : "Status"}</th>
                    <th>{title === "Invoices" ? "Due Date" : "Date"}</th>
                    <th>Total</th>
                    <th>
                      {title === "Invoices" ? "Status" : "Payment Status"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((dt, index) => (
                    <tr key={index}>
                      <td>{title === "Invoices" ? dt?.ref : dt?.number}</td>
                      <td>
                        {title === "Invoices" ? (
                          dt?.customer?.company
                        ) : (
                          <span
                            className={`badge bg-inverse-${
                              dt.status === "Published" ? "success" : "warning"
                            }`}
                          >
                            {dt.status}
                          </span>
                        )}
                      </td>
                      <td>
                        {title === "Invoices"
                          ? moment(dt?.due_date).format("L")
                          : moment(dt?.date).format("L")}
                      </td>
                      <td>{formatter.format(dt?.total_amount)}</td>
                      <td>
                        {title === "Invoices" ? (
                          <span
                            className={`badge bg-inverse-${
                              dt.status === "Published" ? "success" : "warning"
                            }`}
                          >
                            {dt.status}
                          </span>
                        ) : (
                          <span
                            className={`badge bg-inverse-${
                              dt.paymentStatus === "Full Payment"
                                ? "success"
                                : "warning"
                            }`}
                          >
                            {dt.paymentStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Link to="invoices">View all {title}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
