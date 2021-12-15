import React from "react";
import moment from "moment";
import { useAppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export const NotificationBox = () => {
  const { notifications, clearNotifications } = useAppContext();

  return (
    <>
      <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
        <i className="fa fa-bell-o"></i>{" "}
        <span className="badge badge-pill">{notifications.length}</span>
      </a>
      <div
        className="dropdown-menu notifications"
        style={{
          position: "absolute",
          transform: "translate3d(-133px, 60px, 0px)",
          top: "0px",
          left: "0px",
        }}
      >
        <div className="topnav-dropdown-header">
          <span className="notification-title">Notifications</span>

          <a onClick={() => clearNotifications()}>Clear All</a>
        </div>
        <div className="noti-content">
          <ul className="notification-list">
            {notifications?.map((not, index) => (
              <li className="notification-message" key={index}>
                <a>
                  <div className="media">
                    <span className="avatar">
                      <img alt="" src="" />
                    </span>
                    <div className="media-body">
                      <p className="noti-details">
                        A new {not?.module} was added
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        <span className="noti-title">{not?.message}</span>
                      </p>
                      <p className="noti-time">
                        <span className="notification-time">
                          {moment(not?.date).calendar()}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="topnav-dropdown-footer">
          <a href="">View all Notifications</a>
        </div> */}
      </div>
    </>
  );
};
