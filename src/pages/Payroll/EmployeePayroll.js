// *IN USE

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
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";
import { PayrollApprovalModal } from "../../components/Modal/PayrollApprovalModal";
import csvDownload from "json-to-csv-export";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PayrollDatesModal } from "../../components/Modal/PayrollDatesModal";
import BatchTable from "../../components/Tables/EmployeeTables/Batches/BatchTable";

const EmployeePayroll = () => {
  const { user, ErrorHandler, showAlert } = useAppContext();
  const [generating, setGenerating] = useState(false);
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);

  const [payday, setPayday] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const [showPayrollReport, setShowPayrollReport] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager", "accountant"];

  const CurrentUserIsAuthorized = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

  // Format Generation Dates:
  const generateOrdinal = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    const lastDigit = day % 10;
    const suffixes = ["st", "nd", "rd"];
    const suffix = suffixes[lastDigit - 1] || "th";

    return `${day}${suffix}`;
  };

  // All Paydays:
  const fetchAllPayrollDates = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/payroll_configs.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.payroll_config;

      const formatted = resData.map((data) => ({
        ...data,
        created_at: moment(data.created_at).format("ddd. MMM Do, YYYY"),
        payday: generateOrdinal(data.generation_date),
      }));

      const currentPayday = formatted.slice(0, 1)[0]?.payday;
      const currentData = formatted.slice(0, 1)[0];

      setPayday(currentPayday);
      setCurrentData(currentData);
      setLoading(false);
    } catch (error) {
      const component = "Payroll Dates Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPayrollDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Employee Salary Slip:
  const fetchAllBatches = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/v1/batches.json", {
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
        const Allbatches = res?.data?.data?.batches;
        const totalPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = Allbatches?.map((e) => ({
          ...e,
          id: e?.batch?.id,
          approved: e?.batch?.approved,
          status: e?.batch?.status,
          title: e?.batch?.title,
          stage: e?.batch?.stage,
          lastName: e?.current_processor?.last_name,
          ogid: e?.current_processor?.ogid,
          firstName: e?.current_processor?.first_name,
          referenceId: e?.batch?.reference_id,
          bank3DBatchId: e?.batch?.bank3D_batch_id,
        }));

        setData(formattedData);
        setBatchId(formattedData[0]?.id);
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
    fetchAllBatches();
  }, [fetchAllBatches]);

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

  // Handle Edit:
  const handleEdit = (e) => {
    setDates(currentData);
    setMode("Edit");
  };

  const columns = [
    {
      dataField: "ogid",
      text: "OGID",
    },
    {
      dataField: "lastName",
      text: "Last Name",
    },
    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "referenceId",
      text: "Reference ID",
    },
    {
      dataField: "bank3DBatchId",
      text: "Batch ID",
    },
    {
      dataField: "approved",
      text: "Approved",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "stage",
      text: "Stage",
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
              Payroll is generated on the {payday || "25th"} of every month
            </span>
            <span className="pl-3">
              {" "}
              | &nbsp; You can preview and approve payroll once generated
            </span>
          </div>
        </div>
      ) : (
        <div className="payroll_alert_container">
          <div
            className="alert alert-primary sliding-text payroll_alert_left"
            role="alert"
          >
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
                Payroll is generated on the {payday || "25th"} of every month
              </span>
              <span className="pl-3">
                {" "}
                | &nbsp; You can click the generate button to generate payroll
                for the current month
              </span>
            </div>
          </div>

          {CurrentUserIsAuthorized && (
            <a
              className="edit-icon payday"
              data-toggle="modal"
              data-target="#PayrollDatesModal"
              onClick={handleEdit}
            >
              <i className="fa fa-pencil"></i>
            </a>
          )}
        </div>
      )}

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

            {loadingCSV ? (
              <button className="btn add-btn" style={{ marginRight: "20px" }}>
                <FontAwesomeIcon icon={faSpinner} spin pulse /> Loading...
              </button>
            ) : (
              data?.length > 0 && (
                <>
                  <button
                    className="btn add-btn"
                    style={{ marginRight: "20px" }}
                    onClick={handleExportCSV}
                  >
                    <i className="fa fa-download"></i> Download Report
                  </button>

                  {showPayrollReport && (
                    <button
                      className="btn add-btn"
                      style={{ marginRight: "20px" }}
                      data-toggle="modal"
                      data-target="#PayrollApprovalModal"
                    >
                      <i className="fa fa-check"></i> Payroll Approval Report
                    </button>
                  )}
                </>
              )
            )}

            {/* {user?.role?.title === "CEO" && (
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
            )} */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <BatchTable
            batchColumns={columns}
            batchData={data}
            setLoading={setLoading}
            page={page}
            viewAction={true}
            actionTitle="Salary Slips"
            // totalPages={totalPages}
            loading={loading}
            fetchAllBatches={fetchAllBatches}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            setTotalPages={setTotalPages}
            setBatchId={setBatchId}
            batchId={batchId}
            showPayrollReport={showPayrollReport}
            setShowPayrollReport={setShowPayrollReport}
            // fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
          />
        </div>
      </div>

      <GeneratePayrollModal
        // fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        setGenerating={setGenerating}
      />


      <PayrollApprovalModal setGenerating={setGenerating} batchId={batchId} />

      <PayrollDatesModal
        mode={mode}
        data={dates}
        fetchAllPayrollDates={fetchAllPayrollDates}
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
