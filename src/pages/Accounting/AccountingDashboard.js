import React from 'react'

import DashboardChart from "../../components/charts/dashboard-charts";
import DashboardStatistics from "../../components/charts/dashboard-statistics";
import DashboardStats from "../../components/charts/dashboard-stats";
import DashboardTable from "../../components/Tables/Dashboard/dashboard-table";
export const AccountingDashboard = () => {
    const sampleStats = [
      {
        title: 'Earnings',
        increase: true,
        percent: '12.5%',
        currMonth: '1,200,00',
        prevMonths: '1,15,852'
      },
      {
        title: 'Expenses',
        increase: false,
        percent: '5.2%',
        currMonth: '1,215,00',
        prevMonths: '1,15,852'
      },
      {
        title: 'Profit',
        increase: true,
        percent: '80.5%',
        currMonth: '800,00',
        prevMonths: '185,852'
      },
      {
        title: 'Paid Invoice',
        increase: false,
        percent: '12.5%',
        currMonth: '700,00',
        prevMonths: '75,852'
      }
    ]
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
        <DashboardChart />
          
      </div>
      <div className="row">
      <div className="col-md-12">
      <div className="card-group m-b-30">
        {sampleStats.map(stat =>(
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <span className="d-block">{stat.title}</span>
                </div>
                <div>
                  {stat.increase ? 
                  <span className="text-success">{stat.percent}</span>:
                  <span className="text-danger">{stat.percent}</span>
                }
                 
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
                Previous Month <span className="text-muted">${stat.prevMonths}</span>
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
      <div className="row">
        
          
      </div>
      <div className="row">
        <DashboardTable title="Invoices" />
        <DashboardTable title="Payments" />
          
      </div>
      <>
      {/* <AdminCards /> */}</>
    </div>
    )
}
