import React, { useContext } from "react";
// import "./header.css";
import logo from "../../assets/img/OG-Logo.png";
// import { AppContext } from "../context/AppContext";
import { Link, useHistory, withRouter } from "react-router-dom";
import tokenService from "../../services/token.service";

const toggle_sidebar = (e) => {
  e.preventDefault();
  // alert('clicked')
  const body = document.getElementById("main-body");
  if (body.classList.value === "mini-sidebar") {
    body.classList.remove("mini-sidebar");
  } else {
    body.classList.add("mini-sidebar");
  }
};
// const Header = withRouter(({ history }) => {
const Header = () => {
  let history = useHistory()
  const logout = (e) => {
    e.preventDefault();
    tokenService.clearStorage()
    console.log('pushing')
    history.push("/auth");
  };
//   const { user } = useContext(AppContext);
//   const imageUrl = "https://erp.outsourceglobal.com" + user?.profile_image;
//   console.log(imageUrl);
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={logo} width="40" height="40" alt="" />
        </Link>
      </div>

      <a id="toggle_btn" href="javascript:void(0);">
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

      <ul className="nav user-menu">
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="javascript:void(0);" className="responsive-search">
              <i className="fa fa-search"></i>
            </a>
            <form >
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

       
        <li className="nav-item dropdown">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <i className="fa fa-bell-o"></i> <span className="badge badge-pill">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="javascript:void(0)" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            
          </div>
        </li>

        <li className="nav-item dropdown">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <i className="fa fa-comment-o"></i>{" "}
            <span className="badge badge-pill">8</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              <a href="javascript:void(0)" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
            </div>
            <div className="topnav-dropdown-footer">
              <Link to="chat">View all Messages</Link>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <span className="user-img">
              <img src="assets/img/profiles/avatar-21.jpg" alt="" />
              <span className="status online"></span>
            </span>
            <span>Admin</span>
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/admin/profile-dashboard">
              My Profile
            </Link>
            <Link className="dropdown-item" to="settings">
              Settings
            </Link>
            <a className="dropdown-item" onClick={(e)=>logout(e)}>
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
        <Link className="dropdown-item" to="/admin/profile-dashboard">
              My Profile
            </Link>
            <Link className="dropdown-item" to="settings">
              Settings
            </Link>
            <a className="dropdown-item" onClick={(e)=>logout(e)}>
              Logout
            </a>
        </div>
      </div>
    </div>
  )
};


export default Header
