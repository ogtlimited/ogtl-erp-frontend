import React, { useEffect, useCallback } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { SurveyFormModalPrompt } from "../components/Modal/SurveyFormModalPrompt";
import { VideoAnnouncementModalPrompt } from "../components/Modal/VideoAnnouncementModalPrompt";
import { NewsletterModalPrompt } from "../components/Modal/NewsletterModalPrompt";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Misc/Header";
import Sidebar from "../components/Misc/Sidebar";
import AlertSvg from "./AlertSvg";
import $ from "jquery";

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
    announcementWatched,
    newsletter,
    newsletterRead,
  } = useAppContext();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // Survey Form:
  const surveyPopUp = useCallback(() => {
    const seenAnnouncement = secureLocalStorage.getItem("seenAnnouncement");
    const seenNewsletter = secureLocalStorage.getItem("seenNewsletter");

    if (
      (seenAnnouncement || announcementWatched) &&
      (seenNewsletter || newsletterRead) &&
      pendingSurveys?.length
    ) {
      setPendingSurveySubmitted(false);
      $("#SurveyFormModalPrompt").modal("toggle");
    } else {
      return null;
    }
  }, [
    announcementWatched,
    newsletterRead,
    pendingSurveys?.length,
    setPendingSurveySubmitted,
  ]);

  // Newsletter:
  const newletterPopUp = useCallback(() => {
    const seenNewsletter = secureLocalStorage.getItem("seenNewsletter");

    if (newsletter && !seenNewsletter) {
      $("#NewsletterModalPrompt").modal("show");
    } else {
      surveyPopUp();
    }
  }, [newsletter, surveyPopUp]);
  
  useEffect(() => {
    if (newsletterRead) {
      window.location.reload();
    }
  }, [newsletterRead]);

  // Announcement:
  const announcementPopUp = useCallback(() => {
    const seenAnnouncement = secureLocalStorage.getItem("seenAnnouncement");

    if (announcement && !seenAnnouncement) {
      $("#VideoAnnouncementModalPrompt").modal("show");
    } else {
      newletterPopUp();
    }
  }, [announcement, newletterPopUp]);

  useEffect(() => {
    announcementPopUp();
  }, [announcementPopUp]);

  useEffect(() => {
    if (announcementWatched) {
      window.location.reload();
    }
  }, [announcementWatched]);

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

      <VideoAnnouncementModalPrompt />

      <NewsletterModalPrompt />
    </>
  );
};

export default AdminLayout;
