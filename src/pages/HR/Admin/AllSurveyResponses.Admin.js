/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import SurveyTable from "../../../components/Tables/SurveyTable";
import csvDownload from "json-to-csv-export";
import moment from "moment";

const AllSurveyResponsesAdmin = () => {
  const { title, id } = useParams();
  const { showAlert, getAvatarColor, ErrorHandler } = useAppContext();
  const [surveyResponse, setSurveyResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const today_date = moment().utc().format("yyyy-MM-DD");

  // All Survey response:
  const fetchSurveyResponse = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/hr_survey_responses.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            survey_id: id,
            page: page,
            limit: sizePerPage,
          },
        }
      );

      const resData =
        response?.data?.data?.survey_response_records?.survey_response;
      const totalPages =
        response?.data?.data?.survey_response_records?.total_pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      setSurveyResponse(resData);
      setLoading(false);
    } catch (error) {
      const component = `${title} Response Error | `;
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchSurveyResponse();
  }, [fetchSurveyResponse]);

  const handleDownloadResponses = async (e) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const response = await axiosInstance.get(
        "/api/v1/survey_response_csv_exports.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            survey_id: id,
            page: 1,
            limit: 10000,
          },
        }
      );

      const resData = response?.data?.data?.survey_response;
      const lineSeparator = "—".repeat(1000);

      const groupedData = resData.reduce((acc, item) => {
        if (!acc[item.full_name]) {
          acc[item.full_name] = {
            full_name: item.full_name,
            ogid: item.ogid,
            office: item.office,
            survey_title: item.survey_title,
            score: item.score,
            created_at: item.created_at,
            questions: [],
          };
        }
        acc[item.full_name].questions.push({
          question: item.question,
          answer: item.answer,
        });
        return acc;
      }, {});

      const transformedData = Object.values(groupedData);

      const csvData = transformedData.map((item) => ({
        STAFF: item.full_name,
        OGID: item?.ogid,
        OFFICE: item?.office?.toUpperCase(),
        "SURVEY TITLE": item.survey_title,
        SCORE: item.score,
        "CREATED AT": moment(item.created_at, "mm-dd-YY")
          .utc()
          .format("Do, MMM YYYY"),
        RESPONSE: item.questions
          .map(
            (q, index) =>
              `Question ${index + 1}: ${q.question}\nAnswer: ${
                q.answer
              }\n${lineSeparator}`
          )
          .join("\n"),
      }));

      const dataToConvert = {
        data: csvData,
        filename: `OGTL - ${title} Survey Response - ${moment(
          today_date
        ).format("DD MMM, YYYY")} `,
        delimiter: ",",
        useKeysAsHeaders: true,
      };

      csvDownload(dataToConvert);
      setIsDownloading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setIsDownloading(false);
    }
  };

  const columns = [
    {
      dataField: "full_name",
      text: "Full Name",
      sort: true,
      headerStyle: { width: "50%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          {value}
        </h2>
      ),
    },
    {
      dataField: "survey_title",
      text: "Survey Title",
      sort: true,
      headerStyle: { width: "40%" },
    },
    {
      dataField: "score",
      text: "Score",
      sort: true,
      headerStyle: { width: "40%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i
              className={`fa fa-dot-circle-o ${
                value < 40
                  ? "text-danger"
                  : value >= 40 && value < 60
                  ? "text-warning"
                  : value >= 60
                  ? "text-success"
                  : "text-danger"
              }`}
              style={{ marginRight: "10px" }}
            ></i>{" "}
            {typeof value === "number" ? value : "-"}
          </span>
        </>
      ),
    },
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { width: "10%" },
    //   formatter: (value, row) => (
    //     <div className="text-center">
    //       <div className="leave-user-action-btns">
    //         <button
    //           className="btn btn-sm btn-primary"
    //           data-toggle="modal"
    //           data-target="#generalModal"
    //           onClick={() => {
    //             setmodalType("view-details");
    //             setViewRow(row);
    //           }}
    //         >
    //           View
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{title}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Survey</li>
              <li className="breadcrumb-item active">All Surveys</li>
            </ul>
          </div>

          <div className="col-auto float-right ml-auto">
            {surveyResponse?.length ? (
              <button className="btn add-btn" onClick={handleDownloadResponses}>
                <i className="fa fa-download"></i>{" "}
                {isDownloading
                  ? "Downloading Responses..."
                  : "Download Responses"}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row  ">
        <SurveyTable
          columns={columns}
          data={surveyResponse}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          csvExport={false}
        />
      </div>
    </>
  );
};

export default AllSurveyResponsesAdmin;
