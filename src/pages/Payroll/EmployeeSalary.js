/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import helper from "../../services/helper";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import EmployeeSalaryTable from "../../components/Tables/EmployeeTables/EmployeeSalaryTable";
import EmployeeSalaryUpload from "../../components/Modal/EmployeeSalaryUpload";
import AddNewSalaryForm from "./../../components/Forms/AddNewSalaryForm";

const EmployeeSalary = () => {
  const { user, ErrorHandler } = useAppContext();
  const [AllSalaries, setAllSalaries] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(25);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager", "accountant"];

  const CurrentUserIsAuthorized = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

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
    setLoading(true);
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
          basic: e?.salary?.basic,
          housing: e?.salary?.housing,
          medical: e?.salary?.medical,
          transport: e?.salary?.transport,
          otherAllowances: e?.salary?.other_allowances,
          monthlySalary: e?.salary?.monthly_salary,
          monthlyIncomeTax: e?.salary?.monthly_income_tax,
          monthlyEmployeePension: e?.salary?.monthly_pension,
          netPay: e?.salary?.net_pay,
        }));

        setAllSalaries(formattedData);
        console.log("Data i need:", formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = "All Salaries Error:";
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllSalaries();
  }, [fetchAllSalaries]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_earnings">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_earnings">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_earnings">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_earnings">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowance",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_earnings">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "monthlySalary",
      text: "Gross Salary",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "monthlyIncomeTax",
      text: "Tax",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_deductions">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "monthlyEmployeePension",
      text: "Pension",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p className="payroll_deductions">{helper.handleMoneyFormat(val)} </p>
      ),
    },
    {
      dataField: "netPay",
      text: "Net Salary",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { minWidth: "10%" },
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
            <h3 className="page-title">Staff Monthly Salary</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Payroll</li>
              <li className="breadcrumb-item active">Employee Salary</li>
            </ul>
          </div>
          <div
            className="col-auto float-right ml-auto"
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <a href="#" className="btn add-btn" onClick={downloadTemplate}>
              <i className="fa fa-download"></i> Download Template
            </a>
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="#"
                className="btn add-btn m-l-15"
                data-toggle="modal"
                data-target="#EmployeeSalaryUploadModal"
                onClick={() => settoggleModal(true)}
              >
                <i className="fa fa-upload"></i> Upload Salaries
              </a>
            )}
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="#"
                className="btn add-btn m-l-15"
                data-toggle="modal"
                data-target="#AddNewSalary"
              >
                <i className="fa fa-plus"></i> Add Salary
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row  ">
        {/* <SalaryDetailsTable
          data={AllSalaries}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        /> */}
        <EmployeeSalaryTable data={AllSalaries} />
      </div>

      {toggleModal && (
        <div>
          <EmployeeSalaryUpload
            settoggleModal={settoggleModal}
            title="Upload Employee Salaries"
            url="/api/v1/employee_salaries.json"
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
            fetchAllSalaries={fetchAllSalaries}
          />
        </div>
      )}

      <AddNewSalaryForm fetchAllSalaries={fetchAllSalaries} />
    </>
  );
};

export default EmployeeSalary;
