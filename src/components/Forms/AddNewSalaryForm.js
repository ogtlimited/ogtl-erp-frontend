/** @format */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import $ from 'jquery';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';

const defaultValues = {
  company_email: '',
  annualGrossSalary: '',
};

const AddNewSalaryForm = ({ fetchAllEmployeeSalaries }) => {
  const [loading, setLoading] = useState(false);
  const [employeeOpts, setEmployeeOpts] = useState([]);
  const { createEmployee, showAlert } = useAppContext();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    createEmployee().then((res) => {
      const { employees } = res.data.createEmployeeForm;
      const activeEmployees = employees.filter(employee => employee.status === 'active')
      const empOpts = activeEmployees?.map((e) => {
        return {
          // label: `${e.first_name}  ${e.last_name}`,
          label: e.company_email,
          value: e.company_email,
        };
      });

      setEmployeeOpts(empOpts);
    });
  }, [createEmployee]);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };

  const onSubmit = (data) => {
    setLoading(true);

    axiosInstance
      .post('/api/employees-salary', {
        company_email: data.company_email,
        annualGrossSalary: +data.annualGrossSalary,
      })
      .then((res) => {
        showAlert(
          true,
          'Employee salary uploaded successfully',
          'alert alert-success'
        );
        reset();
        $('#AddNewSalary').modal('toggle');
        fetchAllEmployeeSalaries();
        setLoading(false);
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, 'alert alert-danger');
        console.log('this uploaded salary error data', error.response);
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddNewSalary"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Add New Salary
              </h5>
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
              {!employeeOpts.length ? (
                <div>
                  <p className="text-center">Loading...</p>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="company_email">Employee</label>
                        <Select
                          options={employeeOpts}
                          defaultValue={defaultValues}
                          name="company_email"
                          onChange={(state) =>
                            onEditorStateChange(state?.value, 'company_email')
                          }
                          isClearable={true}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="annualGrossSalary">
                          Annual Gross Salary
                        </label>
                        <input
                          name="annualGrossSalary"
                          type="number"
                          className="form-control"
                          defaultValue={defaultValues.annualGrossSalary}
                          {...register('annualGrossSalary')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>

                  <div className="col-md-12">
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
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewSalaryForm;
