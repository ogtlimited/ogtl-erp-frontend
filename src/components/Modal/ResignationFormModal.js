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

export const ResignationFormModal = ({
  exitForm,
  loadingExitForm,
  setSurveyFormFilled,
}) => {
  const { selectCampaigns, showAlert, goToTop, FontAwesomeIcon, faSpinner } =
    useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [
    selectedResignationReasonOptions,
    setSelectedResignationReasonOptions,
  ] = useState([]);
  const [errorIndicator, setErrorIndicator] = useState("");

  console.log("Resignation Survey form", exitForm);

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

            {loadingExitForm ? (
              <div className="modal-body">
                <form>
                  <FontAwesomeIcon icon={faSpinner} spin pulse />
                </form>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
