//* IN-USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AnnouncementFormModal } from "../../components/Modal/AnnouncementFormModal";
import moment from "moment";

const Announcement = () => {
  const { getAvatarColor, user, ErrorHandler } = useAppContext();
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncement = useCallback(async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(
        `/api/v1/video_announcements.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const resData = response?.data?.data?.videos_record;

      console.log("resData", resData);

      // const formatted = resData.map((ticket) => ({
      //   ...ticket,
      //   full_name: ticket?.first_name + " " + ticket?.last_name,
      //   email: ticket?.email,
      //   ogid: ticket?.ogid,
      //   office: ticket?.office?.toUpperCase(),
      //   status: ticket?.resolved ? "Resolved" : "Pending",
      //   date_created: moment(ticket?.created_at).utc().format("Do MMM, YYYY"),
      //   complaint: ticket?.complaint,
      // }));

      // setAllTickets(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Announcement | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);


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
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#TicketFormModal"
            >
              <i className="las la-file-video"></i> Upload Video
            </a>
          </div>
        </div>
      </div>

      <div className="announcement_container">
        <lord-icon
          src="https://cdn.lordicon.com/ilsmzilo.json"
          trigger="hover"
          colors="primary:#00c5fb,secondary:#0253cc"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
        <h3>No Video Announcement</h3>
      </div>

      <AnnouncementFormModal
        fetchAnnouncement={fetchAnnouncement}
      />
    </>
  );
};

export default Announcement;
