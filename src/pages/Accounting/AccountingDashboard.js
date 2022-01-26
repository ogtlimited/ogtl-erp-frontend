import React, { useEffect, useState } from "react";

import DashboardChart from "../../components/charts/dashboard-charts";
import DashboardStatistics from "../../components/charts/dashboard-statistics";
import DashboardStats from "../../components/charts/dashboard-stats";
import DashboardTable from "../../components/Tables/Dashboard/dashboard-table";
import axiosInstance from "../../services/api";
const AccountingDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const sampleStats = [
    {
      title: "Earnings",
      increase: true,
      percent: "12.5%",
      currMonth: "1,200,00",
      prevMonths: "1,15,852",
    },
    {
      title: "Expenses",
      increase: false,
      percent: "5.2%",
      currMonth: "1,215,00",
      prevMonths: "1,15,852",
    },
    {
      title: "Profit",
      increase: true,
      percent: "80.5%",
      currMonth: "800,00",
      prevMonths: "185,852",
    },
    {
      title: "Paid Invoice",
      increase: false,
      percent: "12.5%",
      currMonth: "700,00",
      prevMonths: "75,852",
    },
  ];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '# of Income',
        data: [1200000, 1900000, 3000000, 5000000, 2000000, 3000000],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  

  const fetchInvoicePayment = () => {
    axiosInstance
      .get("/accounts-dashboard")
      .then((res) => {
        setInvoices(res.data.getAccountsData.invoices.slice(0, 3));
        setPayments(res.data.getAccountsData.payments.slice(0, 3));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchInvoicePayment();
  }, []);
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome to Accounts Dashboard!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <DashboardChart title="Employee By Department" data={data} />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card-group m-b-30">
            {sampleStats.map((stat) => (
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">{stat.title}</span>
                    </div>
                    <div>
                      {stat.increase ? (
                        <span className="text-success">{stat.percent}</span>
                      ) : (
                        <span className="text-danger">{stat.percent}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="mb-3">${stat.currMonth}</h3>
                  <div className="progress mb-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p className="mb-0">
                    Previous Month{" "}
                    <span className="text-muted">${stat.prevMonths}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <DashboardStatistics />
      </div>
      <div className="row"></div>
      <div className="row">
        <DashboardTable title="Invoices" data={invoices} />
        <DashboardTable title="Payments" data={payments} />
      </div>
      <>{/* <AdminCards /> */}</>
    </div>
  );
};
export default  AccountingDashboard
