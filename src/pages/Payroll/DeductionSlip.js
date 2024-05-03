// *IN USE

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import moment from "moment";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import DeductionReversalModal from "./../../components/Modal/DeductionReversalModal";

const DeductionSlip = () => {
  const { id, month, year } = useParams();
  const { user, ErrorHandler } = useAppContext();
  const [owner, setOwner] = useState({});
  const [allDeductions, setAllDeductions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchDeductionSlip = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/deductions/${id}.json?month=${month}&year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = res?.data?.data;

      const formattedData = resData.map((item) => {
        return {
          ...item,
          deductionDate: moment(item?.deduction?.date_processed)
            .utc()
            .format("YYYY-MM-DD (Do MMM.) - h:mma"),
          deductionType: item?.deduction_type[0].title
            ?.replace(/_/g, " ")
            ?.replace(/^./, (str) => str.toUpperCase())
            ?.replace(/\b\w/g, (char) => char.toUpperCase()),

          deductionDescription:
            item?.deduction?.category === "disciplinary"
              ? item?.deduction_type[0]?.description
              : item?.deduction?.description ||
                item?.deduction_type[0]?.description,

          deductionCategory: item?.deduction?.category?.replace(
            /\b\w/g,
            (char) => char.toUpperCase()
          ),
          deductionStatus: item?.deduction?.status ? "Active" : "Inactive",
          deductionAmount: helper.handleMoneyFormat(item?.deduction?.amount),
        };
      });

      setAllDeductions(formattedData);

      const owner = resData[0]?.user;
      setOwner(owner);

      setLoading(false);
    } catch (error) {
      const component = "Deduction Breakdown:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, month, year]);

  useEffect(() => {
    fetchDeductionSlip();
  }, [fetchDeductionSlip]);

  const columns = [
    {
      dataField: "deductionDate",
      text: "Date Processed",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionType",
      text: "Title",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "deductionDescription",
      text: "Description",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionCategory",
      text: "Category",
      sort: true,
      headerStyle: { width: "10%" },
    },
    {
      dataField: "deductionAmount",
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
    CurrentUserCanCreateAndEdit && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <div className="text-center">
          {row?.deductionStatus === "Active" ? (
            <div className="leave-user-action-btns">
              <button
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#DeductionReversalFormModal"
                onClick={() => setSelectedRow(row)}
              >
                Reverse Deduction
              </button>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
      {allDeductions.length ? (
        <div className="col" style={{ marginBottom: "50px" }}>
          <h4 className="page-title">
            {owner?.full_name} |{" "}
            <span className="payroll_month_indicator">Deduction Breakdown</span>
          </h4>
          <ul className="breadcrumb">
            <li className="">{owner?.ogid}</li>{" "}
            <span style={{ marginLeft: "10px", marginRight: "10px" }}>|</span>
            <li className="breadcrumb-item active">{owner?.designation}</li>
          </ul>
        </div>
      ) : null}

      <div className="row">
        <UniversalTable
          data={allDeductions}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <DeductionReversalModal
        selectedRow={selectedRow}
        fetchDeductions={fetchDeductionSlip}
      />
    </>
  );
};

export default DeductionSlip;
