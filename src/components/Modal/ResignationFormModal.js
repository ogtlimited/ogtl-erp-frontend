/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import {
  resignationReason,
  resignationDoubleOptions,
  resignationTripleOptions,
} from "../FormJSON/ResignationForm";
import DropdownCheckbox from "../Misc/dropdownCheckbox";

export const ResignationFormModal = () => {
  const { selectCampaigns, showAlert, goToTop } = useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [
    selectedResignationReasonOptions,
    setSelectedResignationReasonOptions,
  ] = useState([]);
  const [errorIndicator, setErrorIndicator] = useState("");

  // useEffect(() => {
  //   setBranch(data);
  // }, [data]);

  // const cancelEvent = () => {
  //   setBranch(data);
  // };

  // Handle Form Change:
  const handleFormChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Resignation Survey:
  const handleSubmitResignation = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedResignationReasonOptions.length === 0) {
      setErrorIndicator("reason_for_leaving-not-ok");
      setLoading(false);
      return;
    }

    console.log("Resignation survey form:", e);
  };

  return (
    <>
      <div
        className="modal fade"
        id="ResignationFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                OG Resignation Form
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
              <form onSubmit={handleSubmitResignation}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={data.email}
                        onChange={handleFormChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="name">What is your Legal Name?</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={data.name}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="number">
                        What is your employee number
                      </label>
                      <input
                        name="number"
                        type="number"
                        className="form-control"
                        value={data.number}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cd_name">What is your CD Name?</label>
                      <input
                        name="cd_name"
                        type="name"
                        className="form-control"
                        value={data.cd_name}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="team">What team are you on?</label>
                      <Select
                        options={selectCampaigns}
                        isSearchable={true}
                        isClearable={true}
                        // value={{
                        //   label: leader?.officeName,
                        //   value: leader?.operation_office_id,
                        // }}
                        // onChange={(e) => handleOfficeChange(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="last_day">
                        What day will be your LAST working day in the office?
                      </label>
                      <input
                        name="last_day"
                        type="date"
                        className="form-control"
                        value={data.last_day}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="">
                        Why are you resigning from our company?
                      </label>
                      <DropdownCheckbox
                        options={resignationReason}
                        selectedOptions={selectedResignationReasonOptions}
                        onSelectionChange={(updatedSelectedOptions) =>
                          setSelectedResignationReasonOptions(
                            updatedSelectedOptions
                          )
                        }
                        errorIndicator={errorIndicator}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="expanded_reason">
                        Please expand on your reason for leaving
                      </label>
                      <textarea
                        name="expanded_reason"
                        className="form-control"
                        value={data.expanded_reason}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="company_fav">
                        What things did you like about your job/our company?
                      </label>
                      <textarea
                        name="company_fav"
                        className="form-control"
                        value={data.company_fav}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="company_changes">
                        What work changes would have made you stay?
                      </label>
                      <textarea
                        name="company_changes"
                        className="form-control"
                        value={data.company_changes}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="company_changes">
                        What are our areas of improvement as a company?
                      </label>
                      <textarea
                        name="company_changes"
                        className="form-control"
                        value={data.company_changes}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="reason_for_prompt">
                        What prompted you to begin searching for another
                        opportunity (if reason for leaving is found a new job).
                        What prompted you to want to resume school (if reason
                        for leaving is going back to school)
                      </label>
                      <textarea
                        name="reason_for_prompt"
                        className="form-control"
                        value={data.reason_for_prompt}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="future_interest">
                        Would you be interested in us reaching out to you for an
                        opening in the future
                      </label>
                      <Select
                        options={resignationTripleOptions}
                        isSearchable={true}
                        isClearable={true}
                        // value={{
                        //   label: leader?.officeName,
                        //   value: leader?.operation_office_id,
                        // }}
                        // onChange={(e) => handleOfficeChange(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="job_change">
                        Do you think your job has changed since you were hired?
                      </label>
                      <Select
                        options={resignationTripleOptions}
                        isSearchable={true}
                        isClearable={true}
                        // value={{
                        //   label: leader?.officeName,
                        //   value: leader?.operation_office_id,
                        // }}
                        // onChange={(e) => handleOfficeChange(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="recognition">
                        Did you feel your achievements/contributions were
                        recognized throughout your employment?
                      </label>
                      <Select
                        options={resignationDoubleOptions}
                        isSearchable={true}
                        isClearable={true}
                        // value={{
                        //   label: leader?.officeName,
                        //   value: leader?.operation_office_id,
                        // }}
                        // onChange={(e) => handleOfficeChange(e)}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="concern_share">
                        Did you share any of the concerns today with the company
                        before deciding to leave? If yes, how was your concern
                        handled?
                      </label>
                      <textarea
                        name="concern_share"
                        className="form-control"
                        value={data.concern_share}
                        onChange={handleFormChange}
                        placeholder="Your answer"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="recommendation">
                        Would you recommend this company to a friend? Why or why
                        not.
                      </label>
                      <textarea
                        name="recommendation"
                        className="form-control"
                        value={data.recommendation}
                        onChange={handleFormChange}
                        placeholder="Your answer"
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
                    // onClick={cancelEvent}
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
                      "Confirm"
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
