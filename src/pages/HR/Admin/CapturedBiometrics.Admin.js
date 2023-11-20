/* eslint-disable no-unused-vars */
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CapturedBiometricsTable from "../../../components/Tables/EmployeeTables/capturedBiometricsTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";

const CapturedBiometricsAdmin = () => {
  const { ErrorHandler } = useAppContext();
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [totalCapturedBiometrics, setTotalCapturedBiometrics] = useState(0);

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

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      setAllEmployees(resData);
      setLoading(false);
    } catch (error) {
      const component = "Captured Biometrics | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  // Total Captured Employees:
  const fetchTotalBiometrics = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/total_biometrics.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.message;
      setTotalCapturedBiometrics(resData);
      setLoading(false);
    } catch (error) {
      const component = "Total Captured Biometrics | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCapturedEmployees();
    fetchTotalBiometrics();

    setTimeout(() => {
      setLoading(false);
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAllCapturedEmployees]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Captured Biometrics</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Biometrics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hr-employee-card-group">
        <div className="hr-dashboard-card">
          <span>Total Biometrics Captured</span>
          <div className="card-body">
            <span className="biometrics-widget-icon">
              <lord-icon
                src="https://cdn.lordicon.com/bdwluond.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </span>
            <div className="card-info">
              <h3>{totalCapturedBiometrics}</h3>
            </div>
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
