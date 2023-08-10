import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";

const RepSieverAdmin = () => {
  const { id } = useParams();
  const { employee } = useParams();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allRepSieverRecords, setAllRepSieversRecords] = useState([]);

  let firstDay = moment().startOf("month").format("YYYY-MM-DD");
  let lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);

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

      <div className="hr-filter-select col-12">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              name="fromDate"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
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
              onChange={(e) => {
                setToDate(e.target.value);
              }}
              className="form-control "
            />
          </div>
        </div>
      </div>

      <h4>Process Status</h4>
      <div className="rep-siever-status-group">
        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#009efb", backgroundColor: "#009efb4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>12</h3>
            </div>
          </div>
          <span>Open</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#ffbc34", backgroundColor: "#ffbc344d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>5</h3>
            </div>
          </div>
          <span>Sieving</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#007bff", backgroundColor: "#007bff4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>2</h3>
            </div>
          </div>
          <span>Phone screening</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#289745", backgroundColor: "#2897454d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>0</h3>
            </div>
          </div>
          <span>Interview scheduled</span>
        </div>
      </div>

      <h4>Interview Status</h4>
      <div className="rep-siever-status-group">
        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#009efb", backgroundColor: "#009efb4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>12</h3>
            </div>
          </div>
          <span>Open</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#289745", backgroundColor: "#2897454d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>5</h3>
            </div>
          </div>
          <span>Scheduled for interview</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#6c757d", backgroundColor: "#6c757d4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>2</h3>
            </div>
          </div>
          <span>Not interested</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#343240", backgroundColor: "#3432404d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>0</h3>
            </div>
          </div>
          <span>Not a graduate</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#8e8e8e", backgroundColor: "#8e8e8e4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>1</h3>
            </div>
          </div>
          <span>Not in job location</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#f62d51", backgroundColor: "#f62d514d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>4</h3>
            </div>
          </div>
          <span>Failed screening</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#0093fb", backgroundColor: "#0093fb4d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>3</h3>
            </div>
          </div>
          <span>Missed call</span>
        </div>

        <div className="rep-siever-status-card">
          <div className="card-body">
            <span
              className="rep-widget-icon"
              style={{ color: "#ffc107", backgroundColor: "#ffc1074d" }}
            >
              <i className="las la-bullseye"></i>
            </span>
            <div className="card-info">
              <h3>7</h3>
            </div>
          </div>
          <span>Call back</span>
        </div>
      </div>
    </>
  );
};

export default RepSieverAdmin;
