/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import TextEditor from "../Forms/TextEditor";
import config from "../../config.json";

export const ExternalTicketFormModal = ({ data, loggedIn, showAlert }) => {
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    setTicket(data);
  }, [data]);

  const cancelEvent = () => {
    setTicket(data);
    setEditorContent("");
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config?.ApiUrl}/api/v1/tickets.json?logged_in=${loggedIn}`,
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
      $("#TicketFormModal").modal("toggle");
      setTicket(response.data);
      setEditorContent("");
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#TicketFormModal").modal("toggle");
      setLoading(false);
    }
  };

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
                Submit a Ticket
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
              <form onSubmit={handleCreateTicket}>
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
                            readOnly={loggedIn}
                            required
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
                            readOnly={loggedIn}
                            required
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
                            readOnly={loggedIn}
                            required
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
                            readOnly={loggedIn}
                            required
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={cancelEvent}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!editorContent?.length}
                  >
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
