/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CapturedBiometricsTable from "../../../components/Tables/EmployeeTables/capturedBiometricsTable";
import axiosInstance from "../../../services/api";

const CapturedBiometricsAdmin = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // Captured Employees:
  const fetchAllCapturedEmployees = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/biometric_enrolled_staff.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: sizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.staff;
      const totalPages = response?.data?.data?.total_pages;
      console.log("Captured Biometrics:", resData);
      
      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);
    
      setAllEmployees(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[page, sizePerPage]);

  useEffect(() => {
    fetchAllCapturedEmployees();

    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [fetchAllCapturedEmployees]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Captured Biometrics</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Employees</li>
            </ul>
          </div>
        </div>
      </div>

      <CapturedBiometricsTable
        data={allEmployees}
        setData={setAllEmployees}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </>
  );
};

export default CapturedBiometricsAdmin;
