/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { SurveyFormModal } from "../../../components/Modal/SurveyFormModal";
import $ from "jquery";

const SurveyUser = () => {
  const { showAlert, goToTop, user, ErrorHandler } = useAppContext();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [formContent, setFormContent] = useState([]);
  const [surveyFormFilled, setSurveyFormFilled] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const userOgid = user?.employee_info?.ogid;
  // const userOffice = user?.office?.title.toLowerCase();

  // All Survey response:
  const fetchSurveys = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_surveys/${userOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.survey_records;

      const formatted = resData.map((survey) => ({
        ...survey,
        created_at: moment(survey?.created_at).format("Do MMMM, YYYY"),
        from: moment(survey?.from).format("Do MMMM, YYYY"),
        to: moment(survey?.to).format("Do MMMM, YYYY"),
      }));

      setSurveys(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Survey Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

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

      console.log("Submitted response:", res)

      showAlert(
        true,
        `Survey response sent successfully!`,
        "alert alert-success"
      );

      $("#SurveyFormModal").modal("toggle");
      fetchSurveys();
      setSurveyFormFilled(false);
      setFormContent([]);
      goToTop();
      setSubmittingForm(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      goToTop();
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

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "from",
      text: "From",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "50%" },
      formatter: (value, row) => (
        <span className="btn btn-gray btn-sm btn-rounded">
          <i
            style={{ marginRight: "5px" }}
            className={`fa fa-dot-circle-o ${
              value === "Completed" ? "text-success" : "text-warning"
            }`}
          ></i>{" "}
          {value}
        </span>
      ),
    },
    {
      dataField: "score",
      text: "Score",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { maxWidth: "50%" },
      formatter: (value, row) => (
        <>
          {row.status !== "Completed" && (
            <div className="text-center">
              <div className="leave-user-action-btns">
                <button
                  className="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#SurveyFormModal"
                  onClick={() => setViewRow(row)}
                >
                  Take Survey
                </button>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Surveys</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Surveys</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalTable
          columns={columns}
          data={surveys}
          setData={setSurveys}
          loading={loading}
          setLoading={setLoading}
          hideCSVExport={true}
        />
      </div>

      <SurveyFormModal
        surveyForm={viewRow}
        setFormContent={setFormContent}
        setSurveyFormFilled={setSurveyFormFilled}
        submittingForm={submittingForm}
      />
    </>
  );
};

export default SurveyUser;
