function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  clientLogin: path(ROOTS_AUTH, "/client-login"),
  activateClient: path(ROOTS_AUTH, "/activate"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  main: {
    root: path(ROOTS_DASHBOARD, "/dashboard"),
    main: path(ROOTS_DASHBOARD, "/main"),
    hrDashboard: path(ROOTS_DASHBOARD, "/hr-dashboard"),
    operationsDashboard: path(ROOTS_DASHBOARD, "/operations-dashboard"),
    accountDashboard: path(ROOTS_DASHBOARD, "/account-dashboard"),
    clientDashboard: path(ROOTS_DASHBOARD, "/client-dashboard"),
    employeeDashboard: path(ROOTS_DASHBOARD, "/employee-dashboard"),
    jobDashboard: path(ROOTS_DASHBOARD, "/job-dashboard"),
    employeeAttendance: path(ROOTS_DASHBOARD, "/main/attendance"),
    outOfOffice: path(ROOTS_DASHBOARD, "/main/out-of-office"),
    employeeLeave: path(ROOTS_DASHBOARD, "/main/leave"),
    deductions: path(ROOTS_DASHBOARD, "/main/deductions"),
    resignation: path(ROOTS_DASHBOARD, "/main/resignation"), 
    survey: path(ROOTS_DASHBOARD, "/main/survey"), 
    manualAttendance: path(ROOTS_DASHBOARD, "/main/manual-attendance"), 
    tickets: path(ROOTS_DASHBOARD, "/main/tickets"),
    ticketManagement: path(ROOTS_DASHBOARD, "/main/ticket-management"), 
    announcement: path(ROOTS_DASHBOARD, "/main/announcement"), 
    IWD: path(ROOTS_DASHBOARD, "/main/international-women's-day"), 
    // valentine: path(ROOTS_DASHBOARD, "/main/valentine"), 
  },

  apps: {
    root: path(ROOTS_DASHBOARD, "/apps"),
    email: path(ROOTS_DASHBOARD, "/apps/email"),
    signature: path(ROOTS_DASHBOARD, "/apps/email-signature"),
    eCertificate: path(ROOTS_DASHBOARD, "/apps/employee-appreciation-eCertificate"),
    fileManager: path(ROOTS_DASHBOARD, "/apps/file-manager"),
    notification: path(ROOTS_DASHBOARD, "/apps/notifications"),
    ticketManager: path(ROOTS_DASHBOARD, "/apps/ticket-manager"),
  },

  hr: {
    root: path(ROOTS_DASHBOARD, "/hr"),
    allEmployees: path(ROOTS_DASHBOARD, "/hr/all-employees"),
    addEmployees: path(ROOTS_DASHBOARD, "/hr/all-employees/employee/add"),
    leadership: path(ROOTS_DASHBOARD, "/hr/all-employees/employee/leader"),
    leavesAdmin: path(ROOTS_DASHBOARD, "/hr/leaves-admin"),
    survey: path(ROOTS_DASHBOARD, "/hr/survey"),
    allSurvey: path(ROOTS_DASHBOARD, "/hr/all-survey"),
    resignation: path(ROOTS_DASHBOARD, "/hr/resignation"),
    attendanceAdmin: path(ROOTS_DASHBOARD, "/hr/attendance-admin"),
    capturedBiometrics: path(ROOTS_DASHBOARD, "/hr/captured-biometrics"),
    attendanceRecord: path(ROOTS_DASHBOARD, "/hr/attendance-record"),
    remoteAttendanceAdmin: path(ROOTS_DASHBOARD, "/hr/remote-attendance"),
    outOfOffice: path(ROOTS_DASHBOARD, "/hr/out-of-office"),
    publicholiday: path(ROOTS_DASHBOARD, "/hr/public-holiday"),
    departments: path(ROOTS_DASHBOARD, "/hr/departments"),
    campaigns: path(ROOTS_DASHBOARD, "/hr/campaigns"),
    teams: path(ROOTS_DASHBOARD, "/hr/teams"),
    branch: path(ROOTS_DASHBOARD, "/hr/branch"),
    designations: path(ROOTS_DASHBOARD, "/hr/designations"),
    leaveApproval: path(ROOTS_DASHBOARD, "/hr/leave-approval"),
    leaveType: path(ROOTS_DASHBOARD, "/hr/leave-type"),
    shifts: path(ROOTS_DASHBOARD, "/hr/shifts"),
    shiftAssignment: path(ROOTS_DASHBOARD, "/hr/shift-assignment"),
    shiftRequest: path(ROOTS_DASHBOARD, "/hr/shift-request"),
  },

  leadership: {
    root: path(ROOTS_DASHBOARD, "/leadership"),
    supervisor: path(ROOTS_DASHBOARD, "/leadership/supervisor"),
    attendanceBySupervisor: path(
      ROOTS_DASHBOARD,
      "/leadership/subordinate-attendance"
    ),
    campaignSchedule: path(ROOTS_DASHBOARD, "/leadership/campaign-schedule"),
    teamAttendance: path(ROOTS_DASHBOARD, "/leadership/team-attendance-record"),
    remoteAttendance: path(ROOTS_DASHBOARD, "/leadership/attendance-record"),
  },

  payroll: {
    root: path(ROOTS_DASHBOARD, "/payroll"),
    salary: path(ROOTS_DASHBOARD, "/payroll/salaries"),
    payrollProcessing: path(ROOTS_DASHBOARD, "/payroll/payroll-processing"),
    payday: path(ROOTS_DASHBOARD, "/payroll/payday"),
    payrollBatches: path(ROOTS_DASHBOARD, "/payroll/payroll-batches"),
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
    jobApplicants: path(ROOTS_DASHBOARD, "/recruitment/job-applications"),
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

  dataManagement: {
    root: path(ROOTS_DASHBOARD, "/data-management"),
    workforceLeaveApplications: path(ROOTS_DASHBOARD, "/data-management/workforce-leave-applications"),
  },

  operations: {
    root: path(ROOTS_DASHBOARD, "/operations"),
    operationTeamLeaveApplications: path(ROOTS_DASHBOARD, "/operations/operation-team-leave-applications"),
    resignation: path(ROOTS_DASHBOARD, "/operations/resignation"),
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
    payslipReport: path(ROOTS_DASHBOARD, "/accounting-reports/payslip-reports"),
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
