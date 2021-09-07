import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from "react-router-dom";
import routes from '../../routes'
import './Sidebar.css'
const Sidebar = () => {
    const dNone = {
        display: 'none'
    }
  return (
    <div className="sidebar" id="sidebar">
      <div
        className="slimScrollDiv slimScrollDiv-style"
        style={{position: 'relative', overflow: 'auto', width: '100%', height: '593px'}}
      >
        <div
          className="sidebar-inner slimscroll slimScroll-style"
          style={{overflow: 'auto', width: '100%', height:'593px'}}
        >
          <div id="sidebar-menu" className="sidebar-menu">           
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()} className="active subdrop">
                  <i className="la la-dashboard"></i> <span> Dashboard</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{display: "block"}}>
                  <li>
                    <Link className="active" to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/employee-dashboard">
                      Employee Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-cube"></i> <span> Apps</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link to="/blue/email/inbox">Email</Link>
                  </li>
                  <li>
                    <Link className="" to="/apps/file-manager">
                      File Manager
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span>HR</span>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()} className="noti-dot">
                  <i className="la la-user"></i> <span> Employees</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/admin/all-employees">
                      All Employees
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/leaves-admin">
                      Leaves (Admin){" "}
                      <span className="badge badge-pill bg-primary float-right">
                        1
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/leaves-employee">
                      Leaves (Employee)
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/leave-settings">
                      Leave Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/attendance-admin">
                      Attendance (Admin)
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/attendance-employee">
                      Attendance (Employee)
                    </Link>
                  </li>
                  
                  {/* <li>
                    <Link className="" to="/admin/departments">
                      Departments
                    </Link>
                  </li> */}
                  <li>
                    <Link className="" to="/admin/designations">
                      Designations
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/shifts">
                      Shift &amp; Schedule
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="" to="/admin/overtime">
                      Overtime
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-rocket"></i> <span> Campaigns</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/admin/campaigns">
                      All Campaigns
                    </Link>
                  </li>
                  <li className="">
                  <Link to="/admin/leads">
                   Leads
                  </Link>
              </li>
                  
                </ul>
              </li>
             
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-money"></i> <span> Payroll </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/admin/salary">
                      {" "}
                      Employee Salary{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/payslip">
                      {" "}
                      Payslip{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/payroll/payroll-items">
                      {" "}
                      Payroll Items{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-pie-chart"></i> <span> Reports </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/admin/employee-reports">
                      {" "}
                      Employee Report{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/payslip-reports">
                      {" "}
                      Payslip Report{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/attendance-reports">
                      {" "}
                      Attendance Report{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/reports/leave-reports">
                      {" "}
                      Leave Report{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/reports/daily-reports">
                      {" "}
                      Daily Report{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-edit"></i>{" "}
                  <span> Coaching </span> <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                  <Link  to="/admin/coaching">Coaching Admin</Link>
                  </li>
                  <li>
                  <Link  to="/admin/coaching-employee">Coaching Employee</Link>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span>Accounting</span>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-files-o"></i> <span> Accounting </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/accounts/categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/accounts/budgets">
                      Budgets
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/accounts/budget-expenses">
                      Budget Expenses
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/accounts/budget-revenues">
                      Budget Revenues
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="menu-title">
                <span>Performance</span>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-graduation-cap"></i>{" "}
                  <span> Performance </span> <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link
                      className=""
                      to="/performances/performance-indicator"
                    >
                      {" "}
                      Performance Indicator{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=""
                      to="/performances/performance-review"
                    >
                      {" "}
                      Performance Review{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=""
                      to="/performances/performance-appraisal"
                    >
                      {" "}
                      Performance Appraisal{" "}
                    </Link>
                  </li>
                </ul>
              </li>
             <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-edit"></i> <span> Training </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/training/training-list">
                      {" "}
                      Training List{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/training/trainer">
                      {" "}
                      Trainers
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/training/training-type">
                      {" "}
                      Training Type{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <Link to="/admin/promotion">
                  <i className="la la-bullhorn"></i> <span>Promotion</span>
                </Link>
              </li>
              <li className="">
                <Link to="/performance/resignation">
                  <i className="la la-external-link-square"></i>{" "}
                  <span>Resignation</span>
                </Link>
              </li>
              <li className="">
                <Link to="/performance/termination">
                  <i className="la la-times-circle"></i> <span>Termination</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>Administration</span>
              </li>
              <li className="">
                <Link to="/administrator/assets">
                  <i className="la la-object-ungroup"></i> <span>Assets</span>
                </Link>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-briefcase"></i> <span> Jobs </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/administrator/user-dashboard">
                      {" "}
                      User Dasboard{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/administrator/jobs-dashboard">
                      {" "}
                      Jobs Dashboard{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/job-opening">
                      {" "}
                      Job Opening{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/job-offer">
                      {" "}
                      Job Offer{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/job-applicants">
                      {" "}
                      Job Applicants
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/admin/aptitude-test">
                      {" "}
                      Aptitude Test{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/administrator/manage-resumes">
                      {" "}
                      Manage Resumes{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=""
                      to="/administrator/shortlist-candidates"
                    >
                      {" "}
                      Shortlist Candidates{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=""
                      to="/administrator/interview-questions"
                    >
                      {" "}
                      Interview Questions{" "}
                    </Link>
                  </li>

                  <li>
                    <Link className="" to="/administrator/experiance-level">
                      {" "}
                      Experience Level{" "}
                    </Link>
                  </li>

                  <li>
                    <Link className="" to="/administrator/schedule-timing">
                      {" "}
                      Schedule timing{" "}
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="">
                <Link to="/administrator/activities">
                  <i className="la la-bell"></i> <span>Activities</span>
                </Link>
              </li>
              <li className="">
                <Link to="/administrator/users">
                  <i className="la la-user-plus"></i> <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/blue/settings/companysetting">
                  <i className="la la-cog"></i> <span>Settings</span>
                </Link>
              </li>
              <li>
                <a >
                  <span></span>
                </a>
              </li>
              <li>
                <a >
                  <span></span>
                </a>
              </li>
              <li className="submenu">
                <a href="" onClick={(e)=> e.preventDefault()}>
                  <i className="la la-crosshairs"></i> <span> Goals </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link className="" to="/goals/goal-tracking">
                      {" "}
                      Goal List{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/goals/goal-type">
                      {" "}
                      Goal Type{" "}
                    </Link>
                  </li>
                </ul>
              </li>
                                      </ul>
          </div>
        </div>
        <div
          className="slimScrollBar slimscollbar-style"
        ></div>
        <div
          className="slimScrollRail slimscollRail-style"
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
