import React from "react";

const Timesheet = () => {
  return (
    <div class="col-md-4">
      <div class="card punch-status">
        <div class="card-body">
          <h5 class="card-title">
            Timesheet <small class="text-muted">11 Mar 2019</small>
          </h5>
          <div class="punch-det">
            <h6>Punch In at</h6>
            <p>Wed, 11th Mar 2019 10.00 AM</p>
          </div>
          <div class="punch-info">
            <div class="punch-hours">
              <span>3.45 hrs</span>
            </div>
          </div>
          <div class="punch-btn-section">
            <button type="button" class="btn btn-primary punch-btn">
              Punch Out
            </button>
          </div>
          <div class="statistics">
            <div class="row">
              <div class="col-md-6 col-6 text-center">
                <div class="stats-box">
                  <p>Break</p>
                  <h6>1.21 hrs</h6>
                </div>
              </div>
              <div class="col-md-6 col-6 text-center">
                <div class="stats-box">
                  <p>Overtime</p>
                  <h6>3 hrs</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
