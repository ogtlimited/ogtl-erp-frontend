
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../../components/Tables/UniversalTable";
import { RoleForm } from "../../components/FormJSON/CreateRole";
import { AddRoleUserModal } from "../../components/Modal/AddRoleUserModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const EmployeeRoles = () => {
  const { user } = useAppContext();
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

  //Revoke user role
  const revokeUserRole = (row) => {
    console.log("Revoking user role", row);
    // axiosInstance
    //   .delete(`/api/jobOpening/${row._id}`)
    //   .then((res) => {
    //     setData((prevData) =>
    //       prevData.filter((pdata) => pdata._id !== row._id)
    //     );
    //     showAlert(true, res.data.message, 'alert alert-info');
    //   })
    //   .catch((error) => {
    //     showAlert(true, error.response.data.message, 'alert alert-danger');
    //   });
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
      console.log("Users under role:", resData);

      const formattedRoleUsers = resData.map((e) => ({
        ...e,
        fullName: e.first_name + " " + e.last_name,
      }));

      setAllRoleUsers(formattedRoleUsers);
    } catch (error) {}
  }, [id]);

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
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setSelectedRow(row);
                }}
              >
                <i className="fa fa-trash m-r-5"></i> Revoke
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
