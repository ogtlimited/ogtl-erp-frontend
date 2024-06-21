// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import helper from "../../services/helper";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
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
  const isAuthorized = ["hr_manager", "accountant", "payroll_processor"];

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
          officeName: e?.office.toUpperCase(),
          status: e?.salary?.status,
          basic: e?.salary?.basic,
          housing: e?.salary?.housing,
          medical: e?.salary?.medical,
          transport: e?.salary?.transport,
          otherAllowances: e?.salary?.other_allowances,
          monthlySalary: e?.salary?.monthly_salary,
          monthlyIncomeTax: e?.salary?.monthly_income_tax,
          monthlyEmployeePension: e?.salary?.monthly_pension,
          totalDeductions: e?.salary?.total_deductions,
          netPay: e?.salary?.net_pay,

          salaryStatus: "status",
        }));

        setAllSalaries(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = "All Salaries Error | ";
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
      idDataField: "ogid",
    },
    {
      dataField: "officeName",
      text: "Office",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "status",
      text: "Status",
      textDataField: "salaryStatus",
    },
    {
      dataField: "basic",
      text: "Basic",
    },
    {
      dataField: "medical",
      text: "Medical",
    },
    {
      dataField: "housing",
      text: "Housing",
    },
    {
      dataField: "transport",
      text: "Transport",
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowance",
    },
    {
      dataField: "monthlySalary",
      text: "Gross Salary",
    },
    {
      dataField: "monthlyIncomeTax",
      text: "Tax",
    },
    {
      dataField: "monthlyEmployeePension",
      text: "Pension",
    },
    {
      dataField: "totalDeductions",
      text: "Total Deductions",
    },
    {
      dataField: "netPay",
      text: "Net Salary",
    },
  ];

  return (
    <>
      <div className="page-header" style={{ marginBottom: "100px" }}>
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
            {CurrentUserIsAuthorized && (
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
            {CurrentUserIsAuthorized && (
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
        <EmployeeSalaryTable
          data={AllSalaries}
          loading={loading}
          setLoading={setLoading}
          columns={columns}
          viewAction={false}
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
