import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumb, RightSide, setcoachingFormEdit }) => {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">Employee</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Employees</li>
          </ul>
        </div>
        <div className="col-auto float-right ml-auto">
          <a
            href="#"
            className="btn add-btn"
            data-toggle="modal"
            data-target="#add_employee"
          >
            <i className="fa fa-plus"></i> Add Employee
          </a>
          <div className="view-icons">
            <a href="" className="grid-view btn btn-link">
              <i className="fa fa-th"></i>
            </a>
            <a href="" className="list-view btn btn-link active">
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
