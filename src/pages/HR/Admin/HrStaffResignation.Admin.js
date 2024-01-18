// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ViewModal from "../../../components/Modal/ViewModal";
import ResignationContent from "../../../components/ModalContents/ResignationContent";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import moment from "moment";
import Select from "react-select";
import { ResignationFormModal } from "../../../components/Modal/ResignationFormModal";

const HrStaffResignationAdmin = () => {
  const {
    resignationStatusTypes,
    ErrorHandler,
    getAvatarColor,
    user,
    showAlert,
    goToTop,
  } = useAppContext();
  const [data, setData] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);

  const [surveyFormFilled, setSurveyFormFilled] = useState(false);
  const [resignationSurveyForm, setResignationSurveyForm] = useState([]);
  const [loadingResignationSurveyForm, setLoadingResignationSurveyForm] =
    useState(false);
  const [formContent, setFormContent] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [statusFilter, setStatusFilter] = useState("pending");

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedRoles = ["hr_staff"];

  const AuthorizedHrRoles = CurrentUserRoles.some((role) =>
    authorizedRoles.includes(role)
  );

  // Fetch HR Staff Resignation:
  const fetchHrStaffResignations = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/hr_staff_resignations.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: sizePerPage,
            status: statusFilter,
            stage: "hr_staff",
          },
        }
      );

      // console.log("HR Staff Resignation:", res?.data?.data);

      let resData = res?.data?.data?.resignations;
      let totalPages = res?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formattedData = resData.map((data) => ({
        id: data?.id,
        full_name: data?.full_name,
        office: data?.office ? data?.office?.toUpperCase() : data?.office,
        status: data?.status.replace(/\b\w/g, (char) => char.toUpperCase()),
        stage:
          data?.stage === "hr_staff"
            ? "HR Staff"
            : data?.stage
                .replace(/_/g, " ")
                .replace(/\b\w/g, (match) => match.toUpperCase()),
        date_applied: moment(data?.created_at).format("ddd, DD MMM YYYY"),
        last_day_at_work: moment(data?.last_day_at_work).format(
          "ddd, DD MMM YYYY"
        ),
        reason_for_resignation: data?.resignation_reason,
      }));

      setData(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Resignations - HR Staff stage | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, statusFilter]);

  useEffect(() => {
    if (CurrentUserRoles.includes("hr_staff")) {
      fetchHrStaffResignations();
    }
  }, [CurrentUserRoles, fetchHrStaffResignations]);

  // Get resignation Survey Form:
  const fetchResignationSurveyForm = useCallback(async () => {
    setLoadingResignationSurveyForm(true);
    try {
      const res = await axiosInstance.get(`/api/v1/survey_forms.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = res?.data?.data?.survey_forms;

      setResignationSurveyForm(resData);
      setLoadingResignationSurveyForm(false);
    } catch (error) {
      const component = "Resignation Survey form Error | ";
      ErrorHandler(error, component);
      setLoadingResignationSurveyForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchResignationSurveyForm();
  }, [fetchResignationSurveyForm]);

  useEffect(() => {
    if (surveyFormFilled) {
      handleApproveResignation(viewRow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyFormFilled, viewRow]);

  const handleApproveResignation = useCallback(
    async (viewRow) => {
      const resignationId = viewRow.id;

      const resignationPayload = {
        survey_form: {
          hr_survey_form_id: resignationSurveyForm[0]?.id,
          answer: Object.entries(formContent).map(([question, answer]) => {
            return { question, answer };
          }),
        },
      };

      try {
        const res = await axiosInstance.patch(
          `/api/v1/hr_staff_approve_resignations/${resignationId}.json`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            payload: resignationPayload,
          }
        );

        showAlert(
          true,
          `${viewRow?.full_name} resignation application is successfully approved!`,
          "alert alert-success"
        );

        fetchHrStaffResignations();
        setSurveyFormFilled(false);
        setFormContent([]);
        goToTop();
      } catch (error) {
        const errorMsg = error.response?.data?.errors;
        showAlert(true, `${errorMsg}`, "alert alert-warning");
        goToTop();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formContent, goToTop]
  );

  const columns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <div>
            {row?.full_name} <span>{row?.office}</span>
          </div>
        </h2>
      ),
    },
    {
      dataField: "date_applied",
      text: "Date Applied",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "stage",
      text: "Stage",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </span>
        </>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {value === "Approved" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          )}
        </>
      ),
    },
    {
      dataField: "last_day_at_work",
      text: "Last Day at Work",
      sort: true,
      headerStyle: { width: "15%" },
    },
    AuthorizedHrRoles && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      csvExport: false,
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

            {AuthorizedHrRoles && row?.status !== "Approved" ? (
              <button
                className="btn btn-sm btn-success"
                data-toggle="modal"
                data-target="#ResignationFormModal"
                onClick={() => setViewRow(row)}
              >
                Approve
              </button>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tab-pane" id="tab_stage_1">
      <div className="row">
        <div className="resignation_search_div">
          <div className="col-md-2">
            <label htmlFor="officeType">Status</label>
            <Select
              options={resignationStatusTypes}
              isSearchable={true}
              value={{
                value: statusFilter,
                label: statusFilter.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                ),
              }}
              onChange={(e) => {
                setStatusFilter(e?.value);
              }}
              style={{ display: "inline-block" }}
            />
          </div>
        </div>

        <UniversalPaginatedTable
          data={data}
          columns={columns}
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
          title="Resignation Details"
          expand={true}
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ""
      )}

      <ResignationFormModal
        exitForm={resignationSurveyForm}
        loadingExitForm={loadingResignationSurveyForm}
        setFormContent={setFormContent}
        setSurveyFormFilled={setSurveyFormFilled}
      />
    </div>
  );
};

export default HrStaffResignationAdmin;
