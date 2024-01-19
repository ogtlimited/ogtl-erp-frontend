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
import HrManagerResignationFeedbackModal from "../../../components/Modal/HrManagerResignationFeedbackModal";

const HrManagerResignationAdmin = ({ viewingStage2 }) => {
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

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [statusFilter, setStatusFilter] = useState("pending");

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedRoles = ["hr_manager", "senior_hr_associate"];

  const AuthorizedHrRoles = CurrentUserRoles.some((role) =>
    authorizedRoles.includes(role)
  );

  // Fetch HR Manager Resignation:
  const fetchHrManagerResignations = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/hr_manager_resignations.json",
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
            stage: "hr_manager",
          },
        }
      );

      // console.log("HR Manager Resignation:", res?.data?.data);

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
          data?.stage === "hr_manager"
            ? "HR Manager"
            : data?.stage
                .replace(/_/g, " ")
                .replace(/\b\w/g, (match) => match.toUpperCase()),
        date_applied: moment(data?.created_at).format("ddd, DD MMM YYYY"),
        last_day_at_work: moment(data?.last_day_at_work).format(
          "ddd, DD MMM YYYY"
        ),
        reason_for_resignation: data?.resignation_reason,
        survey_answer: data?.survey_answer,
      }));

      setData(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Resignations - HR Manager stage | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, statusFilter]);

  useEffect(() => {
    if (authorizedRoles) {
      fetchHrManagerResignations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHrManagerResignations]);

  useEffect(() => {
    if (viewingStage2) {
      fetchHrManagerResignations();
    }

  }, [fetchHrManagerResignations, viewingStage2]);

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
                onClick={() => {
                  setmodalType("feedback");
                  setViewRow(row);
                }}
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
    <div className="tab-pane" id="tab_stage_2">
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
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ""
      )}

      {modalType === "feedback" ? (
        <HrManagerResignationFeedbackModal
          setmodalType={setmodalType}
          resignationContent={viewRow}
          fetchHrManagerResignations={fetchHrManagerResignations}
        />
      ) : null}
    </div>
  );
};

export default HrManagerResignationAdmin;
