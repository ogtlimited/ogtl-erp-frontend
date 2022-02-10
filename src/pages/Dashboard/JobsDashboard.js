import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDashboardCard from "../../components/JobDashboard/JobDashboardCard";
import JobDashboardOverviewLatest from "../../components/JobDashboard/JobDashboardOverviewLatest";
import RecruitmentSupervision from "../../components/JobDashboard/RecruitmentSupervision";
import axiosInstance from "../../services/api";

const JobDashboard = () => {
  const [data, setData] = useState(null);

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
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Job Dashboard</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/" class="">
                  Dashboard
                </Link>
              </li>
              <li class="breadcrumb-item">Jobs</li>
              <li class="breadcrumb-item active">Job Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <JobDashboardCard data={data} />
      <JobDashboardOverviewLatest data={data} />
      <RecruitmentSupervision />
    </>
  );
};

export default JobDashboard;
