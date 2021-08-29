import AllCampaigns from "./pages/Campaigns/AllCampaigns"
import Leads from "./pages/Campaigns/Leads"
import AdminDashboard from "./pages/Dashboard/AdminDashboard"
import AttendanceAdmin from "./pages/HR/Admin/Attendance.Admin"
import Departments from "./pages/HR/Admin/Department.Admin"
import Designations from "./pages/HR/Admin/Designation.Admin"
import AllEmployeesAdmin from "./pages/HR/Admin/Employees.Admin"
import LeavesAdmin from "./pages/HR/Admin/Leaves.Admin"
import Promotion from "./pages/HR/Admin/Promotion"
import ShiftAdmin from "./pages/HR/Admin/Shift.Admin"
import EmployeeAttendance from "./pages/HR/Users/Attendance.Users"
import EmployeeUser from "./pages/HR/Users/Employee.User"
import LeavesUser from "./pages/HR/Users/Leaves.User"
import AttendanceReport from "./pages/Reports/AttendanceReport"
import EmployeeReport from "./pages/Reports/EmployeeReport"
import PayslipReport from "./pages/Reports/PayslipReport"

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
    path: "/admin-dashboard",
    name: "Dashboard",
    component: AdminDashboard,
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
    title: "Attendance Reports",
    path: "/attendance-reports",
    name: "Dashboard",
    component: AttendanceReport,
    layout: "/admin",
  }
]


export default routes