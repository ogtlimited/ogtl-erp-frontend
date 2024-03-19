import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const AnnouncementFormModal = ({ fetchAnnouncement }) => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [data, setData] = useState({
    title: "",
    video: null,
  });

  const cancelEvent = () => {
    setData({
      title: "",
      video: null,
    });
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleFormChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("video", data.video);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/video_announcements.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        "Your Video Upload is Successful",
        "alert alert-success"
      );
      $("#AnnouncementFormModal").modal("toggle");

      fetchAnnouncement();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#AnnouncementFormModal").modal("toggle");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="AnnouncementFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Announcement
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
              {/* <form onSubmit={handleTicketActions}>
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
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
