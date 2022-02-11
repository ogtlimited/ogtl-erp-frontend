import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div id="app">
            <div>
            <div class="error404 error-page" style={{ height: "100vh" }}>
    
                <div class="main-wrapper">
                <div class="error-box">
                    <h1>404</h1>
                    <h3>
                    <i class="fa fa-warning"></i> Oops! Page not found!
                    </h3>
                    <p>The page you requested was not found.</p>
                    <Link to="/dashboard/employee-dashboard" class="btn btn-custom">
                        Back to Home
                    </Link>
                </div>
                </div>
            
            </div>
            </div>
        </div>
    
      )
};

export default NotFound;
