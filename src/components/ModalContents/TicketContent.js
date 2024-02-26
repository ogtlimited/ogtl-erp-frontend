/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./TicketContent.css";

const TicketContent = ({ ticket }) => {
  const { full_name, email, ogid, office, status, date_created, complaint } =
    ticket || {};

  const statusStyle = status === "Pending" ? "alert-warning" : "alert-success";

  return (
    <div>
      <p className="ticket-info">{date_created}</p>
      <p className="ticket-info">{full_name}</p>
      <p className="ticket-info">{email}</p>
      <p className="ticket-info">{ogid}</p>
      <p className="ticket-info">{office?.toUpperCase()}</p>
        <div>
            <p className={`display-status ${statusStyle}`}>{status}</p>
        </div>
      <div className="well" dangerouslySetInnerHTML={{ __html: complaint }} />
    </div>
  );
};

export default TicketContent;
