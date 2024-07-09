// *IN USE

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAppContext } from "../../../Context/AppContext";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import UniversalTable from "../../../components/Tables/UniversalTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import helper from "../../../services/helper";

function SalaryCard({ iconSrc, label, amount }) {
  return (
    <div className="salary_card_container">
      <div className="salary_card_icon_div">
        <lord-icon
          src={iconSrc}
          trigger="loop"
          colors="primary:#121331,secondary:#0253cc"
          style={{ width: "20px", height: "20px" }}
        ></lord-icon>
      </div>
      <p>{label}</p>
      <h2>{amount}</h2>
    </div>
  );
}

const PayrollUser = () => {
  const navigate = useNavigate();

  const { FontAwesomeIcon, faSpinner, ErrorHandler } = useAppContext();
  const [loadingSalary, setLoadingSalary] = useState(false);
  const [loadingPayslips, setLoadingPayslips] = useState(false);
  const [allPayslips, setAllPayslips] = useState([]);
  const [salary, setSalary] = useState([]);

  // const [page, setPage] = useState(1);
  // const [sizePerPage, setSizePerPage] = useState(10);
  // const [totalPages, setTotalPages] = useState("");

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [today, setToday] = useState(null);

  const isEncrypted = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    const today_date = moment().utc().format("yyyy-MM-DD");
    setToday(today_date);
  }, []);

  // Salary:
  const fetchSalary = useCallback(async () => {
    setLoadingSalary(true);

    try {
      const response = await axiosInstance.get(`/api/v1/salary_details.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.salary;

      // console.log("Staff Salary", resData);

      setSalary(resData);
      setLoadingSalary(false);
    } catch (error) {
      const component = "Staff Salary | ";
      ErrorHandler(error, component);
      setLoadingSalary(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSalary();
  }, [fetchSalary]);

  const handleAction = (row) => {
    navigate(`/dashboard/payroll/payslip/breakdown`,{
      state: row
    });
  };

  // Payslips:
  const fetchPayslips = useCallback(async () => {
    setLoadingPayslips(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/employee_salary_slips.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            // pages: page,
            // limit: sizePerPage,
            start_date: fromDate,
            end_date: toDate,
          },
        }
      );
      const resData = response?.data?.data?.salary_slips;
      // const totalPages = response?.data?.data?.pages;

      // const thisPageLimit = sizePerPage;
      // const thisTotalPageSize = totalPages;

      // setSizePerPage(thisPageLimit);
      // setTotalPages(thisTotalPageSize);

      const formattedData = resData?.map((e) => ({
        ...e,
        id: e?.slip?.id,

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
        totalDeductions: e?.slip?.total_deductions || e?.slip?.monthly_income_tax + e?.slip?.monthly_pension + e?.slip?.attendance_deduction + e?.slip?.disciplinary_deductions,
        netPay: e?.slip?.net_pay,

        payslipMonthAndYear: `${moment().month(e?.slip?.salary_month - 1).format("MMMM")}, ${e?.slip?.year}`,

        prorate: e?.slip?.prorate ? "Yes" : "No",
      }));

      setAllPayslips(formattedData);
      setLoadingPayslips(false);
    } catch (error) {
      const component = "Staff Payslips | ";
      ErrorHandler(error, component);
      setLoadingPayslips(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  const columns = [
    {
      dataField: "payslipMonthAndYear",
      text: "Payslip",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowances",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "monthlySalary",
      text: "Gross Salary",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "tax",
      text: "Tax",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "pension",
      text: "Pension",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "attendance_deduction",
      text: "Attendance Deduction",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "disciplinary_deductions",
      text: "Disciplinary Deduction",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "totalDeductions",
      text: "Total Deductions",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    {
      dataField: "netPay",
      text: "Net Salary",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => <h2>{helper.handleMoneyFormat(value, isEncrypted)}</h2>,
    },
    // {
    //   dataField: "prorate",
    //   text: "Prorate",
    //   sort: true,
    //   headerStyle: { width: "100%" },
    // },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button className="btn btn-sm btn-info" 
              onClick={() => handleAction(row)}>View</button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="employee_salary_section">
        <p>Net Salary</p>
        <div className="employee_salary_section_top_div">
          <h1>
            {loadingSalary ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                pulse
                style={{ marginTop: "5px", fontSize: "20px" }}
              />
            ) : (
              helper.handleMoneyFormat(salary?.net_pay, isEncrypted)
            )}
          </h1>
          <p>
            {moment(fromDate).utc().format("MMMM DD, YYYY")} -{" "}
            {moment(toDate).utc().format("MMMM DD, YYYY")}
          </p>
        </div>

        <div className="employee_salary_section_cards">
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/kxockqqi.json"
            label="Gross"
            amount={
              loadingSalary ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  pulse
                  style={{ marginTop: "5px", fontSize: "20px" }}
                />
              ) : (
                helper.handleMoneyFormat(salary?.monthly_salary, isEncrypted)
              )
            }
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/iawrhwdo.json"
            label="Basic"
            amount={
              loadingSalary ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  pulse
                  style={{ marginTop: "5px", fontSize: "20px" }}
                />
              ) : (
                helper.handleMoneyFormat(salary?.basic, isEncrypted)
              )
            }
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/nkfxhqqr.json"
            label="Tax"
            amount={
              loadingSalary ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  pulse
                  style={{ marginTop: "5px", fontSize: "20px" }}
                />
              ) : (
                helper.handleMoneyFormat(
                  salary?.monthly_income_tax,
                  isEncrypted
                )
              )
            }
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/wyqtxzeh.json"
            label="Pension"
            amount={
              loadingSalary ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  pulse
                  style={{ marginTop: "5px", fontSize: "20px" }}
                />
              ) : (
                helper.handleMoneyFormat(salary?.monthly_pension, isEncrypted)
              )
            }
          />
        </div>
      </div>

      {loadingSalary ? null : (
        <div className="emp_salary_alert_container">
          <div
            className="alert alert-primary sliding-text payroll_alert_left emp_salary_alert_slider"
            role="alert"
          >
            <div>
              <span className="salary_span">
                <p>Other Allowances</p>
                <h3>
                  {helper.handleMoneyFormat(
                    salary?.other_allowances,
                    isEncrypted
                  )}
                </h3>
              </span>
              <BsDot className="emp_salary_BsDot" />
              <span className="salary_span">
                <p>Housing</p>
                <h3>
                  {helper.handleMoneyFormat(salary?.housing, isEncrypted)}
                </h3>
              </span>
              <BsDot className="emp_salary_BsDot" />
              <span className="salary_span">
                <p>Medical</p>
                <h3>
                  {helper.handleMoneyFormat(salary?.medical, isEncrypted)}
                </h3>
              </span>
              <BsDot className="emp_salary_BsDot" />
              <span className="salary_span">
                <p>Transport</p>
                <h3>
                  {helper.handleMoneyFormat(salary?.transport, isEncrypted)}
                </h3>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="row col-md-6">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control "
                max={today}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control "
                max={today}
              />
            </div>
          </div>
        </div>

        <UniversalTable
          data={allPayslips}
          columns={columns}
          loading={loadingPayslips}
          setLoading={setLoadingPayslips}
          // page={page}
          // setPage={setPage}
          // sizePerPage={sizePerPage}
          // setSizePerPage={setSizePerPage}
          // totalPages={totalPages}
          // setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
};

export default PayrollUser;
