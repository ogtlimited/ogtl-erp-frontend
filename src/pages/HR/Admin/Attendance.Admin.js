import React from "react";
import { Link } from "react-router-dom";

const AttendanceAdmin = () => {
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Attendance</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row filter-row">
        <div class="col-sm-6 col-md-3">
          <div class="form-group form-focus">
            <input type="text" class="form-control floating" />
            <label class="focus-label">Employee Name</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="form-group form-focus select-focus focused">
            <select
              class="select floating select2-hidden-accessible form-control"
              data-select2-id="select2-data-1-0b5s"
              tabindex="-1"
              aria-hidden="true"
            >
              <option data-select2-id="select2-data-3-moh8">-</option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <span
              class="select2 select2-container select2-container--default"
              dir="ltr"
              data-select2-id="select2-data-2-a0vc"
              style={{width: "100%"}}
            >
              <span class="selection">
                <span
                  class="select2-selection select2-selection--single"
                  role="combobox"
                  aria-haspopup="true"
                  aria-expanded="false"
                  tabindex="0"
                  aria-disabled="false"
                  aria-labelledby="select2-rhew-container"
                  aria-controls="select2-rhew-container"
                >
                  <span
                    class="select2-selection__rendered"
                    id="select2-rhew-container"
                    role="textbox"
                    aria-readonly="true"
                    title="-"
                  >
                    -
                  </span>
                  <span class="select2-selection__arrow" role="presentation">
                    <b role="presentation"></b>
                  </span>
                </span>
              </span>
              <span class="dropdown-wrapper" aria-hidden="true"></span>
            </span>
            <label class="focus-label">Select Month</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="form-group form-focus select-focus focused">
            <select
              class="select floating select2-hidden-accessible form-control"
              data-select2-id="select2-data-4-hdsb"
              tabindex="-1"
              aria-hidden="true"
            >
              <option data-select2-id="select2-data-6-jh3h">-</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
            </select>
            <span
              class="select2 select2-container select2-container--default"
              dir="ltr"
              data-select2-id="select2-data-5-4i6k"
              style={{width: "100%"}}
            >
              <span class="selection">
                <span
                  class="select2-selection select2-selection--single"
                  role="combobox"
                  aria-haspopup="true"
                  aria-expanded="false"
                  tabindex="0"
                  aria-disabled="false"
                  aria-labelledby="select2-kzmv-container"
                  aria-controls="select2-kzmv-container"
                >
                  <span
                    class="select2-selection__rendered"
                    id="select2-kzmv-container"
                    role="textbox"
                    aria-readonly="true"
                    title="-"
                  >
                    -
                  </span>
                  <span class="select2-selection__arrow" role="presentation">
                    <b role="presentation"></b>
                  </span>
                </span>
              </span>
              <span class="dropdown-wrapper" aria-hidden="true"></span>
            </span>
            <label class="focus-label">Select Year</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <a href="#" class="btn add-btn btn-block">
            {" "}
            Search{" "}
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table table-nowrap mb-0">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                  <th>7</th>
                  <th>8</th>
                  <th>9</th>
                  <th>10</th>
                  <th>11</th>
                  <th>12</th>
                  <th>13</th>
                  <th>14</th>
                  <th>15</th>
                  <th>16</th>
                  <th>17</th>
                  <th>18</th>
                  <th>19</th>
                  <th>20</th>
                  <th>22</th>
                  <th>23</th>
                  <th>24</th>
                  <th>25</th>
                  <th>26</th>
                  <th>27</th>
                  <th>28</th>
                  <th>29</th>
                  <th>30</th>
                  <th>31</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-09.jpg" />
                      </a>
                      <a href="profile.html">Anthony Potbelly</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <div class="half-day">
                      <span class="first-off">
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#attendance_info"
                        >
                          <i class="fa fa-check text-success"></i>
                        </a>
                      </span>
                      <span class="first-off">
                        <i class="fa fa-close text-danger"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <div class="half-day">
                      <span class="first-off">
                        <i class="fa fa-close text-danger"></i>
                      </span>
                      <span class="first-off">
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#attendance_info"
                        >
                          <i class="fa fa-check text-success"></i>
                        </a>
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-09.jpg" />
                      </a>
                      <a href="profile.html">Ahmed Fatjoe</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-10.jpg" />
                      </a>
                      <a href="profile.html">Mazi Ogundu</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-05.jpg" />
                      </a>
                      <a href="profile.html">Hassan Kabara</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-11.jpg" />
                      </a>
                      <a href="profile.html">Ibrahim Nayaya</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-12.jpg" />
                      </a>
                      <a href="profile.html">Mr Nobert</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-13.jpg" />
                      </a>
                      <a href="profile.html">Abubakar Sadiq</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-01.jpg" />
                      </a>
                      <a href="profile.html">Akinade Tumise</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-16.jpg" />
                      </a>
                      <a href="profile.html">Iman Wada</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs" href="profile.html">
                        <img alt="" src="assets/img/profiles/avatar-04.jpg" />
                      </a>
                      <a href="profile.html">Khalil Kabara</a>
                    </h2>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <i class="fa fa-close text-danger"></i>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#attendance_info"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceAdmin;
