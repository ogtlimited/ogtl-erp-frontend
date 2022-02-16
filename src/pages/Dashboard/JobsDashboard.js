import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDashboardCard from "../../components/JobDashboard/JobDashboardCard";
import JobDashboardOverviewLatest from "../../components/JobDashboard/JobDashboardOverviewLatest";
import RecruitmentSupervision from "../../components/JobDashboard/RecruitmentSupervision";
import axiosInstance from "../../services/api";

const JobDashboard = () => {
  const [data, setData] = useState(null);
  const [empStats, setEmpStats] = useState([]);

  useEffect(() => {
    const fetchJobDashboard = () => {
      axiosInstance
        .get("/job-dashboard")
        .then((res) => {
          setData(res.data.jobData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchJobDashboard();
  }, []);

  useEffect(() => {
    const fetchEmStats = () => {
      axiosInstance
        .get("/employees/employees/stats")
        .then((res) => {
          setEmpStats(res.data.employees);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchEmStats();
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Job Dashboard</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">Jobs</li>
              <li className="breadcrumb-item active">Job Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <JobDashboardCard data={data} />
      <JobDashboardOverviewLatest data={data} empStats={empStats} />
      <RecruitmentSupervision />
    </>
  );
};

export default JobDashboard;
