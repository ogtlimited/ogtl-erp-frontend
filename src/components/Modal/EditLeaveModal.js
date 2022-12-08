/** @format */

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { LeaveApplicationFormJSON } from '../FormJSON/HR/Leave/application';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import LeaveJSON from '..//..//pages/HR/Users/allShift.json';

export const EditLeaveModal = ({ allLeaves }) => {
  const { showAlert } = useAppContext();
  const [leave, setLeave] = useState(allLeaves);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("Edit this details:", allLeaves)

  const fetchYourLeaves = async () => {
    try {
      // const response = axios.get(
      //   'https://my.api.mockaroo.com/leave_model.json?key=9ae185d0'
      // );
      const resData = LeaveJSON;
      // const resData = response?.data;
      console.log('all leaves to get my leaves:', resData);
      setLeave(resData);

    } catch (error) {
      console.log(error);
    }
  };
  
  const handleFormChange = (e) => {
    e.preventDefault();
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log('Create this Leave:', leave);
    // try {
    //   const res = await axiosInstance.post('api/clients-accounts/client-account', leave);
    //   const resData = res.data.data;

    //   console.log("created account", resData)

    //   // setClientAccount(resData);
    //   // showAlert(true, 'Account created successfully', 'alert alert-success');
    //   // onClick();
    //   $('#FormModal').modal('toggle');
    // } catch (error) {
    //   console.log(error);
    //   // onClick();
    //   $('#FormModal').modal('toggle');
    // }
    setLoading(false);
  };

  useEffect(() => {
    const fetchLeavesType = () => {
      const types = LeaveApplicationFormJSON.Fields[0].options;
      setLeaveType(types);
    };
    fetchLeavesType();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Leave Application
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateAccount}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="from_date">From Date</label>
                      <input
                        type="date"
                        name="from_date"
                        value={leave.from_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="to_date">To Date</label>
                      <input
                        type="date"
                        name="to_date"
                        value={leave.to_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="leave_type_id">Leave Type</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="leave_type_id"
                        required
                      >
                        <option value="" disabled selected hidden>
                          Select leave type...
                        </option>
                        {leaveType.map((leave, idx) => (
                          <option
                            key={idx}
                            value={leave.value}
                            placeholder="Leave Type"
                          >
                            {leave.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reason_for_application">
                        Reason
                      </label>
                      <textarea
                        name="reason_for_application"
                        className="form-control "
                        value={leave.reason_for_application}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
 
                <div>
                  <input
                    value={(leave.employee_id = user?._id)}
                    style={{ display: 'none' }}
                  />
                  <input
                    value={(leave.project_id = user?.projectId)}
                    style={{ display: 'none' }}
                  />
                  <input
                    value={(leave.department_id = user?.department?._id)}
                    style={{ display: 'none' }}
                  />
                  <input
                    value={(leave.leave_approver = user?.reports_to)}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
