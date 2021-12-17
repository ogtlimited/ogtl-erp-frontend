import React, { useState, useEffect } from "react";
import DesignationList from "../../components/settings/designationList";
import PermissionForm from "../../components/settings/permissionForm";
import axiosInstance from "../../services/api";

const RolePermission = () => {
  const [role, setrole] = useState({});
  const [allRoles, setallRoles] = useState([]);
  const [updated, setupdated] = useState(false)
  const fetchRole = () => {
    axiosInstance.get("/api/role").then((res) => {
      // console.log(res);
      setallRoles(res.data.data);
      setrole(res.data.data[0])
      setupdated(false)
      // setrole(res.data.data[0])
    });
  };
  
  useEffect(() => {
    fetchRole();
  }, []);
  useEffect(() => {
    fetchRole();
  }, [updated]);
  useEffect(() => {
    console.log(role);
  }, [role]);
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Roles &amp; Permissions</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <DesignationList
          setrole={setrole}
          fetchDesignation={fetchRole}
          allDesignation={allRoles}
          setallRoles={setallRoles}
          setupdated={setupdated}
        />
        <PermissionForm role={role} />
      </div>
    </>
  );
};

export default RolePermission;
