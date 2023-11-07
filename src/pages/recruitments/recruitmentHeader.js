/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/OG-Logo.png";
const RecruitmentHeader = () => {
  return (
    <div className="header">
      <div className="header-left">
        <a className="logo">
          <img src={logo} style={{width: '80px'}} alt="" />
        </a>
      </div>
      <div className="page-title-box float-left">
        <h3>Outsource Global Technologies</h3>
      </div>
      <ul className="nav user-menu">
        <li className="nav-item">
          <Link className="nav-link" to="/auth/login">
            Login
          </Link>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu">
        <a
          data-toggle="dropdown"
          aria-expanded="false"
          className="nav-link dropdown-toggle"
        >
          <i className="fa fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
