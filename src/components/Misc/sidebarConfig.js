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
  teamAttendance: getIcon("la-history"),
  helpDesk: getIcon("la-question"),
  valentine: getIcon("la-gratipay"),
  female: getIcon("la-venus"),
  certificate: getIcon("la-certificate"),
  survey: getIcon("la-poll"),
  announcement: getIcon("la-bullhorn"),
  deduction: getIcon("la-money-check-alt"),
  office: getIcon("la-building"),
};

const buildExternalURL = () => {
  const secret = process.env.REACT_APP_HMAC_SECRET;
  const kpiUrl = process.env.REACT_APP_KPI_APP_URL;

  try {
    if (!kpiUrl || !secret) {
      throw new Error(
        `Could not satisfy requirements! ❌ kpiUrl:${kpiUrl}, secret:${secret}`
      );
    }

    const kpiData = tokenService.getKpiUser();

    const generatedJWT = sign(kpiData, secret);
    const queryParams = `auth_param=${generatedJWT}`;
    const externalAppUrl = `${kpiUrl}?${queryParams}`;

    console.log(
      "Sidebar KPI Url:",
      externalAppUrl ? "Status: ✅" : "Status: ❌"
    );
    return externalAppUrl;
  } catch (error) {
    console.log("KPI error | ", error);
  }
};

const sidebarConfig = [
  // GENERAL
  // Dashboard:
  {
    subheader: "Main",
    canView: "all",
    items: [
      userDept === "hr"
        ? {
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
          }
        : userDept === "operations"
        ? {
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
                canView: "operations",
                title: "Operations Dashboard",
                path: PATH_DASHBOARD.main.operationsDashboard,
              },
            ],
          }
        : {
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

      // Others:
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
          {
            canView: "all",
            title: "Ticket",
            path: PATH_DASHBOARD.apps.tickets,
          },
        ],
      },
      {
        canView: "all",
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
        title: "Out of Office",
        path: PATH_DASHBOARD.main.outOfOffice,
        icon: ICONS.office,
      },
      {
        canView: "all",
        title: "Leave",
        path: PATH_DASHBOARD.main.employeeLeave,
        icon: ICONS.leave,
      },
      {
        canView: "all",
        title: "Deductions",
        path: PATH_DASHBOARD.main.deductions,
        icon: ICONS.deduction,
      },
      {
        canView: "all",
        title: "Resignation",
        path: PATH_DASHBOARD.main.resignation,
        icon: ICONS.resignation,
      },
      {
        canView: CurrentUserRoles?.includes("security_attendance_team")
          ? "all"
          : "none",
        title: "Manual Attendance",
        path: PATH_DASHBOARD.main.manualAttendance,
        icon: ICONS.userAttendance,
      },
      {
        canView: "all",
        title: "Announcement",
        path: PATH_DASHBOARD.main.announcement,
        icon: ICONS.announcement,
      },
      {
        canView: "all",
        title: "Survey",
        path: PATH_DASHBOARD.main.survey,
        icon: ICONS.survey,
      },
      {
        canView: "all",
        title: "Help Desk",
        path: PATH_DASHBOARD.main.resignation,
        icon: ICONS.helpDesk,
        children: [
          {
            canView: "all",
            title: "IT Help Desk",
            externalLink: "https://sdpondemand.manageengine.com/",
          },
          {
            canView: "all",
            title: "Facilities Help Desk",
            externalLink: "https://ogtl-facilities.on.spiceworks.com/portal/",
          },
          {
            canView: "all",
            title: "HR Help Desk",
            externalLink: "https://ogtl-hr.on.spiceworks.com/portal",
          },
          {
            canView: "all",
            title: "Complaints Help Desk",
            externalLink: "https://ogtl-complaints.on.spiceworks.com/portal/",
          },
        ],
      },
      {
        canView: CurrentUserRoles?.includes("erp_team") ? "all" : "none",
        title: "Ticket Management",
        path: PATH_DASHBOARD.main.ticketManagement,
        icon: ICONS.coaching,
      },
      {
        canView: "all",
        title: "Employee Appreciation",
        path: PATH_DASHBOARD.main.eCertificate,
        icon: ICONS.certificate,
      },
      // {
      //   canView: "all",
      //   title: "Women's Day",
      //   path: PATH_DASHBOARD.main.IWD,
      //   icon: ICONS.female,
      // },
      // {
      //   canView: "all",
      //   title: "Valentine",
      //   path: PATH_DASHBOARD.main.valentine,
      //   icon: ICONS.valentine,
      // },
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
          {
            canView: "hr",
            title: "Out of Office",
            path: PATH_DASHBOARD.hr.outOfOffice,
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
        canView: CurrentUserRoles?.includes("payroll_processor")
          ? "all"
          : "none",
        title: "Payroll",
        path: PATH_DASHBOARD.payroll.root,
        icon: ICONS.payroll,
        children: [
          {
            canView: "all",
            title: "Employee Salary",
            path: PATH_DASHBOARD.payroll.salary,
          },
          {
            canView: "all",
            title: "Payroll Processing",
            path: PATH_DASHBOARD.payroll.payrollProcessing,
          },
          {
            canView: "all",
            title: "Payday",
            path: PATH_DASHBOARD.payroll.payday,
          },
          {
            canView: "all",
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

      // Survey:
      {
        canView: "hr",
        title: "Survey",
        path: PATH_DASHBOARD.hr.survey,
        icon: ICONS.survey,
        children: [
          {
            canView: "hr",
            title: "All Surveys",
            path: PATH_DASHBOARD.hr.allSurvey,
          },
          {
            canView: "hr",
            title: "Survey Forms",
            path: PATH_DASHBOARD.hr.survey,
          },
        ],
      },

      // Exit Management:
      {
        canView: "hr",
        title: "Exit",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.resignation,
        children: [
          {
            canView: "hr",
            title: "Resignations",
            path: PATH_DASHBOARD.hr.resignation,
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
              canView: "lead",
              title: "Team Attendance",
              path: PATH_DASHBOARD.leadership.teamAttendance,
              icon: ICONS.teamAttendance,
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
            {
              canView: "lead",
              title: "Team Attendance",
              path: PATH_DASHBOARD.leadership.teamAttendance,
              icon: ICONS.teamAttendance,
            },
          ],
  },

  // DATA MANAGEMENT CONFIG:
  {
    subheader: "Data Management",
    canView: CurrentUserRoles.includes("data_manager")
      ? "data management"
      : "none",
    items: [
      {
        canView: CurrentUserRoles.includes("data_manager")
          ? "data management"
          : "none",
        title: "Workforce",
        path: PATH_DASHBOARD.dataManagement.root,
        icon: ICONS.users,
        children: [
          {
            canView: "data management",
            title: "Leave Applications",
            path: PATH_DASHBOARD.dataManagement.workforceLeaveApplications,
          },
        ],
      },
    ],
  },

  // OPERATIONS CONFIG:
  {
    subheader: "Operations",
    canView: CurrentUserRoles.includes("operation_team")
      ? "operations"
      : "none",
    items: [
      // Leave:
      {
        canView: CurrentUserRoles.includes("operation_team")
          ? "operations"
          : "none",
        title: "Operation Team",
        path: PATH_DASHBOARD.operations.root,
        icon: ICONS.users,
        children: [
          {
            canView: "operations",
            title: "Leave Applications",
            path: PATH_DASHBOARD.operations.operationTeamLeaveApplications,
          },
        ],
      },

      // Exit Management:
      {
        canView: "operations",
        title: "Exit",
        path: PATH_DASHBOARD.operations.root,
        icon: ICONS.resignation,
        children: [
          {
            canView: "operations",
            title: "Resignations",
            path: PATH_DASHBOARD.operations.resignation,
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
