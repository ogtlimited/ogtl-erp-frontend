/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import EmployeeSalaryUpload from "../../components/Modal/EmployeeSalaryUpload";

const EmployeeSalary = () => {
  const { user } = useAppContext();
  const [AllSalaries, setAllSalaries] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(25);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;

  const downloadTemplate = () => {
    const csvContent = "OGID,Annual Gross Salary\n"; // CSV header row

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Employee-Salary-Template.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const fetchAllSalaries = useCallback(() => {
    axiosInstance
      .get("/api/v1/employee_salaries.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        const AllEmployeeSalaries = res?.data?.data?.salaries;
        const totalPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = AllEmployeeSalaries?.map((e) => ({
          ...e,
          employee: e?.first_name + " " + e?.last_name,
          housing: e?.salary?.housing,
          medical: e?.salary?.medical,
          netPay: e?.salary?.net_pay,
          monthlySalary: e?.salary?.monthly_salary,
          monthlyIncomeTax: e?.salary?.monthly_income_tax,
          monthlyEmployeePension: e?.salary?.monthly_pension,
          otherAllowances: e?.salary?.other_allowances,
          transport: e?.salary?.transport,
          basic: e?.salary?.basic,
        }));

        setAllSalaries(formattedData);
      })
      .catch((error) => {
        console.log("All Salaries Error:", error?.response);
      });
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllSalaries();
  }, [fetchAllSalaries]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "250px" },
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "100px" },
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
      dataField: "monthlyIncomeTax",
      text: "Monthly Income Tax",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "monthlyEmployeePension",
      text: "Monthly Pension",
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
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { minWidth: "150px" },
    //   csvExport: false,
    //   formatter: (value, row) => (
    //     <Link
    //       className="btn btn-sm btn-primary"
    //       to={{
    //         pathname: `/dashboard/payroll/salary-breakdown/${row?.employeeId}`,
    //         state: { employee: row?.employeeId },
    //       }}
    //     >
    //       View
    //     </Link>
    //   ),
    // },
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
          <div
            className="col-auto float-right ml-auto"
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#EmployeeSalaryUploadModal"
                onClick={() => settoggleModal(true)}
              >
                <i className="fa fa-upload"></i> Upload Salaries
              </a>
            )}
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#EmployeeSalaryUploadModal"
              onClick={downloadTemplate}
            >
              <i className="fa fa-download"></i> Download Template
            </a>
          </div>
        </div>
      </div>

      <div className="row  ">
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

      {toggleModal && (
        <div>
          <EmployeeSalaryUpload
            settoggleModal={settoggleModal}
            title="Upload Employee Salaries"
            url="api/v1/employee_salaries.json"
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
            fetchAllSalaries={fetchAllSalaries}
          />
        </div>
      )}
    </>
  );
};

export default EmployeeSalary;
