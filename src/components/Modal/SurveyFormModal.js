import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

export const SurveyFormModal = ({
  surveyForm,
  setFormContent,
  setSurveyFormFilled,
  submittingForm,
}) => {
  const { FontAwesomeIcon, faSpinner } = useAppContext();
  const [formData, setFormData] = useState({});

  const handleInputChange = (questionIndex, optionKey, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionIndex]: { ...prevData[questionIndex], [optionKey]: value },
    }));
  };

  const handleConfirmFormSubmission = async (e) => {
    e.preventDefault();

    const transformedFormData = Object.entries(formData)
      .map(([questionIndex, answerObj]) => {
        const question = surveyForm.question_details.questions[questionIndex];
        const answers = Object.keys(answerObj).map((answerKey) => {
          if (answerKey === "text" || answerKey === "textarea") {
            return answerObj[answerKey];
          } else {
            return answerKey;
          }
        });
        return {
          id: question.id,
          answers: answers,
        };
      })
      .filter((question) => question.answers.length > 0);

    const finalPayload = [
      {
        payload: {
          hr_survey_id: surveyForm?.id,
          response: { answers: transformedFormData },
        },
      },
    ];

    setFormContent(finalPayload);
    setSurveyFormFilled(true);
  };

  return (
    <>
      <div
        className="modal fade"
        id="SurveyFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Survey Form
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
              <form onSubmit={handleConfirmFormSubmission}>
                {surveyForm &&
                  surveyForm?.question_details?.questions.map(
                    (question, index) => (
                      <div key={index}>
                        <div
                          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                        >
                          {index + 1}. {question.question}
                        </div>
                        <div className="col-md-12 form_builder_form_sample_fields">
                          {question.question_type === "checkbox" ? (
                            <div className="form_builder_form_sample_fields_inner">
                              {Object.keys(question.options).map(
                                (optionKey, optionIndex) => (
                                  <label
                                    key={optionIndex}
                                    className="checkbox_radio_input"
                                  >
                                    <input
                                      type="checkbox"
                                      value={optionKey}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          optionKey,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    {question.options[optionKey]}
                                  </label>
                                )
                              )}
                            </div>
                          ) : question.question_type === "radio" ? (
                            <div className="form_builder_form_sample_fields_inner">
                              {Object.keys(question.options).map(
                                (optionKey, optionIndex) => (
                                  <label
                                    key={optionIndex}
                                    className="checkbox_radio_input"
                                  >
                                    <input
                                      type="radio"
                                      name={`radio_${index}`}
                                      value={optionKey}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          optionKey,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {question.options[optionKey]}
                                  </label>
                                )
                              )}
                            </div>
                          ) : question.question_type === "text" ? (
                            <div
                              className="col-md-12"
                              style={{ marginLeft: "-1rem" }}
                            >
                              <input
                                className="form-control"
                                type="text"
                                placeholder={Object.values(question.options)}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "text",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ) : question.question_type === "textarea" ? (
                            <div
                              className="col-md-12"
                              style={{ marginLeft: "-1rem" }}
                            >
                              <textarea
                                className="form-control"
                                placeholder={Object.values(question.options)}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "textarea",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )
                  )}

                <div className="modal-footer" style={{ marginTop: "2rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {submittingForm ? (
                      <FontAwesomeIcon icon={faSpinner} spin pulse />
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
