/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import EmployeeSalaryUpload from "../../components/Modal/EmployeeSalaryUpload";
import { BranchFormModal } from "../../components/Modal/BranchFormModal";

const EmployeeSalary = () => {
  const { user } = useAppContext();
  const [AllSalaries, setAllSalaries] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(25);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;

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

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = 20;

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
        console.log("All Salaries:", formattedData);
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
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "monthlyIncomeTax",
      text: "Monthly IncomeTax",
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
          <div className="col-auto float-right ml-auto">
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#EmployeeSalaryUploadModal"
                onClick={() => settoggleModal(true)}
              >
                <i className="fa fa-plus"></i> Upload Salaries
              </a>
            )}
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
            url="api/recruitment-result/bulk-upload"
            setUploadSuccess={setUploadSuccess}
            fetchAllSalaries={fetchAllSalaries}
          />
        </div>
      )}
    </>
  );
};

export default EmployeeSalary;
