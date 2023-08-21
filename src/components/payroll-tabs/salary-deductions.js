// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import UniversalTable from "../Tables/UniversalTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddDeductionModal } from "../Modal/AddDeductionModal";
import DeductionReversalModal from "../Modal/DeductionReversalModal";

const Deductions = () => {
  const { ErrorHandler, user } = useAppContext();
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchDeductions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/deductions.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.deductions;

      const formattedData = resData.map((item) => {
        return {
          ...item,
          employeeName: item?.user
            ? item?.user?.first_name + " " + item?.user?.last_name
            : "N/A",
          deductionType: item?.deduction_type?.title,
          deductionStatus: item?.deduction?.status ? "Active" : "Inactive",
          deductionPercentage: item?.deduction_type?.percentage + "%",
        };
      });

      setDeductions(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Deduction Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeductions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      dataField: "employeeName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionType",
      text: "Deduction Type",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionStatus",
      text: "Deduction Status",
      sort: true,
      headerStyle: { width: "15%" },
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
      dataField: "deductionPercentage",
      text: "Deduction Percentage",
      sort: true,
      headerStyle: { width: "15%" },
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
        <UniversalTable
          data={deductions}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <AddDeductionModal fetchDeductions={fetchDeductions} />

      <DeductionReversalModal
        selectedRow={selectedRow}
        fetchDeductions={fetchDeductions}
      />
    </div>
  );
};

export default Deductions;
