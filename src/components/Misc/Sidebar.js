import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import routes from "../../routes";
import "./Sidebar.css";
import $ from "jquery";
import tokenService from "../../services/token.service";
import { useAppContext } from "../../Context/AppContext";
const Sidebar = () => {
  const [user, setuser] = useState(tokenService.getUser());
  const [isPriviledged, setisPriviledged] = useState(false);
  const { combineRequest } = useAppContext();
  const canView = (dept) => {
    if (user?.department?.department === dept) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    combineRequest().then((res) => {
      const dept = res.data.createEmployeeFormSelection.departments;
    });
    if (user != null) {
      // const hrLower = HRpeople.map(e => e.toLowerCase())
      // if(HRpeople.includes(user?.designation?.toLowerCase())){
      // 	setisPriviledged(true)
      // }
    }
    var Sidemenu = function () {
      this.$menuItem = $("#sidebar-menu a");
    };
    var $this = Sidemenu;
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
    $("#sidebar-menu ul li.submenu a.active")
      .parents("li:last")
      .children("a:first")
      .addClass("active")
      .trigger("click");
  }, []);
  const dNone = {
    display: "none",
  };
  return (
    <div className="sidebar" id="sidebar">
      <div
        className="slimScrollDiv slimScrollDiv-style"
        style={{
          position: "relative",
          overflow: "auto",
          width: "100%",
          height: "593px",
        }}
      >
        <div
          className="sidebar-inner slimscroll slimScroll-style"
          style={{ overflow: "auto", width: "100%", height: "593px" }}
        >
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="submenu">
                <a
                  href=""
                  onClick={(e) => e.preventDefault()}
                  className="active subdrop"
                >
                  <i className="la la-dashboard"></i> <span> Dashboard</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "block" }}>
                  {canView("Operations") && (
                    <li>
                      <Link className="active" to="/admin/dashboard">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {canView("Accounting") && (
                    <li>
                      <Link className="active" to="/admin/accounting-dashboard">
                        Accounting Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="" to="/admin/employee-dashboard">
                      Employee Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="" onClick={(e) => e.preventDefault()}>
                  <i className="la la-cube"></i> <span> Apps</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  <li>
                    <Link to="/admin/email">Email</Link>
                  </li>
                  <li>
                    <Link className="" to="/apps/file-manager">
                      File Manager
                    </Link>
                  </li>
                </ul>
              </li>
              {canView("Operations") && (
                <>
                  <li className="menu-title">
                    <span>Operation</span>
                  </li>
                  <li className="submenu">
                    <a href="" onClick={(e) => e.preventDefault()}>
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
                        <Link to="/admin/leads">Leads</Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="menu-title">
                <span>HR</span>
              </li>

              <li className="submenu">
                <a
                  href=""
                  onClick={(e) => e.preventDefault()}
                  className="noti-dot"
                >
                  <i className="la la-user"></i> <span> Employees</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={dNone}>
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/all-employees">
                        All Employees
                      </Link>
                    </li>
                  )}
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/leaves-admin">
                        Leaves (Admin){" "}
                        <span className="badge badge-pill bg-primary float-right">
                          1
                        </span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="" to="/admin/leaves-employee">
                      Leaves (Employee)
                    </Link>
                  </li>

                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/leave-settings">
                        Leave Settings
                      </Link>
                    </li>
                  )}
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/attendance-admin">
                        Attendance (Admin)
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="" to="/admin/attendance-employee">
                      Attendance (Employee)
                    </Link>
                  </li>
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/departments">
                        Departments
                      </Link>
                    </li>
                  )}
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/designations">
                        Designations
                      </Link>
                    </li>
                  )}
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/shifts">
                        Shift &amp; Schedule
                      </Link>
                    </li>
                  )}
                  {canView("HR") && (
                    <li>
                      <Link className="" to="/admin/shift-assignment">
                        Shift Assignments
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="" to="/admin/shift-request">
                      Shift Requests
                    </Link>
                  </li>
                </ul>
              </li>
              {canView("HR") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
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

                    {canView("HR") && (
                      <li>
                        <Link className="" to="/admin/payroll-items">
                          {" "}
                          Payroll Items{" "}
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}

              {canView("HR") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
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
              )}
              {canView("HR") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i className="la la-briefcase"></i>{" "}
                    <span> Recruitment </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/job-opening">
                        {" "}
                        Job Opening{" "}
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
                      <Link className="" to="/admin/job-offer">
                        {" "}
                        Job Offer{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {canView("HR") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i className="la la-graduation-cap"></i>{" "}
                    <span> Performance </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/warning-letter">
                        {" "}
                        Warning Letter
                      </Link>
                    </li>
                    <li>
                      <Link className="" to="/admin/score-cards">
                        {" "}
                        Score Cards{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {canView("HR") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
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
              )}
              {canView("HR") && (
                <li className="">
                  <Link to="/admin/coaching">
                    <i className="la la-ticket"></i>{" "}
                    <span>Coaching Form List</span>
                  </Link>
                </li>
              )}
              <li className="">
                <Link to="/admin/employee-coaching">
                  <i className="la la-ticket"></i> <span>Coaching Form</span>
                </Link>
              </li>
              {canView("HR") && (
                <li className="">
                  <Link to="/admin/promotion">
                    <i className="la la-bullhorn"></i> <span>Promotion</span>
                  </Link>
                </li>
              )}
              {canView("HR") && (
                <li className="">
                  <Link to="/admin/resignation">
                    <i className="la la-external-link-square"></i>{" "}
                    <span>Resignation</span>
                  </Link>
                </li>
              )}
              {canView("HR") && (
                <li className="">
                  <Link to="/admin/termination">
                    <i className="la la-times-circle"></i>{" "}
                    <span>Termination</span>
                  </Link>
                </li>
              )}
              {canView("Accounting") && (
                <li className="menu-title">
                  <span>Accounting</span>
                </li>
              )}

              {canView("Accounting") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i className="la la-files-o"></i> <span> Accounting </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/chart-of-account">
                        Accounts
                      </Link>
                    </li>
                    <li>
                      <Link className="" to="/admin/budgets">
                        Budgets
                      </Link>
                    </li>
                    <li>
                      <Link className="" to="/admin/journals">
                        Journals
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="" to="/admin/budget-expenses">
                        Budget Expenses
                      </Link>
                    </li>
                    <li>
                      <Link className="" to="/admin/budget-revenues">
                        Budget Revenues
                      </Link>
                    </li> */}
                    <li>
                      <Link className="" to="/admin/ledger">
                        General Ledger
                      </Link>
                    </li>

                    {/* <li>
                      <Link className="" to="/admin/subscriptions">
                        Subscriptions
                      </Link>
                    </li> */}
                  </ul>
                </li>
              )}
              {canView("Accounting") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                  <i class="las la-chart-pie"></i> <span> Accounting Reports </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/payroll-reports">
                        Payroll Reports
                      </Link>
                      {/* <Link className="" to="/admin/client-invoice">
                        Invoices
                      </Link> */}
                      {/* <Link className="" to="/admin/client-payments">
                        Payments
                      </Link> */}
                    </li>
                  </ul>
                </li>
              )}
              {canView("Accounting") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i class="las la-user-friends"></i> <span> Clients </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/clients">
                        Clients
                      </Link>
                      <Link className="" to="/admin/client-invoice">
                        Invoices
                      </Link>
                      <Link className="" to="/admin/client-payments">
                        Payments
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {canView("Accounting") && (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i class="las la-user-friends"></i> <span> Vendors </span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={dNone}>
                    <li>
                      <Link className="" to="/admin/vendors">
                        Vendors
                      </Link>
                      <Link className="" to="/admin/vendor-bills">
                        Bills
                      </Link>
                      <Link className="" to="/admin/vendor-payments">
                        Payments
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {canView("Accounting") && (
                <li>
                  <Link to="/admin/product-items">
                    <i className="la la-box"></i> <span>Product Items</span>
                  </Link>
                </li>
              )}
              {canView("Facility") && (
                <li className="menu-title">
                  <span>Administration</span>
                </li>
              )}
              {canView("IT") && (
                <li>
                  <Link to="/admin/companysetting">
                    <i className="la la-cog"></i> <span>Settings</span>
                  </Link>
                </li>
              )}
              {canView("Accounting") && (
                <>
                  <li className="menu-title">
                    <span>Facility</span>
                  </li>
                  <li className="submenu">
                    <a href="" onClick={(e) => e.preventDefault()}>
                      <i className="la la-object-ungroup"></i>{" "}
                      <span> Assets </span> <span className="menu-arrow"></span>
                    </a>
                    <ul style={dNone}>
                      <li>
                        <Link to="/admin/assets">
                          <span>Assets</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/asset-assignment">
                          <span>Assignment</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/admin/purchase-order">
                      <i className="la la-cog"></i>{" "}
                      <span>Asset Purchase Order</span>
                    </Link>
                  </li>
                  <li className="submenu">
                    <a href="" onClick={(e) => e.preventDefault()}>
                      <i className="la la-tools"></i> <span> Maintenance </span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={dNone}>
                      <li>
                        <Link className="" to="/admin/maintenance-report">
                          Maintenance Report
                        </Link>
                      </li>
                      <li>
                        <Link className="" to="/admin/maintenance-repairs">
                          Maintenance and Repairs
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {/* <li className="submenu">
                <a href="" onClick={(e) => e.preventDefault()}>
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
             */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
