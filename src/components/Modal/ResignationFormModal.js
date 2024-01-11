import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

const CheckboxList = ({ options, selectedOptions, onChange }) => {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            type="checkbox"
            id={`option_${index}`}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={`option_${index}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export const ResignationFormModal = ({
  exitForm,
  loadingExitForm,
  setSurveyFormFilled,
}) => {
  const { selectCampaigns, showAlert, goToTop, FontAwesomeIcon, faSpinner } =
    useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  console.log("Resignation Survey form", exitForm);

  // Handle Radio Change:
  const handleRadioChange = (e) => {
    setData({
      ...data,
      [`${e.target.name}`]: e.target.value,
    });
  };

  // Handle Checkbox Change:
  const handleCheckboxChange = (e) => {
    const question = e.target.name;
    const option = e.target.value;
    // setSelectedOptions((prevOptions) => {
    //   if (prevOptions.includes(option)) {
    //     return prevOptions.filter((prevOption) => prevOption !== option);
    //   } else {
    //     const allOptions = [...prevOptions, option];
    //     return allOptions;
    //   }
    // });
    
  };

  // Handle Form Change:
  const handleFormChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Resignation Survey:
  const handleConfirmExitFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      ...data,
      selectedOptions: selectedOptions,
    };

    console.log("Submit this survey form:", formData);

    setLoading(true);
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
                <form onSubmit={handleConfirmExitFormSubmission}>
                  <div className="row">
                    {exitForm[0]?.form_content?.questions.map(
                      (question, index) => (
                        <div className="col-md-12" key={index}>
                          <div className="form-group">
                            <label
                              htmlFor={`${question.question}`}
                              style={{ fontWeight: "500" }}
                            >
                              {question.question}
                            </label>

                            {/* Radio */}
                            {question.question_type === "radio" && (
                              <div>
                                {question.question_options.map(
                                  (option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className="form-check"
                                    >
                                      <input
                                        type="radio"
                                        id={`${question.question}`}
                                        name={`${question.question}`}
                                        value={option}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        htmlFor={`${question.question}`}
                                        className="form-check-label"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            )}

                            {/* Check Box */}
                            {question.question_type === "check box" && (
                              <CheckboxList
                                options={
                                  exitForm[0]?.form_content.questions[1]
                                    .question_options
                                }
                                selectedOptions={selectedOptions}
                                onChange={handleCheckboxChange}
                              />
                            )}

                            {/* Textarea */}
                            {question.question_type === "question" && (
                              <textarea
                                name={`${question.question}`}
                                value={data[`${question.question}`]}
                                onChange={handleFormChange}
                                className="form-control"
                                placeholder="Your answer"
                                // required
                              />
                            )}
                          </div>
                        </div>
                      )
                    )}
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
