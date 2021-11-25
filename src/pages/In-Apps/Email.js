import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import "./email.css";

const Email = () => {
  const [data, setData] = useState([]);
  const [postsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");

  const { user } = useAppContext();

  const indexOfLastPost1 = currentPage * postsPerPage;
  const indexOfFirstPost1 = indexOfLastPost1 - postsPerPage;

  //search function
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };

  //fetch emails
  const fetchEmails = () => {
    axiosInstance
      .get(`api/email/${user?.company_email}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEmails();
  }, []);

  const currentPosts1 = data?.slice(indexOfFirstPost1, indexOfLastPost1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const filteredData = currentPosts1?.filter((post) => {
    return (
      post?.model_name?.toLowerCase().includes(searchField.toLowerCase()) ||
      post?.sender?.toLowerCase().includes(searchField.toLowerCase())
    );
  });

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
          <div className="col-auto float-right ml-auto">
            <a href="#composeForm" className="btn add-btn">
              <i className="fa fa-plus"></i> Compose
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-0">
            <div className="card-body">
              <div className="email-header">
                <div className="row">
                  <div className="col top-action-left">
                    <div className="float-left">
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
                      <div className="btn-group dropdown-action">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle mr-1"
                          data-toggle="dropdown"
                        >
                          Actions <i className="fa fa-angle-down "></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Reply
                          </a>
                          <a className="dropdown-item" href="#">
                            Forward
                          </a>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            Mark As Read
                          </a>
                          <a className="dropdown-item" href="#">
                            Mark As Unread
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                      <div className="btn-group dropdown-action">
                        <button
                          type="button"
                          className="btn btn-white dropdown-toggle mr-1"
                          data-toggle="dropdown"
                        >
                          <i className="fa fa-folder"></i>{" "}
                          <i className="fa fa-angle-down"></i>
                        </button>
                        <div role="menu" className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Social
                          </a>
                          <a className="dropdown-item" href="#">
                            Forums
                          </a>
                          <a className="dropdown-item" href="#">
                            Updates
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            Spam
                          </a>
                          <a className="dropdown-item" href="#">
                            Trash
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            New
                          </a>
                        </div>
                      </div>
                      <div className="btn-group dropdown-action">
                        <button
                          type="button"
                          data-toggle="dropdown"
                          className="btn btn-white dropdown-toggle"
                        >
                          <i className="fa fa-tags"></i>{" "}
                          <i className="fa fa-angle-down"></i>
                        </button>
                        <div role="menu" className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Work
                          </a>
                          <a className="dropdown-item" href="#">
                            Family
                          </a>
                          <a className="dropdown-item" href="#">
                            Social
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            Primary
                          </a>
                          <a className="dropdown-item" href="#">
                            Promotions
                          </a>
                          <a className="dropdown-item" href="#">
                            Forums
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="float-left d-none d-sm-block">
                      <input
                        type="search"
                        placeholder="Search Messages"
                        className="form-control search-message"
                        onChange={searchChange}
                      />
                    </div>
                  </div>
                  <div className="col-auto top-action-right">
                    <div className="text-right">
                      <button
                        type="button"
                        title=""
                        data-toggle="tooltip"
                        className="btn btn-white d-none d-md-inline-block mr-1"
                        data-original-title="Refresh"
                        onClick={() => fetchEmails()}
                      >
                        <i className="fa fa-refresh"></i>
                      </button>
                      <div className="btn-group">
                        <Link
                          className={`btn btn-white ${
                            currentPage === 1 ? "disabled" : ""
                          } `}
                          onClick={() => goToPreviousPage()}
                        >
                          <i className="fa fa-angle-left"></i>
                        </Link>
                        <Link
                          className={`btn btn-white ${
                            currentPage === data.length ? "disabled" : ""
                          } `}
                          onClick={() => goToNextPage()}
                        >
                          <i className="fa fa-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-muted d-none d-md-inline-block">
                        Showing {currentPosts1.length} of {data.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="email-content">
                <div className="table-responsive">
                  <table className="table table-inbox table-hover">
                    <thead>
                      <tr>
                        <th colspan="6">
                          {/* <input type="checkbox" className="checkbox-all" /> */}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((inbox, i) => (
                        <tr
                          className={`${
                            inbox?.is_read
                              ? "clickable-row"
                              : "clickable-row unread"
                          }`}
                          data-href="mail-view.html"
                          key={i}
                        >
                          <td>
                            <input type="checkbox" className="checkmail" />
                          </td>

                          <td className="name">
                            {inbox?.sender || "Not Available"}
                          </td>
                          <td className="subject">{inbox?.subject}</td>
                          <td className="subject">{inbox?.model_name}</td>
                          <td className="mail-date">
                            {moment(inbox?.createdAt).format("L")}
                          </td>
                          <td>
                            <Link
                              style={{
                                color: !inbox?.is_read ? "#000" : "#7b939c",
                              }}
                              to={{
                                pathname: `/admin/mail/${inbox?._id}`,
                                state: { inbox },
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
