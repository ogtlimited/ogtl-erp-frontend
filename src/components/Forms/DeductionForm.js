/** @format */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import $ from 'jquery';
import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';

const defaultValues = {
  deductionTypeId: '',
  employeeId: '',
  useDailyRate: false,
  amount: '',
};

export const DeductionForm = ({ fetchDeductions }) => {
  const [loading, setLoading] = useState(false);
  const [employeeOpts, setEmployeeOpts] = useState([]);
  const [deductionOpts, setDeductionOpts] = useState([]);
  const { createEmployee, showAlert } = useAppContext();
  const [deductionData, setDeductionData] = useState([]);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues,
  });

  useEffect(() => {
    createEmployee().then((res) => {
      const { employees, deductionTypes } = res.data.createEmployeeForm;
      setDeductionData(deductionTypes);

      const empOpts = employees?.map((e) => {
        return {
          label: `${e.first_name}  ${e.last_name}`,
          value: e._id,
        };
      });

      setEmployeeOpts(empOpts);
      console.log('emp Opts', empOpts);
      const dedTypeOpts = deductionTypes?.map((e) => {
        return {
          label: `${e.title}`,
          value: e._id,
        };
      });
      setDeductionOpts(dedTypeOpts);
      console.log('ded Opts', dedTypeOpts);
    });
  }, [createEmployee]);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };
  const onHandleStateChange = (editorState, name) => {
    const amount = deductionData.filter((dt) => dt._id === editorState);
    setValue(name, editorState);
    setValue('amount', amount[0]?.amount);
  };

  const onSubmit = (data) => {
    if (data.useDailyRate) {
      delete data.amount;
    }
    setLoading(true);

    axiosInstance
      .post('/api/deduction', data)
      .then((res) => {
        fetchDeductions();
        showAlert(true, res.data.message, 'alert alert-success');
        reset();
        $('#FormModal').modal('toggle');
        fetchDeductions();
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, 'alert alert-danger');
        console.log('this deduction data', error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const willUseDailyRate = watch('useDailyRate');

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
              <h5 className="modal-title" id="FormModalLabel">
                Add deduction
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
              {!deductionData.length && !deductionOpts.length ? (
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
                        <label htmlFor="employeeId">Employee</label>
                        <Select
                          options={employeeOpts}
                          defaultValue={defaultValues.employeeId}
                          name="employeeId"
                          onChange={(state) =>
                            onEditorStateChange(state.value, 'employeeId')
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="deductionTypeId">Deduction Type</label>
                        <Select
                          options={deductionOpts}
                          defaultValue={defaultValues.deductionTypeId}
                          name="deductionTypeId"
                          onChange={(state) =>
                            onHandleStateChange(state.value, 'deductionTypeId')
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {/* <div className="form-group">
                        <label htmlFor="useDailyRate" className="mr-4">
                          Use Daily Rate
                        </label>

                        <input
                          name="useDailyRate"
                          className="form-check-input "
                          defaultValue={defaultValues.useDailyRate}
                          defaultChecked={
                            defaultValues.useDailyRate === 'true' ? true : false
                          }
                          type="checkbox"
                          {...register('useDailyRate')}
                        />
                      </div> */}
                    </div>
                    {!willUseDailyRate && (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="amount">Amount</label>
                          <input
                            name="amount"
                            defaultValue={defaultValues.amount}
                            className="form-control "
                            type="text"
                            {...register('amount')}
                            disabled
                          />
                        </div>
                      </div>
                    )}
                  </div>

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
