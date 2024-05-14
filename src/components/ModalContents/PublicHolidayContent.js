/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import "./ModalContent.css";

const PublicHolidayContent = ({ data }) => {
  const { title, start_date, end_date, status } = data || {};

  console.log("PH Content:", data);

  const statusStyle =
    status === "past"
      ? "alert-info"
      : status === "happening"
      ? "alert-danger"
      : "alert-warning";

  return (
    <div>
      <p className="ticket-info">
        Title <span>{title}</span>
      </p>
      <p className="ticket-info">
        Start <span>{moment(start_date).format('Do MMMM, YYYY - h:mma')}</span>
      </p>
      <p className="ticket-info">
        End <span>{moment(end_date).format('Do MMMM, YYYY - h:mma')}</span>
      </p>
      <div>
        <p className={`display-status ${statusStyle}`}>
          {status?.replace(/\b\w/g, (char) => char.toUpperCase())}
        </p>
      </div>
      <div className="well"></div>
    </div>
  );
};

export default PublicHolidayContent;
