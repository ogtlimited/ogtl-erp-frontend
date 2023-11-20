import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";

const StatusCard = ({ color, backgroundColor, count, label, loading }) => (
  <div className="rep-siever-status-card">
    <div className="card-body">
      <span className="rep-widget-icon" style={{ color, backgroundColor }}>
        <i className="las la-bullseye"></i>
      </span>
      <div className="rep-card-info">
        {loading ? (
          <h3>
            <lord-icon
              src="https://cdn.lordicon.com/xjovhxra.json"
              trigger="loop"
              colors="primary:#121331,secondary:#08a88a"
            ></lord-icon>
          </h3>
        ) : (
          <h3>{count || 0}</h3>
        )}
      </div>
    </div>
    <span>{label}</span>
  </div>
);

const RepSieverAdmin = () => {
  const { id, employee } = useParams();
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [interviewRecords, setInterviewRecords] = useState({});
  const [processRecords, setProcessRecords] = useState({});

  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const CurrentUserRoles = user?.employee_info?.roles;

  const fetchAllRepSieversTaskOverview = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_dashboard/rep_sievers_tasks_overview/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            start_date: fromDate,
            end_date: toDate,
          },
        }
      );

      const records = response?.data?.data?.records;
      setInterviewRecords(records?.interview_status || {});
      setProcessRecords(records?.process_status || {});
      setLoading(false);
    } catch (error) {
      ErrorHandler(error, "Rep Sievers Task Overview | ");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, id, toDate]);

  useEffect(() => {
    fetchAllRepSieversTaskOverview();
  }, [fetchAllRepSieversTaskOverview]);

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
              <li className="breadcrumb-item active">Job Siever</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hr-filter-select col-12">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              name="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control "
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="toDate">To</label>
            <input
              type="date"
              name="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control "
            />
          </div>
        </div>
      </div>

      <h4>Process Status</h4>
      <div className="rep-siever-status-group">
        <StatusCard
          color="#009efb"
          backgroundColor="#009efb4d"
          count={processRecords["Open"]}
          label="Open"
          loading={loading}
        />
        <StatusCard
          color="#ffbc34"
          backgroundColor="#ffbc344d"
          count={processRecords["Sieving"]}
          label="Sieving"
          loading={loading}
        />
        <StatusCard
          color="#007bff"
          backgroundColor="#007bff4d"
          count={processRecords["Phone screening"]}
          label="Phone screening"
          loading={loading}
        />
        <StatusCard
          color="#289745"
          backgroundColor="#2897454d"
          count={processRecords["Interview scheduled"]}
          label="Interview scheduled"
          loading={loading}
        />
      </div>

      <h4>Interview Status</h4>
      <div className="rep-siever-status-group">
        <StatusCard
          color="#009efb"
          backgroundColor="#009efb4d"
          count={interviewRecords["Open"]}
          label="Open"
          loading={loading}
        />
        <StatusCard
          color="#289745"
          backgroundColor="#2897454d"
          count={interviewRecords["Scheduled for interview"]}
          label="Scheduled for interview"
          loading={loading}
        />
        <StatusCard
          color="#6c757d"
          backgroundColor="#6c757d4d"
          count={interviewRecords["Not interested"]}
          label="Not interested"
          loading={loading}
        />
        <StatusCard
          color="#343240"
          backgroundColor="#3432404d"
          count={interviewRecords["Not a graduate"]}
          label="Not a graduate"
          loading={loading}
        />
        <StatusCard
          color="#8e8e8e"
          backgroundColor="#8e8e8e4d"
          count={interviewRecords["Not in job location"]}
          label="Not in job location"
          loading={loading}
        />
        <StatusCard
          color="#f62d51"
          backgroundColor="#f62d514d"
          count={interviewRecords["Failed screening"]}
          label="Failed screening"
          loading={loading}
        />
        <StatusCard
          color="#0093fb"
          backgroundColor="#0093fb4d"
          count={interviewRecords["Missed call"]}
          label="Missed call"
          loading={loading}
        />
        <StatusCard
          color="#ffc107"
          backgroundColor="#ffc1074d"
          count={interviewRecords["Call back"]}
          label="Call back"
          loading={loading}
        />
      </div>
    </>
  );
};

export default RepSieverAdmin;
