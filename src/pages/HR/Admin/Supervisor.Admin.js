/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import LeadersSubordinatesTable from "../../../components/Tables/EmployeeTables/leadersSubordinatesTable";

const SupervisorAdmin = () => {
  const { user, showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [allLeadersSubordinates, setAllLeadersSubordinates] = useState([]);

  // All Leaders Subordinates:
  const fetchAllLeadersSubordinates = useCallback(async () => {
    const supervisorOgid = user?.employee_info?.ogid;
    try {
      const response = await axiosInstance.get("/api/v1/subordinates.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          ogid: supervisorOgid,
        },
      });

      const resData = response?.data?.data?.subordinates;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + " " + e?.last_name,
        };
      });

      setAllLeadersSubordinates(mapp);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, errorMsg, "alert alert-warning");
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.employee_info?.ogid]);

  useEffect(() => {
    fetchAllLeadersSubordinates();
  }, [fetchAllLeadersSubordinates, user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Subordinates</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Subordinates</li>
            </ul>
          </div>
        </div>
      </div>

      <LeadersSubordinatesTable
        data={allLeadersSubordinates}
        setData={setAllLeadersSubordinates}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default SupervisorAdmin;
