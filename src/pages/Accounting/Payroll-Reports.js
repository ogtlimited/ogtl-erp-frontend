/* eslint-disable jsx-a11y/anchor-is-valid */
import { update } from "lodash";
import moment from "moment";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";
import ApprovePayroll from "./ApprovePayroll";
import axios from "axios";
import SalaryDetailsTable from "../../components/Tables/EmployeeTables/salaryDetailsTable";
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";

const PayrollReports = () => {
  const { showAlert, user } = useAppContext();
  const handleClose = () => {};
  const [generating, setgenerating] = useState(false);
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [displayState, setdisplayState] = useState("");
  const [previewData, setpreviewData] = useState(null);
  const [totalSalary, settotalSalary] = useState(0);
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const fetchEmployeeSalarySlip = useCallback(() => {
    axiosInstance
      .get(
        "/api/v1/salary_slips.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: sizePerPage,
          },
        }
      )
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
          salary: e?.slip?.salary,
          disciplinary_deductions: e?.slip?.disciplinary_deductions,

          basic: e?.slip?.basic,
          medical: e?.slip?.medical,
          housing: e?.slip?.housing,
          transport: e?.slip?.transport,
          otherAllowances: e?.slip?.other_allowances,
          tax: e?.slip?.monthly_income_tax,
          pension: e?.slip?.monthly_pension,
          netPay: e?.slip?.net_pay,
        }));

        setData(formattedData);
      })
      .catch((error) => {
        showAlert(
          true,
          "Error retrieving information from server",
          "alert alert-warning"
        );
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
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2 className="table-avatar">{value}</h2>,
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{val}</p>,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{val || "Not Available"}</p>,
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowances",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "salary",
      text: "Salary",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "tax",
      text: "Tax",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "pension",
      text: "Pension",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "disciplinary_deductions",
      text: "Disciplinary Deduction",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "id",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
        <Link
          className="btn btn-sm btn-primary"
          to={{
            pathname: `/dashboard/payroll/payslip/${value}`,
          }}
        >
          View Pay Slip 
        </Link>
        </>
      ),
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
            <h3 className="page-title">Payroll Reports</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Dashboard</li>
              <li className="breadcrumb-item active">Payroll Reports</li>
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
                  setdisplayState("raw");
                  console.log("state", displayState);
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
      
      <GeneratePayrollModal fetchEmployeeSalarySlip={fetchEmployeeSalarySlip} setgenerating={setgenerating}  />

      <ViewModal
        closeModal={handleClose}
        title={`Payroll Approval for ${currMonthName}  ${year}`}
        content={
          <ApprovePayroll
            setdisplayState={setdisplayState}
            state={displayState}
            previewData={previewData}
          />
        }
      />

    </>
  );
};

export default PayrollReports;
