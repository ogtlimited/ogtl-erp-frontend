import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import LegalDebugger from "../../assets/img/legal-debugger.jpg";
import SnowdenMoses from "../../assets/img/SnowdenMoses.jpeg";
import UD from "../../assets/img/undefined.jpg";
import Maryam from "../../assets/img/Maryam.jpeg";
import Muazat from "../../assets/img/Muazat.webp";
import axiosInstance from "../../services/api";
import AlertSvg from "./AlertSvg";

const InternalServerError = () => {
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState({
    state: false,
    msg: "",
    class: "",
  });

  const showAlert = (state, msg, className) => {
    let icon = className?.includes("alert-success")
      ? "#check-circle-fill"
      : "#exclamation-triangle-fill";
    let label = className?.includes("alert-success") ? "Success:" : "Warning:";
    setShowAlertMsg({
      state: state,
      msg: msg,
      class: className,
      icon,
      label,
    });
    setTimeout(() => {
      setShowAlertMsg({
        state: "",
        msg: "",
        class: "",
        icon: "",
        label: "",
      });
    }, 5000);
  };

  const fetchWhoToFire = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`/api/v1/who_to_fire.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      console.log("Who To Fire", response?.data?.data?.who_to_fire);

      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWhoToFire();
  }, [fetchWhoToFire]);

  const handleVoteWhoToFire = async (ogid, name) => {
    setVoting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/who_to_fire/${ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        `You have successfully voted for ${name} 😈`,
        "alert alert-success"
      );

      fetchWhoToFire();
      setVoting(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setVoting(false);
    }
  };

  return (
    <div id="app">
      <AlertSvg />
      {showAlertMsg.state === true ? (
        <div
          className={"alert d-flex align-items-center" + showAlertMsg.class}
          style={{ zIndex: 100, position: "absolute", right: "2%", top: "1.5rem" }}
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

      <div className="error404 error-page internal_server_error_page">
        <div className="main-wrapper">
          <div className="wtf_box">
            <h3>Who should we fire?</h3>
            <div className="wtf_container">
              <div
                className="wtf_wrapper"
                onClick={() => handleVoteWhoToFire("OG202036", "Maryam")}
              >
                <div className="wtf_img_wrapper">
                  <img src={Maryam} alt="Maryam" />
                </div>
                <p>Maryam</p>
              </div>
              <div
                className="wtf_wrapper"
                onClick={() => handleVoteWhoToFire("OG220233", "SnowdenMoses")}
              >
                <div className="wtf_img_wrapper">
                  <img src={SnowdenMoses} alt="SnowdenMoses" />
                </div>
                <p>SnowdenMoses</p>
              </div>
              <div
                className="wtf_wrapper"
                onClick={() =>
                  handleVoteWhoToFire("OG172422", "Legal Debugger")
                }
              >
                <div className="wtf_img_wrapper">
                  <img src={LegalDebugger} alt="Legal Debugger" />
                </div>
                <p>Legal Debugger</p>
              </div>
              <div
                className="wtf_wrapper"
                onClick={() => handleVoteWhoToFire("OG220133", "UD")}
              >
                <div className="wtf_img_wrapper">
                  <img src={UD} alt="UD" />
                </div>
                <p>UD</p>
              </div>
              <div
                className="wtf_wrapper"
                onClick={() => handleVoteWhoToFire("OG220848", "Muazat")}
              >
                <div className="wtf_img_wrapper">
                  <img src={Muazat} alt="Muazat" />
                </div>
                <p>Muazat (Illegal Debugger)</p>
              </div>
            </div>
            <Link to="/dashboard/employee-dashboard" className="back_btn">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalServerError;
