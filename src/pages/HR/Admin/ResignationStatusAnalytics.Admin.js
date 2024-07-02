// * IN USE

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import ViewModal from "../../../components/Modal/ViewModal";
import ResignationContent from "../../../components/ModalContents/ResignationContent";

const ResignationStatusAnalytics = () => {
  const { ErrorHandler, getAvatarColor } = useAppContext();
  const [allApplications, setallApplications] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState("");
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // Handle Resignation Header:
  const formatResignationHeader = useCallback(() => {
    const header = id;
    const Header = header[0].toUpperCase() + header.substring(1);
    setHeader(Header);
  }, [id]);

  // Resignation Feedback:
  const handleViewRowFeedback = async (row) => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/resignation_feedback/${row?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      let resData = res?.data?.data;

      setViewRow((prevState) => ({
        ...prevState,
        feedback: resData,
      }));
    } catch (error) {
      const component = "Resignations Feedback Error | ";
      ErrorHandler(error, component);
    }
  };

  // Fetch Resignation Status:
  const fetchResignationStatus = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/v1/hr_dashboard/resignation_status.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          status: id,
        },
      })
      .then((res) => {
        const resData = res?.data?.data?.resignations;
        const totalPages = res?.data?.data?.total_pages;

        // console.log("viewed Resignations", res)

        setSizePerPage(sizePerPage);
        setTotalPages(totalPages);

        const formattedData = resData.map((data) => ({
          ...data,
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

        setallApplications(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        const component = `${id} Resignations | `;
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, sizePerPage]);

  useEffect(() => {
    fetchResignationStatus();
    formatResignationHeader();
  }, [formatResignationHeader, fetchResignationStatus]);

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
    {
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
                handleViewRowFeedback(row);
              }}
            >
              View
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
            <h3 className="page-title">{header} Resignations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr-dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Resignation Status</li>
            </ul>
          </div>
        </div>
      </div>

      <UniversalPaginatedTable
        data={allApplications}
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

      {modalType === "view-details" ? (
        <ViewModal
          title="Resignation Details"
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ResignationStatusAnalytics;
