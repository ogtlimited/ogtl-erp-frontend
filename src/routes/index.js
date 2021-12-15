import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();
    const isDashboard = pathname.includes('/dashboard');
  
    return (
      <Suspense
      fallback={<h1>Loading...</h1>}
      >
        <Component {...props} />
      </Suspense>
    );
  };


const AllCampaigns = Loadable(lazy(() => import("./pages/Campaigns/AllCampaigns")))
const Leads = Loadable(lazy(() => import( "./pages/Campaigns/Leads")));
const AdminDashboard = Loadable(lazy(() => import( "./pages/Dashboard/AdminDashboard")));
const AttendanceAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/Attendance.Admin")));
const Departments = Loadable(lazy(() => import( "./pages/HR/Admin/Department.Admin")));
const Designations = Loadable(lazy(() => import( "./pages/HR/Admin/Designation.Admin")));
const AllEmployeesAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/Employees.Admin")));
const LeavesAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/Leaves.Admin")));
const Promotion = Loadable(lazy(() => import( "./pages/HR/Admin/Promotion")));
const ShiftAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/Shift.Admin")));
const Profile = Loadable(lazy(() => import( "./pages/HR/Profile")));
const EmployeeAttendance = Loadable(lazy(() => import( "./pages/HR/Users/Attendance.Users")));
const EmployeeUser = Loadable(lazy(() => import( "./pages/HR/Users/Employee.User")));
const LeavesUser = Loadable(lazy(() => import( "./pages/HR/Users/Leaves.User")));
const EmployeeSalary = Loadable(lazy(() => import( "./pages/Payroll/EmployeeSalary")));
const PaySlip = Loadable(lazy(() => import( "./pages/Payroll/PaySlip")));
const AttendanceReport = Loadable(lazy(() => import( "./pages/Reports/AttendanceReport")));
const EmployeeReport = Loadable(lazy(() => import( "./pages/Reports/EmployeeReport")));
const PayslipReport = Loadable(lazy(() => import( "./pages/Reports/PayslipReport")));
const JobOpening = Loadable(lazy(() => import( "./pages/HR/Admin/JobOpening.Admin")));
const JobOffer = Loadable(lazy(() => import( "./pages/HR/Admin/JobOffer.Admin")));
const JobApplicants = Loadable(lazy(() => import( "./pages/HR/Admin/JobApplicants.Admin")));
const AptitudeTest = Loadable(lazy(() => import( "./pages/HR/Admin/AptitudeTest.Admin")));
const LeaveSettingAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/LeaveSetting.Admin")));
const CoachingAdmin = Loadable(lazy(() => import( "./pages/HR/Admin/CoachingAdmin")));
const AssetAssignmentForm = Loadable(lazy(() => import( "./pages/HR/Admin/AssetAssignment.Admin")));
const ShiftAssignment = Loadable(lazy(() => import( "./pages/HR/Admin/ShiftAssignment.Admin")));
const ShiftRequest = Loadable(lazy(() => import( "./pages/HR/Admin/ShiftRequest.Admin")));
const WarningLetter = Loadable(lazy(() => import( "./pages/HR/Admin/WarningLetter.Admin")));
const JobsDashboard = Loadable(lazy(() => import( "./pages/Dashboard/JobsDashboard")));
const PayrollItems = Loadable(lazy(() => import( "./pages/Payroll/PayrollItems")));
const ScoreCards = Loadable(lazy(() => import( "./pages/HR/Admin/score-cards")));
const Termination = Loadable(lazy(() => import( "./pages/HR/Admin/Termination")));
const Resignation = Loadable(lazy(() => import( "./pages/HR/Admin/Resignation")));
const CoachingEmployee = Loadable(lazy(() => import( "./pages/HR/Users/CoachingEmployee")));
const Email = Loadable(lazy(() => import( "./pages/In-Apps/Email")));
const CampaignInfo = Loadable(lazy(() => import( "./pages/Campaigns/CampaignInfo")));
const MaintenanceReport = Loadable(lazy(() => import( "./pages/Maintenance/MaintenanceReport")));
const MaintenanceAndRepairs = Loadable(lazy(() => import( "./pages/Maintenance/MaintenanceAndRepairs")));
const Asset = Loadable(lazy(() => import( "./pages/HR/Admin/Asset.Admin")));
const PurchaseOrder = Loadable(lazy(() => import( "./pages/HR/Admin/PurchaseOrder.Admin")));
const { AccountingDashboard } = Loadable(lazy(() => import( "./pages/Accounting/AccountingDashboard")));
const Clients = Loadable(lazy(() => import( "./pages/Clients/Client")));
const Vendors = Loadable(lazy(() => import( "./pages/Vendors/Vendors")));
const Invoices = Loadable(lazy(() => import( "./pages/Accounting/Invoices")));
const VendorBills = Loadable(lazy(() => import( "./pages/Vendors/VendorBills")));
const VendorPayments = Loadable(lazy(() => import( "./pages/Vendors/VendorPayment")));
const ClientPayments = Loadable(lazy(() => import( "./pages/Clients/ClientPayment")));
const ChartOfAccounts = Loadable(lazy(() => import( "./pages/Accounting/chartOfAccounts")));
const GeneralLedger = Loadable(lazy(() => import( "./pages/Accounting/GeneralLedger")));
const Budget = Loadable(lazy(() => import( "./pages/Accounting/Budget")));
const Journals = Loadable(lazy(() => import( "./pages/Accounting/Journal")));
const InvoiceTemplate = Loadable(lazy(() => import( "./pages/Accounting/InvoiceTemplate")));
const ProductItems = Loadable(lazy(() => import( "./pages/ProductItems/ProductItems")));
const Bill = Loadable(lazy(() => import( "./pages/Vendors/bill")));
const PayrollReports = Loadable(lazy(() => import( "./pages/Accounting/Payroll-Reports")));
const Notifications = Loadable(lazy(() => import( "./pages/In-Apps/Notifications")));
const ExpenseHeads = Loadable(lazy(() => import( "./pages/ExpenseHeads/ExpenseHeads")));
const ViewEmail = Loadable(lazy(() => import( "./pages/In-Apps/ViewEmail")));
const BalanceSheet = Loadable(lazy(() => import( "./pages/Reports/BalanceSheet")));
const SingleEmail = Loadable(lazy(() => import( "./pages/In-Apps/SingleEmail")));
const FileManager = Loadable(lazy(() => import( "./pages/In-Apps/FileManager")));
const Branch = Loadable(lazy(() => import( "./pages/HR/Admin/Branch")));
const HRDashboard = Loadable(lazy(() => import( "./pages/Dashboard/HRDashboard")));
const SignatureGenerator = Loadable(lazy(() => import( "./pages/In-Apps/signature-generator")));
const RolePermission = Loadable(lazy(() => import( "./pages/settings/roles-permission")));