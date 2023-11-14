/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { LeaveTypeForm } from "../../../components/FormJSON/CreateLeaveTypes";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { LeaveTypeFormModal } from "../../../components/Modal/LeaveTypeFormModal";

const LeaveType = () => {
  const [AllLeaveType, setAllLeaveType] = useState([]);
  const { user, ErrorHandler } = useAppContext();
  const [mode, setMode] = useState("Create");
  const [leaveType, setLeaveType] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = [
    "hr_manager",
    "senior_hr_associate",
    "hr_associate",
  ];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  // All Leave Types:
  const fetchAllLeaveTypes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/leave_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.types;

      const formatted = resData.map((e, idx) => ({
        ...e,
        index: idx + 1,
        leave_type: e?.title,
      }));

      setAllLeaveType(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Leave Type Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaveTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    setMode("Create");
    setLeaveType(LeaveTypeForm);
  };

  const handleEdit = (row) => {
    setLeaveType(row);
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
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "70%" },
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
              data-target="#LeaveTypeFormModal"
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
            <h3 className="page-title">Leave Types</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leave</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#LeaveTypeFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Leave Type
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row  ">
        <UniversalTable
          data={AllLeaveType}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <LeaveTypeFormModal
        mode={mode}
        data={leaveType}
        handleRefresh={fetchAllLeaveTypes}
      />
    </>
  );
};

export default LeaveType;
