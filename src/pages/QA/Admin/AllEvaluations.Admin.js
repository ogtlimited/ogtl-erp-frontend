/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import SurveyTable from "../../../components/Tables/SurveyTable";
import moment from "moment";

const AllEvaluationsAdmin = () => {
  const { user, ErrorHandler } = useAppContext();
  const [allSurveyResponse, setAllSurveyResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Survey:
  const fetchAllSurveyResponse = useCallback(async () => {
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

      setAllSurveyResponse(formatted);
      setLoading(false);
    } catch (error) {
      const component = "All Survey Response Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  // useEffect(() => {
  //   fetchAllSurveyResponse();
  // }, [fetchAllSurveyResponse]);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "weight",
      text: "Weight",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "",
      text: "Action",
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            {CurrentUserCanCreateAndEdit ? (
              <Link
                className="btn btn-sm btn-info"
                to={`/dashboard/hr/all-survey/${row?.title.replace("/", " -")}/${row?.id}`}
                state={row}
              >
                View Responses
              </Link>
            ) : null}
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
            <h3 className="page-title">All Evaluations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">QA</li>
              <li className="breadcrumb-item active">Evaluation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row  ">
        <SurveyTable
          columns={columns}
          data={[]}
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
    </>
  );
};

export default AllEvaluationsAdmin;
