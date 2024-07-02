/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cropped from "../../assets/img/cropped-white.png";

import "./Sidebar.css";
import $ from "jquery";
import tokenService from "../../services/token.service";

import sidebarConfig from "./sidebarConfig";

const Sidebar = () => {
  const [user] = useState(tokenService.getUser());
  // const AllAccess = ["super", "ceo", "hr_manager"];

  const CurrentUserRoles = user?.employee_info?.roles;
  const CurrentUserIsLead = user?.employee_info?.is_lead;
  const CurrentUserIsRemoteLead =
    (user?.employee_info?.is_lead && user?.employee_info?.remote) ||
    CurrentUserRoles.includes("wfh_lead")
      ? true
      : false;

  const userDept =
    user?.office?.office_type === "department"
      ? user?.office?.title?.toLowerCase()
      : null;

  useEffect(() => {
    console.log({
      CurrentUserRoles,
      userDept,
      user,
      CurrentUserIsRemoteLead,
      CurrentUserIsLead,
    });
  }, [
    CurrentUserIsLead,
    CurrentUserIsRemoteLead,
    CurrentUserRoles,
    user,
    userDept,
  ]);

  const canView = (viewedBy) => {
    if (
      userDept === viewedBy ||
      CurrentUserRoles.includes("ceo") ||
      CurrentUserRoles.includes("super") ||
      CurrentUserRoles.includes("hr_manager")
    ) {
      return true;
    } else if (viewedBy === "all") {
      return true;
    } else if (viewedBy === "lead") {
      return CurrentUserIsLead;
    } else if (viewedBy.includes("team_lead")) {
      return CurrentUserIsRemoteLead;
    } else if (viewedBy.includes("wfh_lead")) {
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
                    <li key={nav?.subheader} className="menu-title">
                      <span>{nav?.subheader}</span>
                    </li>
                  )}
                  {nav.items.map((item) => (
                    <>
                      {item.externalLink ? (
                        <li key={item.title}>
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.icon} <span>{item.title}</span>
                          </a>
                        </li>
                      ) : (
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
                                    {/* <span className="menu-arrow"></span> */}
                                    {/* <span className="custom-menu-arrow">
                                      <lord-icon
                                        src="https://cdn.lordicon.com/fjjamyff.json"
                                        trigger="loop"
                                        delay="2000"
                                        colors="primary:#fff,secondary:#FFDC02,tertiary:#FFDC02,quaternary:#000"
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      ></lord-icon>
                                    </span> */}
                                    {/* <span className="custom-menu-arrow">
                                      {item?.navIcon}
                                    </span> */}

                                    <span className="custom-menu-arrow">
                                      <img src={cropped} alt="" />
                                    </span>
                                  </a>

                                  <ul
                                    style={{
                                      display: dropdownStates[item.title]
                                        ? "block"
                                        : "none",
                                    }}
                                  >
                                    {/* {item.children.map((child) => (
                                      <>
                                        {canView(child?.canView) && (
                                          <li key={child.path} className="">
                                            <Link
                                              to={`${child.path}`}
                                              className=""
                                            >
                                              {child.title}
                                            </Link>
                                          </li>
                                        )}
                                      </>
                                    ))} */}
                                    {item.children.map((child) => (
                                      <>
                                        {canView(child?.canView) && (
                                          <li key={child.path} className="">
                                            {child.externalLink ? (
                                              // External link inside children
                                              <a
                                                href={child.externalLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {child.title}
                                              </a>
                                            ) : (
                                              // Internal link inside children
                                              <Link
                                                to={`${child.path}`}
                                                className=""
                                              >
                                                {child.title}
                                              </Link>
                                            )}
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
                                  {item.title === "Employee Appreciation" ? (
                                    <Link
                                      to={item.path}
                                      className="extra_sidebar_styling EA_styling"
                                    >
                                      {item.icon}
                                      <span>{item.title}</span>
                                    </Link>
                                  ) : item.title === "Women's Day" ? (
                                    <Link
                                      to={item.path}
                                      className="extra_sidebar_styling IWD_styling"
                                    >
                                      {item.icon} <span>{item.title}</span>
                                    </Link>
                                  ) : (
                                    <Link to={item.path}>
                                      {item.icon} <span>{item.title}</span>
                                    </Link>
                                  )}
                                </li>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </>
              ))}

              {userDept !== "hr" &&
              !CurrentUserRoles.includes("ceo") &&
              !CurrentUserRoles.includes("super") &&
              !CurrentUserRoles.includes("hr_manager") &&
              CurrentUserRoles.includes("rep_siever") ? (
                <li className="submenu">
                  <a href="" onClick={(e) => e.preventDefault()}>
                    <i className="la la-briefcase"></i>
                    <span>Recruitment</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul style={{ display: "none" }}>
                    <Link
                      to="/dashboard/recruitment/rep-siever/job-applications"
                      className=""
                    >
                      Job Applications
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
