/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import $ from "jquery";
import tokenService from "../../services/token.service";

import sidebarConfig from "./sidebarConfig";

const Sidebar = () => {
  const [user] = useState(tokenService.getUser());
  const AllAccess = ["Super", "CEO", "HR Manager"];
  const canView = (dept) => {
    if (
      user?.department?.department === dept ||
      AllAccess.includes(user?.role?.title)
    ) {
      return true;
    } else if (dept === "All") {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    var Sidemenu = function () {
      this.$menuItem = $("#sidebar-menu a");
    };
    var $this = Sidemenu;
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
    $("#sidebar-menu ul li.submenu a.active")
      .parents("li:last")
      .children("a:first")
      .addClass("active")
      .trigger("click");
  }, []);
  const dNone = {
    display: "none",
  };
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
                      {item.children ? (
                        <>
                          {canView(item?.canView) && (
                            <li className="submenu">
                              <a
                                href=""
                                onClick={(e) => e.preventDefault()}
                                className={
                                  nav.subheader == "Main"
                                    ? "active subdrop"
                                    : "subdrop"
                                }
                              >
                                {item.icon} <span> {item.title}</span>{" "}
                                <span className="menu-arrow"></span>
                              </a>
                              <ul
                                style={{
                                  display:
                                    nav.subheader == "Main" ? "block" : "none",
                                }}
                              >
                                {item.children.map((child) => (
                                  <>
                                    {canView(child?.canView) && (
                                      <li key={child.path} className="">
                                        <Link to={`${child.path}`} className="">
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
                            <li>
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
              {user?.role?.title === "HR In-House Agent" &&
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
                <ul style={{display: "none"}}>
                  <Link to="/dashboard/recruitment/job-applicants" className="">
                    Job Applicants
                  </Link>
                </ul>
              </li>
              
              }
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
