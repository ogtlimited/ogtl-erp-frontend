/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";
import ApprovePayroll from "./ApprovePayroll";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";

const PayrollReports = () => {
  const { user, ErrorHandler } = useAppContext();
  const handleClose = () => {};
  const [generating, setGenerating] = useState(false);
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [displayState, setDisplayState] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const fetchEmployeeSalarySlip = useCallback(() => {
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

          tax: e?.slip?.monthly_income_tax,
          pension: e?.slip?.monthly_pension,
          disciplinary_deductions: e?.slip?.disciplinary_deductions,
          netPay: e?.slip?.net_pay,
        }));

        setData(formattedData);
      })
      .catch((error) => {
        const component = "Employee Salary Slip Error:";
        ErrorHandler(error, component);
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
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2 className="table-avatar">{value}</h2>,
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{val || "Not Available"}</p>,
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowances",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "tax",
      text: "Tax",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "pension",
      text: "Pension",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "disciplinary_deductions",
      text: "Disciplinary Deduction",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "netPay",
      text: "Net Salary",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "id",
      text: "Action",
      sort: true,
      csvExport: false,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <Link
            className="btn btn-sm btn-primary"
            to={{
              pathname: `/dashboard/payroll/payslip/${value}`,
            }}
          >
            View Payslip
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Staff Monthly Payslip</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Reports</li>
              <li className="breadcrumb-item active">Payslip Reports</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <SalaryDetailsTable
            data={data}
            columns={columns}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>

      <GeneratePayrollModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        setGenerating={setGenerating}
      />

      <ViewModal
        closeModal={handleClose}
        title={`Payroll Approval for ${currMonthName}  ${year}`}
        content={
          <ApprovePayroll
            setDisplayState={setDisplayState}
            state={displayState}
            previewData={previewData}
          />
        }
      />
    </>
  );
};

export default PayrollReports;
