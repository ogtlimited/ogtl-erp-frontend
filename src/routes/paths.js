function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  main: {
    root: path(ROOTS_DASHBOARD, "/dashboard"),
    main: path(ROOTS_DASHBOARD, "/main"),
    hrDashboard: path(ROOTS_DASHBOARD, "/hr-dashboard"),
    accountDashboard: path(ROOTS_DASHBOARD, "/account-dashboard"),
    employeeDashboard: path(ROOTS_DASHBOARD, "/employee-dashboard"),
    jobDashboard: path(ROOTS_DASHBOARD, "/job-dashboard"),
  },
  apps: {
    root: path(ROOTS_DASHBOARD, "/apps"),
    email: path(ROOTS_DASHBOARD, "/apps/email"),
    signature: path(ROOTS_DASHBOARD, "/apps/email-signature"),
    fileManager: path(ROOTS_DASHBOARD, "/apps/file-manager"),
    notification: path(ROOTS_DASHBOARD, "/apps/notifications"),
    tickets: path(ROOTS_DASHBOARD, "/apps/tickets"),
    ticketManager: path(ROOTS_DASHBOARD, "/apps/ticket-manager"),
  },
  hr: {
    root: path(ROOTS_DASHBOARD, "/hr"),
    allEmployees: path(ROOTS_DASHBOARD, "/hr/all-employees"),
    leavesAdmin: path(ROOTS_DASHBOARD, "/hr/leaves-admin"),
    attendanceAdmin: path(ROOTS_DASHBOARD, "/hr/attendance-admin"),
    leavesEmployee: path(ROOTS_DASHBOARD, "/hr/leaves"),
    attendanceEmployee: path(ROOTS_DASHBOARD, "/hr/attendance"),
    department: path(ROOTS_DASHBOARD, "/hr/departments"),
    designations: path(ROOTS_DASHBOARD, "/hr/designations"),
    shifts: path(ROOTS_DASHBOARD, "/hr/shifts"),
    shiftAssignment: path(ROOTS_DASHBOARD, "/hr/shift-assignment"),
    shiftRequest: path(ROOTS_DASHBOARD, "/hr/shift-request"),
  },
  payroll: {
    root: path(ROOTS_DASHBOARD, "/payroll"),
    publicholiday: path(ROOTS_DASHBOARD, "/payroll/public-holiday"),
    salary: path(ROOTS_DASHBOARD, "/payroll/salaries"),
    deductions: path(ROOTS_DASHBOARD, "/payroll/deductions"),
    archive: path(ROOTS_DASHBOARD, "/payroll/archive"),
    payrollNotes: path(ROOTS_DASHBOARD, "/payroll/payroll-notes"),
  },
  reports: {
    root: path(ROOTS_DASHBOARD, "/reports"),
    employeeReport: path(ROOTS_DASHBOARD, "/reports/employee-reports"),
    payslipReport: path(ROOTS_DASHBOARD, "/reports/payslip-reports"),
    attendanceReports: path(ROOTS_DASHBOARD, "/reports/attendance-reports"),
    academyReports: path(ROOTS_DASHBOARD, "/reports/academy-reports"),
  },
  recruitment: {
    root: path(ROOTS_DASHBOARD, "/recruitment"),
    jobOpening: path(ROOTS_DASHBOARD, "/recruitment/job-opening"),
    jobOffer: path(ROOTS_DASHBOARD, "/recruitment/job-offer"),
    jobApplicants: path(ROOTS_DASHBOARD, "/recruitment/job-applicants"),
    academyApplicants: path(ROOTS_DASHBOARD, "/recruitment/academy-applicants"),
    aptitudeTests: path(ROOTS_DASHBOARD, "/recruitment/aptitude-test"),
    interviewees: path(ROOTS_DASHBOARD, "/recruitment/interviewees"),
    shadowing: path(ROOTS_DASHBOARD, "/recruitment/shadowing"),
    orientationAndTraining: path(
      ROOTS_DASHBOARD,
      "/recruitment/orientation-and-training"
    ),
  },
  performance: {
    root: path(ROOTS_DASHBOARD, "/performance"),
    warningLetter: path(ROOTS_DASHBOARD, "/performance/warning-letter"),
    scoreCards: path(ROOTS_DASHBOARD, "/performance/score-cards"),
  },
  coaching: path(ROOTS_DASHBOARD, "/coaching"),
  employeeCoaching: path(ROOTS_DASHBOARD, "/employee-coaching"),
  promotion: path(ROOTS_DASHBOARD, "/promotion"),
  resignation: path(ROOTS_DASHBOARD, "/resignation"),
  termination: path(ROOTS_DASHBOARD, "/termination"),
  productItems: path(ROOTS_DASHBOARD, "/product-items"),
  settings: {
    root: path(ROOTS_DASHBOARD, "/settings"),
    rolesPermission: path(ROOTS_DASHBOARD, "/settings/roles-permissions"),
    rolesAssignment: path(ROOTS_DASHBOARD, "/settings/roles-assignment"),
  },
  campaign: {
    root: path(ROOTS_DASHBOARD, "/operations"),
    allCampaign: path(ROOTS_DASHBOARD, "/operations/campaigns"),
    lead: path(ROOTS_DASHBOARD, "/operations/leads"),
    branch: path(ROOTS_DASHBOARD, "/operations/branch"),
  },
  accounts: {
    root: path(ROOTS_DASHBOARD, "/accounts"),
    chartOfAccount: path(ROOTS_DASHBOARD, "/accounts/chart-of-account"),
    budgets: path(ROOTS_DASHBOARD, "/accounts/budgets"),
    journals: path(ROOTS_DASHBOARD, "/accounts/journals"),
    ledger: path(ROOTS_DASHBOARD, "/accounts/ledger"),
    expenseHeads: path(ROOTS_DASHBOARD, "/accounts/expense-heads"),
  },
  accountingReports: {
    root: path(ROOTS_DASHBOARD, "/accounting-reports/"),
    payrollReport: path(ROOTS_DASHBOARD, "/accounting-reports/payroll-reports"),
    balanceSheet: path(ROOTS_DASHBOARD, "/accounting-reports/balance-sheet"),
  },
  clients: {
    root: path(ROOTS_DASHBOARD, "/clients/"),
    clients: path(ROOTS_DASHBOARD, "/clients/all"),
    invoices: path(ROOTS_DASHBOARD, "/clients/invoices"),
    payments: path(ROOTS_DASHBOARD, "/clients/payments"),
    leaveApprovals: path(ROOTS_DASHBOARD, "/clients/leave-approval"),
  },
  vendors: {
    root: path(ROOTS_DASHBOARD, "/vendors/"),
    vendors: path(ROOTS_DASHBOARD, "/vendors/all"),
    bills: path(ROOTS_DASHBOARD, "/vendors/bills"),
    payments: path(ROOTS_DASHBOARD, "/vendors/payments"),
  },
  assets: {
    root: path(ROOTS_DASHBOARD, "/assets/"),
    all: path(ROOTS_DASHBOARD, "/assets/all"),
    assignment: path(ROOTS_DASHBOARD, "/assets/assignment"),
  },
  facility: {
    root: path(ROOTS_DASHBOARD, "/maintenance/"),
    all: path(ROOTS_DASHBOARD, "/maintenance/reports"),
    maintenanceRepair: path(
      ROOTS_DASHBOARD,
      "/maintenance/maintenance-and-repair"
    ),
    shadowing: path(ROOTS_DASHBOARD, "/maintenance/shadowing"),
  },

  purchaseOrder: path(ROOTS_DASHBOARD, "/purchase-order"),
  IdRequest: path(ROOTS_DASHBOARD, "/id-request"),
};
