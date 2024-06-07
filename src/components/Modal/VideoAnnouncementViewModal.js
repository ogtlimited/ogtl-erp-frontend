import React, { useRef, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import $ from "jquery";

export const VideoAnnouncementViewModal = ({
  loading,
  announcementContent,
  setSelectedVideo,
}) => {
  const videoRef = useRef(null);

  const closeModal = () => {
    $("#VideoAnnouncementViewModal").modal("hide");
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (announcementContent && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [announcementContent]);

  return (
    <>
      <div
        className="modal fade"
        id="VideoAnnouncementViewModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 className="modal-title" id="FormModalLabel">
                {announcementContent?.title}
              </h4>
              <p className="modal_uploaded_by">
                {announcementContent?.uploaded_by} |{" "}
                <span className="payroll_month_indicator">
                  {moment(announcementContent?.created_at).format("LL")}
                  <BsDot className="BsDot span_indicator" />{" "}
                  {moment(announcementContent?.created_at).fromNow()}
                </span>
              </p>
            </div>

            <div className="modal-body">
              <div>
                {loading ? (
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/ilsmzilo.json"
                      trigger="loop"
                      colors="primary:#00c5fb,secondary:#0253cc"
                      style={{ width: "250px", height: "250px" }}
                    ></lord-icon>
                  </div>
                ) : announcementContent ? (
                  <div>
                    <video ref={videoRef} controls className="video_player">
                      <source
                        src={announcementContent?.video_url}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/ilsmzilo.json"
                      trigger="hover"
                      colors="primary:#00c5fb,secondary:#0253cc"
                      style={{ width: "250px", height: "250px" }}
                    ></lord-icon>
                    <h3>No Video Announcement</h3>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
