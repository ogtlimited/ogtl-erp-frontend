import React from "react";

const Stats = () => {
	const pWidth = {
        width: '60%'
      }
  return (
    <div class="col-md-4">
      <div class="card att-statistics">
        <div class="card-body">
          <h5 class="card-title">Statistics</h5>
          <div class="stats-list">
            <div class="stats-info">
              <p>
                Today{" "}
                <strong>
                  3.45 <small>/ 8 hrs</small>
                </strong>
              </p>
              <div class="progress">
                <div
                  class="progress-bar bg-primary"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stats-info">
              <p>
                This Week{" "}
                <strong>
                  28 <small>/ 40 hrs</small>
                </strong>
              </p>
              <div class="progress">
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stats-info">
              <p>
                This Month{" "}
                <strong>
                  90 <small>/ 160 hrs</small>
                </strong>
              </p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stats-info">
              <p>
                Remaining{" "}
                <strong>
                  90 <small>/ 160 hrs</small>
                </strong>
              </p>
              <div class="progress">
                <div
                  class="progress-bar bg-danger"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stats-info">
              <p>
                Overtime <strong>4</strong>
              </p>
              <div class="progress">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  style={pWidth}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
