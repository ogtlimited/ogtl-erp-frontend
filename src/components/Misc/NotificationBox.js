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
          {/* <a href="javascript:void(0)" className="clear-noti">
            {" "}
            Clear All{" "}
          </a> */}
          <Link onClick={() => clearNotifications()}>Clear All</Link>
        </div>
        <div className="noti-content">
          <ul className="notification-list">
            {notifications?.map((not, index) => (
              <li className="notification-message" key={index}>
                <Link>
                  <div className="media">
                    <span className="avatar">
                      <img alt="" src="" />
                    </span>
                    <div className="media-body">
                      <p className="noti-details">
                        A new {not?.module} was added
                      </p>
                      <p>
                        <span className="noti-title">{not?.message}</span>
                      </p>
                      <p className="noti-time">
                        <span className="notification-time">
                          {moment(not?.date).startOf("hour").fromNow()}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {/* <li className="notification-message">
              <a href="">
                <div className="media">
                  <span className="avatar">
                    <img alt="" src="" />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Potbelly</span> changed the
                      task name{" "}
                      <span className="noti-title">always says nonsense</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">6 mins ago</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
     
            */}
          </ul>
        </div>
        <div className="topnav-dropdown-footer">
          <a href="">View all Notifications</a>
        </div>
      </div>
    </>
  );
};
