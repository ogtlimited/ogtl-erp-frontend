import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/Misc/Header";
import Sidebar from "../components/Misc/Sidebar";
import { useAppContext } from "../Context/AppContext";
import AlertSvg from "./AlertSvg";
import $ from "jquery";
import { SurveyFormModalPrompt } from "../components/Modal/SurveyFormModalPrompt";
import { AnnouncementModalPrompt } from "./../components/Modal/AnnouncementModalPrompt";
import secureLocalStorage from "react-secure-storage";

const AdminLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const {
    showAlertMsg,
    showProgress,
    pendingSurveys,
    fetchPendingSurveys,
    setPendingSurveySubmitted,
    announcement,
  } = useAppContext();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    if (pendingSurveys.length) {
      setPendingSurveySubmitted(false);
      $("#SurveyFormModalPrompt").modal("show");
    }
  }, [pendingSurveys.length, setPendingSurveySubmitted]);

  useEffect(() => {
    if (announcement && !secureLocalStorage.getItem("seenAnnouncement")) {
      $("#AnnouncementModalPrompt").modal("show");
    }
  }, [announcement]);

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
                className="bi flex-shrink-0 me-2"
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
          {showProgress.state === true ? (
            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: showProgress.count + "%" }}
              ></div>
            </div>
          ) : null}
          <Outlet />
        </div>
      </div>

      <SurveyFormModalPrompt
        pendingSurveys={pendingSurveys}
        fetchSurveys={fetchPendingSurveys}
      />

      <AnnouncementModalPrompt />
    </>
  );
};

export default AdminLayout;
