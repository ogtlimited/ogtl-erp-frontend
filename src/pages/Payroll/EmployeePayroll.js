// *IN USE
/* eslint-disable no-unused-vars */

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
import EmployeePayslipUpload from "../../components/Modal/EmployeePayslipUpload";
import Select from "react-select";

const CardSection = ({ title, value, loading, helper }) => {
  return (
    <div className="hr-dashboard-card">
      <span>{title}</span>
      <div className="card-body">
        <div className="card-info">
          {loading ? (
            <h3>
              <lord-icon
                src="https://cdn.lordicon.com/xjovhxra.json"
                trigger="loop"
                colors="primary:#121331,secondary:#08a88a"
              ></lord-icon>
            </h3>
          ) : (
            <h3>{value ? helper.handleMoneyFormat(value) : 0}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployeePayroll = () => {
  const { referenceId, id } = useParams();
  const navigate = useNavigate();
  const {
    selectOfficeTypes,
    selectDepartments,
    selectCampaigns,
    user,
    ErrorHandler,
    showAlert,
    goToTop,
  } = useAppContext();
  const year = moment().format("YYYY");
  const currMonth = moment().format("M");
  const currMonthName = moment().format("MMMM");
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingTotals, setLoadingTotals] = useState(false);
  const [loadingSendMails, setLoadingSendMails] = useState(false);
  const [loadingSendMail, setLoadingSendMail] = useState(false);
  const [refreshApproversData, setRefreshApproversData] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [toggleUploadModal, setToggleUploadModal] = useState(false);

  const [name, setName] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [officeId, setOfficeId] = useState({
    id: "",
    title: "",
  });
  const [prorateFilter, setProrateFilter] = useState("");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");
  const [approver, setApprover] = useState([]);
  const [currentApproverEmail, setCurrentApproverEmail] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);
  const [notifyFor, setNotifyFor] = useState(null);

  const [currentBatchApprovalStatus, setCurrentBatchApprovalStatus] =
    useState("");

  const [reviewersData, setReviewersData] = useState([]);

  // const currentUserDesignation = user?.employee_info?.designation;
  const currentUserEmail = user?.employee_info?.email;
  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager"];

  // eslint-disable-next-line no-unused-vars
  const CurrentUserCanNotifyEmployees = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

  // Fetch Batch Status:
  const fetchBatchStatus = useCallback(() => {
    axiosInstance
      .get("/api/v1/batches.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: 1,
          limit: 400,
        },
      })
      .then((res) => {
        const AllBatches = res?.data?.data?.batches;

        const currentBatch = AllBatches?.filter(
          (data) => data?.batch?.id === +id
        );

        const status =
          currentBatch[0]?.batch?.status.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          ) || currentBatch[0]?.batch?.status;

        const notification = currentBatch[0]?.batch?.payslip_notification;

        setCurrentBatchApprovalStatus(status);
        setNotificationSent(notification);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, notificationSent]);

  useEffect(() => {
    fetchBatchStatus();
  }, [fetchBatchStatus]);

  // Fetch Payroll Totals:
  const fetchPayrollTotals = useCallback(async () => {
    setLoadingTotals(true);
    try {
      const res = await axiosInstance.get(
        `/api/v1/total_monthly_salary.json?month=${currMonth}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = res?.data?.data?.total_monthly_salary;
      setTotals(resData);
      setLoadingTotals(false);
    } catch (error) {
      const component = "Payslip Totals | ";
      ErrorHandler(error, component);
      setLoadingTotals(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPayrollTotals();
  }, [fetchPayrollTotals]);

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
          name: nameSearch ? nameSearch : null,
          // office_type: officeType ? officeType : null,
          // office_id: officeId?.id ? officeId?.id : null,
          prorate: prorateFilter ? prorateFilter : null,
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

          designation: e?.user?.designation,
          bank_name: e?.user?.bank_name || "Not Available",
          bank_account_number: e?.user?.bank_account_number,

          basic: e?.slip?.basic,
          medical: e?.slip?.medical,
          housing: e?.slip?.housing,
          transport: e?.slip?.transport,
          otherAllowances: e?.slip?.other_allowances,
          monthlySalary: e?.slip?.monthly_salary,

          tax: e?.slip?.monthly_income_tax,
          pension: e?.slip?.monthly_pension,
          attendance_deduction: e?.slip?.attendance_deduction,
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
  }, [
    id,
    nameSearch,
    officeId?.id,
    officeType,
    page,
    prorateFilter,
    sizePerPage,
  ]);

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
          limit: 10000,
          batch_id: id,
        },
      });

      const responseData = response?.data?.data?.slips;

      // console.log("Original slip:", responseData);

      const formatted = responseData.map((data) => ({
        EMPLOYEE: data?.user?.first_name + " " + data?.user?.last_name,
        OGID: data?.user?.ogid,
        DESIGNATION: data?.user?.designation.toUpperCase(),
        EMAIL: data?.user?.email,
        "BANK DETAILS": data?.user?.bank_account_number
          ? data?.user?.bank_account_number + ` (${data?.user?.bank_name})`
          : "Not Available",

        BASIC: helper.handleMoneyFormat(data?.slip?.basic),
        MEDICAL: helper.handleMoneyFormat(data?.slip?.medical),
        HOUSING: helper.handleMoneyFormat(data?.slip?.housing),
        TRANSPORT: helper.handleMoneyFormat(data?.slip?.transport),
        "OTHER ALLOWANCES": helper.handleMoneyFormat(
          data?.slip?.other_allowances
        ),
        "MONTHLY SALARY": helper.handleMoneyFormat(data?.slip?.monthly_salary),

        "MONTHLY INCOME TAX": helper.handleMoneyFormat(
          data?.slip?.monthly_income_tax
        ),
        "MONTHLY PENSION": helper.handleMoneyFormat(
          data?.slip?.monthly_pension
        ),
        "ATTENDANCE DEDUCTION": helper.handleMoneyFormat(
          data?.slip?.attendance_deduction
        ),
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

      // console.log("download this:", formatted);

      setLoadingCSV(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoadingCSV(false);
    }
  };

  // Handle Notify Employees:
  const handleNotifyEmployees = async () => {
    setLoadingSendMails(true);

    try {
      const response = await axiosInstance.post(
        `/api/v1/send_payslip_emails.json?batch_id=${id}`
      );

      const responseData = response?.data?.data?.message;
      showAlert(
        true,
        `${
          notificationSent
            ? "Payslip Email Has Been Resent Successfully"
            : responseData
        }`,
        "alert alert-success"
      );
      setLoadingSendMails(false);
      fetchBatchStatus();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoadingSendMails(false);
    }
  };

  // Handle Notify Staff:
  const handleNotifyStaff = async (staff) => {
    setLoadingSendMail(true);

    const staffName = staff?.employee;
    const employeeId = staff?.user?.ogid;
    setNotifyFor(employeeId);

    try {
      const response = await axiosInstance.post(
        `/api/v1/send_payslip_emails.json?batch_id=${id}&ogid=${employeeId}`
      );

      const responseData = response?.data?.data?.message;
      showAlert(
        true,
        `${staffName + " " + responseData}`,
        "alert alert-success"
      );
      setLoadingSendMail(false);
      goToTop();
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoadingSendMails(false);
      goToTop();
    }
  };

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

        const thisApprover = data.find(
          (data) => data?.email === currentUserEmail
        );

        const currentApproverEmail = sortedData?.email;

        setApprover(thisApprover);
        setCurrentApproverEmail(currentApproverEmail);
      })
      .catch((error) => {
        console.error("Error fetching approvers data | ", error);
      });
  }, [currentUserEmail, id]);

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
    if (refreshApproversData) {
      fetchApproversData();
    }

    fetchApproversData();
    fetchReviewersData();
  }, [fetchApproversData, id, refreshApproversData]);

  // Handle Name Search:
  const handleKeydownNameSearch = (e) => {
    if (e.key === "Enter") {
      setNameSearch(e.target.value);
    }
  };

  const columns = [
    {
      dataField: "employee",
      text: "Employee",
      idDataField: "ogid",
    },
    {
      dataField: "designation",
      text: "Designation",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "bank_account_number",
      text: "Bank Details",
      idDataField: "bank_name",
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
      dataField: "attendance_deduction",
      text: "Attendance Deduction",
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

  return (
    <>
      <div className="page-header" style={{ marginBottom: "50px" }}>
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
            {data?.length > 0 ? (
              <>
                <button
                  className="btn add-btn"
                  style={{ marginRight: "20px" }}
                  data-toggle="modal"
                  data-target="#PayrollApprovalModal"
                >
                  <i className="fa fa-check"></i> Payroll Approval Report
                </button>

                {reviewersData?.length &&
                currentApproverEmail === currentUserEmail &&
                currentBatchApprovalStatus !== "Approved" ? (
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

        {/* Card | Totals */}
        <div className="hr-employee-card-group" style={{ marginTop: "50px" }}>
          <CardSection
            title="Total Tax"
            value={totals?.monthly_income_tax}
            loading={loadingTotals}
            helper={helper}
          />
          <CardSection
            title="Total Pension"
            value={totals?.monthly_pension}
            loading={loadingTotals}
            helper={helper}
          />
          <CardSection
            title="Total Net Salary"
            value={totals?.net_pay}
            loading={loadingTotals}
            helper={helper}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 payroll_search_div">
          {/* Name Search */}
          <div className="payroll-custom-search">
            <input
              className="custom-payroll-search-input"
              style={{
                backgroundColor: "#ffffff",
                margin: "0 10px 0 1rem",
              }}
              type="search"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeydownNameSearch}
            />

            <button
              className="btn btn-secondary custom-search-btn"
              onClick={() => {
                setName("");
                setNameSearch("");
                setPage(1);
              }}
            >
              Clear
            </button>
          </div>

          {/* Office Type */}
          {/* <div className="col-md-2">
            <label htmlFor="officeType">Filter By</label>
            <Select
              options={selectOfficeTypes}
              isSearchable={true}
              value={{
                value: officeType,
                label: officeType.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                ),
              }}
              onChange={(e) => {
                setOfficeType(e?.value);
                setOfficeId("");
              }}
              style={{ display: "inline-block" }}
            />
          </div> */}

          {/* Office */}
          {/* <div className="col-md-3">
            <label htmlFor="office_id">
              {officeType.replace(/\b\w/g, (char) => char.toUpperCase()) ||
                "Office"}
            </label>
            <Select
              options={
                officeType === "department"
                  ? selectDepartments
                  : officeType === "campaign"
                  ? selectCampaigns
                  : null
              }
              isSearchable={true}
              value={{
                value: officeId?.id,
                label: officeId?.title,
              }}
              onChange={(e) => setOfficeId({ id: e?.value, title: e?.label })}
              style={{ display: "inline-block" }}
            />
          </div> */}

          {/* Prorate */}
          <div className="col-md-2">
            <label htmlFor="office_id">Prorate</label>
            <Select
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              isSearchable={true}
              value={{
                value: prorateFilter,
                label: prorateFilter ? "Yes" : "No",
              }}
              onChange={(e) => setProrateFilter(e?.value)}
              style={{ display: "inline-block" }}
            />
          </div>

          {/* Reset */}
          {/* <div className="payroll-custom-search">
            <button
              className="btn btn-secondary custom-search-btn"
              onClick={() => {
                setName("");
                setNameSearch("");
                setOfficeType("");
                setOfficeId({
                  id: "",
                  title: "",
                });
                setProrateFilter("");
                setPage(1);
              }}
            >
              Reset
            </button>
          </div> */}
        </div>

        <div className="col-md-12">
          <div className="payroll_action_btn_div">
            <button
              className="btn btn-primary"
              style={{ margin: "0 0 1rem 1rem" }}
              onClick={handleBackToBatchTable}
            >
              <i
                className="fa fa-chevron-left"
                style={{ marginRight: "10px" }}
              ></i>
              Back to Batch Table
            </button>

            <div>
              {currentApproverEmail === currentUserEmail &&
              currentBatchApprovalStatus !== "Approved" &&
              approver.stage > 1 ? (
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  style={{ margin: "0 1rem 1rem 0" }}
                  data-target="#EmployeePayslipUploadModal"
                  onClick={() => setToggleUploadModal(true)}
                >
                  <i
                    className="fa fa-upload"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Update Slips
                </button>
              ) : null}

              {loadingCSV ? (
                <button
                  className="btn btn-primary"
                  style={{ margin: "0 1rem 1rem 0" }}
                >
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    pulse
                    style={{ marginRight: "10px" }}
                  />
                  Downloading...
                </button>
              ) : approver.stage > 1 ? (
                <button
                  className="btn btn-primary"
                  style={{ margin: "0 1rem 1rem 0" }}
                  onClick={handleExportCSV}
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Download Slips
                </button>
              ) : null}

              {currentBatchApprovalStatus === "Approved" &&
              CurrentUserCanNotifyEmployees ? (
                <>
                  {loadingSendMails ? (
                    <button
                      className="btn btn-primary"
                      style={{ margin: "0 1rem 1rem 0" }}
                    >
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        pulse
                        style={{ marginRight: "10px" }}
                      />
                      {notificationSent
                        ? "Resending slips..."
                        : "Sending slips..."}
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{ margin: "0 1rem 1rem 0" }}
                      onClick={handleNotifyEmployees}
                    >
                      <i
                        className="fa fa-envelope"
                        style={{ marginRight: "10px" }}
                      ></i>
                      {notificationSent ? "Resend Slips" : "Notify Employees"}
                    </button>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <EmployeeSalaryTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            columns={columns}
            viewAction={true}
            regenerate={true}
            actionTitle="View"
            loadingSendMail={loadingSendMail}
            handleNotifyStaff={handleNotifyStaff}
            notifyFor={notifyFor}
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
            fetchPayrollTotals={fetchPayrollTotals}
            currentApproverEmail={currentApproverEmail}
            currentBatchApprovalStatus={currentBatchApprovalStatus}
          />
        </div>
      </div>

      <PayrollApprovalModal refreshApproversData={refreshApproversData} />

      <RequestReviewModal
        setRefreshApproversData={setRefreshApproversData}
        reviewersData={reviewersData}
      />

      {toggleUploadModal && (
        <div>
          <EmployeePayslipUpload
            setToggleUploadModal={setToggleUploadModal}
            title="Upload Payslips"
            url={`/api/v1/csv_salary_slips_upload/${referenceId}.json`}
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
            fetchPayrollTotals={fetchPayrollTotals}
            fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
          />
        </div>
      )}
    </>
  );
};

export default EmployeePayroll;
