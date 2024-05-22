// *IN USE

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import TextEditor from "../Forms/TextEditor";

export const DocAnnouncementFormModal = ({ mode, data, fetchDocs }) => {
  const { showAlert, goToTop } = useAppContext();
  const [newsletter, setNewsletter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    setNewsletter(data);
    setEditorContent(data?.body || "");
  }, [data]);

  const cancelEvent = () => {
    setNewsletter(data);
    setEditorContent("");
  };

  const handleFormChange = (e) => {
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
  };

  const handleNewsletterActions = async (e) => {
    if (mode === "Create") {
      return handleCreateNewsletter(e);
    } else {
      return handleEditNewsletter(e);
    }
  };

  const handleCreateNewsletter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/text_announcements.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: newsletter.title,
            body: editorContent,
          },
        }
      );

      showAlert(true, "Newsletter successfully created", "alert alert-success");
      fetchDocs();
      $("#DocAnnouncementFormModal").modal("toggle");
      setNewsletter(data);
      setEditorContent("");

      setLoading(false);
      goToTop();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DocAnnouncementFormModal").modal("toggle");
      goToTop();
      setLoading(false);
    }
  };

  const handleEditNewsletter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/text_announcements/${data?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: newsletter.title,
            body: editorContent,
          },
        }
      );

      showAlert(true, "Newsletter successfully updated", "alert alert-success");
      $("#DocAnnouncementFormModal").modal("toggle");

      fetchDocs();
      setNewsletter(data);
      setEditorContent("");

      setLoading(false);
      goToTop();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DocAnnouncementFormModal").modal("toggle");
      goToTop();
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DocAnnouncementFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Newsletter
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
              <form onSubmit={handleNewsletterActions}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newsletter.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="row">
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!editorContent.length}
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
