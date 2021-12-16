import React from "react";
import { useLocation, Outlet } from "react-router-dom";

import Header from "../components/Misc/Header";
import Sidebar from "../components/Misc/Sidebar";
import { useAppContext } from "../Context/AppContext";

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
      <Header   />
      <Sidebar
      />
      <div className="page-wrapper" ref={mainContent}>
        <div className="content container-fluid">
          {showAlertMsg.state === true ? (
            <div
              className={"alert " + showAlertMsg.class}
              style={{ zIndex: 100 }}
              role="alert"
            >
              {showAlertMsg.msg}
            </div>
          ) : null}
          <Outlet />

        </div>
      </div>
    </>
  );
};

export default AdminLayout;
