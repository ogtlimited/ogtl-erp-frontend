/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import $ from "jquery";
import tokenService from "../../services/token.service";

import sidebarConfig from "./sidebarConfig";

const Sidebar = () => {
  const [user] = useState(tokenService.getUser());
  const AllAccess = ["super", "ceo", "hr_manager"];
  
  const CurrentUserRoles = user?.employee_info?.roles;
  const CurrentUserIsRemoteLead = user?.employee_info?.remote;
  const CurrentUserIsLead = user?.employee_info?.is_lead;

  const userRole = user?.employee_info?.roles[0];
  const userDept =
    user?.office?.office_type === "department" ? user?.office?.title : null;
    console.log("User dept.", userDept)

  useEffect(() => {
    console.log("this sidebar user:", user);
  }, [user]);

  const canView = (viewedBy) => {
    if (userDept === viewedBy || AllAccess.includes(userRole)) {
      return true;
    } else if (viewedBy === "All") {
      return true;
    } else if (viewedBy === "lead") {
      return CurrentUserIsLead;
    } else if (viewedBy === "remote-lead") {
      return CurrentUserIsRemoteLead;
    } else {
      return false;
    }
  };

  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      const dropdownKey = $(this).attr("data-dropdown-key");
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
        setDropdownStates((prevState) => ({
          ...prevState,
          [dropdownKey]: true,
        }));
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
        setDropdownStates((prevState) => ({
          ...prevState,
          [dropdownKey]: false,
        }));
      }
      
      $("#sidebar-menu a").removeClass("active");
      $(this).addClass("active");
    });

    $("#sidebar-menu ul li.submenu a.active")
      .parents("li:last")
      .children("a:first")
      .addClass("active")
      .trigger("click");
  }, []);

  return (
    <div className="sidebar" id="sidebar">
      <div
        className="slimScrollDiv slimScrollDiv-style"
        style={{
          position: "relative",
          overflow: "auto",
          width: "100%",
          height: "593px",
        }}
      >
        <div
          className="sidebar-inner slimscroll slimScroll-style"
          style={{ overflow: "auto", width: "100%", height: "593px" }}
        >
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              {sidebarConfig.map((nav) => (
                <>
                  {canView(nav?.canView) && (
                    <li key={nav?.subheader} className="menu-title" >
                      <span >{nav?.subheader}</span>
                    </li>
                  )}
                  {nav.items.map((item) => (
                    <>
                      {item.children ? (
                        <>
                          {canView(item?.canView) && (
                            <li
                              className={`submenu ${
                                dropdownStates[item.title]
                                  ? "active subdrop"
                                  : ""
                              }`}
                              key={item.title}
                            >
                              <a
                              
                                href=""
                                onClick={(e) => e.preventDefault()}
                                data-dropdown-key={item.title}
                              >
                                {item.icon} <span> {item.title}</span>{" "}
                                <span className="menu-arrow" ></span>
                              </a>
                              <ul
                                style={{
                                  display: dropdownStates[item.title]
                                    ? "block"
                                    : "none",
                                }}
                              >
                                {item.children.map((child) => (
                                  <>
                                    {canView(child?.canView) && (
                                      <li key={child.path} className="" >
                                        <Link to={`${child.path}`} className="" >
                                          {child.title}
                                        </Link>
                                      </li>
                                    )}
                                  </>
                                ))}
                              </ul>
                            </li>
                          )}
                        </>
                      ) : (
                        <>
                          {canView(item?.canView) && (
                            <li key={item.path}>
                              <Link to={item.path}>
                                {item.icon} <span>{item.title}</span>
                              </Link>
                            </li>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </>
              ))}

              {!AllAccess.includes(userRole) && CurrentUserRoles.includes("junior_hr") ? (
                <li className="submenu">
                  <a
                    href=""
                    onClick={(e) => e.preventDefault()}
                    className="subdrop"
                  >
                    <i className="la la-cube"></i>
                    <span>Recruitment</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={{ display: "none" }}>
                    <Link to="/dashboard/recruitment/job-opening" className="">
                      Job Opening
                    </Link>
                    <Link
                      to="/dashboard/recruitment/job-applicants"
                      className=""
                    >
                      Job Applicants
                    </Link>
                    <Link
                      to="/dashboard/recruitment/academy-applicants"
                      className=""
                    >
                      Academy Applicants
                    </Link>
                    <Link
                      to="/dashboard/recruitment/aptitude-test"
                      className=""
                    >
                      Recruitment Result
                    </Link>
                    <Link to="/dashboard/recruitment/job-offer" className="">
                      Job Offer
                    </Link>
                    <Link to="/dashboard/recruitment/interviewees" className="">
                      Interview Schedule List
                    </Link>
                    <Link to="/dashboard/recruitment/shadowing" className="">
                      Shadowing
                    </Link>
                    <Link
                      to="/dashboard/recruitment/orientation-and-training"
                      className=""
                    >
                      Orientation and Training
                    </Link>
                  </ul>
                </li>
              ) : null}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
