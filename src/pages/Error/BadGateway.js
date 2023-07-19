import React from "react";
import { Link } from "react-router-dom";

const BadGateway = () => {
  return(
    <div id="app">
        <div>
        <div className="error404 error-page" style={{ height: "100vh" }}>

            <div className="main-wrapper">
            <div className="error-box">
                <h1>502</h1>
                <h3>
                <i className="fa fa-warning"></i> Bad Gateway
                </h3>
                <p>The server encountered a temporary error and could not complete your request</p>
                <Link to="/dashboard/employee-dashboard" className="btn btn-custom">
                    Back to Dashboard
                </Link>
            </div>
            </div>
        
        </div>
        </div>
    </div>

  )
};

export default BadGateway;
