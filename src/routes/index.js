/** @format */

import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { AppProvider } from '../Context/AppContext';
import { NoAuthContextProvider } from '../Context/NoAuthContext';
import AuthGuard from '../guards/AuthGuard';
import GuardedRoute from '../guards/GuardedRoute';
import GuestGuard from '../guards/GuestGuard';
import AdminLayout from '../layouts/Admin';
import RecruitmentLayout from '../layouts/RecruitmentLayout';
import Login from '../pages/Auth/Login';
import ClientLogin from '../pages/Auth/ClientLogin';
import ActivateClient from '../pages/Auth/ActivateClient';
import NotFound from '../pages/Error/NotFound';
import Unauthorized from '../pages/Error/unauthorized';
import PayrollNotes from '../pages/Payroll/PayrollNotes';
const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: 'auth',
      children: [
        { path: '', element: <Navigate to="/auth/login" replace /> },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: 'auth',
      children: [
        { path: '', element: <Navigate to="/auth/client-login" replace /> },
        {
          path: 'client-login',
          element: (
            <GuestGuard>
              <ClientLogin />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: 'auth',
      children: [
        { path: '', element: <Navigate to="/auth/activate" replace /> },
        {
          path: 'activate',
          element: (
            <GuestGuard>
              <ActivateClient />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: 'recruitment',
      element: (
        <NoAuthContextProvider>
          <RecruitmentLayout />
        </NoAuthContextProvider>
      ),
      children: [
        { path: '', element: <Navigate to="/recruitment/joblist" replace /> },
        {
          path: 'joblist',
          element: <JobOpenings />,
        },
        {
          path: 'apply/:id',
          element: <ConsentPage />,
        },
        {
          path: 'joblist/:id',
          element: <JobView />,
        },
      ],
    },
    {
      path: 'recruitment/accept-joboffer/:id',
      element: <AcceptJoboffer />,
    },
    {
      path: 'dashboard',
      element: (
        <AppProvider>
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        </AppProvider>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/main" replace /> },
        {
          children: [
            { path: '', element: <Navigate to="/dashboard/main" replace /> },
            {
              path: 'main',
              element: (
                <GuardedRoute title="" dept="Super">
                  <AdminDashboard />{' '}
                </GuardedRoute>
              ),
            },
            {
              path: 'client-dashboard',
              // element: (
              //   <GuardedRoute title="" dept="Super">
              //     <ClientUser />{' '}
              //   </GuardedRoute>
              // ),
              element: <ClientUser />,
            },
            {
              path: 'hr-dashboard',
              element: (
                <GuardedRoute title="" dept="Super">
                  <HRDashboard />{' '}
                </GuardedRoute>
              ),
            },
            {
              path: 'account-dashboard',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <AccountingDashboard />{' '}
                </GuardedRoute>
              ),
            },
            { path: 'employee-dashboard', element: <EmployeeUser /> },
            {
              path: 'job-dashboard',
              element: (
                <GuardedRoute title="" dept="HR">
                  <JobDashboard />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'apps',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/apps/email" replace />,
            },
            { path: 'email', element: <Email /> },
            { path: 'email/:id', element: <ViewEmail /> },
            { path: 'email-signature', element: <SignatureGenerator /> },
            { path: 'file-manager', element: <FileManager /> },
            {
              path: 'notifications',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Notifications />
                </GuardedRoute>
              ),
            },
            { path: 'tickets', element: <Tickets /> },
            {
              path: 'ticket-manager',
              element: (
                <GuardedRoute title="" dept="HR">
                  <TicketManager />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'operations',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/operations/campaigns" replace />
              ),
            },
            {
              path: 'campaigns',
              element: (
                <GuardedRoute title="" dept="Super">
                  <AllCampaigns />
                </GuardedRoute>
              ),
            },
            {
              path: 'campaign-info/:id',
              element: (
                <GuardedRoute title="" dept="Super">
                  <CampaignInfo />
                </GuardedRoute>
              ),
            },
            { path: 'leads', element: <Leads /> },
            {
              path: 'branch',
              element: (
                <GuardedRoute title="" dept="Super">
                  <Branch />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'hr',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/hr/all-employees" replace />,
            },
            {
              path: 'all-employees',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AllEmployeesAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: 'all-employees/:id',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AllEmployeesDepartmentAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: 'leaves-admin',
              element: (
                <GuardedRoute title="" dept="HR">
                  <LeavesAdmin />
                </GuardedRoute>
              ),
            },
            { path: 'leaves', element: <LeavesUser /> },
            {
              path: 'attendance-admin',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AttendanceAdmin />
                </GuardedRoute>
              ),
            },
            { path: 'attendance', element: <EmployeeAttendance /> },
            {
              path: 'departments',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Departments />
                </GuardedRoute>
              ),
            },
            {
              path: 'designations',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Designations />
                </GuardedRoute>
              ),
            },
            {
              path: 'shifts',
              element: (
                <GuardedRoute title="" dept="HR">
                  <ShiftAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: 'shift-assignment',
              element: (
                <GuardedRoute title="" dept="HR">
                  <ShiftAssignment />
                </GuardedRoute>
              ),
            },
            { path: 'shift-request', element: <ShiftRequest /> },
          ],
        },
        {
          path: 'payroll',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/payroll/salaries" replace />,
            },
            {
              path: 'public-holiday',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PublicHoliday />
                </GuardedRoute>
              ),
            },
            {
              path: 'salaries',
              element: (
                <GuardedRoute title="" dept="HR">
                  <EmployeeSalary />
                </GuardedRoute>
              ),
            },
            {
              path: 'payroll-batches',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PayrollBatches />
                </GuardedRoute>
              ),
            },
            {
              path: 'deductions',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PayrollDeductions />
                </GuardedRoute>
              ),
            },
            {
              path: 'archive',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Archive />
                </GuardedRoute>
              ),
            },
            {
              path: 'payroll-notes',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PayrollNotes />
                </GuardedRoute>
              ),
            },
            {
              path: 'payslip/:id',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PaySlip />
                </GuardedRoute>
              ),
            },
            {
              path: 'salary-breakdown/:id',
              element: (
                <GuardedRoute title="" dept="HR">
                  <SalaryBreakdown />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'reports',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/reports/employee-reports" replace />
              ),
            },
            {
              path: 'employee-reports',
              element: (
                <GuardedRoute title="" dept="HR">
                  <EmployeeReport />
                </GuardedRoute>
              ),
            },
            {
              path: 'attendance-reports',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AttendanceReport />
                </GuardedRoute>
              ),
            },
            {
              path: 'academy-reports',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AcademyReport />
                </GuardedRoute>
              ),
            },
            {
              path: 'payslip-reports',
              element: (
                <GuardedRoute title="" dept="HR">
                  <PayrollReports />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'recruitment',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/recruitment/job-opening" replace />
              ),
            },
            {
              path: 'job-opening',
              element: (
                <GuardedRoute title="" dept="HR">
                  <JobOpening />
                </GuardedRoute>
              ),
            },
            {
              path: 'job-applicants',
              element: (
                <GuardedRoute title="" dept="HR">
                  <JobApplicants />
                </GuardedRoute>
              ),
            },
            {
              path: 'academy-applicants',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AcademyApplicants />
                </GuardedRoute>
              ),
            },
            {
              path: 'interviewees',
              element: (
                <GuardedRoute title="" dept="Facility">
                  <Interviewees />
                </GuardedRoute>
              ),
            },
            {
              path: 'aptitude-test',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AptitudeTest />
                </GuardedRoute>
              ),
            },
            {
              path: 'job-offer',
              element: (
                <GuardedRoute title="" dept="HR">
                  <JobOffer />
                </GuardedRoute>
              ),
            },
            {
              path: 'shadowing',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Shadowing />
                </GuardedRoute>
              ),
            },
            {
              path: 'orientation-and-training',
              element: (
                <GuardedRoute title="" dept="HR">
                  <OrientationAndTraining />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'performance',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/performance/warning-letter" replace />
              ),
            },
            {
              path: 'warning-letter',
              element: (
                <GuardedRoute title="" dept="HR">
                  <WarningLetter />
                </GuardedRoute>
              ),
            },
            {
              path: 'score-cards',
              element: (
                <GuardedRoute title="" dept="HR">
                  <ScoreCards />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'accounts',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/accounts/chart-of-account" replace />
              ),
            },
            {
              path: 'chart-of-account',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <ChartOfAccounts />
                </GuardedRoute>
              ),
            },
            {
              path: 'budgets',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <Budget />
                </GuardedRoute>
              ),
            },
            {
              path: 'journals',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <Journals />
                </GuardedRoute>
              ),
            },
            {
              path: 'expense-heads',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <ExpenseHeads />
                </GuardedRoute>
              ),
            },
            {
              path: 'ledger',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <GeneralLedger />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'accounting-reports',
          children: [
            {
              path: '',
              element: (
                <Navigate
                  to="/dashboard/accounting-reports/payroll-reports"
                  replace
                />
              ),
            },
            {
              path: 'payroll-reports',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <PayrollReports />
                </GuardedRoute>
              ),
            },
            {
              path: 'balance-sheet',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <BalanceSheet />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'clients',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/clients/all" replace />,
            },
            {
              path: 'all',
              element: (
                <GuardedRoute title="" dept="Super">
                  <Clients />
                </GuardedRoute>
              ),
            },
            {
              path: 'invoices',
              element: (
                <GuardedRoute title="" dept="Super">
                  <Invoices />
                </GuardedRoute>
              ),
            },
            {
              path: 'payments',
              element: (
                <GuardedRoute title="" dept="Super">
                  <ClientPayments />
                </GuardedRoute>
              ),
            },
            {
              path: 'leave-approval',
              element: (
                <GuardedRoute title="" dept="Super">
                  <ClientApprovals />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'vendors',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/vendors/all" replace />,
            },
            {
              path: 'all',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <Vendors />
                </GuardedRoute>
              ),
            },
            {
              path: 'bills',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <VendorBills />
                </GuardedRoute>
              ),
            },
            {
              path: 'payments',
              element: (
                <GuardedRoute title="" dept="Accounting">
                  <VendorPayments />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'assets',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/assets/all" replace />,
            },
            {
              path: 'all',
              element: (
                <GuardedRoute title="" dept="HR">
                  <Asset />
                </GuardedRoute>
              ),
            },
            {
              path: 'assignment',
              element: (
                <GuardedRoute title="" dept="HR">
                  <AssetAssignmentForm />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/user/profile/:id" replace />,
            },
            { path: 'profile/:id', element: <Profile /> },
          ],
        },
        {
          path: 'maintenance',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/maintenance/reports" replace />,
            },
            {
              path: 'reports',
              element: (
                <GuardedRoute title="" dept="FACILITY">
                  <MaintenanceReport />
                </GuardedRoute>
              ),
            },
            {
              path: 'maintenance-and-repair',
              element: (
                <GuardedRoute title="" dept="FACILITY">
                  <MaintenanceAndRepairs />
                </GuardedRoute>
              ),
            },
            {
              path: 'shadowing',
              element: (
                <GuardedRoute title="" dept="FACILITY">
                  <Shadowing />
                </GuardedRoute>
              ),
            },
            {
              path: 'interviewees',
              element: (
                <GuardedRoute title="Interview Schedule List" dept="Facility">
                  <Interviewees />
                </GuardedRoute>
              ),
            },
          ],
        },
        {
          path: 'settings',
          children: [
            {
              path: '',
              element: (
                <Navigate to="/dashboard/settings/roles-permissionss" replace />
              ),
            },
            {
              path: 'roles-permissions',
              element: (
                <GuardedRoute title="" dept="Super">
                  <RolePermission />
                </GuardedRoute>
              ),
            },
            {
              path: 'roles-assignment',
              element: (
                <GuardedRoute title="" dept="Super">
                  <RoleAssignment />
                </GuardedRoute>
              ),
            },
          ],
        },
        { path: 'employee-coaching', element: <CoachingEmployee /> },
        {
          path: 'product-items',
          element: (
            <GuardedRoute title="" dept="Procurements">
              <ProductItems />
            </GuardedRoute>
          ),
        },
        {
          path: 'hr-clients',
          element: (
            <GuardedRoute title="" dept="HR">
              <HrClients />
            </GuardedRoute>
          ),
        },
        {
          path: 'hr-client/:id',
          element: (
            <GuardedRoute title="" dept="HR">
              <HrClientView />
            </GuardedRoute>
          ),
        },
        {
          path: 'coaching',
          element: (
            <GuardedRoute title="" dept="HR">
              <CoachingAdmin />
            </GuardedRoute>
          ),
        },
        {
          path: 'purchase-order',
          element: (
            <GuardedRoute title="" dept="Procurements">
              <PurchaseOrder />
            </GuardedRoute>
          ),
        },
        {
          path: 'id-request',
          element: (
            <GuardedRoute title="" dept="Procurements">
              <IdRequest />
            </GuardedRoute>
          ),
        },
        {
          path: 'promotion',
          element: (
            <GuardedRoute title="" dept="HR">
              <Promotion />
            </GuardedRoute>
          ),
        },
        {
          path: 'resignation',
          element: (
            <GuardedRoute title="" dept="HR">
              <Resignation />
            </GuardedRoute>
          ),
        },
        {
          path: 'termination',
          element: (
            <GuardedRoute title="" dept="HR">
              <Termination />
            </GuardedRoute>
          ),
        },
        //   { path: 'finance', element: <Finance /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/404', element: <NotFound /> },
    { path: '/403', element: <Unauthorized /> },
  ]);
}
const AllCampaigns = Loadable(
  lazy(() => import('../pages/Campaigns/AllCampaigns'))
);
const JobOpenings = Loadable(
  lazy(() => import('../pages/recruitments/joblist'))
);
const ConsentPage = Loadable(
  lazy(() => import('../pages/recruitments/Consent'))
);
const JobView = Loadable(lazy(() => import('../pages/recruitments/jobview')));
const AcceptJoboffer = Loadable(
  lazy(() => import('../pages/recruitments/acceptJoboffer'))
);
const Leads = Loadable(lazy(() => import('../pages/Campaigns/Leads')));
const AdminDashboard = Loadable(
  lazy(() => import('../pages/Dashboard/AdminDashboard'))
);
const AttendanceAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/Attendance.Admin'))
);
const Departments = Loadable(
  lazy(() => import('../pages/HR/Admin/Department.Admin'))
);
const Designations = Loadable(
  lazy(() => import('../pages/HR/Admin/Designation.Admin'))
);
const AllEmployeesAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/Employees.Admin'))
);
const AllEmployeesDepartmentAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/EmployeesDepartment.Admin'))
);
const LeavesAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/Leaves.Admin'))
);
const HrClients = Loadable(lazy(() => import('../pages/HR/Admin/HrClients')));
const HrClientView = Loadable(
  lazy(() => import('../pages/HR/Admin/HrClientView'))
);
const Promotion = Loadable(lazy(() => import('../pages/HR/Admin/Promotion')));
const ShiftAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/Shift.Admin'))
);
const Profile = Loadable(lazy(() => import('../pages/HR/Profile')));
const EmployeeAttendance = Loadable(
  lazy(() => import('../pages/HR/Users/Attendance.Users'))
);
const ClientUser = Loadable(
  lazy(() => import('../pages/HR/Users/Client.User'))
);
const EmployeeUser = Loadable(
  lazy(() => import('../pages/HR/Users/Employee.User'))
);
const LeavesUser = Loadable(
  lazy(() => import('../pages/HR/Users/Leaves.User'))
);
const EmployeeSalary = Loadable(
  lazy(() => import('../pages/Payroll/EmployeeSalary'))
);
const PaySlip = Loadable(lazy(() => import('../pages/Payroll/PaySlip')));
const SalaryBreakdown = Loadable(
  lazy(() => import('../pages/Payroll/SalaryBreakdown'))
);
const AttendanceReport = Loadable(
  lazy(() => import('../pages/Reports/AttendanceReport'))
);
const AcademyReport = Loadable(
  lazy(() => import('../pages/Reports/AcademyReport'))
);
const EmployeeReport = Loadable(
  lazy(() => import('../pages/Reports/EmployeeReport'))
);
const PayslipReport = Loadable(
  lazy(() => import('../pages/Reports/PayslipReport'))
);
const JobOpening = Loadable(
  lazy(() => import('../pages/HR/Admin/JobOpeningContainer'))
);
const JobOffer = Loadable(
  lazy(() => import('../pages/HR/Admin/JobOffer.Admin'))
);
const JobApplicants = Loadable(
  lazy(() => import('../pages/HR/Admin/JobApplicants.Admin'))
);
const AcademyApplicants = Loadable(
  lazy(() => import('../pages/HR/Admin/AcademyApplicants.Admin'))
);
const Interviewees = Loadable(
  lazy(() => import('../pages/HR/Admin/Interviewees'))
);
const AptitudeTest = Loadable(
  lazy(() => import('../pages/HR/Admin/AptitudeTest.Admin'))
);

const CoachingAdmin = Loadable(
  lazy(() => import('../pages/HR/Admin/CoachingAdmin'))
);
const AssetAssignmentForm = Loadable(
  lazy(() => import('../pages/HR/Admin/AssetAssignment.Admin'))
);
const ShiftAssignment = Loadable(
  lazy(() => import('../pages/HR/Admin/ShiftAssignment.Admin'))
);
const ShiftRequest = Loadable(
  lazy(() => import('../pages/HR/Admin/ShiftRequest.Admin'))
);
const WarningLetter = Loadable(
  lazy(() => import('../pages/HR/Admin/WarningLetter.Admin'))
);
const JobsDashboard = Loadable(
  lazy(() => import('../pages/Dashboard/JobsDashboard'))
);
const PublicHoliday = Loadable(
  lazy(() => import('../pages/Payroll/PublicHoliday'))
);
const PayrollBatches = Loadable(
  lazy(() => import('../pages/Payroll/PayrollBatches'))
);
const PayrollDeductions = Loadable(
  lazy(() => import('../pages/Payroll/Deductions'))
);
const Archive = Loadable(lazy(() => import('../pages/Payroll/Archive')));
const ScoreCards = Loadable(
  lazy(() => import('../pages/HR/Admin/score-cards'))
);
const Termination = Loadable(
  lazy(() => import('../pages/HR/Admin/Termination'))
);
const Resignation = Loadable(
  lazy(() => import('../pages/HR/Admin/Resignation'))
);
const CoachingEmployee = Loadable(
  lazy(() => import('../pages/HR/Users/CoachingEmployee'))
);
const Email = Loadable(lazy(() => import('../pages/In-Apps/Email')));

const CampaignInfo = Loadable(
  lazy(() => import('../pages/Campaigns/CampaignInfo'))
);
const MaintenanceReport = Loadable(
  lazy(() => import('../pages/Maintenance/MaintenanceReport'))
);
const MaintenanceAndRepairs = Loadable(
  lazy(() => import('../pages/Maintenance/MaintenanceAndRepairs'))
);
const Asset = Loadable(lazy(() => import('../pages/HR/Admin/Asset.Admin')));
const PurchaseOrder = Loadable(
  lazy(() => import('../pages/HR/Admin/PurchaseOrder.Admin'))
);
// const AccountingDashboard = Loadable(
//   lazy(() => import("../pages/Accounting/AccountingDashboard"))
// );
const AccountingDashboard = Loadable(
  lazy(() => import('../pages/Accounting/AccountingDashboard.js'))
);
const JobDashboard = Loadable(
  lazy(() => import('../pages/Dashboard/JobsDashboard'))
);
const Clients = Loadable(lazy(() => import('../pages/Clients/Client')));
const Vendors = Loadable(lazy(() => import('../pages/Vendors/Vendors')));
const Invoices = Loadable(lazy(() => import('../pages/Accounting/Invoices')));
const VendorBills = Loadable(
  lazy(() => import('../pages/Vendors/VendorBills'))
);
const VendorPayments = Loadable(
  lazy(() => import('../pages/Vendors/VendorPayment'))
);
const ClientPayments = Loadable(
  lazy(() => import('../pages/Clients/ClientPayment'))
);
const ClientApprovals = Loadable(
  lazy(() => import('../pages/Clients/ClientApproval'))
);
const ChartOfAccounts = Loadable(
  lazy(() => import('../pages/Accounting/chartOfAccounts'))
);
const GeneralLedger = Loadable(
  lazy(() => import('../pages/Accounting/GeneralLedger'))
);
const Budget = Loadable(lazy(() => import('../pages/Accounting/Budget')));
const Journals = Loadable(lazy(() => import('../pages/Accounting/Journal')));
const InvoiceTemplate = Loadable(
  lazy(() => import('../pages/Accounting/InvoiceTemplate'))
);
const ProductItems = Loadable(
  lazy(() => import('../pages/ProductItems/ProductItems'))
);
const Bill = Loadable(lazy(() => import('../pages/Vendors/bill')));
const PayrollReports = Loadable(
  lazy(() => import('../pages/Accounting/Payroll-Reports'))
);
const Notifications = Loadable(
  lazy(() => import('../pages/In-Apps/Notifications'))
);
const ExpenseHeads = Loadable(
  lazy(() => import('../pages/ExpenseHeads/ExpenseHeads'))
);
const ViewEmail = Loadable(lazy(() => import('../pages/In-Apps/SingleEmail')));
const BalanceSheet = Loadable(
  lazy(() => import('../pages/Reports/BalanceSheet'))
);
const SingleEmail = Loadable(
  lazy(() => import('../pages/In-Apps/SingleEmail'))
);
const FileManager = Loadable(
  lazy(() => import('../pages/In-Apps/FileManager'))
);
const Branch = Loadable(lazy(() => import('../pages/HR/Admin/Branch')));
const HRDashboard = Loadable(
  lazy(() => import('../pages/Dashboard/HRDashboard'))
);
const SignatureGenerator = Loadable(
  lazy(() => import('../pages/In-Apps/signature-generator'))
);
const RolePermission = Loadable(
  lazy(() => import('../pages/settings/roles-permission'))
);

const RoleAssignment = Loadable(
  lazy(() => import('../pages/settings/rolesAssignment'))
);
const Shadowing = Loadable(
  lazy(() => import('../pages/HR/Admin/Shadowing.Admin'))
);

const IdRequest = Loadable(
  lazy(() => import('../pages/HR/Admin/IdRequest.Admin'))
);

const OrientationAndTraining = Loadable(
  lazy(() => import('../pages/HR/Admin/OrientationAndTraining.Admin'))
);

const Tickets = Loadable(lazy(() => import('../pages/In-Apps/tickets')));

const TicketManager = Loadable(
  lazy(() => import('../pages/In-Apps/TicketManager'))
);
