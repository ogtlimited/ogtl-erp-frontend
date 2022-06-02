import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import moment from "moment";
import { formatter } from "../../services/numberFormatter";

const EmployeeSalary = () => {
  const [data, setData] = useState([]);

  const fetchEmployeeSalary = () => {
    axiosInstance
      .get("/api/salary-slip")
      .then((res) => {
        console.log(res)
        setData(res.data.data[0].salarySlips);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchEmployeeSalary();
  }, []);

  const columns = [
    {
      dataField: "",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          {row?.employeeId?.first_name} {row?.employeeId?.middle_name}{" "}
          {row?.employeeId?.last_name}
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{row?.employeeId?.ogid || "Not Available"}</p>
      ),
    },
    {
      dataField: "company_email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{row?.employeeId?.company_email || "Not Available"}</p>
      ),
    },

    // // {
    // //   dataField: "designation",
    // //   text: "Designation",
    // //   sort: true,
    // //   headerStyle: { minWidth: "150px" },
    // // },
    {
      dataField: "joining_date",
      text: "Joining Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
        <p>{moment(row?.employeeId?.date_of_joining).format("L")}</p>
      ),
    },
    {
      dataField: "netPay",
      text: "Salary",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.netPay)}</p>,
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-primary"
          // to={`/admin/payslip/${row?._id}`}
          to={{
            pathname: `/dashboard/payroll/payslip/${row?.employeeId._id}`,
            state: { employee: row?.employeeId },
          }}
        >
          Generate Slip
        </Link>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee Salary</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Salary</li>
            </ul>
          </div>
          {/* <div className="col-auto float-right ml-auto">
            <Link
              className="btn add-btn"
              data-toggle="modal"
              data-target="#add_salary"
            >
              <i className="fa fa-plus"></i> Add Salary
            </Link>
          </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default EmployeeSalary;
