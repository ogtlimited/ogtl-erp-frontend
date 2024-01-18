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
import Select from "react-select";

const OperationsResignationAdmin = () => {
  const { resignationStatusTypes,ErrorHandler, getAvatarColor, user, showAlert, goToTop } =
    useAppContext();
  const [data, setData] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [statusFilter, setStatusFilter] = useState("")

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
            stage: "operations",
            status: "pending",
          },
        }
      );

      console.log("Operations Resignation:", res?.data?.data)

      let resData = res?.data?.data?.resignations;
      let totalPages = res?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formattedData = resData.map((data) => ({
        id: data?.id,
        full_name: data?.full_name,
        office:  data?.office ? data?.office?.toUpperCase() : data?.office,
        status: data?.status.replace(/\b\w/g, char => char.toUpperCase()),
        date_applied: moment(data?.created_at).format("ddd, DD MMM YYYY"),
        notice_period_start_date: moment(data?.notice_period_start_date).format(
          "ddd, DD MMM YYYY"
        ),
        last_day_at_work: moment(data?.last_day_at_work).format(
          "ddd, DD MMM YYYY"
        ),
        reason_for_resignation: data?.resignation_reason,
      }));

      setData(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Operation Resignations | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchOperationsResignations();
  }, [fetchOperationsResignations]);

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
      dataField: "stage",
      text: "Stage",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "notice_period_start_date",
      text: "Notice Period Start Date",
      sort: true,
      headerStyle: { width: "15%" },
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
              style={{ marginRight: "10px" }}
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
          </div>
        </div>
      ),
    },
  ];

  const handleApproveResignation = async (viewRow) => {
    const resignationId = viewRow.id;

    try {
      const res = await axiosInstance.patch(
        `/api/v1/resignations/${resignationId}.json`,
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

      // fetchOperationsResignations();
      goToTop();
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      goToTop();
    }
  };

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
    </>
  );
};

export default OperationsResignationAdmin;
