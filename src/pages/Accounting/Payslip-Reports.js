/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";
import ApprovePayroll from "./ApprovePayroll";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import EmployeeSalaryTable from "../../components/Tables/EmployeeTables/EmployeeSalaryTable";
import csvDownload from "json-to-csv-export";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PayslipReports = () => {
  const { user, ErrorHandler, showAlert } = useAppContext();
  const [generating, setGenerating] = useState(false);
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

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
          totalDeduction: e?.slip?.total_deductions,
          netPay: e?.slip?.net_pay,
        }));

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = "Employee Salary Slip Error | ";
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchEmployeeSalarySlip();
  }, [fetchEmployeeSalarySlip]);

  // Handle CSV Export:
  const handleExportCSV = async (e) => {
    e.preventDefault();
    setLoadingCSV(true);

    try {
      const response = await axiosInstance.get("/api/v1/salary_slips.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: 4000,
        },
      });

      const responseData = response?.data?.data?.slips;

      const formatted = responseData.map((data) => ({
        EMPLOYEE: data?.user?.first_name + " " + data?.user?.last_name,
        OGID: data?.user?.ogid,
        EMAIL: data?.user?.email,

        BASIC: helper.handleMoneyFormat(data?.slip?.basic),
        MEDICAL: helper.handleMoneyFormat(data?.slip?.medical),
        HOUSING: helper.handleMoneyFormat(data?.slip?.housing),
        TRANSPORT: helper.handleMoneyFormat(data?.slip?.transport),
        "OTHER ALLOWANCES": helper.handleMoneyFormat(
          data?.slip?.other_allowances
        ),
        "MONTHLY SALARY": helper.handleMoneyFormat(data?.slip?.monthly_salary),

        TAX: helper.handleMoneyFormat(data?.slip?.monthly_income_tax),
        PENSION: helper.handleMoneyFormat(data?.slip?.monthly_pension),
        "DISCIPLINARY DEDUCTIONS": helper.handleMoneyFormat(
          data?.slip?.disciplinary_deductions
        ),
        "TOTAL DEDUCTIONS": helper.handleMoneyFormat(
          data?.slip?.total_deductions
        ),
        "NET PAY": helper.handleMoneyFormat(data?.slip?.net_pay),
      }));

      const dataToConvert = {
        data: formatted,
        filename: `OGTL - Staff Monthly Payslip - ${currMonthName} ${year}`,
        delimiter: ",",
        useKeysAsHeaders: true,
      };

      csvDownload(dataToConvert);

      setLoadingCSV(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoadingCSV(false);
    }
  };

  const columns = [
    {
      dataField: "employee",
      text: "Employee Name",
      idDataField: "ogid",
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
      dataField: "totalDeduction",
      text: "Total Deductions",
    },
    {
      dataField: "netPay",
      text: "Net Salary",
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">
              Staff Monthly Payslip |{" "}
              <span className="payroll_month_indicator">{currMonthName}</span>
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Reports</li>
              <li className="breadcrumb-item active">Payslip Reports</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadingCSV ? (
              <button className="btn add-btn" style={{ marginLeft: "20px" }}>
                <FontAwesomeIcon icon={faSpinner} spin pulse /> Loading...
              </button>
            ) : (
              data.length > 0 && (
                <button
                  className="btn add-btn"
                  style={{ marginLeft: "20px" }}
                  onClick={handleExportCSV}
                >
                  <i className="fa fa-download"></i> Download Payslips
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <EmployeeSalaryTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            columns={columns}
            viewAction={true}
            actionTitle="View Payslip"
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>

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

export default PayslipReports;
