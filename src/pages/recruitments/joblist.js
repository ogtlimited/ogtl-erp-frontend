/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import RecruitmentPageHeader from "./PageHeader";
import axios from "axios";
import moment from "moment";

const Joblist = () => {
  const [jobListings, setJobListings] = useState([]);

  const fetchJobOpening = () => {
    axios
      .get(`${config.ApiUrl}/api/v1/job_openings.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.job_openings;

        if (data.length) {
          // console.log({
          //   jobListing: data,
          // });
          setJobListings(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchJobOpening();
  }, []);

  return (
    <>
      <RecruitmentPageHeader />

      <div className="row">
        <div className="col-md-6">
          <h1 className="ju-h1">Join Us</h1>
          <p className="rec-p">
            If you are passionate about delivering great customer experience,
            Outsource Global is the place for you. At Outsource Global,
            everything we do is centered on people.
          </p>

          <p className="rec-p">
            We are as committed to helping our employees maximize their
            potential as we are to helping our customers outperform. As an
            innovation-driven organization, we are always looking for highly
            motivated people who are committed to pushing themselves to be the
            best they can be. We believe that once we support our employees in
            performing their best then our clients and our company will also
            prosper.
          </p>
          <p className="rec-p">
            Do you think you have what it takes to join our team of diverse
            professionals who are reshaping the business and knowledge process
            outsourcing industry?
          </p>
        </div>
        <div className="col-md-4">
          <div className="ju-percent-group">
            <div className="d-flex ju-percent">
              <h1>60%</h1>
              <p>Female Employees</p>
            </div>
            <div className="d-flex ju-percent">
              <h1>90%</h1>
              <p>University Graduates</p>
            </div>
            <div className="d-flex ju-percent-down">
              <h1>100%</h1>
              <p>Technical Professionals</p>
            </div>
            <div className="d-flex ju-percent-down">
              <h1>500+</h1>
              <p>Employees</p>
            </div>
          </div>
        </div>
        {/* <div className="col-md-12">
          <h1 className="availableOpening">Available Opening</h1>
        </div> */}
      </div>

      {/* <div className="row">
        {jobListings &&
          jobListings.map((job) => (
            <div className="col-md-6">
              <Link to={"/recruitment/joblist/" + job._id} className="job-list">
                <div className="job-list-det">
                  <div className="job-list-desc">
                    <h3 className="job-list-title">{job?.job_title}</h3>
                    <h4 className="job-department">
                      {job?.designation_id?.designation}
                    </h4>
                  </div>
                  <div className="job-type-info">
                    <span className="job-types">{job?.type}</span>
                  </div>
                </div>
                <div className="job-list-footer">
                  <ul>
                    <li>
                      <i className="fa fa-map-signs"></i>{" "}
                      {job?.location?.branch}
                    </li>
                    <li>
                      <i className="fa fa-money"></i> ₦{job?.salary}
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i>
                      {job.date
                        ? moment(new Date(job?.date)).fromNow(true)
                        : ""}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          ))}
      </div> */}
    </>
  );
};

export default Joblist;
