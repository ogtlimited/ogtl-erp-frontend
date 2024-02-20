/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import TextEditor from "../Forms/TextEditor";

export const TicketFormModal = ({ mode, data, fetchAllTickets }) => {
  const { showAlert, goToTop } = useAppContext();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const loggedIn = true;

  useEffect(() => {
    setTicket(data);
  }, [data, ticket]);

  const cancelEvent = () => {
    setTicket(data);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleTicketActions = async (e) => {
    if (mode === "Create") {
      return handleCreateTicket(e);
    } else {
      // return handleEditTicket(e);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/tickets.json?logged_in=${loggedIn}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            ...ticket,
            complaint: editorContent,
          },
        }
      );

      showAlert(true, "Ticket successfully created", "alert alert-success");
      // fetchAllTickets();
      $("#TicketFormModal").modal("toggle");
      setTicket(data);
      setLoading(false);
      goToTop();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#TicketFormModal").modal("toggle");
      goToTop();
      setLoading(false);
    }
  };

  // const handleEditTicket = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   try {
  //     // eslint-disable-next-line no-unused-vars
  //     const response = await axiosInstance.put(
  //       `/api/v1/branches/${ticket.id}.json`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //         payload: {
  //           title: ticket.title,
  //           state: ticket.state,
  //           country: ticket.country,
  //         },
  //       }
  //     );

  //     showAlert(true, "Branch successfully updated", "alert alert-success");
  //     fetchAllTickets();
  //     $("#TicketFormModal").modal("toggle");
  //     setTicket(data);
  //     setLoading(false);
  //     goToTop();
  //   } catch (error) {
  //     const errorMsg = error?.response?.data?.errors;
  //     showAlert(true, `${errorMsg}`, "alert alert-warning");
  //     $("#TicketFormModal").modal("toggle");
  //     goToTop();
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div
        className="modal fade"
        id="TicketFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode === "Create" ? "Submit a" : mode} Ticket
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleTicketActions}>
                <div className="row">
                  {!loggedIn ? (
                    <>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="first_name">First Name</label>
                          <input
                            name="first_name"
                            type="text"
                            className="form-control"
                            value={ticket.first_name}
                            onChange={handleFormChange}
                            readOnly={ticket.first_name.length > 0}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            name="last_name"
                            type="text"
                            className="form-control"
                            value={ticket.last_name}
                            onChange={handleFormChange}
                            readOnly={ticket.last_name.length > 0}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ogid">OGID</label>
                          <input
                            name="ogid"
                            type="text"
                            className="form-control"
                            value={ticket.ogid}
                            onChange={handleFormChange}
                            readOnly={ticket.ogid.length > 0}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            type="text"
                            className="form-control"
                            value={ticket.email}
                            onChange={handleFormChange}
                            readOnly={ticket.email.length > 0}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="content">Content</label>
                      <TextEditor
                        editorContent={editorContent}
                        onContentChange={setEditorContent}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Create" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
