import React from "react";
import { Link } from "react-router-dom";

const LeaveSettingAdmin = () => {
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Leave Settings</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Leave Settings</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card leave-box" id="leave_annual">
            <div class="card-body">
              <div class="h3 card-title with-switch">
                Annual
              
              </div>
              <div class="leave-item">
                <div class="leave-row">
                  <div class="leave-left">
                    <div class="input-box">
                      <div class="form-group">
                        <label>Days</label>
                        <input type="text" class="form-control" disabled="" />
                      </div>
                    </div>
                  </div>
                  <div class="leave-right">
                    <button class="leave-edit-btn">Edit</button>
                  </div>
                </div>
                <div class="leave-row">
                  <div class="leave-left">
                    <div class="input-box">
                      <label class="d-block">Carry forward</label>
                      <div class="leave-inline-form">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="carry_no"
                            disabled=""
                            value="option1"
                          />
                          <label class="form-check-label" for="carry_no">
                            No
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="carry_yes"
                            disabled=""
                            value="option2"
                          />
                          <label class="form-check-label" for="carry_yes">
                            Yes
                          </label>
                        </div>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Max</span>
                          </div>
                          <input type="text" class="form-control" disabled="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="leave-right">
                    <button class="leave-edit-btn">Edit</button>
                  </div>
                </div>
                
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveSettingAdmin;
