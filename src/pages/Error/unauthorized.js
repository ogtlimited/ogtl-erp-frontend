import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return(
    <div id="app">
        <div>
        <div className="error404 error-page" style={{ height: "100vh" }}>

            <div className="main-wrapper">
            <div className="error-box">
                <h1>403</h1>
                <h3>
                <i className="fa fa-warning"></i> Oops! Unauthorized Access!
                </h3>
                <p>You don't have access to visit this page</p>
                <Link to="/dashboard/employee-dashboard" className="btn btn-custom">
                    Back to Home
                </Link>
            </div>
            </div>
        
        </div>
        </div>
    </div>

  )
};

export default Unauthorized;
