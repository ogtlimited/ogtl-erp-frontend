import React, {useState, useEffect} from "react";
import DesignationList from "../../components/settings/designationList";
import PermissionForm from "../../components/settings/permissionForm";
import axiosInstance from "../../services/api";

const RolePermission = () => {
    const [role, setrole] = useState(null)
    const [allDesignation, setallDesignation] = useState([]);
    const fetchDesignation = () => {
        axiosInstance.get("/designation").then((res) => {
            console.log(res.data.data)
          setallDesignation(res.data.data);
          setrole(res.data.data[0])
        });
      };
      useEffect(() => {
        fetchDesignation();
      }, []);
    useEffect(() => {
        console.log(role)
    }, [role])
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
        <DesignationList setrole={setrole} allDesignation={allDesignation} />
        <PermissionForm role={role} />
      </div>
    </>
  );
};

export default RolePermission;
