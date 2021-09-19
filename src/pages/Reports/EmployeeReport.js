import moment from "moment";
import React, { useEffect, useState } from "react";
import female from "../../assets/img/female_avatar.png";
import female2 from "../../assets/img/female_avatar2.png";
import female3 from "../../assets/img/female_avatar3.png";
import male from "../../assets/img/male_avater.png";
import male2 from "../../assets/img/male_avater2.png";
import male3 from "../../assets/img/male_avater3.png";
import { departmentFormJson } from "../../components/FormJSON/HR/Employee/department";
import EmployeesTable from "../../components/Tables/EmployeeTables/employeeTable";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import data from "../../db/employeeReport.json";
import axiosInstance from "../../services/api";
const EmployeeReport = () => {
  const { fetchEmployee, allEmployees } = useAppContext();
  const [employees, setemployees] = useState();
  useEffect(() => {
    // fetchEmployee()
    axiosInstance.get("/employees").then((e) => {
      console.log(e.data.employees);
      setemployees(e?.data?.employees);
    });
    // setemployees(allEmployees);
  }, []);

  console.log(employees);
  const imageUrl = "https://erp.outsourceglobal.com";
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const columns = [
    {
      dataField: "",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2>
          {row?.first_name} {row?.middle_name} {row?.last_name}
        </h2>
      ),
    },
    {
      dataField: "company_email",
      text: "Company Email",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          {value === "active" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value === "pending" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value === "terminated" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : (
            <a href="=" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          )}
        </>
      ),
    },

    {
      dataField: "date_of_joining",
      text: "Joining Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.date_of_joining).format("L")}</h2>
      ),
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      formatter: (value, row) => <h2>{row?.department?.department}</h2>,
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      formatter: (value, row) => <h2>{row?.designation?.designation}</h2>,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "branch",
      text: "Branch",
      sort: true,
      formatter: (value, row) => <h2>{row?.branch || "Not Available"}</h2>,
    },
    {
      dataField: "employeeType",
      text: "Employee Type",
      sort: true,
    },
    {
      dataField: "warningCount",
      text: "Warning Count",
      sort: true,
    },
    // {
    //   dataField: "phone",
    //   text: "Phone",
    //   sort: true,

    // },
    // {
    //   dataField: "emergency_contact",
    //   text: "Emergency Contact",
    //   sort: true,

    // },
    // {
    //   dataField: "experience",
    //   text: "Experience",
    //   sort: true,

    // },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              onClick={() => row}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_employee"
            >
              <i className="fa fa-download m-r-5"></i> Download Attendance
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Employee Report</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Employee Report</li>
            </ul>
          </div>
          <div className="col-auto">
            <a href="#" className="btn btn-primary">
              PDF
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable columns={columns} data={employees} />
        </div>
      </div>
    </>
  );
};

export default EmployeeReport;
