//* IN-USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalPaginatedTable from "../../components/Tables/UniversalPaginatedTable";
import { TicketFormModal } from "../../components/Modal/TicketFormModal";
import moment from "moment";

const Tickets = () => {
  const { user } = useAppContext();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [ticket, setTicket] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

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

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "40%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "20%" },
      // formatter: (value, row) => (
      //   <>
      //     {value === "Resolved" ? (
      //       <a href="" className="pos-relative">
      //         {" "}
      //         <span className="status-ticket status-online"></span>{" "}
      //         <span className="ml-4 d-block">{value.toUpperCase()}</span>
      //       </a>
      //     ) : value === "Processing" ? (
      //       <a href="" className="pos-relative">
      //         {" "}
      //         <span className="status-ticket status-pending"></span>{" "}
      //         <span className="ml-4 d-block">{value.toUpperCase()}</span>
      //       </a>
      //     ) : (
      //       <a href="" className="pos-relative">
      //         {" "}
      //         <span className="status-ticket status-open"></span>{" "}
      //         <span className="ml-4 d-block">{value.toUpperCase()}</span>
      //       </a>
      //     )}
      //   </>
      // ),
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
              <i className="lab la-readme m-r-5"></i> View
            </a>
            {row.status === "Open" && (
              <>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#FormModal"
                  // onClick={() => handleEdit(row)}
                >
                  <i className="fa fa-pencil m-r-5"></i> Edit
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    // setSelectedRow(row);
                  }}
                >
                  <i className="fa fa-trash m-r-5"></i> Delete
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
            <h3 className="page-title">Tickets</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Apps</li>
              <li className="breadcrumb-item active">Ticket</li>
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

      <TicketFormModal
        mode={mode}
        data={ticket}
        // fetchAllTickets={fetchAllTickets}
      />
    </>
  );
};

export default Tickets;
