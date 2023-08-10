// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import { RoleForm } from "../../components/FormJSON/CreateRole";
import { AddRoleUserModal } from "../../components/Modal/AddRoleUserModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const EmployeeRoles = () => {
  const { user, showAlert, ErrorHandler } = useAppContext();
  const { id } = useParams();
  const { title } = useParams();
  const [loading, setLoading] = useState(true);
  const [allRoleUsers, setAllRoleUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [roleUsers, setRoleUsers] = useState([]);
  const [mode, setMode] = useState("Create");

  const CurrentUserRoles = user?.employee_info?.roles;

  const handleCreate = () => {
    setMode("Create");
    setRoleUsers(RoleForm);
  };

  const fetchAllRoleUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/role_users/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.users;

      const formattedRoleUsers = resData.map((e) => ({
        ...e,
        fullName: e.first_name + " " + e.last_name,
      }));

      setAllRoleUsers(formattedRoleUsers);
    } catch (error) {
      const component = "Role Users:";
      ErrorHandler(error, component);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //Revoke user role
  const revokeUserRole = async (row) => {
    const fullName = row.first_name + " " + row.last_name;
    const userId = row?.ogid;
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/remove_user_role/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            role: id,
          },
        }
      );

      showAlert(true, fullName + " removed from role", "alert alert-success");

      fetchAllRoleUsers();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoleUsers();
  }, [fetchAllRoleUsers]);

  const columns = [
    {
      dataField: "fullName",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "35%" },
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "20%" },
    },
    CurrentUserRoles.includes("hr_manager") && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-danger"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              Revoke
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
            <h3 className="page-title">{title}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/settings/roles-permissions">
                  Roles &amp; Permissions
                </Link>
              </li>
              <li className="breadcrumb-item active">Users</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#RoleUserFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add User
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalTable
          data={allRoleUsers}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <AddRoleUserModal roleId={id} fetchRoleUsers={fetchAllRoleUsers} />

      <ConfirmModal
        title="Role Assignment"
        selectedRow={selectedRow}
        deleteFunction={revokeUserRole}
      />
    </>
  );
};

export default EmployeeRoles;
