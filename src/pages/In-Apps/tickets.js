//* IN-USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalPaginatedTable from "../../components/Tables/UniversalPaginatedTable";
import { TicketFormModal } from "../../components/Modal/TicketFormModal";
import ViewModal from "../../components/Modal/ViewModal";
import TicketContent from "../../components/ModalContents/TicketContent";
import moment from "moment";

const Tickets = () => {
  const { getAvatarColor, user, ErrorHandler } = useAppContext();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [ticket, setTicket] = useState([]);
  const [viewRow, setViewRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(
        `/api/v1/employee_tickets.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: sizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.tickets;
      const totalPages = response?.data?.data?.pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((ticket) => ({
        ...ticket,
        full_name: ticket?.first_name + " " + ticket?.last_name,
        email: ticket?.email,
        ogid: ticket?.ogid,
        office: ticket?.office?.toUpperCase(),
        status: ticket?.resolved ? "Resolved" : "Pending",
        date_created: moment(ticket?.created_at).utc().format("Do MMM, YYYY"),
        complaint: ticket?.complaint,
      }));

      setAllTickets(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Tickets | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreate = () => {
    const prefilledTicketForm = {
      first_name: user?.employee_info?.personal_details?.first_name,
      last_name: user?.employee_info?.personal_details?.last_name,
      ogid: user?.employee_info?.ogid,
      email: user?.employee_info?.email,
      complaint: "",
    };

    setTicket(prefilledTicketForm);
    setMode("Create");
  };

  // const handleEdit = (row) => {
  //   setTicket(row);
  //   setMode("Edit");
  // };

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
      headerStyle: { width: "15%" },
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
      headerStyle: { width: "25%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {value === "Resolved" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-success"
                style={{ marginRight: "5px" }}
              ></i>{" "}
              Resolved
            </span>
          ) : (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-warning"
                style={{ marginRight: "5px" }}
              ></i>{" "}
              Pending
            </span>
          )}
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "5%" },
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
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>
            {/* {!row.resolved && (
              <>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#TicketFormModal"
                  onClick={() => handleEdit(row)}
                >
                  <i className="fa fa-check m-r-5"></i> Edit
                </a>
              </>
            )} */}
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
            <h3 className="page-title">Tickets</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Engage & Feedback</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#TicketFormModal"
              onClick={handleCreate}
            >
              <i className="las la-ticket-alt"></i> Generate Ticket
            </a>
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

      
      <ViewModal
        title="Ticket Details"
        content={<TicketContent ticket={viewRow} />}
      />

      <TicketFormModal
        mode={mode}
        data={ticket}
        loggedIn={true}
        fetchTickets={fetchTickets}
      />
    </>
  );
};

export default Tickets;
