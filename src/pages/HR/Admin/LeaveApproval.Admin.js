/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import departments from "../../../db/departments.json";

import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link, useNavigate } from "react-router-dom";
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
import  secureLocalStorage  from  "react-secure-storage";

const LeaveApproval = () => {
  const navigate = useNavigate();
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

  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];

  const [allDepartments, setallDepartments] = useState([]);

  const fetchDept = () => {
    settemplate(departmentFormJson);
    axiosInstance.get("/department").then((e) => {
      setallDepartments(e?.data?.data);
      setunfiltered(e?.data?.data);
      const departOpts = e.data.data.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      setDepartmentOts(departOpts);
    });
  };

  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row);
    console.log(formatted);
    setmode("edit");
    seteditData(formatted);
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
    }
    setmode("add");
    setformValue(initialValues);
    seteditData(initialValues);
  };

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setallDepartments(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.department));

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
      if (mode === "add") {
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

  const deleteDepartment = (row) => {
    axiosInstance
      .delete(`/department/${row._id}`)
      .then((res) => {
        fetchDept();
        setallDepartments((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const handleDepartmentSwitch = (row) => {
    secureLocalStorage.setItem("department", row.department);
    navigate(`/dashboard/hr/leave-approvals/department/${row._id}`)
  }

  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { width: "85%" },
    },
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { width: "10%" },
    //   formatter: (value, row) => (
    //     <div className="dropdown dropdown-action text-right">
    //       <a
    //         href="#"
    //         className="action-icon dropdown-toggle"
    //         data-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
    //       </a>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         {user?.role?.hr?.update && (
    //           <a
    //             className="dropdown-item"
    //             onClick={() => editRow(row)}
    //             href="#"
    //             data-toggle="modal"
    //             data-target="#FormModal"
    //           >
    //             <i className="fa fa-pencil m-r-5"></i> Edit
    //           </a>
    //         )}

    //         {user?.role?.hr?.delete && (
    //           <a
    //             className="dropdown-item"
    //             onClick={() => setdeleteData(row)}
    //             href="#"
    //             data-toggle="modal"
    //             data-target="#exampleModal"
    //           >
    //             <i className="fa fa-trash m-r-5"></i> Delete
    //           </a>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
    {
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
              data-target="#generalModal"
              // onClick={() => {
              //   setmodalType('view-details');
              //   setViewRow(row);
              // }}
              onClick={() => handleDepartmentSwitch(row)}
            >
              View
            </button>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <>
    <AddLeaveApprovalLevelModal />
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leave Approval</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
                // onClick={() => create()}
              >
                <i className="fa fa-plus"></i> Add Approval Level
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={departMentOpts}
            placeholder="Filter Departments"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDepartments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      {/* departmentFormJson */}
      <FormModal2
        title="Create Approval Level"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
      <ConfirmModal
        title="Department"
        selectedRow={deleteData}
        deleteFunction={deleteDepartment}
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

export default LeaveApproval;
