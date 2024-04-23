/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import { PayrollDatesModal } from "../../components/Modal/PayrollDatesModal";
import moment from "moment";

const PayrollDatesForm = {
  from_date: "",
  to_date: "",
};

const generateOrdinal = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  const lastDigit = day % 10;
  const suffixes = ["st", "nd", "rd"];
  const suffix = suffixes[lastDigit - 1] || "th";

  return `${day}${suffix}`;
};

const PayrollDates = () => {
  const [allDates, setallDates] = useState([]);
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const currentMonth = moment().format("MMMM");
  const previousMonth = moment().subtract(1, "months").format("MMMM");

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  // All Payroll Dates:
  const fetchAllPayrollDates = useCallback(async () => {
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
        paydayRange: `${generateOrdinal(
          data?.from_date
        )} ${previousMonth} - ${generateOrdinal(
          data?.to_date
        )} ${currentMonth}`,
      }));

      setallDates(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Payroll Dates Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, previousMonth]);

  useEffect(() => {
    fetchAllPayrollDates();
  }, [fetchAllPayrollDates]);

  const handleCreate = () => {
    setMode("Create");
    setDates(PayrollDatesForm);
  };

  const columns = [
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "paydayRange",
      text: "Payday Range",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <>
          {allDates.slice(0, 1)[0] === row ? (
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
      dataField: "created_by",
      text: "Created By",
      sort: true,
      headerStyle: { width: "30%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Payroll Generation Days</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Payroll</li>
              <li className="breadcrumb-item active">Payday</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#PayrollDatesModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Payday
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row  ">
        <UniversalTable
          data={allDates}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <PayrollDatesModal
        mode={mode}
        data={dates}
        fetchAllPayrollDates={fetchAllPayrollDates}
      />
    </>
  );
};

export default PayrollDates;
