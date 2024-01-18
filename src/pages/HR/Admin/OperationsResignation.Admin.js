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
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import OperationsRetractResignationModal from "../../../components/Modal/OperationsRetractResignationModal";
import Select from "react-select";

const OperationsResignationAdmin = () => {
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
  const authorizedRoles = ["operation_team", "operations_manager"];

  const AuthorizedOperationsRoles = CurrentUserRoles.some((role) =>
    authorizedRoles.includes(role)
  );

  // Fetch Operations resignation
  const fetchOperationsResignations = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/operation_resignations.json",
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
            stage: "operations",
          },
        }
      );

      // console.log("Operations Resignation:", res?.data?.data);

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
          data?.stage === "operations"
            ? "Operations"
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
      const component = "Resignations - Operation stage | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, statusFilter]);

  useEffect(() => {
    fetchOperationsResignations();
  }, [fetchOperationsResignations]);

  // Handle Approve
  const handleApproveResignation = async (viewRow) => {
    const resignationId = viewRow.id;

    try {
      const res = await axiosInstance.patch(
        `/api/v1/operation_team_approve_resignations/${resignationId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        `${viewRow?.full_name} resignation application is successfully approved!`,
        "alert alert-success"
      );

      fetchOperationsResignations();
      goToTop();
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      goToTop();
    }
  };

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
    AuthorizedOperationsRoles && {
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

            {AuthorizedOperationsRoles ? (
              <button
                className="btn btn-sm btn-success"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setmodalType("approve");
                  setViewRow(row);
                }}
              >
                Approve
              </button>
            ) : null}

            {AuthorizedOperationsRoles ? (
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setmodalType("retract");
                  setViewRow(row);
                }}
              >
                Retract
              </button>
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
            <h3 className="page-title">Resignations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Operations</li>
              <li className="breadcrumb-item">Exit</li>
              <li className="breadcrumb-item active">Resignations</li>
            </ul>
          </div>
        </div>
      </div>

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

      <ConfirmModal
        title="Resignation Approval"
        selectedRow={viewRow}
        deleteFunction={handleApproveResignation}
        message="Are you sure you want to approve this resignation?"
      />

      {modalType === "retract" ? (
        <OperationsRetractResignationModal
          setmodalType={setmodalType}
          resignationContent={viewRow}
          fetchOperationsResignations={fetchOperationsResignations}
        />
      ) : null}
    </>
  );
};

export default OperationsResignationAdmin;
