/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useRef, useEffect } from "react";
import logo from "../../assets/img/og-white-logo.png";
import cropped from "../../assets/img/cropped-white.png";
import { useAppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import tokenService from "../../services/token.service";
import { BsBell } from "react-icons/bs";
import { msalInstance } from "../../authConfig";
// import { useMsal } from '@azure/msal-react';
import NotificationSound from "../../assets/notifications/mixkit-positive-notification-951.wav";
import malePlaceholder from "../../assets/img/male-placeholder.jpeg";
import femalePlaceholder from "../../assets/img/female-placeholder.jpg";
import sportLogo from "../../assets/img/themed/sport5.png";
import sportDayGIF from "../../assets/img/themed/sportday0.gif";

const Header = () => {
  const { count, setDropDownClicked } = useAppContext();
  const audioPlayer = useRef(null);
  const navigate = useNavigate();
  // const { instance } = useMsal();

  const logout = (e) => {
    e.preventDefault();
    tokenService.clearStorage();
    navigate("/auth/login");

    msalInstance
      // .ssoSilent() //<-- This will silently logout the user without having to select an account
      .logoutPopup() //<-- This will open a popup to logout the user  (this is the default)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const user = tokenService.getUser();
  const userOgid = user?.employee_info?.ogid;
  const emailAddress = user?.employee_info?.email;
  const gender = user?.employee_info?.personal_details?.gender;

  const openGmailCompose = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1");
  };

  const CurrentUserRoles = user?.employee_info?.roles;

  function playAudio() {
    audioPlayer.current.play();
  }

  const handleNotificationRequest = () => {
    navigate("/dashboard/hr/leaves-admin");
  };

  // useEffect(() => {
  //   fetchHRLeavesNotificationCount()
  // }, [fetchHRLeavesNotificationCount]);

  useEffect(() => {
    if (user?.role?.title === "HR Manager" && count > 0) {
      playAudio();
    }
  }, [count, user?.role?.title]);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <img src={logo} style={{ width: "100px" }} alt="" />
            <span className="header_logo_icons">
              <lord-icon
                src="https://cdn.lordicon.com/przqzrpl.json"
                trigger="loop"
                delay="2000"
                colors="primary:#FFDC02,secondary:#19AE47,tertiary:#193375,quaternary:#000"
                style={{ width: "35px", height: "35px" }}
              ></lord-icon>
            </span>
          </div>
          <div className="cropped-logo">
            {/* <img src={cropped} alt="" /> */}
          </div>
        </div>

        <a id="toggle_btn">
          <span className="bar-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </a>

        <div className="page-title-box">
          <h3>Outsource Global Technologies</h3>
        </div>

        <img src={sportDayGIF} alt="sport day" className="sportDayGIF slide-out-left" />

        <a id="mobile_btn" className="mobile_btn ml-4" href="#sidebar">
          <i className="fa fa-bars"></i>
        </a>

        <audio ref={audioPlayer} src={NotificationSound} allow="autoplay" />

        {/* Desktop: */}
        <ul className="nav user-menu desktop_header">
          <li className="nav-item mr-4">
            <div className="top-nav-search">
              <a className="responsive-search">
                <i className="fa fa-search"></i>
              </a>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link header-display-name"
              data-toggle="dropdown"
            >
              <span className="user-img">
                {/* <img src="" alt="" /> */}
                <span
                  className="status online"
                  style={{ bottom: 0, right: 10 }}
                ></span>
              </span>
              <span style={{ paddingRight: 10 }}>
                {user?.employee_info?.personal_details?.first_name?.toUpperCase()}
              </span>
            </a>

            <div
              className="dropdown-menu header-dropdown-menu"
              onClick={() => setDropDownClicked(true)}
            >
              <div className="header_user_profile_div">
                <div className="profile_image_div">
                  {gender === "male" ? (
                    <img src={malePlaceholder} alt={malePlaceholder} />
                  ) : (
                    <img src={femalePlaceholder} alt={femalePlaceholder} />
                  )}
                </div>
                <div className="profile_info_div">
                  <div className="profile_user_info">
                    <p className="profile_name">
                      {user?.employee_info?.personal_details?.first_name?.toUpperCase()}{" "}
                      {user?.employee_info?.personal_details?.last_name?.toUpperCase()}
                    </p>
                    <p className="profile_designation">
                      {user?.employee_info?.designation}
                    </p>
                    <p className="profile_ogid">{user?.employee_info?.ogid}</p>
                  </div>
                  <button
                    className="profile_button"
                    onClick={() =>
                      navigate(`/dashboard/user/profile/${userOgid}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>

              <div className="profile_email_div">
                <p onClick={openGmailCompose} className="profile_email">
                  {emailAddress}
                </p>
              </div>

              <div className="profile_items">
                <div
                  className="profile_item_inner"
                  onClick={() => navigate(`/dashboard/main/attendance`)}
                >
                  <p>My Attendance</p>
                </div>
                <div
                  className="profile_item_inner"
                  onClick={() => navigate(`/dashboard/main/leave`)}
                >
                  <p>My Leaves</p>
                </div>
              </div>

              <div className="profile_logout_items">
                <div
                  className="profile_logout_item_inner"
                  onClick={(e) => logout(e)}
                >
                  <p>Logout</p>
                </div>
              </div>

              {/* <Link
                className="dropdown-item"
                to={`/dashboard/user/profile/${userOgid}`}
              >
                <BiUser style={{ fontSize: "14px", margin: "-2px 5px 0 0" }} />
                My Profile
              </Link>
              <a className="dropdown-item logout" onClick={(e) => logout(e)}>
                <BiLogOut
                  style={{ fontSize: "14px", margin: "-2px 3px 0 0" }}
                />{" "}
                Logout
              </a> */}
            </div>
          </li>
        </ul>

        {/* Mobile: */}
        <div className="dropdown mobile-user-menu">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to={`/dashboard/user/profile/${userOgid}`}
            >
              My Profile
            </Link>
            <a className="dropdown-item" onClick={(e) => logout(e)}>
              Logout
            </a>
          </div>
        </div>

        {/* Notification: */}
        {CurrentUserRoles.includes("hr_manager") ? (
          <div
            className="home-notification-div"
            onClick={handleNotificationRequest}
          >
            {count === 0 ? null : (
              <div className="home-notification-count">
                <p>{count}</p>
              </div>
            )}
            {count === 0 ? (
              <BsBell className="home-notification-icon" />
            ) : (
              <BsBell className="home-notification-icon-active" />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
