/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import { PayrollDatesModal } from "../../components/Modal/PayrollDatesModal";

const PayrollDatesForm = {
  from_date: "",
  to_date: ""
};

const PayrollDates = () => {
  const { user, allPayDates, loadingPayday, setLoadingPayday, fetchAllPayrollDates } =
    useAppContext();
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

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
      headerStyle: { width: "30%" }
    },
    {
      dataField: "paydayRange",
      text: "Payday Range",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <>
          {allPayDates.slice(0, 1)[0] === row ? (
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
      )
    },
    {
      dataField: "created_by",
      text: "Created By",
      sort: true,
      headerStyle: { width: "30%" }
    }
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
          data={allPayDates}
          columns={columns}
          loading={loadingPayday}
          setLoading={setLoadingPayday}
        />
      </div>

      <PayrollDatesModal mode={mode} data={dates} />
    </>
  );
};

export default PayrollDates;
