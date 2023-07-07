/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import departments from "../../../db/departments.json";

import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import { departmentFormJson } from "../../../components/FormJSON/HR/Employee/department";
import FormModal2 from "../../../components/Modal/FormModal2";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import Select from "react-select";
import helper from "../../../services/helper";
import { AddLeaveApprovalLevelModal } from '../../../components/Modal/AddLeaveApprovalLevelModal';
import { create } from "yup/lib/Reference";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import ViewModal from "../../../components/Modal/ViewModal";
import LeaveApprovalContent from "../../../components/ModalContents/LeaveApprovalContent";
import { department } from "../../../constants";
import  secureLocalStorage  from  "react-secure-storage";

const LeaveApprovalView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [template, settemplate] = useState({});
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [departMentOpts, setDepartmentOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState("add");
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [department, setDepartment] = useState('');

  const [allDepartments, setallDepartments] = useState([]);

  const fetchDept = () => {
    const department = secureLocalStorage.getItem('department');
    setDepartment(department);
    axiosInstance.get("/leave-approval-level").then((e) => {
      const resData = e?.data?.data;

      const filtered = resData.filter((e) => e.designation_id.department_id === id)

      const formatted = filtered.map((e) => ({
        ...e,
        designation: e.designation_id.designation,
      }))
      console.log("Filter and formatted for this department", formatted)

      setallDepartments(formatted);
      setunfiltered(formatted);
      const departOpts = formatted.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setDepartmentOts(departOpts);
    });
  };

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setallDepartments(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.designation));

      setallDepartments(filt);
    }
  };

  useEffect(() => {
    fetchDept();
    setallDepartments(departments);
  }, []);

  useEffect(() => {
    if (submitted) {
      console.log(formValue);
      if (mode == "add") {
        axiosInstance
          .post("/department", formValue)
          .then((e) => {
            // setformValue({});
            fetchDept();
            showAlert(true, "New department created", "alert alert-success");
          })
          .catch((err) => {
            // setformValue(null);
            setsubmitted(false);
            console.log(err);
          });
      } else {
        axiosInstance
          .put("/department/" + editData._id, formValue)
          .then((e) => {
            console.log(e);
            setformValue(null);
            showAlert(
              true,
              "Department successfully updated",
              "alert alert-success"
            );
            fetchDept();
          })
          .catch((err) => {
            setformValue(null);
            setsubmitted(false);
            console.log(err);
          });
      }
    }
  }, [formValue]);

  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      headerStyle: { width: "70%" },
    },
    {
      dataField: "approval_level",
      text: "Approval Level",
      sort: true,
      headerStyle: { width: "30%" },
    },
  ];
  
  return (
    <>
    <AddLeaveApprovalLevelModal />
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Approval Level</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">{department}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={departMentOpts}
            placeholder="Filter Designation"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDepartments}
          columns={columns}
        />
      </div>
      <ConfirmModal
        title="Department"
        selectedRow={deleteData}
      />
       {modalType === 'view-details' ? (
        <ViewModal
          title="Leave Approval Level"
          content={<LeaveApprovalContent leaveApprovalContent={viewRow} />}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default LeaveApprovalView;
