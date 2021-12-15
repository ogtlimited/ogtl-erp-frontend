import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import routes from "../../routes";
import "./Sidebar.css";
import $ from "jquery";
import tokenService from "../../services/token.service";
import { useAppContext } from "../../Context/AppContext";
import sidebarConfig from "./sidebarConfig";

const Sidebar = () => {
  const [user, setuser] = useState(tokenService.getUser());
  const [isPriviledged, setisPriviledged] = useState(false);
  const { combineRequest } = useAppContext();
  const canView = (dept) => {
    if (user?.department?.department === dept) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    // combineRequest().then((res) => {
    //   const dept = res.data.createEmployeeFormSelection.departments;
    // });
    if (user != null) {
      // const hrLower = HRpeople.map(e => e.toLowerCase())
      // if(HRpeople.includes(user?.designation?.toLowerCase())){
      // 	setisPriviledged(true)
      // }
    }
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
                  <li className="menu-title">
                    <span>{nav.subheader}</span>
                  </li>
                  {nav.items.map((item) => (
                    <>
                      {item.children ? (
                        <li className="submenu">
                          <a
                            href=""
                            onClick={(e) => e.preventDefault()}
                            className=" subdrop"
                          >
                            {item.icon} <span> {item.title}</span>{" "}
                            <span className="menu-arrow"></span>
                          </a>
                          <ul style={{ display: "none" }}>
                            {item.children.map((child) => (
                              <li class="">
                                <Link to={`${child.path}`} class="">
                                  {child.title}
                                </Link>
                              </li>
                            ))}

                            {/* {canView("HR") && (
                    <li>
                      <Link className="active" to="/admin/hr-dashboard">
                        HR Dashboard
                      </Link>
                    </li>
                  )} */}
                          </ul>
                        </li>
                      ) : (
                        <li>
                          <Link to={item.path}>
                            {item.icon} <span>{item.title}</span>
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
