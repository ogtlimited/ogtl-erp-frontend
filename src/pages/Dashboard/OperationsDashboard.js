// *IN USE - FIXED!

import React, { useState, useEffect } from "react";
import DashboardChart from "../../components/charts/dashboard-charts";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

const OperationsDashboard = () => {
  const { ErrorHandler } = useAppContext();
  const [resignationByGenderLabel, setResignationByGenderLabel] = useState([]);
  const [resignationByGenderData, setResignationByGenderData] = useState([]);
  const [resignationStatusLabel, setResignationStatusLabel] = useState([]);
  const [resignationStatusData, setResignationStatusData] = useState([]);
  const [resignationReasonLabel, setResignationReasonLabel] = useState([]);
  const [resignationReasonData, setResignationReasonData] = useState([]);

  // Resignation Report:
  const fetchResignationReport = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/hr_dashboard/resignations.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const { gender_count, status, reason } =
        response?.data?.data?.resignations;

      // Gender:
      const genders = gender_count.map((item) => item.gender);
      const resignationCounts = gender_count.map(
        (item) => item.resignation_count
      );

      setResignationByGenderLabel(genders);
      setResignationByGenderData(resignationCounts);

      // Status:
      const statusLabels = Object.keys(status);
      const statusData = Object.values(status);

      setResignationStatusLabel(statusLabels);
      setResignationStatusData(statusData);

      // Reason:
      const reasonLabels = Object.keys(reason);
      const reasonData = Object.values(reason);

      setResignationReasonLabel(reasonLabels);
      setResignationReasonData(reasonData);
    } catch (error) {
      const component = "Resignation Report | ";
      ErrorHandler(error, component);
    }
  };

  useEffect(() => {
    fetchResignationReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Operations Dashboard</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <DashboardChart
          resignationByGenderLabel={resignationByGenderLabel}
          resignationByGenderData={resignationByGenderData}
          resignationStatusLabel={resignationStatusLabel}
          resignationStatusData={resignationStatusData}
          resignationReasonLabel={resignationReasonLabel}
          resignationReasonData={resignationReasonData}
        />
      </div>
    </div>
  );
};

export default OperationsDashboard;
