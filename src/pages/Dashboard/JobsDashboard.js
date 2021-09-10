import React from "react";
import DashboardChart from "../../components/charts/dashboard-charts";
import DashboardStatistics from "../../components/charts/dashboard-statistics";
import DashboardStats from "../../components/charts/dashboard-stats";
import DashboardTable from "../../components/Tables/Dashboard/dashboard-table";
// import AdminCards from '../components/adminCards'

const JobsDashboard = () => {
    return (
        <div>
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="page-title">Welcome Admin!</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active">Jobs Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                    <div className="card dash-widget">
                        <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-cubes"></i>
              </span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Job Applications</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                    <div className="card dash-widget">
                        <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-usd"></i>
              </span>
                            <div className="dash-widget-info">
                                <h3>44</h3>
                                <span>Job Openings</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                    <div className="card dash-widget">
                        <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-diamond"></i>
              </span>
                            <div className="dash-widget-info">
                                <h3>37</h3>
                                <span>Job Offers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="row">*/}
            {/*    <DashboardChart />*/}
            
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <DashboardStats />*/}
            
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <DashboardStatistics />*/}
            
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <DashboardStatistics />*/}
            
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <DashboardTable title="Invoices" />*/}
            {/*    <DashboardTable title="Payments" />*/}
            
            {/*</div>*/}
            <>
                {/* <AdminCards /> */}</>
        </div>
    );
};

export default JobsDashboard;
