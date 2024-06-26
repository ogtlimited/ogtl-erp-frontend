// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import VideoAnnouncement from "../../In-Apps/VideoAnnouncement";
import DocAnnouncement from "../../In-Apps/DocAnnouncement";

const Announcement = () => {
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Announcements</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Engage & Feedback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_announcement_videos"
                >
                  Videos
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_announcement_docs"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div
            id="tab_announcement_videos"
            className="col-12 tab-pane  show active"
          >
            <VideoAnnouncement />
          </div>

          <div id="tab_announcement_docs" className="col-12 tab-pane">
            <DocAnnouncement />
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
