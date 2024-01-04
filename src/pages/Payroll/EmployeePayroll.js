// *IN USE

import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import helper from "../../services/helper";
import EmployeeSalaryTable from "../../components/Tables/EmployeeTables/EmployeeSalaryTable";
import csvDownload from "json-to-csv-export";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PayrollApprovalModal } from "../../components/Modal/PayrollApprovalModal";
import { RequestReviewModal } from "../../components/Modal/RequestReviewModal";

const EmployeePayroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, ErrorHandler, showAlert } = useAppContext();
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [refreshApproversData, setRefreshApproversData] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");
  const [currentApproverEmail, setCurrentApproverEmail] = useState("");

  const [reviewersData, setReviewersData] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager", "accountant"];

  // eslint-disable-next-line no-unused-vars
  const CurrentUserIsAuthorized = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

  // Fetch Employee Salary Slip:
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
          batch_id: id,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        const AllEmployeeSlips = res?.data?.data?.slips;
        const thisTotalPageSize = res?.data?.data?.pages;

        setSizePerPage(sizePerPage);
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
          totalDeductions: e?.slip?.total_deductions,
          netPay: e?.slip?.net_pay,

          prorate: e?.slip?.prorate ? "Yes" : "No",
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
  }, [id, page, sizePerPage]);

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
          batch_id: id,
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
      text: "Employee",
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
      dataField: "totalDeductions",
      text: "Total Deductions",
    },
    {
      dataField: "netPay",
      text: "Net Salary",
    },
    {
      dataField: "prorate",
      text: "Prorate",
    },
  ];

  const handleBackToBatchTable = () => {
    navigate(`/dashboard/payroll/payroll-processing`);
  };

  // Fetch Approvers Data:
  const fetchApproversData = useCallback(() => {
    axiosInstance
      .get(`/api/v1/payroll_processors.json?batch_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.payroll_processors;
        const sortedData = data.find(
          (data) => data?.current_processor === true
        );
        const currentApproverEmail = sortedData?.email;

        setCurrentApproverEmail(currentApproverEmail);
      })
      .catch((error) => {
        console.error("Error fetching approvers data | ", error);
      });
  }, [id]);

  // Fetch Reviewers Data:
  const fetchReviewersData = () => {
    axiosInstance
      .get(`/api/v1/request_payroll_reviews.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.processors;
        const sortedData = data.sort((a, b) => a.stage - b.stage);
        setReviewersData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching approvers data:", error);
      });
  };

  useEffect(() => {
    fetchApproversData();
    fetchReviewersData();
  }, [fetchApproversData, id]);

  return (
    <>
      <div className="page-header" style={{ marginBottom: "100px" }}>
        <div className="row">
          <div className="col">
            <h3 className="page-title">
              Staff Monthly Payroll |{" "}
              <span className="payroll_month_indicator">{currMonthName}</span>
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Payroll</li>
              <li className="breadcrumb-item active">Payroll Processing</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadingCSV ? (
              <button className="btn add-btn" style={{ marginRight: "20px" }}>
                <FontAwesomeIcon icon={faSpinner} spin pulse /> Loading...
              </button>
            ) : data?.length > 0 ? (
              <>
                <button
                  className="btn add-btn"
                  style={{ marginRight: "20px" }}
                  onClick={handleExportCSV}
                >
                  <i className="fa fa-download"></i> Download Report
                </button>

                <button
                  className="btn add-btn"
                  style={{ marginRight: "20px" }}
                  data-toggle="modal"
                  data-target="#PayrollApprovalModal"
                >
                  <i className="fa fa-check"></i> Payroll Approval Report
                </button>

                {reviewersData?.length ? (
                  <button
                    className="btn add-btn"
                    style={{ marginRight: "20px" }}
                    data-toggle="modal"
                    data-target="#RequestReviewModal"
                  >
                    <i className="fa fa-rotate-left"></i> Request Review
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            style={{ margin: "0 0 1rem 1rem" }}
            onClick={handleBackToBatchTable}
          >
            Back to Batch Table
          </button>

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
            currentApproverEmail={currentApproverEmail}
          />
        </div>
      </div>

      <PayrollApprovalModal refreshApproversData={refreshApproversData} />

      <RequestReviewModal
        setRefreshApproversData={setRefreshApproversData}
        reviewersData={reviewersData}
      />
    </>
  );
};

export default EmployeePayroll;
