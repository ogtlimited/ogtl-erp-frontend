import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";

const TicketManager = () => {
  const [allDepartments, setallDepartments] = useState([]);

  const fetchDept = () => {
    axiosInstance.get("/department").then((e) => {
      setallDepartments(e?.data?.data);
    });
  };

  useEffect(() => {
    fetchDept();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="file-wrap">
          <div className="file-sidebar">
            <div className="file-header justify-content-center">
              <span>Tickets</span>
              <a href="" className="file-side-close">
                <i className="fa fa-times"></i>
              </a>
            </div>
            <form className="file-search">
              <div className="input-group">
                <div className="input-group-prepend">
                  <i className="fa fa-search"></i>
                </div>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Search"
                />
              </div>
            </form>
            <div className="file-pro-list">
              <div className="file-scroll">
                <ul className="file-menu">
                  <li className="active">
                    <a href="">All Tickets</a>
                  </li>
                  {allDepartments?.map((dept) => {
                    const {_id, department} = dept;
                    return (
                      <li className="active">
                        <a key={_id} href="">{department.toUpperCase()}</a>
                      </li>
                    )
                  })}
                </ul>
                <div className="show-more">
                  <a href="">Show More</a>
                </div>
              </div>
            </div>
          </div>
          <div className="file-cont-wrap">
            <div className="file-cont-inner">
              <div className="file-cont-header">
                <div className="file-options">
                  <a
                    href=""
                    id="file_sidebar_toggle"
                    className="file-sidebar-toggle"
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
                <span>Ticket Manager</span>
                <div className="file-options">
                  <span className="btn-file">
                    <input type="file" className="upload" />
                    <i className="fa fa-upload"></i>
                  </span>
                </div>
              </div>
              <div className="file-content">
                <form className="file-search">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <i className="fa fa-search"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder="Search"
                    />
                  </div>
                </form>
                <div className="file-body">
                  <div className="file-scroll">
                    <div className="file-content-inner">
                      <h4>Recent Tickets</h4>
                      <div className="row row-sm">
                        <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
                          <div className="card card-file">
                            <div className="dropdown-file">
                              <a
                                href=""
                                className="dropdown-link"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa fa-ellipsis-v"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a href="" className="dropdown-item">
                                  View Details
                                </a>
                                <a href="" className="dropdown-item">
                                  Share
                                </a>
                                <a href="" className="dropdown-item">
                                  Download
                                </a>
                                <a href="" className="dropdown-item">
                                  Rename
                                </a>
                                <a href="" className="dropdown-item">
                                  Delete
                                </a>
                              </div>
                            </div>
                            <div className="card-file-thumb">
                              <i className="las la-sticky-note"></i>
                            </div>
                            <div className="card-body">
                              <h6>
                                <a href="">Latest Ticket Name</a>
                              </h6>
                              {/* <span>10.45kb</span> */}
                            </div>
                            <div className="card-footer">
                              <span className="d-none d-sm-inline">
                                Last Modified:{" "}
                              </span>
                              1 min ago
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4>Tickets</h4>
                      <div className="row row-sm">
                        <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
                          <div className="card card-file">
                            <div className="dropdown-file">
                              <a
                                href=""
                                className="dropdown-link"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa fa-ellipsis-v"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a href="" className="dropdown-item">
                                  View Details
                                </a>
                                <a href="" className="dropdown-item">
                                  Share
                                </a>
                                <a href="" className="dropdown-item">
                                  Download
                                </a>
                                <a href="" className="dropdown-item">
                                  Rename
                                </a>
                                <a href="" className="dropdown-item">
                                  Delete
                                </a>
                              </div>
                            </div>
                            <div className="card-file-thumb">
                              <i className="las la-sticky-note"></i>
                            </div>
                            <div className="card-body">
                              <h6>
                                <a href="">Ticket Name</a>
                              </h6>
                              {/* <span>12mb</span> */}
                            </div>
                            <div className="card-footer">9 Aug 1:17 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManager;
