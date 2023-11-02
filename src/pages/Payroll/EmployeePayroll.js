/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import helper from "../../services/helper";
// import ApprovePayroll from "./ApprovePayroll";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import EmployeeSalaryTable from "../../components/Tables/EmployeeTables/EmployeeSalaryTable";
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";

const EmployeePayroll = () => {
  const { user, ErrorHandler } = useAppContext();
  const handleClose = () => {};
  const [generating, setGenerating] = useState(false);
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [displayState, setDisplayState] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager", "accountant"];

  const CurrentUserIsAuthorized = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

  const fetchEmployeeSalarySlip = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/v1/salary_slips.json", {
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
        const AllEmployeeSlips = res?.data?.data?.slips;
        const totalPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = AllEmployeeSlips?.map((e) => ({
          ...e,
          id: e?.slip?.id,
          employee: e?.user?.first_name + " " + e?.user?.last_name,
          ogid: e?.user?.ogid,
          email: e?.user?.email,

          basic: e?.slip?.basic,
          medical: e?.slip?.medical,
          housing: e?.slip?.housing,
          transport: e?.slip?.transport,
          otherAllowances: e?.slip?.other_allowances,
          monthlySalary: e?.slip?.monthly_salary,

          tax: e?.slip?.monthly_income_tax,
          pension: e?.slip?.monthly_pension,
          disciplinary_deductions: e?.slip?.disciplinary_deductions,
          netPay: e?.slip?.net_pay,
        }));

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = "Employee Salary Slip Error:";
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchEmployeeSalarySlip();
  }, [fetchEmployeeSalarySlip]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee Name",
    },
    {
      dataField: "ogid",
      text: "OGID",
    },
    {
      dataField: "email",
      text: "Email",
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
      text: "Other Allowances",
    },
    {
      dataField: "monthlySalary",
      text: "Gross Salary",
    },
    {
      dataField: "tax",
      text: "Tax",
    },
    {
      dataField: "pension",
      text: "Pension",
    },
    {
      dataField: "disciplinary_deductions",
      text: "Disciplinary Deduction",
    },
    {
      dataField: "netPay",
      text: "Net Salary",
    },
  ];

  return (
    <>
      {user?.role?.title === "CEO" ? (
        <div className="alert alert-primary sliding-text" role="alert">
          <div>
            <AlertSvg />
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
            >
              <use xlinkHref="#info-fill" />
            </svg>
            <span className="pl-3">
              Payroll is generated on the 25th of every month
            </span>
            <span className="pl-3">
              {" "}
              | &nbsp; You can preview and approve payroll once generated
            </span>
          </div>
        </div>
      ) : (
        <div className="alert alert-primary sliding-text" role="alert">
          <div>
            <AlertSvg />
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
            >
              <use xlinkHref="#info-fill" />
            </svg>
            <span className="pl-3">
              Payroll is generated on the 25th of every month
            </span>
            <span className="pl-3">
              {" "}
              | &nbsp; You can click the generate button to generate payroll for
              the current month
            </span>
          </div>
        </div>
      )}
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Staff Monthly Payroll</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Payroll</li>
              <li className="breadcrumb-item active">Payroll Processing</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.title !== "CEO" && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#GeneratePayrollModal"
              >
                <i className="fa fa-plus"></i> Generate Payroll
              </a>
            )}

            {user?.role?.title === "CEO" && (
              <button
                data-toggle="modal"
                data-target="#generalModal"
                className="btn add-btn mx-5"
                onClick={() => {
                  setGenerating("raw");
                }}
              >
                Preview and approve payroll
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {/* <SalaryDetailsTable
            data={data}
            columns={columns}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          /> */}
          <EmployeeSalaryTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            columns={columns}
            viewAction={true}
            regenerate={true}
            actionTitle="View"
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
            setGenerating={setGenerating}
          />
        </div>
      </div>

      <GeneratePayrollModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        setGenerating={setGenerating}
      />

      {/* <ViewModal
        closeModal={handleClose}
        title={`Payroll Approval for ${currMonthName}  ${year}`}
        content={
          <ApprovePayroll
            setDisplayState={setDisplayState}
            state={displayState}
            previewData={previewData}
          />
        }
      /> */}
    </>
  );
};

export default EmployeePayroll;
