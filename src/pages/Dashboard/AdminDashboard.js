import React from "react";
import DashboardChart from "../../components/charts/dashboard-charts";
import DashboardStatistics from "../../components/charts/dashboard-statistics";
import DashboardStats from "../../components/charts/dashboard-stats";
import DashboardTable from "../../components/Tables/Dashboard/dashboard-table";
// import AdminCards from '../components/adminCards'

const AdminDashboard = () => {
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
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-cubes"></i>
              </span>
              <div className="dash-widget-info">
                <h3>112</h3>
                <span>Projects</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-usd"></i>
              </span>
              <div className="dash-widget-info">
                <h3>44</h3>
                <span>Clients</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-diamond"></i>
              </span>
              <div className="dash-widget-info">
                <h3>37</h3>
                <span>Tasks</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-user"></i>
              </span>
              <div className="dash-widget-info">
                <h3>218</h3>
                <span>Employees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <DashboardChart title="" data={data} />
          
      </div>
      <div className="row">
        <DashboardStats />
          
      </div>
      <div className="row">
        <DashboardStatistics />
          
      </div>
      <div className="row">
        <DashboardStatistics />
          
      </div>
      <div className="row">
        <DashboardTable title="Invoices" />
        <DashboardTable title="Payments" />
          
      </div>
      <>
      {/* <AdminCards /> */}</>
    </div>
  );
};

export default AdminDashboard;
