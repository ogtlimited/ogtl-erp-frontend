import React from "react";

const ViewEmail = () => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Inbox</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Inbox</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-0">
            <div className="card-body">
              <div className="email-header">
                <div className="row">
                  <h3 className=" px-3">Payslip</h3>
                </div>
              </div>
              <div className="mt-2 d-flex justify-content-between">
                <h5>HR</h5>
                <div>
                  <span className="text-sm text-muted">
                    13:08 ( 1 hour ago)
                  </span>
                  <div className="btn-group dropdown-action">
                    <button
                      type="button"
                      className="btn btn-white dropdown-toggle mr-1"
                      data-toggle="dropdown"
                    >
                      Select <i className="fa fa-angle-down "></i>
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        All
                      </a>
                      <a className="dropdown-item" href="#">
                        None
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">
                        Read
                      </a>
                      <a className="dropdown-item" href="#">
                        Unread
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmail;
