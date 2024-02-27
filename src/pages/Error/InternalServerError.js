import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LegalDebugger from "../../assets/img/legal-debugger.jpg";
import SnowdenMoses from "../../assets/img/SnowdenMoses.jpeg";
import UD from "../../assets/img/undefined.jpg";
import Maryam from "../../assets/img/Maryam.jpeg";
import Muazat from "../../assets/img/Muazat.webp";

const InternalServerError = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard/employee-dashboard");
  };

  return (
    <div id="app">
      <div>
        <div className="error404 error-page internal_server_error_page">
          <div className="main-wrapper">
            <div className="wtf_box">
              <h3>Who should we fire?</h3>
              <div className="wtf_container">
                <div className="wtf_wrapper" onClick={handleGoToDashboard}>
                  <div className="wtf_img_wrapper">
                    <img src={Maryam} alt="Maryam" />
                  </div>
                  <p>Maryam</p>
                </div>
                <div className="wtf_wrapper" onClick={handleGoToDashboard}>
                  <div className="wtf_img_wrapper">
                    <img src={SnowdenMoses} alt="SnowdenMoses" />
                  </div>
                  <p>SnowdenMoses</p>
                </div>
                <div className="wtf_wrapper" onClick={handleGoToDashboard}>
                  <div className="wtf_img_wrapper">
                    <img src={LegalDebugger} alt="Legal Debugger" />
                  </div>
                  <p>Legal Debugger</p>
                </div>
                <div className="wtf_wrapper" onClick={handleGoToDashboard}>
                  <div className="wtf_img_wrapper">
                    <img src={UD} alt="UD" />
                  </div>
                  <p>UD</p>
                </div>
                <div className="wtf_wrapper" onClick={handleGoToDashboard}>
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
    </div>
  );
};

export default InternalServerError;
