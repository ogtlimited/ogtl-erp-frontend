/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import moment from "moment";

export const OutOfOfficeFormModal = ({
  mode,
  data,
  refetchData,
  refectStaffOnHoliday
}) => {
  const {
    categoryOptions,
    selectEmployees,
    selectPublicHoliday,
    selectDeductionTypes,
    selectOutOfOfficeReasons,
    showAlert,
    goToTop
  } = useAppContext();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHolidayOptions, setShowHolidayOptions] = useState(false);
  const time = new Date().toDateString();
  const today_date = moment(time).format("yyyy-MM-DD");

  const selectDeductionTypeRef = useRef();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    if (formData?.reason === "holiday") {
      return setShowHolidayOptions(true);
    } else {
      return setShowHolidayOptions(false);
    }
  }, [formData?.reason]);

  const cancelEvent = () => {
    setFormData(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOutOfOfficeAction = async (e) => {
    if (mode === "Create") {
      return handleCreateOutOfOffice(e);
    } else {
      return handleEditOutOfOffice(e);
    }
  };

  const handleCreateOutOfOffice = async (e) => {
    e.preventDefault();

    const payload = {
      employee_id: formData?.employee_id,
      start_date: formData?.start_date,
      end_date: formData?.end_date,
      reason: formData?.reason,
      called_in: formData?.called_in,
      caller_is_employee: formData?.caller_is_employee,
      caller: formData?.caller,
      note: formData?.note,
      daily_follow_up: {},
      approved: true
    };

    setLoading(true);
    try {
      const url = formData?.public_holiday_id
        ? `/api/v1/out_of_office.json?public_holiday_id=${formData?.public_holiday_id}`
        : "/api/v1/out_of_office.json";

      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        payload
      });

      goToTop();
      showAlert(
        true,
        `${formData?.employee_title}'s Out of Office successfully created!`,
        "alert alert-success"
      );

      refetchData();
      refectStaffOnHoliday();

      $("#OutOfOfficeFormModal").modal("toggle");

      setFormData(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#OutOfOfficeFormModal").modal("toggle");

      setLoading(false);
    }
  };

  const handleEditOutOfOffice = async (e) => {
    e.preventDefault();

    console.log("edit payload:", formData);

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/out_of_office/${formData.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          payload: {
            employee_id: formData.employee_id,
            start_date: formData.start_date,
            end_date: formData.end_date,
            reason: formData.reason,
            hr_deductions_id: formData.hr_deduction_type_id,
            status: true
          }
        }
      );

      goToTop();
      showAlert(
        true,
        `${formData?.employee_title}'s out of office successfully updated!`,
        "alert alert-success"
      );
      refetchData();
      $("#OutOfOfficeFormModal").modal("toggle");

      setFormData(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#OutOfOfficeFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="OutOfOfficeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Out of Office
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
              <form onSubmit={handleOutOfOfficeAction}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employee_id">Staff</label>
                      <Select
                        name="employee_id"
                        options={selectEmployees}
                        value={{
                          label: formData?.employee_title,
                          value: formData?.employee_id
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employee_id: e?.value,
                            employee_title: e?.label
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="reason">Reason</label>
                      <Select
                        name="reason"
                        options={selectOutOfOfficeReasons}
                        value={{
                          label: formData?.reason_title,
                          value: formData?.reason
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reason: e?.value,
                            reason_title: e?.label
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  {showHolidayOptions ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="public_holiday">
                          Please select the applicable public holiday
                        </label>
                        <Select
                          name="public_holiday"
                          options={selectPublicHoliday}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              public_holiday_id: e?.misc?.id,
                              start_date: e?.misc?.start_date?.split("T")[0],
                              end_date: e?.misc?.end_date?.split("T")[0]
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date">Start</label>
                      <input
                        type="date"
                        name="start_date"
                        value={formData?.start_date}
                        onChange={handleFormChange}
                        className="form-control "
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date">End</label>
                      <input
                        type="date"
                        name="end_date"
                        value={formData?.end_date}
                        onChange={handleFormChange}
                        className="form-control "
                        min={formData?.start_date}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="called_in">Called in?</label>
                      <Select
                        name="called_in"
                        options={categoryOptions}
                        value={{
                          label: formData?.called_in ? "Yes" : "No",
                          value: formData?.called_in
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            called_in: e?.value
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  {formData?.called_in ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="caller_is_employee">
                          Is the caller an employee?
                        </label>
                        <Select
                          name="caller_is_employee"
                          options={categoryOptions}
                          value={{
                            label: formData?.caller_is_employee ? "Yes" : "No",
                            value: formData?.caller_is_employee
                          }}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caller_is_employee: e?.value,
                              caller: "",
                              caller_title: ""
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {formData?.called_in ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="caller">Caller</label>
                        {formData?.caller_is_employee ? (
                          <Select
                            name="caller"
                            options={selectEmployees}
                            value={{
                              label: formData?.caller_title,
                              value: formData?.caller
                            }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                caller: e?.value,
                                caller_title: e?.label
                              })
                            }
                            style={{ display: "inline-block" }}
                          />
                        ) : (
                          <input
                            type="text"
                            name="caller"
                            value={formData?.caller}
                            onChange={handleFormChange}
                            placeholder="Enter name of caller"
                            className="form-control "
                          />
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="note">Note</label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleFormChange}
                        className="form-control "
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="hr_deduction_type_id">
                        Deduction Type
                      </label>
                      <Select
                        options={selectDeductionTypes}
                        isSearchable={true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hr_deduction_type_id: e?.value,
                            deductionTitle: e?.label,
                          })
                        }
                        ref={selectDeductionTypeRef}
                        defaultValue={null}
                        placeholder="Title | Office | Deduction Value"
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div> */}
                </div>

                <div className="modal-footer">
                  {mode === "Create" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Submit"
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
