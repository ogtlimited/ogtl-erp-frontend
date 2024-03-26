import React, { useState, useEffect, useCallback } from "react";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import { IoMdAlert } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";

export const SurveyFormModalPrompt = ({ pendingSurveys, fetchSurveys }) => {
  const { showAlert, pendingSurveySubmitted, setPendingSurveySubmitted } =
    useAppContext();
  const [formData, setFormData] = useState({});
  const [formContent, setFormContent] = useState([]);
  const [surveyFormFilled, setSurveyFormFilled] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const message = secureLocalStorage.getItem("message");
  const score = secureLocalStorage.getItem("score");

  const surveyForm = pendingSurveys;

  const handleInputChange = (questionIndex, optionKey, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionIndex]: { ...prevData[questionIndex], [optionKey]: value },
    }));
  };

  const handleConfirmFormSubmission = async (e) => {
    e.preventDefault();

    const allQuestionsAnswered =
      surveyForm[0]?.question_details?.questions.every((question, index) => {
        const answerObj = formData[index];
        if (!answerObj) return false;
        if (
          question.question_type === "checkbox" ||
          question.question_type === "radio"
        ) {
          return Object.values(answerObj).some((value) => value);
        }
        return true;
      });

    if (!allQuestionsAnswered) {
      setShowWarning(true);

      console.log(allQuestionsAnswered)
      return;
    }

    const transformedFormData = Object.entries(formData)
      .map(([questionIndex, answerObj]) => {
        const question =
          surveyForm[0].question_details.questions[questionIndex];
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
          hr_survey_id: surveyForm[0]?.id,
          response: { answers: transformedFormData },
        },
      },
    ];

    setFormContent(finalPayload);
    setSurveyFormFilled(true);
  };

  const handleSubmitSurvey = useCallback(async () => {
    setSubmittingForm(true);

    try {
      const res = await axiosInstance.post(`/api/v1/hr_survey_responses.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: formContent[0]?.payload,
      });

      if (res?.status === 200) {
        secureLocalStorage.setItem("message", res?.data?.data?.message);
        secureLocalStorage.setItem("score", res?.data?.data?.survey_score);
      }

      fetchSurveys();
      setSurveyFormFilled(false);
      setFormContent([]);
      setSubmittingForm(false);
      setPendingSurveySubmitted(true);
      setShowWarning(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#SurveyFormModal").modal("toggle");
      setSubmittingForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContent]);

  useEffect(() => {
    if (surveyFormFilled) {
      handleSubmitSurvey();
    }
  }, [handleSubmitSurvey, surveyFormFilled]);

  useEffect(() => {
    if (pendingSurveySubmitted) {
      const timeoutId = setTimeout(() => {
        $("#SurveyFormModalPrompt").modal("hide");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
        setPendingSurveySubmitted(false);
      };
    }
  }, [pendingSurveySubmitted, setPendingSurveySubmitted]);

  return (
    <>
      <div
        className="modal fade"
        id="SurveyFormModalPrompt"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        {submittingForm ? (
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="survey_result_div">
                  <span
                    style={{ width: "5rem", height: "5rem" }}
                    className="spinner-border spinner-border-lg text-primary"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {pendingSurveySubmitted ? (
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="survey_result_div">
                      <h4>{message}</h4>
                      <p>score:</p>
                      <h1
                        className={
                          score < 40
                            ? "text-danger"
                            : score >= 40 && score < 60
                            ? "text-warning"
                            : score >= 60
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {score ? score : 0}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="FormModalLabel">
                      Survey Form
                    </h4>
                  </div>

                  <div className="modal-body" style={{ paddingLeft: "3rem" }}>
                    <form onSubmit={handleConfirmFormSubmission}>
                      {surveyForm &&
                        surveyForm[0]?.question_details?.questions.map(
                          (question, index) => (
                            <div key={index}>
                              <div
                                style={{
                                  marginTop: "1rem",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                {index + 1}. {question.question}
                              </div>
                              <div className="col-md-12 survey_form_sample_fields">
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
                                      placeholder={Object.values(
                                        question.options
                                      )}
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
                                      placeholder={Object.values(
                                        question.options
                                      )}
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

                      <div className="modal-footer survey_action">
                        {showWarning ? (
                          <p className="text-danger survey_action_error">
                            <IoMdAlert className="IoMdAlert" />
                            Please provide an answer for each question
                          </p>
                        ) : (
                          <p className="text-info survey_action_warning">
                            <IoAlertCircleOutline className="IoMdAlert" />
                            Please provide an answer for each question
                          </p>
                        )}
                        <button type="submit" className="btn btn-primary">
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
