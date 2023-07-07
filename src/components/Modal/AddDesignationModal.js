/** @format */

import React, { useState, useEffect } from 'react';
import { create_designation } from '../FormJSON/CreateLeaveApprovalLevel';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import Select from 'react-select';
import $ from 'jquery';
import  secureLocalStorage  from  "react-secure-storage";

export const AddDesignationModal = ({ allDesignation }) => {
  const { showAlert } = useAppContext();
  const [createDesignation, setCreateDesignation] =
    useState(create_designation);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designationInfo, setDesignationInfo] = useState(
    'Select designation ...'
  );
  const user = JSON.parse(secureLocalStorage.getItem('user'));

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

  const handleCreateDesignation = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('/designation', {
        department_id: createDesignation.department,
        designation: createDesignation.designation,
        approval_level: +createDesignation.approval_level
      });
      const resData = res.data.data;

      showAlert(
        true,
        'Designation successfully created',
        'alert alert-success'
      );
      setCreateDesignation(create_designation);
      $('#FormModal').modal('toggle');
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, 'alert alert-warning');
    }
    setLoading(false);
    allDesignation()
  };

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      const formatted = resData.map((department) => ({
        label: department?.department,
        value: department?._id,
      }));

      setDepartments(formatted);
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
                Designation
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
              <form onSubmit={handleCreateDesignation}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <Select
                        onChange={(e) =>
                          setCreateDesignation({ ...createDesignation, department: e?.value })
                        }
                        options={departments}
                        placeholder="Select department ..."
                        isClearable={true}
                        isSearchable={true}
                        style={{ display: 'inline-block' }}
                        required
                      />
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="approval_level">Approval Level</label>
                      <input
                        name="approval_level"
                        type="number"
                        className="form-control"
                        value={createDesignation.approval_level}
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
