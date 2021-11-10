import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// core components

import routes from "../routes";
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

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Header {...props} brandText={getBrandText(props.location.pathname)} />
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/OG-Logo.png").default,
          imgAlt: "...",
        }}
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
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
