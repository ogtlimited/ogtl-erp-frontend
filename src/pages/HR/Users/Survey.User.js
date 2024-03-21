/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { SurveyFormModal } from "../../../components/Modal/SurveyFormModal";

const SurveyUser = () => {
  const navigate = useNavigate();
  const { user, ErrorHandler } = useAppContext();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [formContent, setFormContent] = useState([]);
  const [surveyFormFilled, setSurveyFormFilled] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const userOgid = user?.employee_info?.ogid;
  const userOffice = user?.office?.title.toLowerCase();

  // All Survey response:
  const fetchSurveys = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/pending_survey_responses.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log("Survey", response?.data?.data?.pending_surveys);

      const resData = response?.data?.data?.pending_surveys;

      const formatted = resData.map((survey) => ({
        ...survey,
        title: survey?.title,
        created_at: moment(survey?.created_at).format("Do MMMM, YYYY"),
        from: moment(survey?.from).format("Do MMMM, YYYY"),
        to: moment(survey?.to).format("Do MMMM, YYYY"),
      }));

      console.log(resData, "Available Survey Forms", formatted);

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

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "from",
      text: "From",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#SurveyFormModal"
              onClick={() => setViewRow(row)}
            >
              Take This Survey
            </button>
          </div>
        </div>
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
