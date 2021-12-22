import React from "react";
import { useLocation, Outlet } from "react-router-dom";

import Header from "../components/Misc/Header";
import Sidebar from "../components/Misc/Sidebar";
import { useAppContext } from "../Context/AppContext";
import AlertSvg from "./AlertSvg";

const AdminLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const { showAlertMsg } = useAppContext();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper" ref={mainContent}>
        <div className="content container-fluid">
          <AlertSvg />
          {showAlertMsg.state === true ? (
            <div
              className={"alert d-flex align-items-center" + showAlertMsg.class}
              style={{ zIndex: 100 }}
              role="alert"
            >
              <svg
                class="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label={showAlertMsg.label}
              >
                <use xlinkHref={showAlertMsg.icon} />
              </svg>
              <div className="pl-3">{showAlertMsg.msg}</div>
            </div>
          ) : null}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
