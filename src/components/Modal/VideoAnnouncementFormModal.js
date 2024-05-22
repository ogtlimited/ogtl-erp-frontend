import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const VideoAnnouncementFormModal = ({fetchAllAnnouncement}) => {
  const { showAlert, fetchAnnouncement } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [data, setData] = useState({
    title: "",
    video: null,
  });
  const [videoSize, setVideoSize] = useState(null);
  const [videoSizeColor, setVideoSizeColor] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cancelEvent = () => {
    setData({
      title: "",
      video: null,
    });
    setLoading(false);
    setVideoSize(null);
    setVideoSizeColor(null);
    setUploadProgress(0);
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleFormChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 52428800) {
      setData({ ...data, video: selectedFile });
      setVideoSize(selectedFile.size);
      setVideoSizeColor("green");
    } else {
      setData({ ...data, video: selectedFile });
      setVideoSize(selectedFile.size);
      setVideoSizeColor("red");
      showAlert(true, "File size exceeds 50MB limit", "alert alert-warning");
    }
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
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      showAlert(true, "Your Video Upload is Successful", "alert alert-success");
      $("#VideoAnnouncementFormModal").modal("toggle");

      fetchAnnouncement();
      fetchAllAnnouncement();
      cancelEvent();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#VideoAnnouncementFormModal").modal("toggle");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="VideoAnnouncementFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Video Announcement
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
              <form onSubmit={handleCreateAnnouncement}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="video">Video</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="video"
                    name="video"
                    key={fileInputKey}
                    onChange={handleFileChange}
                    accept="video/*"
                    required
                    style={{ marginBottom: "1rem", cursor: "pointer" }}
                  />
                  {videoSize && (
                    <div className="text-muted">
                      Selected video size:{" "}
                      <span
                        className={
                          videoSizeColor === "green"
                            ? "video_good"
                            : "text-danger"
                        }
                      >
                        {(videoSize / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  )}
                </div>

                <div className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
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
                    disabled={
                      !data.title ||
                      !data.video ||
                      videoSizeColor === "red" ||
                      loading
                    }
                  >
                    {loading ? (
                      <div className="video_upload_spinner">
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <p>Uploading, please wait</p>
                      </div>
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
