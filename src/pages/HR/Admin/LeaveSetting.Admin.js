import React from "react";
import { Link } from "react-router-dom";

const LeaveSettingAdmin = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Leave Settings</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leave Settings</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card leave-box" id="leave_annual">
            <div className="card-body">
              <div className="h3 card-title with-switch">
                Annual
              
              </div>
              <div className="leave-item">
                <div className="leave-row">
                  <div className="leave-left">
                    <div className="input-box">
                      <div className="form-group">
                        <label>Days</label>
                        <input type="text" className="form-control" disabled="" />
                      </div>
                    </div>
                  </div>
                  <div className="leave-right">
                    <button className="leave-edit-btn">Edit</button>
                  </div>
                </div>
                <div className="leave-row">
                  <div className="leave-left">
                    <div className="input-box">
                      <label className="d-block">Carry forward</label>
                      <div className="leave-inline-form">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="carry_no"
                            disabled=""
                            value="option1"
                          />
                          <label className="form-check-label" for="carry_no">
                            No
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="carry_yes"
                            disabled=""
                            value="option2"
                          />
                          <label className="form-check-label" for="carry_yes">
                            Yes
                          </label>
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">Max</span>
                          </div>
                          <input type="text" className="form-control" disabled="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="leave-right">
                    <button className="leave-edit-btn">Edit</button>
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
