import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

export const NotificationBox = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationLength, setNotificationLength] = useState();
  useEffect(() => {
    const socket = socketIOClient("http://localhost:3000");
    console.log("hellooooo", socket);
    socket.on("error", (error) => {
      console.log(error);
      // ...
    });

    socket.emit("notification", "ahmed.dambatta@outsourceglobal.com");
    socket.on("messages", (data) => {
      // ...
      setNotifications(data, ...notifications);
      setNotificationLength(notifications.length);
      console.log("sockeeetttt", data);
    });
    return () => socket.close();
  }, []);

  return (
    <>
      <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
        <i className="fa fa-bell-o"></i>{" "}
        <span className="badge badge-pill">{notificationLength}</span>
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
          <a href="javascript:void(0)" className="clear-noti">
            {" "}
            Clear All{" "}
          </a>
        </div>
        <div className="noti-content">
          <ul className="notification-list">
            {notifications?.map((not, index) => (
              <li className="notification-message" key={index}>
                <a href="">
                  <div className="media">
                    <span className="avatar">
                      <img alt="" src="" />
                    </span>
                    <div className="media-body">
                      <p className="noti-details">
                        <span className="noti-title">Ahmad</span> added new
                        message <span className="noti-title">{not}</span>
                      </p>
                      <p className="noti-time">
                        <span className="notification-time">4 mins ago</span>
                      </p>
                    </div>
                  </div>
                </a>
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
            <li className="notification-message">
              <a href="">
                <div className="media">
                  <span className="avatar">
                    <img alt="" src="" />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Sir Abubakar</span> added{" "}
                      <span className="noti-title">Ahmad</span> and{" "}
                      <span className="noti-title">Missy</span> to project{" "}
                      <span className="noti-title">General Ledger</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">8 mins ago</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li className="notification-message">
              <a href="">
                <div className="media">
                  <span className="avatar">
                    <img alt="" src="" />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Missy</span> completed task{" "}
                      <span className="noti-title">
                        Tony is saying nonsense
                      </span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">12 mins ago</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li className="notification-message">
              <a href="">
                <div className="media">
                  <span className="avatar">
                    <img alt="" src="" />
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">Mazi </span> added new task{" "}
                      <span className="noti-title">Notification module</span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">2 days ago</span>
                    </p>
                  </div>
                </div>
              </a>
            </li> */}
          </ul>
        </div>
        <div className="topnav-dropdown-footer">
          <a href="">View all Notifications</a>
        </div>
      </div>
    </>
  );
};
