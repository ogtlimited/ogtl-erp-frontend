//* IN USE

import React, { useState, useEffect, useCallback } from "react";
import EmployeeDeductionTable from "../../../components/Tables/EmployeeTables/EmployeeDeductionTable ";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import axiosInstance from "../../../services/api";
import helper from "../../../services/helper";

const EmployeeDeductions = () => {
  const { ErrorHandler } = useAppContext();
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Get Employee Deductions:
  const fetchEmployeeDeductions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/v1/employee_deductions.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            start_date: fromDate,
            end_date: toDate,
          },
        }
      );

      const resData = response?.data?.data?.employee_deductions;

      const formattedData = resData?.map((data) => ({
        ...data,
        deductionCategory: data?.deduction?.category.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
        createdAt: moment(data?.deduction?.created_at)
          .utc()
          .format("YYYY, MM (MMM) Do - h:mma"),
        dataProcessed: moment(data?.deduction?.date_processed)
          .utc()
          .format("YYYY, MM (MMM) Do - h:mma"),
        deductionDescription:
          data?.deduction?.category === "disciplinary"
            ? data?.deduction_type?.description
            : data?.deduction?.description || data?.deduction_type?.description,
        deductionTitle: data?.deduction_type?.title.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
        deductionValue: helper.handleMoneyFormat(data?.deduction?.amount),
      }));

      setDeductions(formattedData);
      setLoading(false);
    } catch (error) {
      ErrorHandler(error, "Staff Deductions | ");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchEmployeeDeductions();
  }, [fetchEmployeeDeductions]);

  const columns = [
    {
      dataField: "deductionTitle",
      text: "Title",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "createdAt",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "dataProcessed",
      text: "Date Processed",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "deductionDescription",
      text: "Description",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "deductionCategory",
      text: "Category",
      sort: true,
      headerStyle: { width: "10%" },
    },
    {
      dataField: "deductionValue",
      text: "Amount",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Deductions</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Deductions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="custom-table-div">
        <EmployeeDeductionTable
          data={deductions}
          setData={setDeductions}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          fromDate={fromDate}
          toDate={toDate}
          today={today}
          setFromDate={setFromDate}
          setToDate={setToDate}
          emptyDataMessage="No Deductions"
        />
      </div>
    </>
  );
};
export default EmployeeDeductions;
