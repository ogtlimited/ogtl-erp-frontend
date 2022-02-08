import React from "react";
import JobChart from "./JobChart";
import moment from "moment";

const JobDashboardOverviewLatest = ({ data }) => {
  const latestJob = data?.jobOpenings
    ?.map((e) => {
      return {
        title: e.job_title,
        posted: e.createdAt,
      };
    })
    .reverse()
    .splice(0, 7);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 text-center d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <h3 className="card-title">Overview</h3>
                <JobChart data={data} />
                {/* <canvas
                  id="lineChart"
                  width="830"
                  height="414"
                  style="display: block; height: 207px; width: 415px;"
                  className="chartjs-render-monitor"
                ></canvas> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <h3 className="card-title text-center">Latest Jobs</h3>
                <ul className="list-group">
                  {latestJob.map((job) => (
                    <li className="list-group-item list-group-item-action">
                      {job.title}{" "}
                      <span className="float-end text-sm text-muted">
                        {moment(job.posted).fromNow() ?? "Not Available"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboardOverviewLatest;
