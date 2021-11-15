import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";

const EmployeeUser = () => {
  const date = new Date().toUTCString();
  const { notifications, user } = useAppContext();

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="welcome-box">
            <div className="welcome-img">
              <img alt="" src="assets/img/profiles/avatar-02.jpg" />
            </div>
            <div className="welcome-det">
              <h3>
                Welcome,{" "}
                {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}{" "}
              </h3>
              <p>{date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <section className="dash-section">
            <h1 className="dash-sec-title">Today</h1>
            <div className="dash-sec-content">
              {notifications.length ? (
                notifications.map((notification, index) => (
                  <div className="dash-info-list" key={index}>
                    <Link className="dash-card  ">
                      <div className="dash-card-container">
                        <div className="dash-card-icon">
                          <i className="fa fa-hourglass-o"></i>
                        </div>
                        <div className="dash-card-content">
                          <p>A new {notification.module} was added</p>
                        </div>
                        <div className="dash-card-avatars">
                          <div className="e-avatar">
                            <img
                              src="assets/img/profiles/avatar-09.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="card">
                  <div className="card-body">
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h3>No New Notifications</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* <section className="dash-section">
            <h1 className="dash-sec-title">Next seven days</h1>
            <div className="dash-sec-content">
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-suitcase"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>2 people are going to be away</p>
                    </div>
                    <div className="dash-card-avatars">
                      <Link className="e-avatar">
                        <img src="assets/img/profiles/avatar-05.jpg" alt="" />
                      </Link>
                      <Link className="e-avatar">
                        <img src="assets/img/profiles/avatar-07.jpg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-info-list">
                <div className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-user-plus"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>Your first day is going to be on Thursday</p>
                    </div>
                    <div className="dash-card-avatars">
                      <div className="e-avatar">
                        <img src="assets/img/profiles/avatar-02.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-info-list">
                <Link href="" className="dash-card">
                  <div className="dash-card-container">
                    <div className="dash-card-icon">
                      <i className="fa fa-calendar"></i>
                    </div>
                    <div className="dash-card-content">
                      <p>It's Spring Bank Holiday on Monday</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section> */}
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="dash-sidebar">
            <section>
              <h5 className="dash-title">Projects</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>71</h4>
                      <p>Total Tasks</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>14</h4>
                      <p>Pending Tasks</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <div className="dash-stats-list">
                      <h4>2</h4>
                      <p>Total Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Your Leave</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>4.5</h4>
                      <p>Leave Taken</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>12</h4>
                      <p>Remaining</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <Link className="btn btn-primary">Apply Leave</Link>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Your time off allowance</h5>
              <div className="card">
                <div className="card-body">
                  <div className="time-list">
                    <div className="dash-stats-list">
                      <h4>5.0 Hours</h4>
                      <p>Approved</p>
                    </div>
                    <div className="dash-stats-list">
                      <h4>15 Hours</h4>
                      <p>Remaining</p>
                    </div>
                  </div>
                  <div className="request-btn">
                    <Link className="btn btn-primary">Apply Time Off</Link>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h5 className="dash-title">Upcoming Holiday</h5>
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="holiday-title mb-0">
                    1 October 2021 - Independence
                  </h4>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeUser;
