import { PATH_DASHBOARD } from "../../routes/paths";

const getIcon = (name) => (
    <i className={"la " + name}></i>
  );
  
  const ICONS = {
    user: getIcon("la-user"),
    reports: getIcon("la-pie-chart"),
    recruitment: getIcon("la-briefcase"),
    payroll: getIcon("la-money"),
    dashboard: getIcon("la-dashboard"),
    performance: getIcon("la-graduation-cap"),
    coaching: getIcon("la-ticket"),
    promotion: getIcon("la-bullhorn"),
    resignation: getIcon("la-external-link-square"),
    termination: getIcon("la-times-circle"),
    rolesPermission: getIcon("la-key"),
    assets: getIcon("la-object-ungroup"),
    purchaseOrder: getIcon("la-shopping-cart"),
    productItems: getIcon("la-box"),
    settings: getIcon("la-shopping-cart"),
  };
  
  const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: "Main",
        items: [
          {
            title: "Dashboard",
            path: PATH_DASHBOARD.main.root,
            icon: ICONS.dashboard,
            children: [
              { title: "Dashboard", path: PATH_DASHBOARD.main.main },
              { title: "HR Dashboard", path: PATH_DASHBOARD.main.hrDashboard },
              { title: "Account Dashboard", path: PATH_DASHBOARD.main.accountDashboard },
              { title: "Employee Dashboard", path: PATH_DASHBOARD.main.employeeDashboard },
            ],
          },
          {
            title: "Apps",
            path: PATH_DASHBOARD.apps.root,
            icon: ICONS.dashboard,
            children: [
              { title: "Email", path: PATH_DASHBOARD.apps.email },
              { title: "Email Signature", path: PATH_DASHBOARD.apps.email },
              { title: "File Manager", path: PATH_DASHBOARD.apps.fileManager },
              { title: "Notifications", path: PATH_DASHBOARD.apps.notification },
            ],
          },
        ],
      },
    {
      subheader: "HR",
      items: [
        {
          title: "Employees",
          path: PATH_DASHBOARD.hr.root,
          icon: ICONS.user,
          children: [
            { title: "All Employees", path: PATH_DASHBOARD.hr.allEmployees },
            { title: "Leaves (Admin)", path: PATH_DASHBOARD.hr.leavesAdmin },
            { title: "Leaves (Employee)", path: PATH_DASHBOARD.hr.leavesEmployee },
            { title: "Attendance (Admin)", path: PATH_DASHBOARD.hr.attendanceAdmin },
            { title: "Attendance (Employee)", path: PATH_DASHBOARD.hr.attendanceEmployee },
            { title: "Departments", path: PATH_DASHBOARD.hr.department },
            { title: "Designations", path: PATH_DASHBOARD.hr.designations },
            { title: "Shifts", path: PATH_DASHBOARD.hr.shifts },
            { title: "Shift Assignments", path: PATH_DASHBOARD.hr.shiftAssignment },
            { title: "Shift Request", path: PATH_DASHBOARD.hr.shiftRequest },
          ],
        },
        {
          title: "Payroll",
          path: PATH_DASHBOARD.payroll.root,
          icon: ICONS.payroll,
          children: [
            { title: "Employee Salary", path: PATH_DASHBOARD.payroll.salary },
            { title: "Payroll Items", path: PATH_DASHBOARD.payroll.payrollItem },
          ],
        },
        {
          title: "Reports",
          path: PATH_DASHBOARD.payroll.root,
          icon: ICONS.payroll,
          children: [
            { title: "Employee Salary", path: PATH_DASHBOARD.payroll.salary },
            { title: "Payroll Items", path: PATH_DASHBOARD.payroll.payrollItem },
          ],
        },
        {
          title: "Recruitment",
          path: PATH_DASHBOARD.recruitment.root,
          icon: ICONS.recruitment,
          children: [
            { title: "JOB Opening", path: PATH_DASHBOARD.recruitment.jobOpening },
            { title: "JOB Applicants", path: PATH_DASHBOARD.recruitment.jobApplicants },
            { title: "Apptitude Test", path: PATH_DASHBOARD.recruitment.aptitudeTests },
            { title: "JOB Offer", path: PATH_DASHBOARD.recruitment.jobOffer },
          ],
        },
        {
          title: "Performance",
          path: PATH_DASHBOARD.performance.root,
          icon: ICONS.performance,
          children: [
            { title: "Warning Letter", path: PATH_DASHBOARD.performance.warningLetter },
            { title: "Score Cards", path: PATH_DASHBOARD.performance.scoreCards }
          ],
        },
        {
            title: "Coaching Form List",
            path: PATH_DASHBOARD.coaching,
            icon: ICONS.coaching,
        },
        {
            title: "Coaching Form",
            path: PATH_DASHBOARD.employeeCoaching,
            icon: ICONS.coaching,
        },
        {
            title: "Promomotion",
            path: PATH_DASHBOARD.promotion,
            icon: ICONS.promotion,
        },
        {
            title: "Resignation",
            path: PATH_DASHBOARD.resignation,
            icon: ICONS.resignation,
        },
        {
            title: "Termination",
            path: PATH_DASHBOARD.termination,
            icon: ICONS.termination,
        },
      ],
    },
    {
        subheader: "Accounting",
        items: [
          {
            title: "Accounting",
            path: PATH_DASHBOARD.accounts.root,
            icon: ICONS.user,
            children: [
              { title: "Accounts", path: PATH_DASHBOARD.accounts.chartOfAccount },
              { title: "Budget", path: PATH_DASHBOARD.accounts.budgets },
              { title: "Journals", path: PATH_DASHBOARD.accounts.journals },
              { title: "General Ledger", path: PATH_DASHBOARD.accounts.ledger },
              { title: "Expense", path: PATH_DASHBOARD.accounts.expenseHeads },
            ],
          },
          {
            title: "Accounting Reports",
            path: PATH_DASHBOARD.accountingReports.root,
            icon: ICONS.user,
            children: [
              { title: "Payroll Reports", path: PATH_DASHBOARD.accountingReports.payrollReport },
              { title: "Balance Sheet", path: PATH_DASHBOARD.accountingReports.balanceSheet },
            ],
          },
          {
            title: "Clients",
            path: PATH_DASHBOARD.clients.root,
            icon: ICONS.user,
            children: [
              { title: "Clients", path: PATH_DASHBOARD.clients.clients },
              { title: "Invoices", path: PATH_DASHBOARD.clients.invoices },
              { title: "Payments", path: PATH_DASHBOARD.clients.payments },
            ],
          },
          {
            title: "Vendors",
            path: PATH_DASHBOARD.vendors.root,
            icon: ICONS.user,
            children: [
              { title: "Vendors", path: PATH_DASHBOARD.vendors.vendors },
              { title: "Bills", path: PATH_DASHBOARD.vendors.bills },
              { title: "Payments", path: PATH_DASHBOARD.vendors.payments },
            ],
          },
          {
            title: "Product Items",
            path: PATH_DASHBOARD.productItems,
            icon: ICONS.productItems,
          },
        ],
      },
      {
        subheader: "Procurements",
        items: [
          {
            title: "Assets",
            path: PATH_DASHBOARD.assets.root,
            icon: ICONS.user,
            children: [
              { title: "Assets", path: PATH_DASHBOARD.assets.all },
              { title: "Assignment", path: PATH_DASHBOARD.assets.assignment }
            ],
          },
          {
            title: "Assets Purchase Order",
            path: PATH_DASHBOARD.purchaseOrder,
            icon: ICONS.purchaseOrder,
          },
        ],
      },
      {
        subheader: "Facility",
        items: [
          {
            title: "Maintenance",
            path: PATH_DASHBOARD.facility.root,
            icon: ICONS.user,
            children: [
              { title: "Maintenance Report", path: PATH_DASHBOARD.facility.all },
              { title: "Maintenance and Repairs", path: PATH_DASHBOARD.facility.maintenanceRepair }
            ],
          }
        ],
      },
      {
        subheader: "Settings",
        items: [
          {
            title: "Roles & Permission",
            path: PATH_DASHBOARD.settings.rolesPermission,
            icon: ICONS.rolesPermission,
          },
        ],
      },
  ];
  export default sidebarConfig;