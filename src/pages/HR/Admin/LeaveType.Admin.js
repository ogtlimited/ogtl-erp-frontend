/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { LeaveTypeFormModal } from "../../../components/Modal/LeaveTypeFormModal";

const LeaveType = () => {
  const [AllLeaveType, setAllLeaveType] = useState([]);
  const { user } = useAppContext();
  const [mode, setMode] = useState("Create");
  const [editLeaveType, setEditLeaveType] = useState([]);

  const actionUser = user?.employee_info?.roles

  // All Leave Types:
  const fetchAllLeaveTypes = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/leave_types.json', {
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
    } catch (error) {
      console.log("All Leave Types error:", error);
    }
  };

  useEffect(() => {
    fetchAllLeaveTypes();
  }, []);  

  const handleEdit = (row) => {
    setEditLeaveType(row);
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
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {actionUser.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#LeaveTypeFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {actionUser.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-trash m-r-5"></i> Delete
              </a>
            )}
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
            <h3 className="page-title">Leaves Types</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">HR</Link>
              </li>
              <li className="breadcrumb-item active">Leave Types</li>
            </ul>
          </div>
          {/* <div className="col-auto float-right ml-auto">
            {actionUser.includes("hr_manager") && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Leave Type
              </a>
            )}
          </div> */}
        </div>
      </div>
      <div className="row  ">

        <UniversalTable
          data={AllLeaveType}
          columns={columns}
        />
      </div>

      <LeaveTypeFormModal
        mode={mode}
        data={editLeaveType}
        fetchAllLeaveTypes={fetchAllLeaveTypes} />
    </>
  );
};

export default LeaveType;
