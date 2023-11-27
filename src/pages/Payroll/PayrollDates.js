/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import moment from "moment";

const PayrollDates = () => {
  const [allDates, setallDates] = useState([]);
  const { user, ErrorHandler } = useAppContext();
  const [mode, setMode] = useState("Create");
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  // All Payroll Dates:
  const fetchAllPayrollDates = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/payroll_configs.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data;

      console.log("dates", resData)

      // const formatted = resData.map((branch, index) => ({
      //   ...branch,
      //   index: index + 1,
      //   title: branch?.title.toUpperCase(),
      //   state: branch?.state,
      //   country: branch?.country,
      //   created_at: moment(branch?.created_at).format("Do MMMM, YYYY"),
      //   value: branch.id,
      // }));

      // setallBranch(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Branch Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPayrollDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    setMode("Create");
    // setBranch([]);
  };

  const handleEdit = (row) => {
    // setBranch(row);
    setMode("Edit");
  };

  const columns = [
    {
      dataField: "index",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "title",
      text: "Branch",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
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
              data-target="#BranchFormModal"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Payroll Generation Dates</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Payroll</li>
              <li className="breadcrumb-item active">Payroll Dates</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#PayrollDatesFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add Payroll Date
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

      {/* <BranchFormModal
        mode={mode}
        data={branch}
        fetchAllBranches={fetchAllBranches}
      /> */}
    </>
  );
};

export default PayrollDates;
