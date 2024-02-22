//* IN-USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalPaginatedTable from "../../components/Tables/UniversalPaginatedTable";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import moment from "moment";
import $ from "jquery";

const TicketManagement = () => {
  const { showAlert, ErrorHandler, getAvatarColor } = useAppContext();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const fetchAllTickets = useCallback(async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(`/api/v1/all_tickets.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: page,
          limit: sizePerPage,
        },
      });

      const resData = response?.data?.data?.tickets;
      const totalPages = response?.data?.data?.pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((ticket) => ({
        full_name: ticket?.first_name + " " + ticket?.last_name,
        email: ticket?.email,
        ogid: ticket?.ogid,
        office:
          ticket?.operation_department_id ?? ticket?.operation_campaign_id,
        status: ticket?.resolved,
        date_created: moment(ticket?.created_at).utc().format("Do MMM, YYYY"),
        complaint: ticket?.complaint,
      }));

      console.log(formatted);

      setAllTickets(formatted);
      setLoading(false);
    } catch (error) {
      const component = "All Tickets | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]);

  const handleResolveTicket = async () => {
    setIsResolving(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/resolve_tickets.json?logged_in=${"loggedIn"}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            resolved: true,
          },
        }
      );

      showAlert(true, "Ticket has been resolved!", "alert alert-success");
      fetchAllTickets();
      $("#exampleModal").modal("toggle");
      setIsResolving(false);  
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setIsResolving(false);
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
            {row?.full_name} <span>{row?.ogid}</span>
          </div>
        </h2>
      ),
    },
    {
      dataField: "date_created",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          {value === true ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-ticket status-online"></span>{" "}
              <span className="ml-4 d-block">RESOLVED</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-ticket status-pending"></span>{" "}
              <span className="ml-4 d-block">PENDING</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                // setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>
            {!row.status && (
              <>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => setSelectedRow(row)}
                >
                  <i className="fa fa-check m-r-5"></i> Resolve
                </a>
              </>
            )}
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
            <h3 className="page-title">All Tickets</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Ticket Management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={allTickets}
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

      <ConfirmModal
        title="Resignation"
        selectedRow={selectedRow}
        deleteFunction={handleResolveTicket}
        message="Are you sure this ticket has been resolved?"
        isLoading={isResolving}
      />
    </>
  );
};

export default TicketManagement;
