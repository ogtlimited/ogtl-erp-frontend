import React from "react";
import { Link } from "react-router-dom";

export const ApproverBtn = ({
  row,
  value,
  setStatus,
  setstatusRow,
  context,
}) => {
  const handleStatus = (status) => {
    setStatus(status);
    setstatusRow(row);
  };
  return (
    <>
      <div className="dropdown action-label text-center">
        {value === "Accepted" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </Link>
        ) : value === "Rejected" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> {value}
          </Link>
        ) : value === "Open" && context !== "job offer" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </Link>
        ) : value === "Replied" && context !== "job offer" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Replied
          </Link>
        ) : (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i>{" "}
            {context === "job offer" ? "Awaiting Response" : "Open"}
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
          {context !== "job offer" && (
            <Link
              onClick={() => handleStatus("Open")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-primary"></i> Open
            </Link>
          )}
          <Link
            onClick={() => handleStatus("Rejected")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> Rejected
          </Link>
          <Link
            onClick={() => handleStatus("Accepted")}
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#approve_leave"
          >
            <i className="fa fa-dot-circle-o text-success"></i>
            Accepted
          </Link>
          {context !== "job offer" && (
            <Link
              onClick={() => handleStatus("Replied")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Replied
            </Link>
          )}
          {context === "job offer" && (
            <Link
              onClick={() => handleStatus("Awaiting Response")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Awaiting Response
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
