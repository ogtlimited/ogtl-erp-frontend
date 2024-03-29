/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import SurveyTable from "../../../components/Tables/SurveyTable";
import moment from "moment";
import ViewModal from "../../../components/Modal/ViewModal";
import SurveyContent from "../../../components/ModalContents/SurveyContent";

const SurveyAdmin = () => {
  const navigate = useNavigate();
  const { user, ErrorHandler } = useAppContext();
  const [allSurveys, setAllSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Surveys:
  const fetchAllSurveyForms = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/v1/hr_surveys.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      });

      const resData = response?.data?.data?.survey_records?.surveys;
      const totalPages = response?.data?.data?.survey_records?.total_page;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formatted = resData.map((survey) => ({
        ...survey,
        title: survey?.title,
        created_at: moment(survey?.created_at).format("Do MMMM, YYYY"),
        from: moment(survey?.from).format("Do MMMM, YYYY"),
        to: moment(survey?.to).format("Do MMMM, YYYY"),
      }));

      setAllSurveys(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Survey Form Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllSurveyForms();
  }, [fetchAllSurveyForms]);

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
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType("view-details");
                setViewRow(row);
              }}
            >
              View
            </button>

            <Link
              className="btn btn-sm btn-info"
              to="/dashboard/hr/survey/edit"
              state={row}
            >
              Edit
            </Link>
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
            <h3 className="page-title">Survey Forms</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Survey</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <button
                className="btn add-btn"
                onClick={() => navigate("/dashboard/hr/survey/create")}
              >
                <i className="fa fa-plus"></i> Create Survey
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row  ">
        <SurveyTable
          columns={columns}
          data={allSurveys}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>

      {modalType === "view-details" ? (
        <ViewModal
          title="Survey Details"
          content={<SurveyContent Content={viewRow} />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SurveyAdmin;
