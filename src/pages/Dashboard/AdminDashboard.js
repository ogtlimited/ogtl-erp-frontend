import React from "react";
import DashboardChart from "../../components/charts/dashboard-charts";
import DashboardStatistics from "../../components/charts/dashboard-statistics";
import DashboardStats from "../../components/charts/dashboard-stats";
import DashboardTable from "../../components/Tables/Dashboard/dashboard-table";
// import AdminCards from '../components/adminCards'

const AdminDashboard = () => {
  return (
    <div>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Welcome Admin!</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card dash-widget">
            <div class="card-body">
              <span class="dash-widget-icon">
                <i class="fa fa-cubes"></i>
              </span>
              <div class="dash-widget-info">
                <h3>112</h3>
                <span>Projects</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card dash-widget">
            <div class="card-body">
              <span class="dash-widget-icon">
                <i class="fa fa-usd"></i>
              </span>
              <div class="dash-widget-info">
                <h3>44</h3>
                <span>Clients</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card dash-widget">
            <div class="card-body">
              <span class="dash-widget-icon">
                <i class="fa fa-diamond"></i>
              </span>
              <div class="dash-widget-info">
                <h3>37</h3>
                <span>Tasks</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="card dash-widget">
            <div class="card-body">
              <span class="dash-widget-icon">
                <i class="fa fa-user"></i>
              </span>
              <div class="dash-widget-info">
                <h3>218</h3>
                <span>Employees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <DashboardChart />
          
      </div>
      <div class="row">
        <DashboardStats />
          
      </div>
      <div class="row">
        <DashboardStatistics />
          
      </div>
      <div class="row">
        <DashboardStatistics />
          
      </div>
      <div class="row">
        <DashboardTable title="Invoices" />
        <DashboardTable title="Payments" />
          
      </div>
      <>
      {/* <AdminCards /> */}</>
    </div>
  );
};

export default AdminDashboard;
