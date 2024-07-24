// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import DeductionTable from "../Tables/DeductionTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddDeductionModal } from "../Modal/AddDeductionModal";
import { useNavigate } from "react-router-dom";
import helper from "../../services/helper";
import secureLocalStorage from "react-secure-storage";

const Deductions = () => {
  const navigate = useNavigate();
  const {
    ErrorHandler,
    user,
    getAvatarColor,
    loadingPayday,
    deductionFromDate,
    setDeductionFromDate,
    deductionToDate,
    setDeductionToDate,
    fetchAllPayrollDates
  } = useAppContext();
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const persistedFromDate = useMemo(
    () => secureLocalStorage.getItem("deductionFrom"),
    []
  );
  const persistedToDate = useMemo(
    () => secureLocalStorage.getItem("deductionTo"),
    []
  );

  const [fromDate, setFromDate] = useState(deductionFromDate);
  const [toDate, setToDate] = useState(deductionToDate);

  useEffect(() => {
    fetchAllPayrollDates();

    setFromDate(deductionFromDate);
    setToDate(deductionToDate);
  }, [deductionFromDate, deductionToDate, fetchAllPayrollDates]);

  const fetchDeductions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/v1/deductions.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          start_date: persistedFromDate || fromDate,
          end_date: persistedToDate || toDate
        }
      });

      const resData = response?.data?.data?.deductions;

      const formattedData = resData.map((item) => {
        return {
          ...item,
          employeeName: item?.name || "N/A",
          employeeId: item?.ogid,
          office: item?.office,
          totalDeductions:
            helper.handleMoneyFormat(item?.total_deductions) || "-"
        };
      });

      setDeductions(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Deduction Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchDeductions();
  }, [fetchDeductions]);

  const columns = [
    {
      dataField: "employeeName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <div>
            {value} <span>{row?.employeeId}</span>
          </div>
        </h2>
      )
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>
    },
    {
      dataField: "totalDeductions",
      text: "Total Deduction",
      sort: true,
      headerStyle: { width: "20%" }
    },
    CurrentUserCanCreateAndEdit && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              onClick={() =>
                navigate(
                  `/dashboard/payroll/staff-deductions/${row.ogid}/${
                    persistedFromDate || fromDate
                  }/${persistedToDate || toDate}`
                )
              }
            >
              View Deductions
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="tab-pane" id="tab_deductions">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#AddDeductionModal"
              >
                Add Deduction
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <DeductionTable
          data={deductions}
          setData={setDeductions}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          loadingPayday={loadingPayday}
          // date={date}
          // setDate={setDate}
        />
      </div>

      <AddDeductionModal fetchDeductions={fetchDeductions} />
    </div>
  );
};

export default Deductions;
