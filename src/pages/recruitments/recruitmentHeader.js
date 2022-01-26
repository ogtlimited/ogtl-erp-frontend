import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/OG-Logo.png";
const RecruitmentHeader = () => {
  return (
    <div class="header">
      <div class="header-left">
        <a class="logo">
          <img src={logo} style={{width: '80px'}} alt="" />
        </a>
      </div>
      <div class="page-title-box float-left">
        <h3>Outsource Global Technologies</h3>
      </div>
      <ul class="nav user-menu">
        <li class="nav-item">
          <Link class="nav-link" to="/auth/login">
            Login
          </Link>
        </li>
      </ul>
      <div class="dropdown mobile-user-menu">
        <a
          data-toggle="dropdown"
          aria-expanded="false"
          class="nav-link dropdown-toggle"
        >
          <i class="fa fa-ellipsis-v"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <Link class="dropdown-item" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
