// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";
import { PayrollDatesModal } from "../../components/Modal/PayrollDatesModal";
import UniversalPaginatedTable from "./../../components/Tables/UniversalPaginatedTable";
import secureLocalStorage from "react-secure-storage";
import ProgressBar from "../../components/Modal/ProgressBar";

const PayrollBatches = () => {
  const {
    user,
    ErrorHandler,
    showAlert,
    getAvatarColor,
    payday,
    loadingPayday,
    currentPaydayData,
    fetchAllPayrollDates
  } = useAppContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRegenerating, setisRegenerating] = useState(false);
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);

  const [poolingData, setPoolingData] = useState({
    processedPayslips: null,
    expectedPayslips: null
  });

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const currentUserOgid = user?.employee_info?.ogid;
  const CurrentUserRoles = user?.employee_info?.roles;
  const isAuthorized = ["hr_manager", "payroll_processor"];

  const CurrentUserIsAuthorized = CurrentUserRoles.some((role) =>
    isAuthorized.includes(role)
  );

  useEffect(() => {
    fetchAllPayrollDates();
  }, [fetchAllPayrollDates]);

  // Fetch Payroll Batches:
  const fetchAllBatches = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/v1/batches.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: page,
          limit: sizePerPage
        }
      })
      .then((res) => {
        const AllBatches = res?.data?.data?.batches;
        const dataPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = dataPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = AllBatches?.map((e) => ({
          ...e,
          id: e?.batch?.id,
          approved: e?.batch?.approved ? "Yes" : "No",
          status:
            e?.batch?.status &&
            e?.batch?.status.replace(/\b\w/g, (char) => char.toUpperCase()),
          title: e?.batch?.title,
          stage: e?.batch?.stage,
          employeeName:
            e?.current_processor?.first_name +
            " " +
            e?.current_processor?.last_name,
          ogid: e?.current_processor?.ogid,
          designation: e?.current_processor?.designation,
          referenceId: e?.batch?.reference_id,
          bank3DBatchId: e?.batch?.bank3D_batch_id
        }));

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = "Payroll Batch Error | ";
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllBatches();
  }, [fetchAllBatches]);

  // Payslip Pooling:
  const handlePayslipPooling = useCallback(async () => {
    const month = secureLocalStorage.getItem("payslipMonth");
    const year = secureLocalStorage.getItem("payslipYear");

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axiosInstance.get(
        `/api/v1/processed_payslips_progress.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      const resData = res?.data?.data?.record;
      // console.log("pull this", resData);

      setPoolingData({
        processedPayslips: resData?.processed_payslips,
        expectedPayslips: resData?.expected_payslips
      });
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handlePayslipPooling();
    // console.log("processedPayslips poll???", poolingData?.processedPayslips);

    if (poolingData?.processedPayslips !== poolingData?.expectedPayslips) {
      const intervalId = setInterval(() => {
        handlePayslipPooling();
      }, 10000);

      return () => clearInterval(intervalId);
    } else {
      return;
    }
  }, [
    handlePayslipPooling,
    poolingData?.expectedPayslips,
    poolingData?.processedPayslips
  ]);

  const handleRegeneratePayroll = async () => {
    const batchId = data[0]?.id;
    const month = data[0]?.batch?.month;
    const year = data[0]?.batch?.year;

    secureLocalStorage.setItem("payslipMonth", month);
    secureLocalStorage.setItem("payslipYear", year);

    setisRegenerating(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axiosInstance.patch(
        `api/v1/regenerate_salary_slips/${batchId}.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      const msg = res?.data?.data?.message;

      showAlert(true, msg, "alert alert-success");
      fetchAllBatches();
      handlePayslipPooling(month, year);
      setisRegenerating(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setisRegenerating(false);
    }
  };

  // Handle Edit:
  const handleEdit = (e) => {
    setDates(currentPaydayData);
    setMode("Edit");
  };

  // Handle View Salary Slips:
  const handleViewSalarySlips = async (row) => {
    navigate(
      `/dashboard/payroll/payroll-processing/batch-slips/${row?.batch?.reference_id}/${row?.id}/${row?.batch?.month}/${row?.batch?.year}`
    );
  };

  // Handle Approve Batch:
  const handleApprove = async (row) => {
    setLoading(true);

    const batchId = row?.id;

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axiosInstance.put(
        `api/v1/approve_batch/${batchId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      fetchAllBatches();
      showAlert(true, "Successfully Approved Batch!", "alert alert-success");

      setLoading(false);
    } catch (error) {
      showAlert(true, error.response.data.errors, "alert alert-warning");

      console.error("Error:", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      dataField: "employeeName",
      text: "Current Processor",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.ogid}</span>
          </Link>
        </h2>
      )
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "referenceId",
      text: "Reference ID",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "bank3DBatchId",
      text: "Batch ID",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {value === "Approved" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-success"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value}
            </span>
          ) : (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-primary"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value}
            </span>
          )}
        </>
      )
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "100%" }
    },
    {
      dataField: "stage",
      text: "Stage",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i
              className="fa fa-dot-circle-o text-info"
              style={{ marginRight: "10px" }}
            ></i>{" "}
            {value}
          </span>
        </>
      )
    },
    CurrentUserIsAuthorized && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "auto" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-secondary"
              data-toggle="modal"
              onClick={() => handleViewSalarySlips(row)}
            >
              Salary Slips
            </button>

            {currentUserOgid === row?.ogid && row?.status !== "Approved" ? (
              <div className="leave-user-action-btns">
                <button
                  className="btn btn-sm btn-primary"
                  data-toggle="modal"
                  onClick={() => handleApprove(row)}
                >
                  Approve Batch
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {user?.employee_info?.roles.includes("ceo") ? (
        <div className="alert alert-primary sliding-text" role="alert">
          {loadingPayday ? null : (
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
          )}
        </div>
      ) : (
        <div className="payroll_alert_container">
          {loadingPayday ? null : (
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
                  Payroll is generated for the {payday || "25th"}
                </span>
                <span className="pl-3">
                  {" "}
                  | &nbsp; You can click the generate button to generate payroll
                  for the current month
                </span>
              </div>
            </div>
          )}

          {CurrentUserIsAuthorized && !loadingPayday ? (
            <a
              className="edit-icon payday"
              data-toggle="modal"
              data-target="#PayrollDatesModal"
              onClick={handleEdit}
            >
              <i className="fa fa-pencil"></i>
            </a>
          ) : null}
        </div>
      )}

      <div className="page-header" style={{ marginBottom: "100px" }}>
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payroll Batches</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Payroll</li>
              <li className="breadcrumb-item active">Payroll Processing</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {!data?.length ||
            (data?.length &&
              user?.role?.title !== "CEO") ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#GeneratePayrollModal"
              >
                <i className="fa fa-plus"></i> Generate Payroll
              </a>
            ) : null}

            {data?.length &&
            data[0]?.stage === 1 &&
            data[0]?.status === "Pending" ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#RegeneratePayrollModal"
                style={{ marginRight: "1rem" }}
                onClick={handleRegeneratePayroll}
              >
                {isRegenerating ? "Regenerating..." : "Regenerate Slips"}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {poolingData.processedPayslips ? (
        <ProgressBar
          processedPayslips={poolingData?.processedPayslips}
          expectedPayslips={poolingData?.expectedPayslips}
        />
      ) : null}

      <div className="row">
        <div className="col-md-12">
          <UniversalPaginatedTable
            data={data}
            columns={columns}
            loading={loading}
            setLoading={setLoading}
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
        fetchAllBatches={fetchAllBatches}
        payday={payday}
        handlePayslipPooling={handlePayslipPooling}
      />

      <PayrollDatesModal mode={mode} data={dates} />
    </>
  );
};

export default PayrollBatches;
