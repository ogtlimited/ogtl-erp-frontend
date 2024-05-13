// *IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import { GiMoneyStack } from "react-icons/gi";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
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
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allPayslips, setAllPayslips] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format("yyyy-MM-DD");
    setToday(today_date);
  }, []);

  const currentUserOgid = user?.employee_info?.ogid;

  // Payslips:
  const fetchPayslips = useCallback(async () => {
    setLoading(false);

    try {
      const response = await axiosInstance.get(
        `/api/v1/out_of_office/${currentUserOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: page,
            limit: sizePerPage,
            start_date: fromDate,
            end_date: toDate,
          },
        }
      );
      const resData = response?.data?.data?.out_of_offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedPayslips = resData.map((e) => ({
        ...e,
        enteredBy: e?.entered_by,
        dateCreated: moment(e?.created_at).format("Do MMMM, YYYY"),
        from: moment(e?.start_date).format("Do MMMM, YYYY"),
        to: moment(e?.end_date).format("Do MMMM, YYYY"),
        // deduction: helper.handleMoneyFormat(5000),
      }));

      setAllPayslips(formattedPayslips);
      setLoading(false);
    } catch (error) {
      const component = "Payslips | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, fromDate, toDate]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  const columns = [
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "other_allowances",
      text: "Other Allowances",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "gross_salary",
      text: "Gross Salary",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "tax",
      text: "Tax",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "pension",
      text: "Pension",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "total_deductions",
      text: "Total Deductions",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "net_salary",
      text: "Net Salary",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            {row?.approved ? null : (
              <button className="btn btn-sm btn-success">View</button>
            )}
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
          <h1>₦12,876.50</h1>
          <p>May 01, 2024 - May 31, 2024</p>
        </div>

        <div className="employee_salary_section_cards">
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/kxockqqi.json"
            label="Gross"
            amount="₦15,876.50"
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/iawrhwdo.json"
            label="Tax"
            amount="₦1,000.00"
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/nkfxhqqr.json"
            label="Pension"
            amount="₦1,000.00"
          />
          <SalaryCard
            iconSrc="https://cdn.lordicon.com/wyqtxzeh.json"
            label="Total Deduction"
            amount="₦2,000.00"
          />
        </div>
      </div>

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

        <UniversalPaginatedTable
          data={allPayslips}
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
    </>
  );
};

export default PayrollUser;
