import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import joblistings from "./job.json";
import RecruitmentPageHeader from "./PageHeader";
import axios from "axios";
import moment from "moment";
const Joblist = () => {
  const [jobListings, setjobListings] = useState([]);
  const fetchJobOpening = () => {
    axios.get(config.ApiUrl + "/api/jobOpening").then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data.data.length) {
        console.log("some data");
        setjobListings(res.data.data);
      } else {
        setjobListings(joblistings);
        console.log("No data");
      }
    });
  };
  useEffect(() => {
    fetchJobOpening();
  }, []);
  return (
    <>
      <RecruitmentPageHeader />
      
      <div className="row">
      <div class="col-md-8">
        <h1 class="ju-h1">Join Us</h1>
        <p className="rec-p">
          If you are passionate about delivering great customer experience,
          Outsource Global is the place for you. At Outsource Global, everything
          we do is centered on people.
        </p>

        <p className="rec-p">
          We are as committed to helping our employees maximize their potential
          as we are to helping our customers outperform. As an innovation-driven
          organization, we are always looking for highly motivated people who
          are committed to pushing themselves to be the best they can be. We
          believe that once we support our employees in performing their best
          then our clients and our company will also prosper.
        </p>
        <p className="rec-p">
          Do you think you have what it takes to join our team of diverse
          professionals who are reshaping the business and knowledge process
          outsourcing industry?
        </p>
      </div>
      <div class="col-md-4">
        <div class="ju-percent-group">
          <div class="d-flex ju-percent">
            <h1>50%</h1>
            <p>Female Employees</p>
          </div>
          <div class="d-flex ju-percent">
            <h1>90%</h1>
            <p>University Graduates</p>
          </div>
          <div class="d-flex ju-percent-down">
            <h1>100%</h1>
            <p>Technical Professionals</p>
          </div>
          <div class="d-flex ju-percent-down">
            <h1>1000+</h1>
            <p>Employees</p>
          </div>
        </div>
      </div>
      <div className="col-md-12" >
          <h1 className="availableOpening">Available Opening</h1>
      </div>
      </div>

      <div className="row">
        {jobListings &&
          jobListings.map((job) => (
            <div class="col-md-6">
              <Link to={"/recruitment/joblist/" + job._id} class="job-list">
                <div class="job-list-det">
                  <div class="job-list-desc">
                    <h3 class="job-list-title">{job.title}</h3>
                    <h4 class="job-department">
                      {job.designation_id.designation}
                    </h4>
                  </div>
                  <div class="job-type-info">
                    <span class="job-types">{job.type}</span>
                  </div>
                </div>
                <div class="job-list-footer">
                  <ul>
                    <li>
                      <i class="fa fa-map-signs"></i> {job.location.branch}
                    </li>
                    <li>
                      <i class="fa fa-money"></i> ₦{job.salary}
                    </li>
                    <li>
                      <i class="fa fa-clock-o"></i>
                      {job.date ? moment(new Date(job.date)).fromNow(true) : ""}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Joblist;
