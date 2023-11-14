/** @format */

import { PATH_DASHBOARD } from "../../routes/paths";
import tokenService from "../../services/token.service";
import sign from "jwt-encode";

const user = tokenService.getUser();
const userDept =
  user?.office?.office_type === "department"
    ? user?.office?.title?.toLowerCase()
    : null;

const remoteUser = user?.employee_info?.remote;
const CurrentUserIsLead = user?.employee_info?.is_lead;
const CurrentUserRoles = user?.employee_info?.roles || [];

const getIcon = (name) => <i className={"la " + name}></i>;

const ICONS = {
  user: getIcon("la-user"),
  users: getIcon("la-users"),
  reports: getIcon("la-pie-chart"),
  recruitment: getIcon("la-briefcase"),
  payroll: getIcon("la-money"),
  account: getIcon("la-money-check-alt"),
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
  kpi: getIcon("la-bar-chart"),
  leave: getIcon("la-calendar-times-o"),
  biometrics: getIcon("la-fingerprint"),
  organizationalStructure: getIcon("la-sitemap"),
  leader: getIcon("la-user-tie"),
  userAttendance: getIcon("la-user-clock"),
};

const buildExternalURL = () => {
  try {
    const kpiData = tokenService.getKpiUser();
    const secret = process.env.REACT_APP_HMAC_SECRET;

    const generatedJWT = sign(kpiData, secret);

    const kpiUrl = process.env.REACT_APP_KPI_APP_URL;
    const queryParams = `auth_param=${generatedJWT}`;

    const externalAppUrl = `${kpiUrl}?${queryParams}`;
    return externalAppUrl;
  } catch (error) {
    console.log(error);
  }
};

const sidebarConfig = [
  // GENERAL
  // Dashboard:
  {
    subheader: "Main",
    canView: "all",
    items:
      userDept === "hr"
        ? [
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
            {
              canView: "hr",
              title: "KPI",
              externalLink: buildExternalURL(),
              icon: ICONS.kpi,
            },
            {
              canView: "all",
              title: "Attendance",
              path: PATH_DASHBOARD.main.employeeAttendance,
              icon: ICONS.userAttendance,
            },
            {
              canView: "all",
              title: "Leave",
              path: PATH_DASHBOARD.main.employeeLeave,
              icon: ICONS.leave,
            },
          ]
        : [
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
            {
              canView: "all",
              title: "Attendance",
              path: PATH_DASHBOARD.main.employeeAttendance,
              icon: ICONS.userAttendance,
            },
            {
              canView: "all",
              title: "Leave",
              path: PATH_DASHBOARD.main.employeeLeave,
              icon: ICONS.leave,
            },
          ],
  },

  // HR CONFIG:
  {
    subheader: "HR",
    canView: CurrentUserIsLead && userDept !== "hr" ? "all" : "hr",
    items: [
      // Employee:
      {
        canView: CurrentUserIsLead && userDept !== "hr" ? "all" : "hr",
        title: "Employee",
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
                  title: "Departments",
                  path: PATH_DASHBOARD.hr.departments,
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
              ],
      },

      // Leadership:
      {
        canView: "hr",
        title: "Leadership",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.leader,
        children: [
          {
            canView: "hr",
            title: "Leaders",
            path: PATH_DASHBOARD.hr.leadership,
          },
        ],
      },

      // Biometrics:
      {
        canView: "hr",
        title: "Biometrics",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.biometrics,
        children: [
          {
            canView: "hr",
            title: "Captured Biometrics",
            path: PATH_DASHBOARD.hr.capturedBiometrics,
          },
        ],
      },

      // Attendance:
      {
        canView: "hr",
        title: "Attendance",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.attendance,
        children: [
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
        ],
      },

      // Leave:
      {
        canView: "hr",
        title: "Leave",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.leave,
        children: [
          {
            canView: "hr",
            title: "Leave Applications",
            path: PATH_DASHBOARD.hr.leavesAdmin,
          },
          {
            canView: "hr",
            title: "Leave Types",
            path: PATH_DASHBOARD.hr.leaveType,
          },
        ],
      },

      // Organizational Structure:
      {
        canView: "hr",
        title: "Office Structure",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.organizationalStructure,
        children: [
          {
            canView: "hr",
            title: "Departments",
            path: PATH_DASHBOARD.hr.departments,
          },
          {
            canView: "hr",
            title: "Campaigns",
            path: PATH_DASHBOARD.hr.campaigns,
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
            canView: "super",
            title: "Payroll Processing",
            path: PATH_DASHBOARD.payroll.payrollProcessing,
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

  // OPERATIONS CONFIG:
  {
    subheader: "Operations",
    canView: "super",
    items: [
      {
        canView: "super",
        title: "Workforce",
        path: PATH_DASHBOARD.operations.root,
        icon: ICONS.users,
        children: [
          {
            canView: "super",
            title: "Leave Applications",
            path: PATH_DASHBOARD.operations.workforceLeaveApplications,
          },
        ],
      },
      // {
      //   canView: "super",
      //   title: "Campaign",
      //   path: PATH_DASHBOARD.campaign.root,
      //   icon: ICONS.user,
      //   children: [
      //     {
      //       canView: "super",
      //       title: "All Campaigns",
      //       path: PATH_DASHBOARD.campaign.allCampaign,
      //     },
      //     {
      //       canView: "super",
      //       title: "Leads",
      //       path: PATH_DASHBOARD.campaign.lead,
      //     },
      //     {
      //       canView: "super",
      //       title: "Branch",
      //       path: PATH_DASHBOARD.campaign.branch,
      //     },
      //     {
      //       canView: "super",
      //       title: "Client Leave Approvals",
      //       path: PATH_DASHBOARD.clients.leaveApprovals,
      //     },
      //   ],
      // },
      // {
      //   canView: "super",
      //   title: "Payroll",
      //   path: PATH_DASHBOARD.payroll.root,
      //   icon: ICONS.payroll,
      //   children: [
      //     {
      //       canView: "super",
      //       title: "Employee Salary",
      //       path: PATH_DASHBOARD.payroll.salary,
      //     },
      //     {
      //       canView: "super",
      //       title: "Payroll Items",
      //       path: PATH_DASHBOARD.payroll.payrollItem,
      //     },
      //     {
      //       canView: "super",
      //       title: "Payroll Notes",
      //       path: PATH_DASHBOARD.payroll.payrollNotes,
      //     },
      //   ],
      // },
      // {
      //   canView: "HR",
      //   title: "Reports",
      //   path: PATH_DASHBOARD.payroll.root,
      //   icon: ICONS.reports,
      //   children: [
      //     {
      //       canView: "HR",
      //       title: "Employee Reports",
      //       path: PATH_DASHBOARD.reports.employeeReport,
      //     },
      //     {
      //       canView: "super",
      //       title: "Payslip Reports",
      //       path: PATH_DASHBOARD.reports.payslipReport,
      //     },
      //     {
      //       canView: "HR",
      //       title: "Attendance Reports",
      //       path: PATH_DASHBOARD.reports.attendanceReports,
      //     },
      //     {
      //       canView: "HR",
      //       title: "Academy Reports",
      //       path: PATH_DASHBOARD.reports.academyReports,
      //     },
      //   ],
      // },
    ],
  },

  // ACCOUNTING CONFIG:
  {
    subheader: "Accounting",
    canView: "accounting",
    items: [
      // {
      //   canView: "accounting",
      //   title: "Accounting",
      //   path: PATH_DASHBOARD.accounts.root,
      //   icon: ICONS.user,
      //   children: [
      //     {
      //       canView: "accounting",
      //       title: "Accounts",
      //       path: PATH_DASHBOARD.accounts.chartOfAccount,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Budget",
      //       path: PATH_DASHBOARD.accounts.budgets,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Journals",
      //       path: PATH_DASHBOARD.accounts.journals,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "General Ledger",
      //       path: PATH_DASHBOARD.accounts.ledger,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Expense",
      //       path: PATH_DASHBOARD.accounts.expenseHeads,
      //     },
      //   ],
      // },
      {
        canView: "accounting",
        title: "Accounting Reports",
        path: PATH_DASHBOARD.accountingReports.root,
        icon: ICONS.account,
        children: [
          {
            canView: "accounting",
            title: "Payslip Reports",
            path: PATH_DASHBOARD.accountingReports.payslipReport,
          },
          // {
          //   canView: "accounting",
          //   title: "Balance Sheet",
          //   path: PATH_DASHBOARD.accountingReports.balanceSheet,
          // },
        ],
      },
      // {
      //   canView: "accounting",
      //   title: "Clients",
      //   path: PATH_DASHBOARD.clients.root,
      //   icon: ICONS.user,
      //   children: [
      //     {
      //       canView: "accounting",
      //       title: "Invoices",
      //       path: PATH_DASHBOARD.clients.invoices,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Payments",
      //       path: PATH_DASHBOARD.clients.payments,
      //     },
      //   ],
      // },
      // {
      //   canView: "accounting",
      //   title: "Vendors",
      //   path: PATH_DASHBOARD.vendors.root,
      //   icon: ICONS.user,
      //   children: [
      //     {
      //       canView: "accounting",
      //       title: "Vendors",
      //       path: PATH_DASHBOARD.vendors.vendors,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Bills",
      //       path: PATH_DASHBOARD.vendors.bills,
      //     },
      //     {
      //       canView: "accounting",
      //       title: "Payments",
      //       path: PATH_DASHBOARD.vendors.payments,
      //     },
      //   ],
      // },
      // {
      //   canView: "accounting",
      //   title: "Product Items",
      //   path: PATH_DASHBOARD.productItems,
      //   icon: ICONS.productItems,
      // },
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
