/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect, useContext } from "react";

import departments from "../../../db/designationList.json";
import { leaveType } from "../../../components/FormJSON/HR/Employee/leaveType";
import list from "../../../designation.json";
import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import Select from "react-select";
import dates from "./dates.json";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import helper from "../../../services/helper";
import ConfirmDeleteLeaveTypeModal from "../../../components/Modal/ConfirmDeleteLeaveTypeModal";
import { AddLeaveTypeModal } from '../../../components/Modal/AddLeaveType';
let qualityFilter;

const LeaveType = () => {
  const [leaveType, setAllLeaveType] = useState([]);
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [template, settemplate] = useState({});
  const [designationOpts, setDesignationOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [typeToDelete, setTypeToDelete] = useState([]);
  const [mode, setmode] = useState("add");

  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
    }
    setmode("add");
    setformValue(initialValues);
    seteditData(initialValues);
  };
  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row);
    setmode("edit");
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const fetchLeaveType = () => {
    axiosInstance.get("/leave-type").then((res) => {
      const resData = res?.data?.data
      console.log("All Leave types", resData)
      setAllLeaveType(resData);
      setunfiltered(resData);
      const depsigOpts = resData.map((e) => {
        return {
          label: e.leave_type,
          value: e._id,
        };
      });
      setDesignationOts(depsigOpts);
    });
  };

  useEffect(() => {
    fetchLeaveType();
  }, []);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setAllLeaveType(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => {
        return i.label.includes(e.leave_type);
      });

      setAllLeaveType(filt);
    }
  };

  useEffect(() => {
    fetchLeaveType();

    // setallDepartments(departments);
  }, [formValue]);

  const deleteLeaveType = (row) => {
    setTypeToDelete(row)
  };

  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: { width: "70%" },
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },    {
      dataField: '',
      text: 'Actions',
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: '70px', textAlign: 'center' },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => deleteLeaveType(row)}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
    <AddLeaveTypeModal fetchLeaveType={fetchLeaveType} />
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leave Types</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Leave Type
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={designationOpts}
            placeholder="Filter Leave Type"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={leaveType}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2
        title="Create Leave Type"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
      <ConfirmDeleteLeaveTypeModal
        title="Leave Type"
        typeToDelete={typeToDelete}
        fetchLeaveType={fetchLeaveType}
      />
    </>
  );
};

export default LeaveType;
