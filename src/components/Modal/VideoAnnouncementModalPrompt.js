import React, { useRef, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";

export const VideoAnnouncementModalPrompt = () => {
  const { loadingAnnouncement, announcement, setAnnouncementWatched } =
    useAppContext();
  const videoRef = useRef(null);

  const closeModal = () => {
    $("#VideoAnnouncementModalPrompt").modal("hide");
    secureLocalStorage.setItem("seenAnnouncement", true);
    setAnnouncementWatched(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (announcement && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [announcement]);

  return (
    <>
      <div
        className="modal fade"
        id="VideoAnnouncementModalPrompt"
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
                {announcement?.title}
              </h4>
              <p className="modal_uploaded_by">
                By: {announcement?.uploaded_by} |{" "}
                <span className="payroll_month_indicator">
                  {moment(announcement?.created_at).format("LLL")}
                </span>
              </p>
            </div>

            <div className="modal-body">
              <div>
                {loadingAnnouncement ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/ilsmzilo.json"
                      trigger="loop"
                      colors="primary:#00c5fb,secondary:#0253cc"
                      style={{ width: "200px", height: "200px" }}
                    ></lord-icon>
                  </div>
                ) : announcement ? (
                  <div>
                    <video ref={videoRef} controls className="video_player">
                      <source src={announcement.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/ilsmzilo.json"
                      trigger="hover"
                      colors="primary:#00c5fb,secondary:#0253cc"
                      style={{ width: "200px", height: "200px" }}
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
