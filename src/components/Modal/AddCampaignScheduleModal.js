// *IN USE

/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from "react";
import { CampaignSchedule } from "../FormJSON/AddCampaignSchedule";
import { useAppContext } from "../../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { AddShiftScheduleModal } from "./AddShiftScheduleModal";
import secureLocalStorage from "react-secure-storage";

export const AddCampaignScheduleModal = ({ fetchAllSchedule, mode }) => {
  const { showAlert, user } = useAppContext();
  const [createCampaignSchedule, setCreateCampaignSchedule] =
    useState(CampaignSchedule);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cancelEvent = () => {
    setCreateCampaignSchedule(CampaignSchedule);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setCreateCampaignSchedule({
      ...createCampaignSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCampaignSchedule = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/v1/employee_shifts_schedules.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: createCampaignSchedule?.title,
            operation_office_id: user?.office?.id,
            hr_employee_id: user?.employee_info?.personal_details?.id,
          },
        }
      );

      const shifts_schedule_id =
        response?.data?.data?.employee_shifts_schedule?.id;

      if (response.status === 201) {
        try {
          const response = await axiosInstance.post(
            `/api/v1/employee_shifts_items.json`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
              payload: {
                hr_employee_shifts_schedule_id: shifts_schedule_id,
                days: createCampaignSchedule.campaign_schedule_items,
              },
            }
          );

        } catch (error) {
          const errorMsg = error.response?.data?.message;
          showAlert(true, `${errorMsg}`, "alert alert-warning");
          setLoading(false);
        }
      }

      showAlert(
        true,
        `Campaign schedule created successfully!`,
        "alert alert-success"
      );
      setCreateCampaignSchedule(CampaignSchedule);
      $("#CampaignScheduleFormModal").modal("toggle");
      setLoading(false);
      fetchAllSchedule();
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="CampaignScheduleFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Create Schedule
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
              <form onSubmit={handleCreateCampaignSchedule}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={createCampaignSchedule.title}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="campaign_schedule_items">
                        Campaign Schedule
                      </label>
                      <input
                        className="form-control"
                        name="campaign_schedule_items"
                        type="text"
                        placeholder="Click to add campaign schedule..."
                        value={
                          createCampaignSchedule.campaign_schedule_items.length
                            ? createCampaignSchedule.campaign_schedule_items
                                .map((shift) =>
                                  shift.day === 0
                                    ? "SUN"
                                    : shift.day === 1
                                    ? "MON"
                                    : shift.day === 2
                                    ? "TUE"
                                    : shift.day === 3
                                    ? "WED"
                                    : shift.day === 4
                                    ? "THU"
                                    : shift.day === 5
                                    ? "FRI"
                                    : shift.day === 6
                                    ? "SAT"
                                    : ""
                                )
                                .join(" | ")
                                .toUpperCase()
                            : ""
                        }
                        data-toggle="modal"
                        data-target="#ShiftScheduleFormModal"
                        readOnly
                        autocomplete="off"
                        style={{ cursor: "pointer" }}
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !createCampaignSchedule.campaign_schedule_items.length
                    }
                  >
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

      <AddShiftScheduleModal
        createCampaignSchedule={createCampaignSchedule}
        setCreateCampaignSchedule={setCreateCampaignSchedule}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        mode={mode}
      />
    </>
  );
};
