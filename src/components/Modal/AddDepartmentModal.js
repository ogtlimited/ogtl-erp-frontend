/** @format */

import React, { useState, useEffect } from 'react';
import { create_department } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';

export const AddDepartmentModal = ({ getAllDepartments }) => {
  const { showAlert } = useAppContext();
  const [createDepartment, setCreateDepartment] =
    useState(create_department);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const cancelEvent = () => {
    setCreateDepartment(create_department);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCreateDepartment({
      ...createDepartment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/department', createDepartment);
      const resData = res.data.data;

      showAlert(
        true,
        'Department created successfully!',
        'alert alert-success'
      );
      setCreateDepartment(create_department);
      $('#DepartmentFormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
    getAllDepartments()
  };

  return (
    <>
      <div
        className="modal fade"
        id="DepartmentFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Create Department
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
              <form onSubmit={handleCreateDepartment}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <input
                        name="department"
                        type="text"
                        className="form-control"
                        value={createDepartment.department}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_approval_level">Highest Leave Approval Level</label>
                      <input
                        name="leave_approval_level"
                        type="number"
                        className="form-control"
                        value={createDepartment.leave_approval_level}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>

              <hr className='horizontal-department-rule'/>
              <h5 style={{marginBottom: "20px"}}>
                Department Shift
              </h5>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="shift_name">Shift Name</label>
                      <input
                        name="shift_name"
                        type="text"
                        className="form-control"
                        value={createDepartment.shift_name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="start_time">Start Time</label>
                      <input
                        name="start_time"
                        type="date"
                        className="form-control"
                        value={createDepartment.start_time}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="end_time">End Time</label>
                      <input
                        name="end_time"
                        type="date"
                        className="form-control"
                        value={createDepartment.end_time}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={cancelEvent}
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
