import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from "../../../db/promotion.json";
import { RoleAssignmentForm } from "../../../components/FormJSON/HR/Employee/RoleAssignment";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import tokenService from "../../../services/token.service";

const RoleAssignment = () => {
  const [template, setTemplate] = useState(RoleAssignmentForm);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const user = tokenService.getUser();

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchRoleAssignment = () => {
    axiosInstance
      .get("/api/role-assignment")
      .then((res) => {
        console.log("role thingy", res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchRoleAssignment();
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { employees, allRoles } = res.data.createEmployeeFormSelection;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const roleOpts = allRoles?.map((e) => {
        return {
          label: e.title,
          value: e._id,
        };
      });
      const finalForm = RoleAssignmentForm.Fields.map((field) => {
        if (field.name === "assigned_to") {
          field.options = employeeOpts;
          return field;
        } else if (field.name === "roleId") {
          field.options = roleOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: RoleAssignmentForm.title,
        Fields: finalForm,
      });
      if (!loadSelect) {
        setloadSelect(true);
      }
      console.log(template);
    });
  }, [loadSelect]);

  //create assets
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        let newFormValue = { ...formValue, assigned_by: user._id };
        console.log(newFormValue);
        axiosInstance
          .post("/api/role-assignment", newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchRoleAssignment();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;
        let newFormValue = {
          ...formValue,
          roleId: formValue?.roleId?._id,
          assigned_to: formValue?.assigned_to?._id,
          assigned_by: user._id,
        };

        axiosInstance
          .patch("/api/role-assignment/" + editData._id, newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchRoleAssignment();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
    }
  }, [formValue, editData, user._id]);
  useEffect(() => {
    seteditData(clickedRow);
    return () => {
      seteditData(null);
    };
  }, [clickedRow, submitted]);

  //delete asset
  const deleteAssets = (row) => {
    axiosInstance
      .delete(`/api/role-assignment/${row._id}`)
      .then((res) => {
        console.log(res);
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "RoleId",
      text: "Role",
      sort: true,
      formatter: (value, row) => <h2>{row?.roleId?.title}</h2>,
    },
    {
      dataField: "assigned_to",
      text: "Assigned to",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.assigned_to?.first_name} {row?.assigned_to?.last_name}
        </h2>
      ),
    },
    {
      dataField: "assigned_by",
      text: "Assigned By",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.assigned_by?.first_name} {row?.assigned_by?.last_name}
        </h2>
      ),
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a>
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
            <h3 className="page-title">Role Assignment</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Role Assignment</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Role Assignment
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect && (
        <FormModal2
          title="Create Role Assignment"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Role Assignment"
        selectedRow={selectedRow}
        deleteFunction={deleteAssets}
      />
    </>
  );
};

export default RoleAssignment;
