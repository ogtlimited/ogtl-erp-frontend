// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import DeductionTable from "../Tables/DeductionTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import moment from "moment";

const ReversedDeductions = () => {
  const { ErrorHandler } = useAppContext();
  const [reversedDeductions, setReversedDeductions] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [date, setDate] = useState(`${currentYear}-${currentMonth}`);

  const fetchReversedDeductions = useCallback(async () => {
    const month = date.split("-")[1];
    const year = date.split("-")[0];

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/reversed_deductions.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.reversed_deductions;
      console.log(resData);

      const formattedData = resData.map((item) => {
        return {
          ...item,
          deductionDate: moment(item?.deduction?.created_at).format(
            "ddd. DD MMM, YYYY"
          ),
          employeeName: item?.deduction?.full_name,
          reversedAmount:
            helper.handleMoneyFormat(item?.deduction?.amount) || "-",

          deductionStatus: item?.deduction?.status ? "Active" : "Inactive",
          reversedBy: item?.deduction_reversal[0]?.reversed_by,
          reversalReason: item?.deduction_reversal[0]?.reason,
          reversedOn: moment(item?.deduction_reversal[0]?.created_at).format(
            "ddd. DD MMM, YYYY"
          ),
        };
      });

      setReversedDeductions(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Deduction Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    fetchReversedDeductions();
  }, [fetchReversedDeductions]);

  const columns = [
    {
      dataField: "deductionDate",
      text: "Date",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "employeeName",
      text: "Staff Name",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "reversedAmount",
      text: "Amount",
      sort: true,
      headerStyle: { width: "10%" },
    },
    {
      dataField: "deductionStatus",
      text: "Status",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          {value === "Active" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-secondary"></i> {value}
            </span>
          )}
        </>
      ),
    },
    {
      dataField: "reversedBy",
      text: "Reversed By",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "reversalReason",
      text: "Reason",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "reversedOn",
      text: "Date Reversed",
      sort: true,
      headerStyle: { width: "15%" },
    },
  ];

  return (
    <div className="tab-pane" id="tab_deductions">
      <div style={{ marginBottom: "50px" }}></div>

      <div className="row">
        <DeductionTable
          data={reversedDeductions}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          date={date}
          setDate={setDate}
        />
      </div>
    </div>
  );
};

export default ReversedDeductions;
