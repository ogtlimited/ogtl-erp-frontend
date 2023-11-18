/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./acc.css";

const InvoiceBillApprover = ({ row, value, setStatus, setstatusRow }) => {
  const handleStatus = (status) => {
    setStatus(status);
    setstatusRow(row);
  };
  return (
    <>
      <div className="dropdown action-label text-center">
        {value === "Published" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </a>
        ) : value === "Draft" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </a>
        ) : (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Draft
          </a>
        )}

        <div
          className="dropdown-menu dropdown-menu-right"
          x-placement="bottom-end"
          style={{
            position: "absolute",
            willChange: "transform",
            top: "0px",
            left: "0px",
            transform: "translate3d(106px, 31px, 0px)",
          }}
        >
          <a onClick={() => handleStatus("Draft")} className="dropdown-item">
            <i className="fa fa-dot-circle-o text-primary"></i> Draft
          </a>

          <a
            onClick={() => handleStatus("Published")}
            className="dropdown-item "
            data-toggle="modal"
            data-target="#approve_leave"
          >
            <i className="fa fa-dot-circle-o text-success"></i>
            Published
          </a>
        </div>
      </div>
    </>
  );
};

export default InvoiceBillApprover;
