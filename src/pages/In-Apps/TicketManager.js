import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import moment from "moment";
import './TicketManager.css';
import ViewModal from "../../components/Modal/ViewModal";
import TicketContent from "../../components/ModalContents/TicketContent";
import { useAppContext } from "../../Context/AppContext";

const TicketManager = () => {
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [allDepartments, setallDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [tickets, setTickets] = useState([]);
  const [viewCard, setViewCard] = useState(null);


  const fetchDept = () => {
    axiosInstance.get("/department").then((e) => {
      setallDepartments(e?.data?.data);
    });
  };

  const fetchTickets = () => {
    const route = "/api/ticketing" + (department ? `/department/${department}` : '')
    axiosInstance.get(route).then((e) => {
      setTickets(e?.data?.data);
    });
  };

  const updateTicketStatus = (id, status) => {
    console.log({status, employee_id: user._id})
    axiosInstance
    .patch(`api/ticketing/${id}`, {status, employee_id: user._id})
    .then((e) => {
      fetchTickets();
      showAlert(
        true,
        "Ticket successfully edited",
        "alert alert-success"
      );
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchDept();
    fetchTickets();
  }, [department]);

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="file-wrap">
            <div className="file-sidebar">
              <div className="file-header justify-content-center">
                <span>Tickets</span>
                <a href="#ticket-sidebar" className="file-side-close">
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
                  <ul id="ticket-sidebar" className="file-menu">
                    <li className={!department ? "active" : ''}>
                      <a onClick={() => setDepartment('')}>All Tickets</a>
                    </li>
                    {allDepartments?.map((dept) => {
                      const {_id, department} = dept;
                      return (
                        <li key={_id} className={department === _id ? "active" : ''}>
                          <a onClick={() => setDepartment(_id)}>{department.toUpperCase()}</a>
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
                      href="#ticket-sidebar"
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
                        {/* <h4>Recent Tickets</h4>
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
                                <span>10.45kb</span> 
                              </div>
                              <div className="card-footer">
                                <span className="d-none d-sm-inline">
                                  Last Modified:{" "}
                                </span>
                                1 min ago
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <h4>Tickets</h4>
                      { tickets.length ?
                        <div className="row row-sm">
                        {
                            tickets?.map((ticket) => {
                              const { _id, title, createdAt, status } = ticket;
                              const statusStyle = status === 'Open' ? 'alert-info' : (status === 'Processing' ? 'alert-warning' : 'alert-success');
                              return (
                                <div key={_id} className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
                                  <div className="card card-file">
                                    <div className="dropdown-file">
                                      <a
                                        href="#"
                                        className="dropdown-link"
                                        data-toggle="dropdown"
                                      >
                                        <i className="fa fa-ellipsis-v"></i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a 
                                        href="#"
                                        className="dropdown-item"
                                        data-toggle="modal"
                                        data-target="#generalModal"
                                        onClick={() => { setViewCard(ticket);}}
                                        >
                                          View Details
                                        </a>
                                        <a 
                                          href="#"
                                          className="dropdown-item"
                                        >
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                    <div className="card-file-thumb">
                                      <i className="las la-sticky-note"></i>
                                    </div>
                                    <div className="card-body">
                                      <h6>
                                        <a href="">{title}</a>
                                      </h6>
                                      {/* <span>12mb</span> */}
                                      <div>
                                        <a
                                          href="#"
                                          data-toggle="dropdown"
                                        >
                                          <p className={`display-status card-status ${statusStyle}`}>{status}</p>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-left">
                                          <a 
                                          href="#"
                                          className="dropdown-item"
                                          onClick={() => { updateTicketStatus(_id, 'Open');}}
                                          >
                                            Open
                                          </a>
                                          <a 
                                          href="#"
                                          className="dropdown-item"
                                          onClick={() => { updateTicketStatus(_id,'Processing');}}
                                          >
                                            Processing
                                          </a>
                                          <a 
                                          href="#"
                                          className="dropdown-item"
                                          onClick={() => { updateTicketStatus(_id, 'Resolved');}}
                                          >
                                          Resolved
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-footer">{moment(new Date(new Date(createdAt))).format("DD MMM YYYY h:mm a")}</div>
                                  </div>
                                </div>
                                )
                                })
                              }
                        </div> : 
                        <h5>Fetching Data...</h5>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewModal
        title={viewCard?.title}
        content={<TicketContent ticket={viewCard} manager={true} update={updateTicketStatus} />}
      />
    </>
  );
};

export default TicketManager;
