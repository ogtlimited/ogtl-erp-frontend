import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";

const RepSieverAdmin = () => {
  const { id } = useParams();
  const { employee } = useParams();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allRepSieverRecords, setAllRepSieversRecords] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;

  // All Rep Sievers Records:
  const fetchAllLeadersSubordinates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/subordinates.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          ogid: id,
        },
      });

      const resData = response?.data?.data?.subordinates;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + " " + e?.last_name,
        };
      });

      setAllRepSieversRecords(mapp);
      setLoading(false);
    } catch (error) {
      console.log("Get All Leaders subordinates error:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAllLeadersSubordinates();
  }, [fetchAllLeadersSubordinates]);

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
            <h3 className="page-title">{employee}</h3>
            <ul className="breadcrumb">
              {CurrentUserRoles.includes("hr_manager") ? (
                <li className="breadcrumb-item">
                  <Link to="/dashboard/recruitment/job-applications">
                    Job Applications
                  </Link>
                </li>
              ) : (
                <li>Job Applications</li>
              )}
              <li className="breadcrumb-item active">Rep Siever</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepSieverAdmin;
