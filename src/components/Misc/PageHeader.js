import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumb, RightSide, setcoachingFormEdit }) => {
  // console.log(props.children)

  console.log(breadcrumb);
  return (
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="page-title">Employee</h3>
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Employees</li>
          </ul>
        </div>
        <div class="col-auto float-right ml-auto">
          <a
            href="#"
            class="btn add-btn"
            data-toggle="modal"
            data-target="#add_employee"
          >
            <i class="fa fa-plus"></i> Add Employee
          </a>
          <div class="view-icons">
            <a href="" class="grid-view btn btn-link">
              <i class="fa fa-th"></i>
            </a>
            <a href="" class="list-view btn btn-link active">
              <i class="fa fa-bars"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
