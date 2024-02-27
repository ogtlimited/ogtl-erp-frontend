//* IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axios from "axios";
import moment from "moment";
import HeroImage from "../../../assets/img/HR-nextImg.png";
import ERP1 from "../../../assets/img/erp1.png";
import ERP2 from "../../../assets/img/erp2.png";
import ERP3 from "../../../assets/img/erp3.png";
import ViewModal from "../../../components/Modal/ViewModal";
import CEOMessageContent from "../../../components/ModalContents/CEOMessageContent";
import $ from "jquery";

const EmployeeUser = () => {
  const date = new Date().toUTCString();
  const day = date.split(",")[0].toLowerCase();
  const { user } = useAppContext();
  const [quotes, setQuotes] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalType, setmodalType] = useState("CEO Message");
  const [heroIcons, setHeroIcons] = useState({
    hero: HeroImage,
    erp1: ERP1,
    erp2: ERP2,
    erp3: ERP3,
  });

  const isRemoteStaff = user?.employee_info?.remote;

  useEffect(() => {
    setmodalType("CEO Message");
    $("#generalModal").modal("show");
  }, []);

  // Employee Shift (Today):
  const todayShift = user?.employee_info?.shifts?.filter((e) =>
    e?.day.match(day)
  );
  const start = todayShift[0]?.start_time
    ? moment(todayShift[0].start_time, ["HH"]).format("hh A")
    : null;
  const end = todayShift[0]?.end_time
    ? moment(todayShift[0].end_time, ["HH"]).format("hh A")
    : null;

  // Quotes:
  const fetchQuote = async () => {
    try {
      const result = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const quotes = result?.data?.quotes;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuotes(randomQuote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeroIcons({
      hero: [HeroImage, ERP1, ERP2, ERP3][currentIndex],
      erp1: [ERP1, ERP2, ERP3, HeroImage][currentIndex],
      erp2: [ERP2, ERP3, HeroImage, ERP1][currentIndex],
      erp3: [HeroImage, ERP1, ERP2, ERP3][currentIndex],
    });
  }, [currentIndex]);

  return (
    <>
      <div className="col">
        <div className="col-lg-12 col-md-12">
          <div className="row welcome-card p-5">
            <div className="col-md-8 left-card">
              <h4 className="welcome-text">
                Welcome back, <br />{" "}
                {`${user?.employee_info?.personal_details?.first_name} 
                  ${user?.employee_info?.personal_details?.middle_name || ""} 
                  ${user?.employee_info?.personal_details?.last_name}
                `}{" "}
                !
              </h4>
              {!isRemoteStaff && (
                <p className="welcome-p">
                  If you haven't clocked in today, you need to do it right away
                </p>
              )}
            </div>
            <div className="col-md-4">
              <img
                style={{ width: "100%" }}
                className="mt-4"
                src={heroIcons.hero}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-8 col-md-12">
              <section className="dash-section">
                <h1 className="dash-sec-title">Today</h1>
                <div className="dash-sec-content">
                  <div className="dash-sec-content">
                    <div className="dash-info-list">
                      <div className="dash-card">
                        <div className="dash-card-container">
                          <div className="dash-card-icon">
                            <i className="fa fa-clock"></i>
                          </div>
                          <div className="dash-card-content">
                            {user?.employee_info?.shifts.length ? (
                              <p>
                                Your shift starts at <strong>{start} </strong>
                                and ends at <strong>{end}</strong>{" "}
                              </p>
                            ) : (
                              <p>You do not have a shift today</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="dash-section">
                <h5 className="dash-title">
                  <strong>Quote of the day</strong>
                </h5>
                <div className="card">
                  <div className="card-body text-center">
                    <figure>
                      <blockquote>
                        <h4 className="holiday-title">{quotes?.quote}</h4>
                      </blockquote>
                      <figcaption>—{quotes?.author}</figcaption>
                    </figure>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="dash-sidebar">
                <section>
                  <h5 className="dash-title">Your Leave</h5>
                  <div className="card emp-dashboard-leave-card">
                    <div className="card-body emp-dashboard-leave-card-body">
                      <div className="time-list">
                        <div className="dash-stats-list ">
                          <h4>{user?.employee_info?.leave_count}</h4>
                          <p>Remaining</p>
                        </div>
                      </div>
                      <div className="request-btn">
                        <Link
                          to="/dashboard/main/leave"
                          className="btn btn-primary"
                        >
                          Apply For Leave
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalType === "CEO Message" ? (
        <ViewModal
          title="Message from the CEO"
          expand={true}
          content={<CEOMessageContent />}
        />
      ) : null}
    </>
  );
};

export default EmployeeUser;
