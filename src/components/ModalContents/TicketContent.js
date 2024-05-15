/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./ModalContent.css";

const TicketContent = ({ ticket }) => {
  const { full_name, email, ogid, office, status, date_created, complaint } =
    ticket || {};

  const statusStyle = status === "Pending" ? "alert-warning" : "alert-success";

  return (
    <div>
      <p className="ticket-info">
        Date created <span>{date_created}</span>
      </p>
      <p className="ticket-info">
        Name <span>{full_name}</span>
      </p>
      <p className="ticket-info">
        Email <span>{email}</span>
      </p>
      <p className="ticket-info">
        OGID <span>{ogid}</span>
      </p>
      <p className="ticket-info">
        Office <span>{office?.toUpperCase()}</span>
      </p>
      <div>
        <p className={`display-status ${statusStyle}`}>{status}</p>
      </div>
      <div className="well" dangerouslySetInnerHTML={{ __html: complaint }} />
    </div>
  );
};

export default TicketContent;
