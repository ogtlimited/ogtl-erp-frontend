import React from "react";
import { Link } from "react-router-dom";
import tokenService from "../../services/token.service";

export const ApproverBtn = ({
  row,
  value,
  setStatus,
  setstatusRow,
  context,
}) => {
  const user = tokenService.getUser();
  const handleStatus = (status) => {
    if (user.designation.designation === "Accountant" && status === "Approve") {
      setStatus("Approved by Accountant");
    } else if (user.designation.designation === "COO" && status === "Approve") {
      setStatus("Approved By COO");
    } else if (user.designation.designation === "CEO" && status === "Approve") {
      setStatus("Approved By CEO");
    } else {
      setStatus(status);
    }
    setstatusRow(row);
  };
  if (context === "maintenance") {
    return (
      <div className="dropdown action-label text-center">
        {value === "Approved by Accountant" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </a>
        ) : value === "Approved by COO" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </a>
        ) : value === "Approved by CEO" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> {value}
          </a>
        ) : value === "Rejected" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> {value}
          </a>
        ) : (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> Draft
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
          <a
            onClick={() => handleStatus("Approve")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> Approve
          </a>
          {/* <Link
            onClick={() => handleStatus("Approved by COO")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Approved by COO
          </Link>
          <Link
            onClick={() => handleStatus("Approved by CEO")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> Approved by CEO
          </Link> */}

          <a
            onClick={() => handleStatus("Rejected")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> Reject
          </a>
        </div>
      </div>
    );
  }

  if (context === "job_opening") {
    return (
      <div className="dropdown action-label text-center">
        {value === "OPEN" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </a>
        ) : value === "CLOSED" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> {value}
          </a>
        ) : (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> OPEN
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
          {context !== "job offer" && (
            <a
              onClick={() => handleStatus("OPEN")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-primary"></i> OPEN
            </a>
          )}
          <a
            onClick={() => handleStatus("CLOSED")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> CLOSED
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="dropdown action-label text-center">
        {value === "Accepted" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </a>
        ) : value === "Rejected" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> {value}
          </a>
        ) : value === "Open" && context !== "job offer" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </a>
        ) : value === "Replied" &&
          context !== "job offer" &&
          context !== "salary_component" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Replied
          </a>
        ) : value === "Pending" && context === "salary_component" ? (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Pending
          </a>
        ) : (
          <a
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i>{" "}
            {context === "job offer" ? "Awaiting Response" : "Open"}
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
          {context !== "job offer" && (
            <a
              onClick={() => handleStatus("Open")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-primary"></i> Open
            </a>
          )}
          <a
            onClick={() => handleStatus("Rejected")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> Rejected
          </a>
          <a
            onClick={() => handleStatus("Accepted")}
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#approve_leave"
          >
            <i className="fa fa-dot-circle-o text-success"></i>
            Accepted
          </a>
          {context !== "job offer" && context !== "salary_component" && (
            <a
              onClick={() => handleStatus("Replied")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Replied
            </a>
          )}
          {context === "job offer" && (
            <a
              onClick={() => handleStatus("Awaiting Response")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Awaiting Response
            </a>
          )}
          {context === "salary_component" && (
            <a
              onClick={() => handleStatus("Pending")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Pending
            </a>
          )}
        </div>
      </div>
    </>
  );
};
