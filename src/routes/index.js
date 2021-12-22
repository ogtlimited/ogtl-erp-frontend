import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { AppProvider } from "../Context/AppContext";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import AdminLayout from "../layouts/Admin";
import RecruitmentLayout from "../layouts/RecruitmentLayout";
import Login from "../pages/Auth/Login";
const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "auth",
      children: [
        { path: "", element: <Navigate to="/auth/login" replace /> },
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "recruitment",
      element: (
            <RecruitmentLayout />

      ),
      children: [
        { path: "", element: <Navigate to="/recruitment/joblist" replace /> },
        {
          path: "joblist",
          element: (
           
              <JobOpenings />
           
          ),
        },
        {
          path: "joblist/:id",
          element: (
           
              <JobView />
           
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <AppProvider>
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        </AppProvider>
      ),
      children: [
        { path: "", element: <Navigate to="/dashboard/main" replace /> },
        {
          children: [
            { path: "", element: <Navigate to="/dashboard/main" replace /> },
            { path: "main", element: <AdminDashboard /> },
            { path: "hr-dashboard", element: <HRDashboard /> },
            { path: "account-dashboard", element: <AccountingDashboard /> },
            { path: "employee-dashboard", element: <EmployeeUser /> },
          ],
        },
        {
          path: 'apps',
          children: [
            { path: "", element: <Navigate to="/dashboard/apps/email" replace /> },
            { path: "email", element: <Email /> },
            { path: "email-signature", element: <SignatureGenerator /> },
            { path: "file-manager", element: <FileManager /> },
            { path: "notifications", element: <Notifications /> },
          ],
        },
        {
          path: 'hr',
          children: [
            { path: "", element: <Navigate to="/dashboard/hr/all-employees" replace /> },
            { path: "all-employees", element: <AllEmployeesAdmin /> },
            { path: "leaves-admin", element: <LeavesAdmin /> },
            { path: "leaves", element: <LeavesUser /> },
            { path: "attendance-admin", element: <AttendanceAdmin /> },
            { path: "attendance", element: <EmployeeAttendance /> },
            { path: "departments", element: <Departments /> },
            { path: "designations", element: <Designations /> },
            { path: "shifts", element: <ShiftAdmin /> },
            { path: "shift-assignment", element: <ShiftAssignment /> },
            { path: "shift-request", element: <ShiftRequest /> },
          ],
        },
        {
          path: 'payroll',
          children: [
            { path: "", element: <Navigate to="/dashboard/payroll/salaries" replace /> },
            { path: "salaries", element: <EmployeeSalary /> },
            { path: "payroll-items", element: <PayrollItems /> },
          ],
        },
        {
          path: 'reports',
          children: [
            { path: "", element: <Navigate to="/dashboard/reports/employee-reports" replace /> },
            { path: "employee-reports", element: <EmployeeReport /> },
            { path: "attendance-reports", element: <AttendanceReport /> },
            { path: "payslip-reports", element: <PayrollReports /> },
          ],
        },
        {
          path: 'recruitment',
          children: [
            { path: "", element: <Navigate to="/dashboard/recruitment/job-opening" replace /> },
            { path: "job-opening", element: <JobOpening /> },
            { path: "job-applicants", element: <JobApplicants /> },
            { path: "aptitude-test", element: <AptitudeTest /> },
            { path: "job-offer", element: <JobOffer /> },
          ],
        },
        {
          path: 'performance',
          children: [
            { path: "", element: <Navigate to="/dashboard/performance/warning-letter" replace /> },
            { path: "warning-letter", element: <WarningLetter /> },
            { path: "score-cards", element: <ScoreCards /> },
          ]
        },
          {
            path: 'accounts',
            children: [
              { path: '', element: <Navigate to="/dashboard/accounts/chart-of-account" replace /> },
              { path: 'chart-of-account', element: <ChartOfAccounts /> },
              { path: 'budgets', element: <Budget /> },
              { path: 'journals', element: <Journals /> },
              { path: 'expense-heads', element: <ExpenseHeads /> },
              { path: 'ledger', element: <GeneralLedger /> }
            ]
          },
          {
            path: 'accounting-reports',
            children: [
              { path: '', element: <Navigate to="/dashboard/accounting-reports/payroll-reports" replace /> },
              { path: 'payroll-reports', element: <PayrollReports /> },
              { path: 'balance-sheet', element: <BalanceSheet /> },
            ]
          },
          {
            path: 'clients',
            children: [
              { path: '', element: <Navigate to="/dashboard/clients/all" replace /> },
              { path: 'all', element: <Clients /> },
              { path: 'invoices', element: <Invoices /> },
              { path: 'payments', element: <ClientPayments /> },
            ]
          },
          {
            path: 'vendors',
            children: [
              { path: '', element: <Navigate to="/dashboard/vendors/all" replace /> },
              { path: 'all', element: <Vendors /> },
              { path: 'bills', element: <VendorBills /> },
              { path: 'payments', element: <VendorPayments /> },
            ]
          },
          {
            path: 'assets',
            children: [
              { path: '', element: <Navigate to="/dashboard/assets/all" replace /> },
              { path: 'all', element: <Asset /> },
              { path: 'assignment', element: <AssetAssignmentForm /> },

            ]
          },
          {
            path: 'maintenance',
            children: [
              { path: '', element: <Navigate to="/dashboard/maintenance/reports" replace /> },
              { path: 'reports', element: <MaintenanceReport /> },
              { path: 'maintenance-and-repair', element: <MaintenanceAndRepairs /> },

            ]
          },
          {
            path: 'settings',
            children: [
              { path: '', element: <Navigate to="/dashboard/settings/roles-permissionss" replace /> },
              { path: 'roles-permissions', element: <RolePermission /> },


            ]
          },
         { path: 'employee-coaching', element: <CoachingEmployee /> },
         { path: 'product-items', element: <ProductItems /> },
         { path: 'coaching', element: <CoachingAdmin /> },
         { path: 'purchase-order', element: <PurchaseOrder /> },
         { path: 'promotion', element: <Promotion /> },
         { path: 'resignation', element: <Resignation /> },
         { path: 'termination', element: <Termination /> },
        //   { path: 'finance', element: <Finance /> },
      ],
    },

    //   { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
const AllCampaigns = Loadable(
  lazy(() => import("../pages/Campaigns/AllCampaigns"))
);
const JobOpenings = Loadable(
  lazy(() => import("../pages/recruitments/joblist"))
);
const JobView = Loadable(
  lazy(() => import("../pages/recruitments/jobview"))
);
const Leads = Loadable(lazy(() => import("../pages/Campaigns/Leads")));
const AdminDashboard = Loadable(
  lazy(() => import("../pages/Dashboard/AdminDashboard"))
);
const AttendanceAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Attendance.Admin"))
);
const Departments = Loadable(
  lazy(() => import("../pages/HR/Admin/Department.Admin"))
);
const Designations = Loadable(
  lazy(() => import("../pages/HR/Admin/Designation.Admin"))
);
const AllEmployeesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Employees.Admin"))
);
const LeavesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Leaves.Admin"))
);
const Promotion = Loadable(lazy(() => import("../pages/HR/Admin/Promotion")));
const ShiftAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Shift.Admin"))
);
const Profile = Loadable(lazy(() => import("../pages/HR/Profile")));
const EmployeeAttendance = Loadable(
  lazy(() => import("../pages/HR/Users/Attendance.Users"))
);
const EmployeeUser = Loadable(
  lazy(() => import("../pages/HR/Users/Employee.User"))
);
const LeavesUser = Loadable(
  lazy(() => import("../pages/HR/Users/Leaves.User"))
);
const EmployeeSalary = Loadable(
  lazy(() => import("../pages/Payroll/EmployeeSalary"))
);
const PaySlip = Loadable(lazy(() => import("../pages/Payroll/PaySlip")));
const AttendanceReport = Loadable(
  lazy(() => import("../pages/Reports/AttendanceReport"))
);
const EmployeeReport = Loadable(
  lazy(() => import("../pages/Reports/EmployeeReport"))
);
const PayslipReport = Loadable(
  lazy(() => import("../pages/Reports/PayslipReport"))
);
const JobOpening = Loadable(
  lazy(() => import("../pages/HR/Admin/JobOpening.Admin"))
);
const JobOffer = Loadable(
  lazy(() => import("../pages/HR/Admin/JobOffer.Admin"))
);
const JobApplicants = Loadable(
  lazy(() => import("../pages/HR/Admin/JobApplicants.Admin"))
);
const AptitudeTest = Loadable(
  lazy(() => import("../pages/HR/Admin/AptitudeTest.Admin"))
);
const LeaveSettingAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveSetting.Admin"))
);
const CoachingAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/CoachingAdmin"))
);
const AssetAssignmentForm = Loadable(
  lazy(() => import("../pages/HR/Admin/AssetAssignment.Admin"))
);
const ShiftAssignment = Loadable(
  lazy(() => import("../pages/HR/Admin/ShiftAssignment.Admin"))
);
const ShiftRequest = Loadable(
  lazy(() => import("../pages/HR/Admin/ShiftRequest.Admin"))
);
const WarningLetter = Loadable(
  lazy(() => import("../pages/HR/Admin/WarningLetter.Admin"))
);
const JobsDashboard = Loadable(
  lazy(() => import("../pages/Dashboard/JobsDashboard"))
);
const PayrollItems = Loadable(
  lazy(() => import("../pages/Payroll/PayrollItems"))
);
const ScoreCards = Loadable(
  lazy(() => import("../pages/HR/Admin/score-cards"))
);
const Termination = Loadable(
  lazy(() => import("../pages/HR/Admin/Termination"))
);
const Resignation = Loadable(
  lazy(() => import("../pages/HR/Admin/Resignation"))
);
const CoachingEmployee = Loadable(
  lazy(() => import("../pages/HR/Users/CoachingEmployee"))
);
const Email = Loadable(lazy(() => import("../pages/In-Apps/Email")));
const CampaignInfo = Loadable(
  lazy(() => import("../pages/Campaigns/CampaignInfo"))
);
const MaintenanceReport = Loadable(
  lazy(() => import("../pages/Maintenance/MaintenanceReport"))
);
const MaintenanceAndRepairs = Loadable(
  lazy(() => import("../pages/Maintenance/MaintenanceAndRepairs"))
);
const Asset = Loadable(lazy(() => import("../pages/HR/Admin/Asset.Admin")));
const PurchaseOrder = Loadable(
  lazy(() => import("../pages/HR/Admin/PurchaseOrder.Admin"))
);
const AccountingDashboard = Loadable(
  lazy(() => import("../pages/Accounting/AccountingDashboard"))
);
const Clients = Loadable(lazy(() => import("../pages/Clients/Client")));
const Vendors = Loadable(lazy(() => import("../pages/Vendors/Vendors")));
const Invoices = Loadable(lazy(() => import("../pages/Accounting/Invoices")));
const VendorBills = Loadable(
  lazy(() => import("../pages/Vendors/VendorBills"))
);
const VendorPayments = Loadable(
  lazy(() => import("../pages/Vendors/VendorPayment"))
);
const ClientPayments = Loadable(
  lazy(() => import("../pages/Clients/ClientPayment"))
);
const ChartOfAccounts = Loadable(
  lazy(() => import("../pages/Accounting/chartOfAccounts"))
);
const GeneralLedger = Loadable(
  lazy(() => import("../pages/Accounting/GeneralLedger"))
);
const Budget = Loadable(lazy(() => import("../pages/Accounting/Budget")));
const Journals = Loadable(lazy(() => import("../pages/Accounting/Journal")));
const InvoiceTemplate = Loadable(
  lazy(() => import("../pages/Accounting/InvoiceTemplate"))
);
const ProductItems = Loadable(
  lazy(() => import("../pages/ProductItems/ProductItems"))
);
const Bill = Loadable(lazy(() => import("../pages/Vendors/bill")));
const PayrollReports = Loadable(
  lazy(() => import("../pages/Accounting/Payroll-Reports"))
);
const Notifications = Loadable(
  lazy(() => import("../pages/In-Apps/Notifications"))
);
const ExpenseHeads = Loadable(
  lazy(() => import("../pages/ExpenseHeads/ExpenseHeads"))
);
const ViewEmail = Loadable(lazy(() => import("../pages/In-Apps/ViewEmail")));
const BalanceSheet = Loadable(
  lazy(() => import("../pages/Reports/BalanceSheet"))
);
const SingleEmail = Loadable(
  lazy(() => import("../pages/In-Apps/SingleEmail"))
);
const FileManager = Loadable(
  lazy(() => import("../pages/In-Apps/FileManager"))
);
const Branch = Loadable(lazy(() => import("../pages/HR/Admin/Branch")));
const HRDashboard = Loadable(
  lazy(() => import("../pages/Dashboard/HRDashboard"))
);
const SignatureGenerator = Loadable(
  lazy(() => import("../pages/In-Apps/signature-generator"))
);
const RolePermission = Loadable(
  lazy(() => import("../pages/settings/roles-permission"))
);
