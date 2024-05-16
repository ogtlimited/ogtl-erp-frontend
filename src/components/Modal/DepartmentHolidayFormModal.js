/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const DepartmentHolidayFormModal = ({ mode, data, refetchData }) => {
  const { selectPublicHoliday, fetchPublicHolidays, showAlert, goToTop } =
    useAppContext();
  const { id } = useParams();
  const { title } = useParams();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const cancelEvent = () => {
    setFormData(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDepartmentHoliday = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/department_holidays.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            hr_public_holiday_id: formData?.hr_public_holiday_id,
            operation_department_ids: [+id],
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `Public Holiday Successfully Added to ${title.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        )} Department!`,
        "alert alert-success"
      );
      cancelEvent();
      refetchData();
      fetchPublicHolidays();
      $("#DepartmentHolidayFormModal").modal("toggle");

      setFormData(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentHolidayFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DepartmentHolidayFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Public Holiday
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
              <form onSubmit={handleAddDepartmentHoliday}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="hr_public_holiday_id">
                        Public Holiday
                      </label>
                      <Select
                        name="hr_public_holiday_id"
                        options={selectPublicHoliday}
                        value={{
                          label: formData?.holiday_title,
                          value: selectPublicHoliday?.value,
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hr_public_holiday_id: e?.value,
                            holiday_title: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
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
