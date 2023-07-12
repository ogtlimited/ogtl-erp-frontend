/*eslint-disable jsx-a11y/anchor-is-valid*/

import React from "react";
import { Link } from "react-router-dom";
import helper from "../../services/helper";
import SalaryDetailsTable from "../Tables/EmployeeTables/salaryDetailsTable";

const SalaryDetails = ({
  AllSalaries,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
}) => {

  const columns = [
    {
      dataField: "id",
      text: "Employee ID",
      hidden: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "300px" },
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowance",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "monthlySalary",
      text: "Monthly Salary",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "",
      text: "Annual Salary",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{helper.handleMoneyFormat((row.monthlySalary * 12).toFixed(2))}</p>
      ),
    },
    {
      dataField: "monthlyIncomeTax",
      text: "Monthly IncomeTax",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { minWidth: "150px" },
      csvExport: false,
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-primary"
          to={{
            pathname: `/dashboard/payroll/salary-breakdown/${row?.employeeId}`,
            state: { employee: row?.employeeId },
          }}
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="tab-pane show active" id="tab_salaries">
        <SalaryDetailsTable
          data={AllSalaries}
          columns={columns}

          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
};
export default SalaryDetails;
