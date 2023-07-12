import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { RoleFormModal } from "../../components/Modal/RoleFormModal";
import UniversalTable from "../../components/Tables/UniversalTable";
import moment from "moment"
import { RoleForm } from "../../components/FormJSON/CreateRole";

const RolePermission = () => {
  const { user } = useAppContext();
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllRoles();
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
            {val}
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
    //         {CurrentUserRoles.includes("hr_manager") && (
    //           <a
    //             className="dropdown-item"
    //             href="#"
    //             data-toggle="modal"
    //             data-target="#DesignationFormModal"
    //             onClick={() => handleEdit(row)}
    //           >
    //             <i className="fa fa-pencil m-r-5"></i> Edit
    //           </a>
    //         )}

    //         {CurrentUserRoles.includes("hr_manager") && (
    //           <a
    //             className="dropdown-item"
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
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Roles &amp; Permissions</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Settings</li>
              <li className="breadcrumb-item active">Roles</li>
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
