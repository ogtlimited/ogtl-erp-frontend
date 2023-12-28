// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { GeneratePayrollModal } from "../../components/Modal/GeneratePayrollModal";
import { PayrollDatesModal } from "../../components/Modal/PayrollDatesModal";
import UniversalPaginatedTable from "./../../components/Tables/UniversalPaginatedTable";

const PayrollBatches = () => {
  const { user, ErrorHandler, showAlert, getAvatarColor } = useAppContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);

  const [payday, setPayday] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");

  const currentUserOgid = user?.employee_info?.ogid;
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
        const AllBatches = res?.data?.data?.batches;
        const totalPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = AllBatches?.map((e) => ({
          ...e,
          id: e?.batch?.id,
          approved: e?.batch?.approved ? "Yes" : "No",
          status: e?.batch?.status.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          ),
          title: e?.batch?.title,
          stage: e?.batch?.stage,
          employeeName:
            e?.current_processor?.first_name +
            " " +
            e?.current_processor?.last_name,
          ogid: e?.current_processor?.ogid,
          referenceId: e?.batch?.reference_id,
          bank3DBatchId: e?.batch?.bank3D_batch_id,
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
    fetchAllBatches();
  }, [fetchAllBatches]);

  // Handle Edit:
  const handleEdit = (e) => {
    setDates(currentData);
    setMode("Edit");
  };

  // Handle View Salary Slips:
  const handleViewSalarySlips = async (row) => {
    console.log(row?.id);
    navigate(`/dashboard/payroll/payroll-processing/batch-slips/${row?.id}`);
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
            "ngrok-skip-browser-warning": "69420",
          },
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
      text: "Employee",
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
      ),
    },
    {
      dataField: "referenceId",
      text: "Reference ID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "bank3DBatchId",
      text: "Batch ID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "approved",
      text: "Approved",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <>
          {value === "Yes" ? (
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
                className="fa fa-dot-circle-o text-secondary"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value}
            </span>
          )}
        </>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "100%" },
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
      ),
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

            {
              console.log({
                currentUserOgid,
                row,
              })
            }

            {currentUserOgid === row?.ogid ? (
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
            <h3 className="page-title">Payroll Batches</h3>
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
          </div>
        </div>
      </div>

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

      <GeneratePayrollModal fetchAllBatches={fetchAllBatches} />

      <PayrollDatesModal
        mode={mode}
        data={dates}
        fetchAllPayrollDates={fetchAllPayrollDates}
      />
    </>
  );
};

export default PayrollBatches;
