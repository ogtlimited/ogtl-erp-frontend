// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";
import ViewModal from "../../../components/Modal/ViewModal";
import ResignationContent from "../../../components/ModalContents/ResignationContent";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import OperationsResignationFeedbackModal from "../../../components/Modal/OperationsResignationFeedbackModal";
import OperationsRetractResignationModal from "../../../components/Modal/OperationsRetractResignationModal";
import Select from "react-select";

const OperationsCOOResignationAdmin = () => {
  const { resignationStatusTypes, ErrorHandler, getAvatarColor, user } =
    useAppContext();
  const [allResignations, setAllResignations] = useState([]);
  const [mgtResignations, setMgtResignations] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loadingAllResignations, setLoadingAllResignations] = useState(false);
  const [loadingMgtResignations, setLoadingMgtResignations] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [mgtPage, setMgtPage] = useState(1);
  const [mgtSizePerPage, setMgtSizePerPage] = useState(10);
  const [mgtTotalPages, setMgtTotalPages] = useState("");

  const [name, setName] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("approved");

  const CurrentUserRoles = user?.employee_info?.roles;
  const authorizedRoles = ["coo"];

  const AuthorizedOperationsRoles = CurrentUserRoles.some((role) =>
    authorizedRoles.includes(role)
  );

  // Fetch All Resignations:
  const fetchAllResignations = useCallback(async () => {
    setLoadingAllResignations(true);

    try {
      const res = await axiosInstance.get(`/api/v1/resignations.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          name: nameSearch ? nameSearch : null,
          status: statusFilter,
          stage: "hr_manager",
        },
      });

      const resData = res?.data?.data?.resignations;
      let totalPages = res?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formattedData = resData.map((data) => ({
        full_name: data?.full_name,
        office: data?.office ? data?.office?.toUpperCase() : data?.office,
        status: data?.status.replace(/\b\w/g, (char) => char.toUpperCase()),
        stage: data?.stage.replace(/_/g, " ").toUpperCase(),
        date_applied: moment(data?.created_at).format("ddd, DD MMM YYYY"),
        last_day_at_work: moment(data?.last_day_at_work).format(
          "ddd, DD MMM YYYY"
        ),
        reason_for_resignation: data?.resignation_reason,
      }));

      setAllResignations(formattedData);
      setLoadingAllResignations(false);
    } catch (error) {
      const component = "All Resignations | ";
      ErrorHandler(error, component);
      setLoadingAllResignations(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, page, sizePerPage, statusFilter]);

  useEffect(() => {
    fetchAllResignations();
  }, [fetchAllResignations]);

  // Fetch Management resignations:
  const fetchMgtResignations = useCallback(async () => {
    setLoadingMgtResignations(true);

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
            page: mgtPage,
            limit: mgtSizePerPage,
            status: "pending",
            stage: "coo",
          },
        }
      );

      let resData = res?.data?.data?.resignations;
      let totalPages = res?.data?.data?.total_pages;

      setMgtSizePerPage(mgtSizePerPage);
      setMgtTotalPages(totalPages);

      const formattedData = resData.map((data) => ({
        id: data?.id,
        full_name: data?.full_name,
        office: data?.office ? data?.office?.toUpperCase() : data?.office,
        status: data?.status.replace(/\b\w/g, (char) => char.toUpperCase()),
        stage:
          data?.stage === "coo"
            ? "COO"
            : data?.stage
                .replace(/_/g, " ")
                .replace(/\b\w/g, (match) => match.toUpperCase()),
        date_applied: moment(data?.created_at).format("ddd, DD MMM YYYY"),
        last_day_at_work: moment(data?.last_day_at_work).format(
          "ddd, DD MMM YYYY"
        ),
        reason_for_resignation: data?.resignation_reason,
      }));

      setMgtResignations(formattedData);
      setLoadingMgtResignations(false);
    } catch (error) {
      const component = "Management Resignations | ";
      ErrorHandler(error, component);
      setLoadingMgtResignations(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mgtPage, mgtSizePerPage]);

  useEffect(() => {
    fetchMgtResignations();
  }, [fetchMgtResignations]);

  // Handle Name Search:
  const handleKeydownNameSearch = (e) => {
    if (e.key === "Enter") {
      setNameSearch(e.target.value);
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
          ) : value === "Retracted" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-secondary"></i> {value}
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

            {AuthorizedOperationsRoles && row?.status === "Pending" ? (
              <>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setmodalType("feedback");
                    setViewRow(row);
                  }}
                >
                  Approve
                </button>

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setmodalType("retract");
                    setViewRow(row);
                  }}
                >
                  Retract
                </button>
              </>
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
            <h3 className="page-title">
              Resignations
              {/* | <span className="stage_indicator">COO Stage</span> */}
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Operations</li>
              <li className="breadcrumb-item">Exit</li>
              <li className="breadcrumb-item active">Resignations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu" style={{ marginBottom: "30px" }}>
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_allResignations"
                >
                  All Resignations
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_mgtResignations"
                >
                  Management Resignations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_allResignations" className="col-12 tab-pane show active">
            <div className="col-12 payroll_search_div">
              {/* Name Search */}
              <div className="resignation-custom-search">
                <input
                  className="custom-payroll-search-input"
                  style={{
                    backgroundColor: "#f7e3e8",
                    margin: "0 10px 0 1rem",
                  }}
                  type="search"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeydownNameSearch}
                />

                <button
                  className="btn btn-secondary custom-search-btn"
                  onClick={() => {
                    setName("");
                    setNameSearch("");
                    setPage(1);
                  }}
                >
                  Clear
                </button>
              </div>

              {/* Status Filter */}
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
              data={allResignations}
              columns={columns}
              loading={loadingAllResignations}
              setLoading={setLoadingAllResignations}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div>

          <div id="tab_mgtResignations" className="col-12 tab-pane">
            <UniversalPaginatedTable
              data={mgtResignations}
              columns={columns}
              loading={loadingMgtResignations}
              setLoading={setLoadingMgtResignations}
              page={mgtPage}
              setPage={setMgtPage}
              sizePerPage={mgtSizePerPage}
              setSizePerPage={setMgtSizePerPage}
              totalPages={mgtTotalPages}
              setTotalPages={setMgtTotalPages}
            />
          </div>
        </div>
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
        <OperationsResignationFeedbackModal
          setmodalType={setmodalType}
          resignationContent={viewRow}
          fetchOperationsResignations={fetchMgtResignations}
        />
      ) : null}

      {modalType === "retract" ? (
        <OperationsRetractResignationModal
          setmodalType={setmodalType}
          resignationContent={viewRow}
          fetchOperationsResignations={fetchMgtResignations}
        />
      ) : null}
    </>
  );
};

export default OperationsCOOResignationAdmin;
