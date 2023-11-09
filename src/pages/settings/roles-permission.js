import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { RoleFormModal } from "../../components/Modal/RoleFormModal";
import UniversalTable from "../../components/Tables/UniversalTable";
import moment from "moment";
import { RoleForm } from "../../components/FormJSON/CreateRole";

const RolePermission = () => {
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [allRoles, setAllRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mode, setMode] = useState("Create");

  const CurrentUserRoles = user?.employee_info?.roles;

  const handleCreate = () => {
    setMode("Create");
    setRoles(RoleForm);
  };

  const fetchAllRoles = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/roles.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.roles;

      const formattedRoles = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setAllRoles(formattedRoles);
    } catch (error) {
      const component = "Roles Error:";
      ErrorHandler(error, component);
    }
  };

  useEffect(() => {
    fetchAllRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      dataField: "title",
      text: "Roles",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/settings/roles-permissions/users/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val.split("_").join(" ").toUpperCase()}
          </Link>
        </p>
      ),
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Roles</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Settings</li>
              <li className="breadcrumb-item active">Roles & Permissions</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#RolesFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Role
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalTable
          data={allRoles}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <RoleFormModal mode={mode} data={roles} fetchAllRoles={fetchAllRoles} />
    </>
  );
};

export default RolePermission;
