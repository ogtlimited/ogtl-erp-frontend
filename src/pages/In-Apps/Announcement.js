/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { AnnouncementFormModal } from "../../components/Modal/AnnouncementFormModal";
import moment from "moment";

const Announcement = () => {
  const { user, announcement, loadingAnnouncement } = useAppContext();

  const CurrentUserRoles = user?.employee_info?.roles;
  const canUpload = ["hr_manager"];
  const CurrentUserCanUpload = CurrentUserRoles.some((role) =>
    canUpload.includes(role)
  );

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Announcements</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Apps</li>
              <li className="breadcrumb-item active">Announcement</li>
            </ul>
          </div>
          {CurrentUserCanUpload ? (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#AnnouncementFormModal"
              >
                <i className="las la-file-video"></i> Upload Video
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="announcement_container">
        {loadingAnnouncement ? (
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/ilsmzilo.json"
              trigger="loop"
              colors="primary:#00c5fb,secondary:#0253cc"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>
        ) : announcement ? (
          <div className="custom-field-div">
            <video controls className="video_player">
              <source src={announcement.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video_player_info">
              <h3>{announcement.title}</h3>
              <p>Uploaded by: {announcement.uploaded_by}</p>
              <p>Date: {moment(announcement.created_at).format("LLL")}</p>
            </div>
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

      <AnnouncementFormModal />
    </>
  );
};

export default Announcement;
