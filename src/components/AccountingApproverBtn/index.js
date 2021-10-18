import React from "react";
import { Link } from "react-router-dom";

const InvoiceBillApprover = ({ row, value, setStatus, setstatusRow }) => {
  const handleStatus = (status) => {
    setStatus(status);
    setstatusRow(row);
  };
  return (
    <>
      <div className="dropdown action-label text-center">
        {value === "Published" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </Link>
        ) : value === "Draft" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </Link>
        ) : (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Published
          </Link>
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
          <Link onClick={() => handleStatus("Draft")} className="dropdown-item">
            <i className="fa fa-dot-circle-o text-primary"></i> Draft
          </Link>

          <Link
            onClick={() => handleStatus("Published")}
            className="dropdown-item"
            data-toggle="modal"
            data-target="#approve_leave"
          >
            <i className="fa fa-dot-circle-o text-success"></i>
            Published
          </Link>
        </div>
      </div>
    </>
  );
};

export default InvoiceBillApprover;
