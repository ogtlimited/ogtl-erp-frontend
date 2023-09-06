/** @format */

import { PATH_DASHBOARD } from "../../routes/paths";
import tokenService from "../../services/token.service";

const user = tokenService.getUser();
const userDept =
  user?.office?.office_type === "department" ? user?.office?.title : null;

const remoteUser = user?.employee_info?.remote;
const CurrentUserIsLead = user?.employee_info?.is_lead;
const CurrentUserRoles = user?.employee_info?.roles || [];

const getIcon = (name) => <i className={"la " + name}></i>;

const ICONS = {
  user: getIcon("la-user"),
  reports: getIcon("la-pie-chart"),
  recruitment: getIcon("la-briefcase"),
  payroll: getIcon("la-money"),
  dashboard: getIcon("la-dashboard"),
  apps: getIcon("la-cube"),
  performance: getIcon("la-graduation-cap"),
  coaching: getIcon("la-ticket"),
  leadership: getIcon("la-users"),
  promotion: getIcon("la-bullhorn"),
  resignation: getIcon("la-external-link-square"),
  termination: getIcon("la-times-circle"),
  rolesPermission: getIcon("la-key"),
  assets: getIcon("la-object-ungroup"),
  purchaseOrder: getIcon("la-shopping-cart"),
  productItems: getIcon("la-box"),
  settings: getIcon("la-shopping-cart"),
  rolesAssignment: getIcon("la-lock"),
  shadowing: getIcon("la-users"),
  schedule: getIcon("la-calendar"),
  attendance: getIcon("la-clock-o"),
};

const sidebarConfig = [
  // GENERAL
  // Dashboard:
  {
    subheader: "Main",
    canView: "all",
    items: [
      {
        canView: "all",
        title: "Dashboard",
        path: PATH_DASHBOARD.main.root,
        icon: ICONS.dashboard,
        children: [
          {
            canView: "all",
            title: "Employee Dashboard",
            path: PATH_DASHBOARD.main.employeeDashboard,
          },
          {
            canView: "hr",
            title: "HR Dashboard",
            path: PATH_DASHBOARD.main.hrDashboard,
          },
        ],
      },
      // Apps:
      {
        canView: "all",
        title: "Apps",
        path: PATH_DASHBOARD.apps.root,
        icon: ICONS.apps,
        children: [
          {
            canView: "all",
            title: "Email Signature",
            path: PATH_DASHBOARD.apps.signature,
          },
        ],
      },
    ],
  },

  // HR CONFIG:
  {
    subheader: "HR",
    canView: "all",
    items: [
      {
        canView: "all",
        title: "Employees",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.user,
        children:
          CurrentUserIsLead && userDept !== "hr"
            ? [
                {
                  canView: "all",
                  title: "All Employees",
                  path: PATH_DASHBOARD.hr.allEmployees,
                },
                {
                  canView: "all",
                  title: "Attendance",
                  path: PATH_DASHBOARD.hr.employeeAttendance,
                },
                {
                  canView: "all",
                  title: "Leaves",
                  path: PATH_DASHBOARD.hr.leavesEmployee,
                },
              ]
            : [
                {
                  canView: "hr",
                  title: "All Employees",
                  path: PATH_DASHBOARD.hr.allEmployees,
                },
                {
                  canView: "hr",
                  title: "Add Employee",
                  path: PATH_DASHBOARD.hr.addEmployees,
                },
                {
                  canView: "hr",
                  title: "Leadership",
                  path: PATH_DASHBOARD.hr.leadership,
                },
                {
                  canView: "hr",
                  title: "Captured Biometrics",
                  path: PATH_DASHBOARD.hr.capturedBiometrics,
                },
                {
                  canView: "hr",
                  title: "Attendance Record",
                  path: PATH_DASHBOARD.hr.attendanceRecord,
                },
                {
                  canView: "hr",
                  title: "Remote Attendance",
                  path: PATH_DASHBOARD.hr.remoteAttendanceAdmin,
                },
                {
                  canView: "hr",
                  title: "Leave Applications",
                  path: PATH_DASHBOARD.hr.leavesAdmin,
                },
                {
                  canView: "all",
                  title: "Attendance",
                  path: PATH_DASHBOARD.hr.employeeAttendance,
                },
                {
                  canView: "all",
                  title: "Leaves",
                  path: PATH_DASHBOARD.hr.leavesEmployee,
                },
                {
                  canView: "hr",
                  title: "Offices",
                  path: PATH_DASHBOARD.hr.offices,
                },
                {
                  canView: "hr",
                  title: "Designations",
                  path: PATH_DASHBOARD.hr.designations,
                },
                {
                  canView: "hr",
                  title: "Branch",
                  path: PATH_DASHBOARD.hr.branch,
                },
                {
                  canView: "hr",
                  title: "Leave Types",
                  path: PATH_DASHBOARD.hr.leaveType,
                },
              ],
      },
      // Payroll:
      {
        canView: "hr",
        title: "Payroll",
        path: PATH_DASHBOARD.payroll.root,
        icon: ICONS.payroll,
        children: [
          {
            canView: "super",
            title: "Employee Salary",
            path: PATH_DASHBOARD.payroll.salary,
          },
          {
            canView: "hr",
            title: "Deductions",
            path: PATH_DASHBOARD.payroll.deductions,
          },
        ],
      },
      // Reports:
      {
        canView: "super",
        title: "Reports",
        path: PATH_DASHBOARD.payroll.root,
        icon: ICONS.reports,
        children: [
          {
            canView: "super",
            title: "Payslip Reports",
            path: PATH_DASHBOARD.reports.payslipReport,
          },
        ],
      },
      // Recruitment:
      {
        canView: "hr",
        title: "Recruitment",
        path: PATH_DASHBOARD.recruitment.root,
        icon: ICONS.recruitment,
        children: [
          {
            canView: "hr",
            title: "Job Opening",
            path: PATH_DASHBOARD.recruitment.jobOpening,
          },
          {
            canView: "hr",
            title: "Job Applications",
            path: PATH_DASHBOARD.recruitment.jobApplicants,
          },
        ],
      },
    ],
  },

  // LEADERSHIP CONFIG:
  {
    subheader: "Leadership",
    canView: "lead",
    items:
      (remoteUser && CurrentUserIsLead) || CurrentUserRoles.includes("wfh_lead")
        ? [
            {
              canView: "lead",
              title: "Team Members",
              path: PATH_DASHBOARD.leadership.supervisor,
              icon: ICONS.leadership,
            },
            {
              canView: "lead",
              title: "Campaign Schedule",
              path: PATH_DASHBOARD.leadership.campaignSchedule,
              icon: ICONS.schedule,
            },
            {
              canView: CurrentUserRoles,
              title: "Remote Attendance",
              path: PATH_DASHBOARD.leadership.remoteAttendance,
              icon: ICONS.attendance,
            },
          ]
        : [
            {
              canView: "lead",
              title: "Team Members",
              path: PATH_DASHBOARD.leadership.supervisor,
              icon: ICONS.leadership,
            },
            {
              canView: "lead",
              title: "Campaign Schedule",
              path: PATH_DASHBOARD.leadership.campaignSchedule,
              icon: ICONS.schedule,
            },
          ],
  },

  // SETTINGS CONFIG:
  {
    subheader: "Settings",
    canView: "super",
    items: [
      {
        canView: "super",
        title: "Roles & Permission",
        path: PATH_DASHBOARD.settings.rolesPermission,
        icon: ICONS.rolesPermission,
      },
    ],
  },
];

export default sidebarConfig;
