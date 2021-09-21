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
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </Link>
        ) : value === "Approved by COO" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> {value}
          </Link>
        ) : value === "Approved by CEO" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> {value}
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
        ) : (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> Draft
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
          <Link
            onClick={() => handleStatus("Approve")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> Approve
          </Link>
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

          <Link
            onClick={() => handleStatus("Rejected")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> Reject
          </Link>
        </div>
      </div>
    );
  }

  if (context === "job_opening") {
    return (
      <div className="dropdown action-label text-center">
        {value === "OPEN" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success"></i> {value}
          </Link>
        ) : value === "CLOSED" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> {value}
          </Link>
        ) : (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-primary"></i> OPEN
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
              onClick={() => handleStatus("OPEN")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-primary"></i> OPEN
            </Link>
          )}
          <Link
            onClick={() => handleStatus("CLOSED")}
            className="dropdown-item"
            href="#"
          >
            <i className="fa fa-dot-circle-o text-danger"></i> CLOSED
          </Link>
        </div>
      </div>
    );
  }
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
        ) : value === "Replied" &&
          context !== "job offer" &&
          context !== "salary_component" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Replied
          </Link>
        ) : value === "Pending" && context === "salary_component" ? (
          <Link
            className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-purple"></i> Pending
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
          {context !== "job offer" && context !== "salary_component" && (
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
          {context === "salary_component" && (
            <Link
              onClick={() => handleStatus("Pending")}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-dot-circle-o text-info"></i> Pending
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
