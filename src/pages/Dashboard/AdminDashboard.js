import React from 'react'
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
            <div class="card-body"><span class="dash-widget-icon"><i class="fa fa-users"></i></span>
                <div class="dash-widget-info">
                    <h3>218</h3><span>Employees</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
            <div class="card-body"><span class="dash-widget-icon"><i class="fa fa-user-plus"></i></span>
                <div class="dash-widget-info">
                    <h3>112</h3><span>Present</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
            <div class="card-body"><span class="dash-widget-icon"><i class="fa fa-user-times"></i></span>
                <div class="dash-widget-info">
                    <h3>44</h3><span>Absent</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div class="card dash-widget">
            <div class="card-body"><span class="dash-widget-icon"><i class="fa fa-sign-out"></i></span>
                <div class="dash-widget-info">
                    <h3>37</h3><span>Leave</span>
                </div>
            </div>
        </div>
    </div>
    
</div>
        <>
        {/* <AdminCards /> */}
        </>
        </div>
    )
}

export default AdminDashboard
