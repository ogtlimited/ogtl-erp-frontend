/* eslint-disable no-unused-vars */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { AppProvider } from "../Context/AppContext";
import { NoAuthContextProvider } from "../Context/NoAuthContext";
import AuthGuard from "../guards/AuthGuard";
import GuardedRoute from "../guards/GuardedRoute";
import GuestGuard from "../guards/GuestGuard";
import AdminLayout from "../layouts/Admin";
import RecruitmentLayout from "../layouts/RecruitmentLayout";
import Login from "../pages/Auth/Login";
import ClientLogin from "../pages/Auth/ClientLogin";
import ActivateClient from "../pages/Auth/ActivateClient";
import NotFound from "../pages/Error/NotFound";
import Unauthorized from "../pages/Error/unauthorized";
import BadGateway from "../pages/Error/BadGateway";
import InternalServerError from "../pages/Error/InternalServerError.js";
import PayrollNotes from "../pages/Payroll/PayrollNotes";
import tokenService from "../services/token.service.js";

const user = tokenService.getUser();
const CurrentUserIsCOO = user?.employee_info?.roles.includes("coo");

const Loadable = (Component) => (props) => {
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
      path: "auth",
      children: [
        { path: "", element: <Navigate to="/auth/client-login" replace /> },
        {
          path: "client-login",
          element: (
            <GuestGuard>
              <ClientLogin />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "auth",
      children: [
        { path: "", element: <Navigate to="/auth/activate" replace /> },
        {
          path: "activate",
          element: (
            <GuestGuard>
              <ActivateClient />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "recruitment",
      element: (
        <NoAuthContextProvider>
          <RecruitmentLayout />
        </NoAuthContextProvider>
      ),
      children: [
        { path: "", element: <Navigate to="/recruitment/joblist" replace /> },
        {
          path: "joblist",
          element: <JobOpenings />,
        },
        {
          path: "apply/:id",
          element: <ConsentPage />,
        },
        {
          path: "joblist/:id",
          element: <JobView />,
        },
      ],
    },

    {
      path: "recruitment/accept-joboffer/:id",
      element: <AcceptJoboffer />,
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
            {
              path: "main",
              element: <EmployeeUser />,
            },

            // USER:
            { path: "main/attendance", element: <EmployeeAttendance /> },
            {
              path: "main/manual-attendance",
              element: <SecurityManualAttendance />,
            },
            { path: "main/leave", element: <LeavesUser /> },
            { path: "main/resignation", element: <ResignationUser /> },
            { path: "main/ticket-management", element: <TicketManagement /> },
            {
              path: "main/employee-appreciation-eCertificate",
              element: <EmployeeAppreciation />,
            },
            { path: "main/international-women's-day", element: <IWDUser /> },
            // { path: "main/valentine", element: <ValentineUser /> },
            {
              path: "hr-dashboard",
              element: (
                <GuardedRoute title="" dept="hr">
                  <HRDashboard />{" "}
                </GuardedRoute>
              ),
            },
            {
              path: "operations-dashboard",
              element: (
                <GuardedRoute title="" dept="hr">
                  <OperationsDashboard />{" "}
                </GuardedRoute>
              ),
            },
            {
              path: "account-dashboard",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <AccountingDashboard />{" "}
                </GuardedRoute>
              ),
            },
            { path: "employee-dashboard", element: <EmployeeUser /> },
            {
              path: "job-dashboard",
              element: (
                <GuardedRoute title="" dept="hr">
                  <JobDashboard />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "apps",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/apps/email" replace />,
            },
            { path: "email", element: <Email /> },
            { path: "email/:id", element: <ViewEmail /> },
            { path: "email-signature", element: <SignatureGenerator /> },
            { path: "file-manager", element: <FileManager /> },
            {
              path: "notifications",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Notifications />
                </GuardedRoute>
              ),
            },
            { path: "tickets", element: <Tickets /> },
            {
              path: "ticket-manager",
              element: (
                <GuardedRoute title="" dept="hr">
                  <TicketManager />
                </GuardedRoute>
              ),
            },
          ],
        },

        // HR
        {
          path: "hr",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/hr/all-employees" replace />,
            },
            {
              path: "all-employees",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllEmployeesAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/employee/add",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AddEmployeesAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/employee/update/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <EditEmployeesAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/department/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllEmployeesDepartmentAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/gender/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllEmployeesGenderAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "leaves-admin",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeavesAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "leaves-admin/application/leave-status/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllLeaveStatusAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "leaves-admin/application/leave-type/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllLeaveTypeAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/employee/leader",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeadershipAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "all-employees/employee/leader/:employee/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeadershipSubordinateAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "captured-biometrics",
              element: (
                <GuardedRoute title="" dept="hr">
                  <CapturedBiometricsAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "attendance-record",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AttendanceRecord />
                </GuardedRoute>
              ),
            },
            {
              path: "remote-attendance",
              element: (
                <GuardedRoute title="" dept="hr">
                  <RemoteAttendanceAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: ":office_type/employees/:office/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <OfficeAttendanceAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "office/employee-attendance/:employee/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <EmployeeAttendanceRecordAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "survey",
              element: (
                <GuardedRoute title="" dept="hr">
                  <SurveyAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "survey/create",
              element: (
                <GuardedRoute title="" dept="hr">
                  <SurveyBuilder />
                </GuardedRoute>
              ),
            },
            {
              path: "all-survey",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AllSurveyAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "resignation",
              element: (
                <GuardedRoute title="" dept="hr">
                  <ResignationAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "resignation/application/resignation-status/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <ResignationStatusAnalytics />
                </GuardedRoute>
              ),
            },
            {
              path: "departments",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Departments />
                </GuardedRoute>
              ),
            },
            {
              path: "departments/:title/:id",
              element: (
                <GuardedRoute title="" dept="super">
                  <DepartmentUsers />
                </GuardedRoute>
              ),
            },
            {
              path: "campaigns",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Campaigns />
                </GuardedRoute>
              ),
            },
            {
              path: "campaigns/:title/:id",
              element: (
                <GuardedRoute title="" dept="super">
                  <CampaignUsers />
                </GuardedRoute>
              ),
            },
            {
              path: "teams",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Teams />
                </GuardedRoute>
              ),
            },
            {
              path: "teams/:title/:id",
              element: (
                <GuardedRoute title="" dept="super">
                  <TeamMembers />
                </GuardedRoute>
              ),
            },
            {
              path: "branch",
              element: (
                <GuardedRoute title="" dept="hr">
                  <BranchAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "departments/shifts/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <DepartmentShiftView />
                </GuardedRoute>
              ),
            },
            {
              path: "designations",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Designations />
                </GuardedRoute>
              ),
            },
            {
              path: "leave-approval",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeaveApproval />
                </GuardedRoute>
              ),
            },
            {
              path: "leave-approvals/department/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeaveApprovalView />
                </GuardedRoute>
              ),
            },
            {
              path: "leave-type",
              element: (
                <GuardedRoute title="" dept="hr">
                  <LeaveType />
                </GuardedRoute>
              ),
            },
            {
              path: "shifts",
              element: (
                <GuardedRoute title="" dept="hr">
                  <ShiftAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "shift-assignment",
              element: (
                <GuardedRoute title="" dept="hr">
                  <ShiftAssignment />
                </GuardedRoute>
              ),
            },
            { path: "shift-request", element: <ShiftRequest /> },
          ],
        },

        // DATA MANAGEMENT:
        {
          path: "data-management",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/data-management/workforce" replace />
              ),
            },
            {
              path: "workforce-leave-applications",
              element: (
                <GuardedRoute title="" dept="super">
                  <WorkforceLeaveApplications />
                </GuardedRoute>
              ),
            },
          ],
        },

        // OPERATIONS:
        {
          path: "operations",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/operations/operation-team" replace />
              ),
            },
            {
              path: "operation-team-leave-applications",
              element: (
                <GuardedRoute title="" dept="super">
                  <OperationsTeamLeaveApplications />
                </GuardedRoute>
              ),
            },
            {
              path: "resignation",
              element: (
                <GuardedRoute title="" dept="operations">
                  {CurrentUserIsCOO ? (
                    <OperationsCOOResignationAdmin />
                  ) : (
                    <OperationsResignationAdmin />
                  )}
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "payroll",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/payroll/salaries" replace />,
            },
            {
              path: "public-holiday",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PublicHoliday />
                </GuardedRoute>
              ),
            },
            {
              path: "salaries",
              element: (
                <GuardedRoute title="" dept="hr">
                  <EmployeeSalary />
                </GuardedRoute>
              ),
            },
            {
              path: "payroll-processing",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PayrollBatches />
                </GuardedRoute>
              ),
            },
            {
              path: "payroll-processing/batch-slips/:referenceId/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <EmployeePayroll />
                </GuardedRoute>
              ),
            },
            {
              path: "payday",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PayrollDates />
                </GuardedRoute>
              ),
            },
            {
              path: "deductions",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PayrollDeductions />
                </GuardedRoute>
              ),
            },
            {
              path: "staff-deductions/:id/:month/:year",
              element: (
                <GuardedRoute title="" dept="hr">
                  <DeductionSlip />
                </GuardedRoute>
              ),
            },
            {
              path: "archive",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Archive />
                </GuardedRoute>
              ),
            },
            {
              path: "payroll-notes",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PayrollNotes />
                </GuardedRoute>
              ),
            },
            {
              path: "payslip/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PaySlip />
                </GuardedRoute>
              ),
            },
            {
              path: "salary-breakdown/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <SalaryBreakdown />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "reports",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/reports/employee-reports" replace />
              ),
            },
            {
              path: "employee-reports",
              element: (
                <GuardedRoute title="" dept="hr">
                  <EmployeeReport />
                </GuardedRoute>
              ),
            },
            {
              path: "attendance-reports",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AttendanceReport />
                </GuardedRoute>
              ),
            },
            {
              path: "academy-reports",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AcademyReport />
                </GuardedRoute>
              ),
            },
            {
              path: "payslip-reports",
              element: (
                <GuardedRoute title="" dept="hr">
                  <PayslipReports />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "recruitment",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/recruitment/job-opening" replace />
              ),
            },
            {
              path: "job-opening",
              element: (
                <GuardedRoute title="" dept="hr">
                  <JobOpening />
                </GuardedRoute>
              ),
            },
            {
              path: "job-applications",
              element: (
                <GuardedRoute title="" dept="hr">
                  <JobApplicantsAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "rep-siever/job-applications",
              element: (
                <GuardedRoute title="" dept="hr">
                  <JobApplicants />
                </GuardedRoute>
              ),
            },
            {
              path: "rep-siever/:employee/:id",
              element: (
                <GuardedRoute title="" dept="hr">
                  <RepSieverAdmin />
                </GuardedRoute>
              ),
            },
            {
              path: "academy-applicants",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AcademyApplicants />
                </GuardedRoute>
              ),
            },
            {
              path: "interviewees",
              element: (
                <GuardedRoute title="" dept="facility">
                  <Interviewees />
                </GuardedRoute>
              ),
            },
            {
              path: "aptitude-test",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AptitudeTest />
                </GuardedRoute>
              ),
            },
            {
              path: "job-offer",
              element: (
                <GuardedRoute title="" dept="hr">
                  <JobOffer />
                </GuardedRoute>
              ),
            },
            {
              path: "shadowing",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Shadowing />
                </GuardedRoute>
              ),
            },
            {
              path: "orientation-and-training",
              element: (
                <GuardedRoute title="" dept="hr">
                  <OrientationAndTraining />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "performance",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/performance/warning-letter" replace />
              ),
            },
            {
              path: "warning-letter",
              element: (
                <GuardedRoute title="" dept="hr">
                  <WarningLetter />
                </GuardedRoute>
              ),
            },
            {
              path: "score-cards",
              element: (
                <GuardedRoute title="" dept="hr">
                  <ScoreCards />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "accounts",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/accounts/chart-of-account" replace />
              ),
            },
            {
              path: "chart-of-account",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <ChartOfAccounts />
                </GuardedRoute>
              ),
            },
            {
              path: "budgets",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <Budget />
                </GuardedRoute>
              ),
            },
            {
              path: "journals",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <Journals />
                </GuardedRoute>
              ),
            },
            {
              path: "expense-heads",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <ExpenseHeads />
                </GuardedRoute>
              ),
            },
            {
              path: "ledger",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <GeneralLedger />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "accounting-reports",
          children: [
            {
              path: "",
              element: (
                <Navigate
                  to="/dashboard/accounting-reports/payroll-reports"
                  replace
                />
              ),
            },
            {
              path: "payslip-reports",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <PayslipReports />
                </GuardedRoute>
              ),
            },
            {
              path: "balance-sheet",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <BalanceSheet />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "clients",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/clients/all" replace />,
            },
            {
              path: "all",
              element: (
                <GuardedRoute title="" dept="super">
                  <Clients />
                </GuardedRoute>
              ),
            },
            {
              path: "invoices",
              element: (
                <GuardedRoute title="" dept="super">
                  <Invoices />
                </GuardedRoute>
              ),
            },
            {
              path: "payments",
              element: (
                <GuardedRoute title="" dept="super">
                  <ClientPayments />
                </GuardedRoute>
              ),
            },
            {
              path: "leave-approval",
              element: (
                <GuardedRoute title="" dept="super">
                  <ClientApprovals />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "vendors",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/vendors/all" replace />,
            },
            {
              path: "all",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <Vendors />
                </GuardedRoute>
              ),
            },
            {
              path: "bills",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <VendorBills />
                </GuardedRoute>
              ),
            },
            {
              path: "payments",
              element: (
                <GuardedRoute title="" dept="accounting">
                  <VendorPayments />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "assets",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/assets/all" replace />,
            },
            {
              path: "all",
              element: (
                <GuardedRoute title="" dept="hr">
                  <Asset />
                </GuardedRoute>
              ),
            },
            {
              path: "assignment",
              element: (
                <GuardedRoute title="" dept="hr">
                  <AssetAssignmentForm />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "user",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/user/profile/:id" replace />,
            },
            { path: "profile/:id", element: <Profile /> },
          ],
        },

        {
          path: "maintenance",
          children: [
            {
              path: "",
              element: <Navigate to="/dashboard/maintenance/reports" replace />,
            },
            {
              path: "reports",
              element: (
                <GuardedRoute title="" dept="facility">
                  <MaintenanceReport />
                </GuardedRoute>
              ),
            },
            {
              path: "maintenance-and-repair",
              element: (
                <GuardedRoute title="" dept="facility">
                  <MaintenanceAndRepairs />
                </GuardedRoute>
              ),
            },
            {
              path: "shadowing",
              element: (
                <GuardedRoute title="" dept="facility">
                  <Shadowing />
                </GuardedRoute>
              ),
            },
            {
              path: "interviewees",
              element: (
                <GuardedRoute title="Interview Schedule List" dept="facility">
                  <Interviewees />
                </GuardedRoute>
              ),
            },
          ],
        },

        {
          path: "settings",
          children: [
            {
              path: "",
              element: (
                <Navigate to="/dashboard/settings/roles-permissions" replace />
              ),
            },
            {
              path: "roles-permissions",
              element: (
                <GuardedRoute title="" dept="super">
                  <RolePermission />
                </GuardedRoute>
              ),
            },
            {
              path: "roles-permissions/users/:title/:id",
              element: (
                <GuardedRoute title="" dept="super">
                  <EmployeeRoles />
                </GuardedRoute>
              ),
            },
            {
              path: "roles-assignment",
              element: (
                <GuardedRoute title="" dept="super">
                  <RoleAssignment />
                </GuardedRoute>
              ),
            },
          ],
        },

        { path: "employee-coaching", element: <CoachingEmployee /> },
        { path: "leadership/supervisor", element: <SupervisorAdmin /> },
        {
          path: "leadership/campaign-schedule",
          element: <ShiftScheduleList />,
        },
        {
          path: "leadership/team-attendance-record",
          element: (
            <GuardedRoute title="" dept="hr">
              <TeamAttendanceRecord />
            </GuardedRoute>
          ),
        },
        { path: "leadership/attendance-record", element: <RemoteAttendance /> },

        {
          path: "leadership/subordinate-attendance",
          element: <SupervisorAttendanceAdmin />,
        },

        {
          path: "product-items",
          element: (
            <GuardedRoute title="" dept="procurements">
              <ProductItems />
            </GuardedRoute>
          ),
        },

        {
          path: "hr-clients",
          element: (
            <GuardedRoute title="" dept="hr">
              <HrClients />
            </GuardedRoute>
          ),
        },

        {
          path: "hr-client/:id",
          element: (
            <GuardedRoute title="" dept="hr">
              <HrClientView />
            </GuardedRoute>
          ),
        },

        {
          path: "coaching",
          element: (
            <GuardedRoute title="" dept="hr">
              <CoachingAdmin />
            </GuardedRoute>
          ),
        },

        {
          path: "purchase-order",
          element: (
            <GuardedRoute title="" dept="procurements">
              <PurchaseOrder />
            </GuardedRoute>
          ),
        },

        {
          path: "id-request",
          element: (
            <GuardedRoute title="" dept="procurements">
              <IdRequest />
            </GuardedRoute>
          ),
        },

        {
          path: "promotion",
          element: (
            <GuardedRoute title="" dept="hr">
              <Promotion />
            </GuardedRoute>
          ),
        },

        {
          path: "resignation",
          element: (
            <GuardedRoute title="" dept="hr">
              <Resignation />
            </GuardedRoute>
          ),
        },

        {
          path: "termination",
          element: (
            <GuardedRoute title="" dept="hr">
              <Termination />
            </GuardedRoute>
          ),
        },
        //   { path: 'finance', element: <Finance /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/403", element: <Unauthorized /> },
    { path: "/404", element: <NotFound /> },
    { path: "/500", element: <InternalServerError /> },
    { path: "/502", element: <BadGateway /> },
  ]);
}
const AllCampaigns = Loadable(
  lazy(() => import("../pages/Campaigns/AllCampaigns"))
);
const JobOpenings = Loadable(
  lazy(() => import("../pages/recruitments/joblist"))
);
const ConsentPage = Loadable(
  lazy(() => import("../pages/recruitments/Consent"))
);
const JobView = Loadable(lazy(() => import("../pages/recruitments/jobview")));
const AcceptJoboffer = Loadable(
  lazy(() => import("../pages/recruitments/acceptJoboffer"))
);
const Leads = Loadable(lazy(() => import("../pages/Campaigns/Leads")));
const AttendanceRecord = Loadable(
  lazy(() => import("../pages/HR/Admin/AttendanceRecord.Admin"))
);
const RemoteAttendanceAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/RemoteAttendance.Admin"))
);
const Departments = Loadable(
  lazy(() => import("../pages/HR/Admin/Departments.Admin"))
);
const DepartmentUsers = Loadable(
  lazy(() => import("../pages/HR/Admin/DepartmentUsers"))
);
const Campaigns = Loadable(
  lazy(() => import("../pages/HR/Admin/Campaigns.Admin"))
);
const CampaignUsers = Loadable(
  lazy(() => import("../pages/HR/Admin/CampaignUsers"))
);
const Teams = Loadable(lazy(() => import("../pages/HR/Admin/Teams.Admin")));
const TeamMembers = Loadable(
  lazy(() => import("../pages/HR/Admin/TeamMembers"))
);
const BranchAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Branch.Admin"))
);
const Designations = Loadable(
  lazy(() => import("../pages/HR/Admin/Designation.Admin"))
);
const LeaveApproval = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveApproval.Admin"))
);
const LeaveApprovalView = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveApprovalView.Admin"))
);
const DepartmentShiftView = Loadable(
  lazy(() => import("../pages/HR/Admin/DepartmentShiftView.Admin"))
);
const CampaignShiftView = Loadable(
  lazy(() => import("../pages/Campaigns/CampaignShiftView"))
);
const LeaveType = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveType.Admin"))
);
const AllEmployeesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Employees.Admin"))
);
const CapturedBiometricsAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/CapturedBiometrics.Admin"))
);
const AddEmployeesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/AddEmployees.Admin"))
);
const EditEmployeesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/EditEmployees.Admin"))
);
const AllEmployeesDepartmentAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/EmployeesDepartment.Admin"))
);
const OfficeAttendanceAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/OfficeAttendance.Admin"))
);
const EmployeeAttendanceRecordAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/EmployeeAttendanceRecord.Admin"))
);
const AllEmployeesGenderAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/EmployeesGender.Admin"))
);
const LeavesAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Leaves.Admin"))
);
const WorkforceLeaveApplications = Loadable(
  lazy(() => import("../pages/HR/Admin/WorkforceLeaveApplications.js"))
);
const OperationsTeamLeaveApplications = Loadable(
  lazy(() => import("../pages/HR/Admin/OperationsTeamLeaveApplications.js"))
);
const ResignationStatusAnalytics = Loadable(
  lazy(() => import("../pages/HR/Admin/ResignationStatusAnalytics.Admin"))
);
const SurveyAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Survey.Admin"))
);
const AllSurveyAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/AllSurvey.Admin"))
);
const SurveyBuilder = Loadable(
  lazy(() => import("../pages/HR/Admin/SurveyBuilder.Admin"))
);
const ResignationAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Resignation.Admin"))
);
const OperationsResignationAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/OperationsResignation.Admin"))
);
const OperationsCOOResignationAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/OperationsCOOResignation.Admin"))
);
const AllLeaveStatusAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveStatusAnalytics.Admin"))
);
const AllLeaveTypeAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/LeaveTypeAnalytics.Admin"))
);
const LeadershipAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Leadership.Admin"))
);
const LeadershipSubordinateAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/LeadershipSubordinates.Admin"))
);
const RepSieverAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/RepSiever.Admin"))
);
const HrClients = Loadable(lazy(() => import("../pages/HR/Admin/HrClients")));
const HrClientView = Loadable(
  lazy(() => import("../pages/HR/Admin/HrClientView"))
);
const Promotion = Loadable(lazy(() => import("../pages/HR/Admin/Promotion")));
const ShiftAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Shift.Admin"))
);
const Profile = Loadable(lazy(() => import("../pages/HR/Profile")));
const EmployeeAttendance = Loadable(
  lazy(() => import("../pages/HR/Users/Attendance.Users"))
);
const SecurityManualAttendance = Loadable(
  lazy(() => import("../pages/HR/Users/SecurityManualAttendance.Users"))
);
const ClientUser = Loadable(
  lazy(() => import("../pages/HR/Users/Client.User"))
);
const EmployeeUser = Loadable(
  lazy(() => import("../pages/HR/Users/Employee.User"))
);
const LeavesUser = Loadable(
  lazy(() => import("../pages/HR/Users/Leaves.User"))
);
const ResignationUser = Loadable(
  lazy(() => import("../pages/HR/Users/Resignation.User"))
);
const TicketManagement = Loadable(
  lazy(() => import("../pages/HR/TicketManagement"))
);
const EmployeeAppreciation = Loadable(
  lazy(() => import("../pages/HR/Users/EmployeeAppreciation.User"))
);
const IWDUser = Loadable(lazy(() => import("../pages/HR/Users/IWD.User")));
const ValentineUser = Loadable(
  lazy(() => import("../pages/HR/Users/Valentine.User"))
);
const EmployeeSalary = Loadable(
  lazy(() => import("../pages/Payroll/EmployeeSalary"))
);
const EmployeePayroll = Loadable(
  lazy(() => import("../pages/Payroll/EmployeePayroll"))
);
const DeductionSlip = Loadable(
  lazy(() => import("../pages/Payroll/DeductionSlip.js"))
);
const PaySlip = Loadable(lazy(() => import("../pages/Payroll/PaySlip")));
const SalaryBreakdown = Loadable(
  lazy(() => import("../pages/Payroll/SalaryBreakdown"))
);
const AttendanceReport = Loadable(
  lazy(() => import("../pages/Reports/AttendanceReport"))
);
const AcademyReport = Loadable(
  lazy(() => import("../pages/Reports/AcademyReport"))
);
const EmployeeReport = Loadable(
  lazy(() => import("../pages/Reports/EmployeeReport"))
);
// const PayslipReport = Loadable(
//   lazy(() => import('../pages/Reports/PayslipReport'))
// );
const JobOpening = Loadable(
  lazy(() => import("../pages/HR/Admin/JobOpeningContainer"))
);
const JobOffer = Loadable(
  lazy(() => import("../pages/HR/Admin/JobOffer.Admin"))
);
const JobApplicantsAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/JobApplicants.Admin"))
);
const JobApplicants = Loadable(
  lazy(() => import("../pages/HR/Users/JobApplicants"))
);
const AcademyApplicants = Loadable(
  lazy(() => import("../pages/HR/Admin/AcademyApplicants.Admin"))
);
const Interviewees = Loadable(
  lazy(() => import("../pages/HR/Admin/Interviewees"))
);
const AptitudeTest = Loadable(
  lazy(() => import("../pages/HR/Admin/AptitudeTest.Admin"))
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
// const JobsDashboard = Loadable(
//   lazy(() => import('../pages/Dashboard/JobsDashboard'))
// );
const PublicHoliday = Loadable(
  lazy(() => import("../pages/Payroll/PublicHoliday"))
);
const PayrollBatches = Loadable(
  lazy(() => import("../pages/Payroll/PayrollBatches"))
);
const PayrollDates = Loadable(
  lazy(() => import("../pages/Payroll/PayrollDates.js"))
);
const PayrollDeductions = Loadable(
  lazy(() => import("../pages/Payroll/Deductions"))
);
const Archive = Loadable(lazy(() => import("../pages/Payroll/Archive")));
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
const SupervisorAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/Supervisor.Admin"))
);
const ShiftScheduleList = Loadable(
  lazy(() => import("../pages/HR/Admin/ShiftScheduleList.Admin"))
);
const RemoteAttendance = Loadable(
  lazy(() => import("../pages/HR/Users/RemoteAttendance"))
);
const TeamAttendanceRecord = Loadable(
  lazy(() => import("../pages/HR/Admin/TeamAttendanceRecord.Admin"))
);
const SupervisorAttendanceAdmin = Loadable(
  lazy(() => import("../pages/HR/Admin/SupervisorAttendance.Admin"))
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
// const AccountingDashboard = Loadable(
//   lazy(() => import("../pages/Accounting/AccountingDashboard"))
// );
const AccountingDashboard = Loadable(
  lazy(() => import("../pages/Accounting/AccountingDashboard.js"))
);
const JobDashboard = Loadable(
  lazy(() => import("../pages/Dashboard/JobsDashboard"))
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
const ClientApprovals = Loadable(
  lazy(() => import("../pages/Clients/ClientApproval"))
);
const ChartOfAccounts = Loadable(
  lazy(() => import("../pages/Accounting/chartOfAccounts"))
);
const GeneralLedger = Loadable(
  lazy(() => import("../pages/Accounting/GeneralLedger"))
);
const Budget = Loadable(lazy(() => import("../pages/Accounting/Budget")));
const Journals = Loadable(lazy(() => import("../pages/Accounting/Journal")));
// const InvoiceTemplate = Loadable(
//   lazy(() => import('../pages/Accounting/InvoiceTemplate'))
// );
const ProductItems = Loadable(
  lazy(() => import("../pages/ProductItems/ProductItems"))
);
// const Bill = Loadable(lazy(() => import('../pages/Vendors/bill')));
const PayslipReports = Loadable(
  lazy(() => import("../pages/Accounting/Payslip-Reports.js"))
);
const Notifications = Loadable(
  lazy(() => import("../pages/In-Apps/Notifications"))
);
const ExpenseHeads = Loadable(
  lazy(() => import("../pages/ExpenseHeads/ExpenseHeads"))
);
const ViewEmail = Loadable(lazy(() => import("../pages/In-Apps/SingleEmail")));
const BalanceSheet = Loadable(
  lazy(() => import("../pages/Reports/BalanceSheet"))
);
// const SingleEmail = Loadable(
//   lazy(() => import('../pages/In-Apps/SingleEmail'))
// );
const FileManager = Loadable(
  lazy(() => import("../pages/In-Apps/FileManager"))
);
const Branch = Loadable(lazy(() => import("../pages/HR/Admin/Branch.Admin")));
const HRDashboard = Loadable(
  lazy(() => import("../pages/Dashboard/HRDashboard"))
);
const OperationsDashboard = Loadable(
  lazy(() => import("./../pages/Dashboard/OperationsDashboard"))
);
const SignatureGenerator = Loadable(
  lazy(() => import("../pages/In-Apps/signature-generator"))
);
const RolePermission = Loadable(
  lazy(() => import("../pages/settings/roles-permission"))
);
const EmployeeRoles = Loadable(
  lazy(() => import("../pages/settings/employeeRoles"))
);

const RoleAssignment = Loadable(
  lazy(() => import("../pages/settings/rolesAssignment"))
);
const Shadowing = Loadable(
  lazy(() => import("../pages/HR/Admin/Shadowing.Admin"))
);

const IdRequest = Loadable(
  lazy(() => import("../pages/HR/Admin/IdRequest.Admin"))
);

const OrientationAndTraining = Loadable(
  lazy(() => import("../pages/HR/Admin/OrientationAndTraining.Admin"))
);

const Tickets = Loadable(lazy(() => import("../pages/In-Apps/tickets.js")));

const TicketManager = Loadable(
  lazy(() => import("../pages/In-Apps/TicketManager"))
);
