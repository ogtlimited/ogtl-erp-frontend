import AllCampaigns from "./pages/Campaigns/AllCampaigns";
import Leads from "./pages/Campaigns/Leads";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import AttendanceAdmin from "./pages/HR/Admin/Attendance.Admin";
import Departments from "./pages/HR/Admin/Department.Admin";
import Designations from "./pages/HR/Admin/Designation.Admin";
import AllEmployeesAdmin from "./pages/HR/Admin/Employees.Admin";
import LeavesAdmin from "./pages/HR/Admin/Leaves.Admin";
import Promotion from "./pages/HR/Admin/Promotion";
import ShiftAdmin from "./pages/HR/Admin/Shift.Admin";
import Profile from "./pages/HR/Profile";
import EmployeeAttendance from "./pages/HR/Users/Attendance.Users";
import EmployeeUser from "./pages/HR/Users/Employee.User";
import LeavesUser from "./pages/HR/Users/Leaves.User";
import EmployeeSalary from "./pages/Payroll/EmployeeSalary";
import PaySlip from "./pages/Payroll/PaySlip";
import AttendanceReport from "./pages/Reports/AttendanceReport";
import EmployeeReport from "./pages/Reports/EmployeeReport";
import PayslipReport from "./pages/Reports/PayslipReport";
import JobOpening from "./pages/HR/Admin/JobOpening.Admin";
import JobOffer from "./pages/HR/Admin/JobOffer.Admin";
import JobApplicants from "./pages/HR/Admin/JobApplicants.Admin";
import AptitudeTest from "./pages/HR/Admin/AptitudeTest.Admin";
import LeaveSettingAdmin from "./pages/HR/Admin/LeaveSetting.Admin";
import CoachingAdmin from "./pages/HR/Admin/CoachingAdmin";
import AssetAssignmentForm from "./pages/HR/Admin/AssetAssignment.Admin";
import ShiftAssignment from "./pages/HR/Admin/ShiftAssignment.Admin";
import ShiftRequest from "./pages/HR/Admin/ShiftRequest.Admin";
import WarningLetter from "./pages/HR/Admin/WarningLetter.Admin";
import JobsDashboard from "./pages/Dashboard/JobsDashboard";
import PayrollItems from "./pages/Payroll/PayrollItems";
import ScoreCards from "./pages/HR/Admin/score-cards";
import Termination from "./pages/HR/Admin/Termination";
import Resignation from "./pages/HR/Admin/Resignation";
import CoachingEmployee from "./pages/HR/Users/CoachingEmployee";
import Email from "./pages/In-Apps/Email";
import CampaignInfo from "./pages/Campaigns/CampaignInfo";
import MaintenanceReport from "./pages/Maintenance/MaintenanceReport";
import MaintenanceAndRepairs from "./pages/Maintenance/MaintenanceAndRepairs";
import Asset from "./pages/HR/Admin/Asset.Admin";
import PurchaseOrder from "./pages/HR/Admin/PurchaseOrder.Admin";
import { AccountingDashboard } from "./pages/Accounting/AccountingDashboard";
import Clients from "./pages/Clients/Client";
import Vendors from "./pages/Vendors/Vendors";
import Invoices from "./pages/Accounting/Invoices";
import VendorBills from "./pages/Vendors/VendorBills";
import VendorPayments from "./pages/Vendors/VendorPayment";
import ClientPayments from "./pages/Clients/ClientPayment";
import ChartOfAccounts from "./pages/Accounting/chartOfAccounts";
import GeneralLedger from "./pages/Accounting/GeneralLedger";
import Budget from "./pages/Accounting/Budget";
import Journals from "./pages/Accounting/Journal";
import InvoiceTemplate from "./pages/Accounting/InvoiceTemplate";
import ProductItems from "./pages/ProductItems/ProductItems";
import Bill from "./pages/Vendors/bill";
import PayrollReports from "./pages/Accounting/Payroll-Reports";
import Notifications from "./pages/In-Apps/Notifications";
import ExpenseHeads from "./pages/ExpenseHeads/ExpenseHeads";
import ViewEmail from "./pages/In-Apps/ViewEmail";
import BalanceSheet from "./pages/Reports/BalanceSheet";
import SingleEmail from "./pages/In-Apps/SingleEmail";
import FileManager from "./pages/In-Apps/FileManager";
import Branch from "./pages/HR/Admin/Branch";
import HRDashboard from "./pages/Dashboard/HRDashboard";
import SignatureGenerator from "./pages/In-Apps/signature-generator";

// const routes = [{
//   title: 'Main',
//   children:[{
//     title: 'DashBoard',
//     icon: "la la-dashboard",
//     children:[
//         {
//           title: "Admin Dashboard",
//           path: "/admin-dashboard",
//           name: "Dashboard",
//           component: AdminDashboard,
//           layout: "/admin",
//         },
//         {
//           title: "Employee Dashboard",
//           path: "/admin-dashboard",
//           name: "Dashboard",
//           component: AdminDashboard,
//           layout: "/admin",
//         }
//     ]
//   }],
//   title: 'Employees',
//   children: [
//     {
//       title: 'Employee',
//       icon: "la la-user",
//       children:[
//           {
//             title: "All Employee",
//             path: "/all-employees",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Leaves Admin",
//             path: "/leaves-admin",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Leaves Employee",
//             path: "/leaves-employee",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Leaves Setting",
//             path: "/leave-setting",
//             name: "Dashboard",
//             layout: "/admin",
//           },
//           {
//             title: "Attendance Admin",
//             path: "/attendance-admin",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Attendance Admin",
//             path: "/attendance-employee",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Department",
//             path: "/departments",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Designations",
//             path: "/designations",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Shifts",
//             path: "/departments",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Shifts",
//             children: {
//       title: 'Campaign',
//       icon: "la la-dashboard",
//       children:[
//           {
//             title: "Campaigns",
//             path: "/campaigns",
//             name: "Dashboard",
//             component: AdminDashboard,
//             layout: "/admin",
//           },
//           {
//             title: "Task",
//             path: "/campaign-task",
//             name: "Dashboard",
//             component: AdminDashboard,
//             layout: "/admin",
//           }
//       ]
//     },
//           },
//       ]
//     },
//   ],

// }]
const routes = [
  {
    title: "Admin Dashboard",
    path: "/index",
    name: "Dashboard",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    title: "HR Dashboard",
    path: "/hr-dashboard",
    name: "Dashboard",
    component: HRDashboard,
    layout: "/admin",
  },
  {
    title: "Accounting Dashboard",
    path: "/accounting-dashboard",
    name: "Accounting Dashboard",
    component: AccountingDashboard,
    layout: "/admin",
  },
  {
    title: "Clients",
    path: "/clients",
    name: "Clients",
    component: Clients,
    layout: "/admin",
  },
  {
    title: "Vendors",
    path: "/vendors",
    name: "Vendors",
    component: Vendors,
    layout: "/admin",
  },
  {
    title: "Vendors Bills",
    path: "/vendor-bills",
    name: "Vendors",
    component: VendorBills,
    layout: "/admin",
  },
  {
    title: "Bill",
    path: "/bills/:id",
    name: "Vendors",
    component: Bill,
    layout: "/admin",
  },
  {
    title: "Vendors Payments",
    path: "/vendor-payments",
    name: "Vendors",
    component: VendorPayments,
    layout: "/admin",
  },
  {
    title: "Client Payments",
    path: "/client-payments",
    name: "Clients",
    component: ClientPayments,
    layout: "/admin",
  },
  {
    title: "Invoices",
    path: "/client-invoice",
    name: "Invoices",
    component: Invoices,
    layout: "/admin",
  },
  {
    title: "Client Payments",
    path: "/client-payments",
    name: "Client",
    component: ClientPayments,
  },
  {
    title: "Invoice",
    path: "/invoice/:id",
    name: "Invoice",
    component: InvoiceTemplate,
    layout: "/admin",
  },
  {
    title: "Expense Heads",
    path: "/expense-heads",
    name: "Expense Heads",
    component: ExpenseHeads,
    layout: "/admin",
  },
  {
    title: "Account List",
    path: "/chart-of-account",
    name: "Account list",
    component: ChartOfAccounts,
    layout: "/admin",
  },
  {
    title: "Payroll Reports",
    path: "/payroll-reports",
    name: "Payroll Reports",
    component: PayrollReports,
    layout: "/admin",
  },
  {
    title: "Balance Sheet Reports",
    path: "/balance-sheet",
    name: "Balance Sheet Reports",
    component: BalanceSheet,
    layout: "/admin",
  },
  {
    title: "General Ledger",
    path: "/ledger",
    name: "General Ledger",
    component: GeneralLedger,
    layout: "/admin",
  },
  {
    title: "Product Items",
    path: "/product-items",
    name: "Product Items",
    component: ProductItems,
    layout: "/admin",
  },
  {
    title: "Budget",
    path: "/budgets",
    name: "Budget",
    component: Budget,
    layout: "/admin",
  },
  {
    title: "Journals",
    path: "/journals",
    name: "Journals",
    component: Journals,
    layout: "/admin",
  },
  {
    title: "Employee Dashboard",
    path: "/employee-dashboard",
    name: "Dashboard",
    component: EmployeeUser,
    layout: "/admin",
  },
  {
    title: "Profile Dashboard",
    path: "/profile-dashboard/:id",
    name: "Dashboard",
    component: Profile,
    layout: "/admin",
  },
  {
    title: "All Employee",
    path: "/all-employees",
    component: AllEmployeesAdmin,
    layout: "/admin",
  },
  {
    title: "Leaves Admin",
    path: "/leaves-admin",
    component: LeavesAdmin,
    layout: "/admin",
  },
  {
    title: "Coaching Admin",
    path: "/coaching",
    component: CoachingAdmin,
    layout: "/admin",
  },
  {
    title: "Coaching Employee",
    path: "/employee-coaching",
    component: CoachingEmployee,
    layout: "/admin",
  },
  {
    title: "Campaign ",
    path: "/campaign-info/:id",
    component: CampaignInfo,
    layout: "/admin",
  },
  {
    title: "Branch ",
    path: "/branch",
    component: Branch,
    layout: "/admin",
  },
  {
    title: "Email",
    path: "/email",
    component: Email,
    layout: "/admin",
  },
  {
    title: "Email",
    path: "/email-signature",
    component: SignatureGenerator,
    layout: "/admin",
  },
  {
    title: "File Manager",
    path: "/file-manager",
    component: FileManager,
    layout: "/admin",
  },
  {
    title: "View Email",
    path: "/mail/:id",
    component: SingleEmail,
    layout: "/admin",
  },
  {
    title: "Notifications",
    path: "/notifications",
    component: Notifications,

    layout: "/admin",
  },
  {
    title: "Score Cards",
    path: "/score-cards",
    component: ScoreCards,
    layout: "/admin",
  },
  {
    title: "Asset Assignment",
    path: "/asset-assignment",
    component: AssetAssignmentForm,
    layout: "/admin",
  },
  {
    title: "Purchase Order",
    path: "/purchase-order",
    component: PurchaseOrder,
    layout: "/admin",
  },
  {
    title: "Asset",
    path: "/assets",
    component: Asset,
    layout: "/admin",
  },
  {
    title: "Leaves Employee",
    path: "/leaves-employee",
    component: LeavesUser,
    layout: "/admin",
  },
  {
    title: "Leaves Setting",
    path: "/leave-setting",
    name: "Dashboard",
    layout: "/admin",
  },
  {
    title: "Attendance Admin",
    path: "/attendance-admin",
    component: AttendanceAdmin,
    layout: "/admin",
  },
  {
    title: "Attendance Admin",
    path: "/attendance-employee",
    component: EmployeeAttendance,
    layout: "/admin",
  },
  {
    title: "Department",
    path: "/departments",
    component: Departments,
    layout: "/admin",
  },
  {
    title: "Designations",
    path: "/designations",
    component: Designations,
    layout: "/admin",
  },
  {
    title: "Shifts",
    path: "/shifts",
    component: ShiftAdmin,
    layout: "/admin",
  },
  {
    title: "Shift Assignment",
    path: "/shift-assignment",
    component: ShiftAssignment,
    layout: "/admin",
  },
  {
    title: "Shift Requests",
    path: "/shift-request",
    component: ShiftRequest,
    layout: "/admin",
  },
  {
    title: "Job Opening",
    path: "/job-opening",
    component: JobOpening,
    layout: "/admin",
  },
  {
    title: "Job Offer",
    path: "/job-offer",
    component: JobOffer,
    layout: "/admin",
  },
  {
    title: "Job Applicants",
    path: "/job-applicants",
    component: JobApplicants,
    layout: "/admin",
  },
  {
    title: "Job Dashboard",
    path: "/jobs-dashboard",
    component: JobsDashboard,
    layout: "/admin",
  },
  {
    title: "Aptitude Test",
    path: "/aptitude-test",
    component: AptitudeTest,
    layout: "/admin",
  },
  {
    title: "Warning Letter",
    path: "/warning-letter",
    component: WarningLetter,
    layout: "/admin",
  },
  {
    title: "Campaigns",
    path: "/campaigns",
    name: "Dashboard",
    component: AllCampaigns,
    layout: "/admin",
  },
  {
    title: "Leads",
    path: "/leads",
    name: "Dashboard",
    component: Leads,
    layout: "/admin",
  },
  {
    title: "Promotion",
    path: "/promotion",
    name: "Dashboard",
    component: Promotion,
    layout: "/admin",
  },
  {
    title: "Termination",
    path: "/termination",
    name: "Dashboard",
    component: Termination,
    layout: "/admin",
  },
  {
    title: "Resignation",
    path: "/resignation",
    name: "Dashboard",
    component: Resignation,
    layout: "/admin",
  },
  {
    title: "Task",
    path: "/employee-reports",
    name: "Dashboard",
    component: EmployeeReport,
    layout: "/admin",
  },
  {
    title: "Payslip Reports",
    path: "/payslip-reports",
    name: "Dashboard",
    component: PayslipReport,
    layout: "/admin",
  },
  {
    title: "Employee Salary",
    path: "/salary",
    name: "Dashboard",
    component: EmployeeSalary,
    layout: "/admin",
  },
  {
    title: "Payslip",
    path: "/payslip/:id",
    name: "Dashboard",
    component: PaySlip,
    layout: "/admin",
  },
  {
    title: "Payroll",
    path: "/payroll-items",
    name: "Dashboard",
    component: PayrollItems,
    layout: "/admin",
  },
  {
    title: "Attendance Reports",
    path: "/attendance-reports",
    name: "Dashboard",
    component: AttendanceReport,
    layout: "/admin",
  },
  {
    title: "Maintenance Reports",
    path: "/maintenance-report",
    component: MaintenanceReport,
    layout: "/admin",
  },
  {
    title: "Maintenance And Repairs",
    path: "/maintenance-repairs",
    component: MaintenanceAndRepairs,
    layout: "/admin",
  },
];

export default routes;
