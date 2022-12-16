/** @format */

import React, { useState, useEffect } from 'react';
import { create_designation } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';

export const EditDesignationModal = ({ editDesignation, fetchDesignation }) => {
  const { showAlert } = useAppContext();
  const [createDesignation, setCreateDesignation] =
    useState(create_designation);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const cancelEvent = () => {
    setCreateDesignation(create_designation);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCreateDesignation({
      ...createDesignation,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditDesignation = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("Edit this", createDesignation)
    const id = createDesignation._id;
    try {
      const res = await axiosInstance.put(`/designation/${id}`, {
        department_id: createDesignation.department,
        designation: createDesignation.designation,
      });
      const resData = res.data.data;
      console.log('Edited designation?', resData);

      showAlert(
        true,
        "Designation successfully updated",
        'alert alert-success'
      );
      setCreateDesignation(create_designation);
      fetchDesignation();
      $('#FormEditModal').modal('toggle');
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
      console.log('All Departments:', resData);

      setDepartments(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCreateDesignation(editDesignation);
    fetchDepartment();
  }, [editDesignation]);

  return (
    <>
      <div
        className="modal fade"
        id="FormEditModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Designation
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
              <form onSubmit={handleEditDesignation}>
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
                      <input
                        name="designation"
                        type="text"
                        className="form-control"
                        value={createDesignation.designation}
                        onChange={handleFormChange}
                        required
                      />
                      {/* <select
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
                      </select> */}
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
