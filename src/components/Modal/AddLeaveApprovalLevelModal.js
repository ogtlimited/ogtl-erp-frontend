/** @format */

import React, { useState, useEffect } from 'react';
import { create_approval_level } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import  secureLocalStorage  from  "react-secure-storage";

export const AddLeaveApprovalLevelModal = () => {
  const { showAlert } = useAppContext();
  const [approvalLevel, setApprovalLevel] = useState(create_approval_level);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designationInfo, setDesignationInfo] = useState(
    'Select designation ...'
  );
  const user = JSON.parse(secureLocalStorage.getItem('user'));

  const cancelEvent = () => {
    setApprovalLevel(create_approval_level);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setApprovalLevel({ ...approvalLevel, [e.target.name]: e.target.value });

    const id = e.target.value;
    axiosInstance
      .get(`/department-designation/${id}`)
      .then((res) => {
        const resData = res.data.data;
        if (!resData.length) {
          setDesignationInfo('No Designation');
        } else {
          setDesignationInfo('Select designation ...');
          setDesignations(res?.data?.data);
        }
      })
      .catch((error) => {
        console.log('this designation error response:', error.response);
      });
  };

  const handleCreateApprovalLevel = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/leave-approval-level', {
        department_id: approvalLevel.department,
        designation_id: approvalLevel.designation,
        approval_level: +approvalLevel.approval_level,
      });
      const resData = res.data.data;

      showAlert(
        true,
        'Leave approval level created successfully',
        'alert alert-success'
      );
      setApprovalLevel(create_approval_level);
      $('#FormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
  };

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      setDepartments(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
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
                Leave Approval Level
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
              <form onSubmit={handleCreateApprovalLevel}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="department"
                        required
                      >
                        <option value="" disabled selected hidden>
                          Select department ...
                        </option>
                        {departments.map((department, idx) => (
                          <option
                            key={idx}
                            value={department._id}
                            placeholder="Department"
                            required
                          >
                            {department.department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                      <select
                        onChange={handleFormChange}
                        className="form-control "
                        name="designation"
                        required
                      >
                        <option value="" disabled selected hidden>
                          {designationInfo}
                        </option>
                        {designations.map((designation) => (
                          <option
                            key={designation._id}
                            value={designation._id}
                            placeholder="Designation"
                          >
                            {designation.designation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="approval_level">Approval Level</label>
                      <input
                        name="approval_level"
                        type="number"
                        className="form-control"
                        value={approvalLevel.approval_level}
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
