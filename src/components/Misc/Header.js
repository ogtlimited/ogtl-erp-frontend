/* eslint-disable jsx-a11y/anchor-is-valid */


import React, { useRef, useEffect, useCallback, useState } from 'react';
// import "./header.css";
import logo from '../../assets/img/og-white-logo.png';
import cropped from '../../assets/img/cropped-white.png';
import axiosInstance from '../../services/api';
// import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from 'react-router-dom';
import tokenService from '../../services/token.service';
import { BsBell } from 'react-icons/bs';
// import { msalInstance, loginRequest } from '../../authConfig';
import { useMsal } from '@azure/msal-react';
import NotificationSound from '../../assets/notifications/mixkit-positive-notification-951.wav';

const Header = () => {
  const audioPlayer = useRef(null);
  let navigate = useNavigate();
  const { instance } = useMsal();
  const logout = (e) => {
    e.preventDefault();
    tokenService.clearStorage();
    instance
      // .ssoSilent() //<-- This will silently logout the user without having to select an account
      .logoutPopup() //<-- This will open a popup to logout the user  (this is the default)
      .then((e) => {
        navigate('/auth');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const user = tokenService.getUser();
  const [count, setCount] = useState(0);

  function playAudio() {
    audioPlayer.current.play();
  }

  const handleNotificationRequest = () => {
    navigate('/dashboard/hr/leaves-admin');
  };

  const fetchHRLeavesNotificationCount = useCallback(() => {
    axiosInstance
      .get('hr-leave-applications')
      .then((res) => {
        let resData = res?.data?.data?.application;
        const dataCount = resData.length;
        setCount(dataCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchHRLeavesNotificationCount();
    if (user?.role?.title === 'HR Manager' && count > 0) {
      playAudio();
    }
  }, [count, fetchHRLeavesNotificationCount, user?.role?.title]);

  //   const { user } = useContext(AppContext);
  //   const imageUrl = "https://erp.outsourceglobal.com" + user?.profile_image;

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <img src={logo} style={{ width: '100px' }} alt="" />
          </div>
          <div className="cropped-logo">
            <img src={cropped} alt="" />
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

        <a id="mobile_btn" className="mobile_btn ml-4" href="#sidebar">
          <i className="fa fa-bars"></i>
        </a>

        {user?.role?.title === 'HR Manager' ? (
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
        <audio ref={audioPlayer} src={NotificationSound} allow="autoplay" />

        <ul className="nav user-menu">
          <li className="nav-item">
            <div className="top-nav-search">
              <a className="responsive-search">
                <i className="fa fa-search"></i>
              </a>
              <form>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img src="assets/img/profiles/avatar-21.jpg" alt="" />
                <span
                  className="status online"
                  style={{ bottom: 24, right: 3 }}
                ></span>
              </span>
              <span>{user?.first_name}</span>
            </a>
            <div className="dropdown-menu">
              <Link
                className="dropdown-item"
                to={`/dashboard/user/profile/${user?._id}`}
              >
                My Profile
              </Link>
              <Link className="dropdown-item" to="settings">
                Settings
              </Link>
              <a className="dropdown-item" onClick={(e) => logout(e)}>
                Logout
              </a>
            </div>
          </li>
        </ul>

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
              to={`/dashboard/user/profile/${user?._id}`}
            >
              My Profile
            </Link>
            <Link className="dropdown-item" to="settings">
              Settings
            </Link>
            <a className="dropdown-item" onClick={(e) => logout(e)}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
