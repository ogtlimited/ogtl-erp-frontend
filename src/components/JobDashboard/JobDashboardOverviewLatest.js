import React from "react";
import JobChart from "./JobChart";

const JobDashboardOverviewLatest = () => {
    const latestJob = [
    {
        title: ' UI Developer',
        posted: '1 Hour ago'
    },
    {
        title: ' Customer Service Agent',
        posted: 'a Day ago'
    },
    {
        title: 'Accountant',
        posted: '2 Days ago'
    },
    {
        title: 'Lawyer',
        posted: '3 Days ago'
    },
    {
        title: 'Software Developer',
        posted: 'a week ago'
    },
]
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 text-center d-flex">
            <div class="card flex-fill">
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <h3 class="card-title">Overview</h3>
                <JobChart />
                {/* <canvas
                  id="lineChart"
                  width="830"
                  height="414"
                  style="display: block; height: 207px; width: 415px;"
                  class="chartjs-render-monitor"
                ></canvas> */}
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex">
            <div class="card flex-fill">
              <div class="card-body">
                <h3 class="card-title text-center">Latest Jobs</h3>
                <ul class="list-group">
                    {latestJob.map( job => (
                    <li class="list-group-item list-group-item-action">
                        {job.title}{" "}
                        <span class="float-end text-sm text-muted">
                        {job.posted}
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
