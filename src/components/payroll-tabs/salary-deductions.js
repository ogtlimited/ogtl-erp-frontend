// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import DeductionTable from "../Tables/DeductionTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddDeductionModal } from "../Modal/AddDeductionModal";
import { useNavigate } from "react-router-dom";
import helper from "../../services/helper";

const Deductions = () => {
  const navigate = useNavigate();
  const { ErrorHandler, user } = useAppContext();
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [date, setDate] = useState(
    `${currentYear}-${currentMonth.toString().padStart(2, "0")}`
  );

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchDeductions = useCallback(async () => {
    const month = date.split("-")[1];
    const year = date.split("-")[0];

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/deductions.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.deductions;

      const formattedData = resData.map((item) => {
        return {
          ...item,
          employeeName: item?.name || "N/A",
          employeeId: item?.ogid,
          office: item?.office,
          totalDeductions:
            helper.handleMoneyFormat(item?.total_deductions) || "-",
        };
      });

      setDeductions(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Deduction Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    fetchDeductions();
  }, [fetchDeductions]);

  const columns = [
    {
      dataField: "employeeName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <div>
            {row?.employeeName} <span>{row?.employeeId}</span>
          </div>
        </h2>
      ),
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "totalDeductions",
      text: "Total Deduction",
      sort: true,
      headerStyle: { width: "15%" },
    },
    CurrentUserCanCreateAndEdit && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              onClick={() =>
                navigate(
                  `/dashboard/payroll/staff-deductions/${row?.ogid}/${
                    date.split("-")[1]
                  }/${date.split("-")[0]}`
                )
              }
            >
              View Deductions
            </button>
          </div>
        </div>
      ),
    },
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
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          date={date}
          setDate={setDate}
        />
      </div>

      <AddDeductionModal fetchDeductions={fetchDeductions} />
    </div>
  );
};

export default Deductions;
