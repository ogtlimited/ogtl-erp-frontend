import React, { useEffect, useState } from "react";
import { useNoAuthContext } from "../../Context/NoAuthContext";
import axios from "axios";
import config from "../../config.json";
import { useParams, useNavigate } from "react-router-dom";
import success from "../../assets/img/success.svg";
import info from "../../assets/img/info-danger.svg";

const ReviewForm = () => {
  let navigate = useNavigate();
  const { jobApplication, jobReview } = useNoAuthContext();
  const [message, setMessage] = useState("Application submitted successfully");
  const [resIcon, setResIcon] = useState(success);

  const handleSubmit = async () => {
    console.log("jobApplication to be submitted:", jobApplication);

    let formData = new FormData();
    formData.append("first_name", jobApplication.first_name);
    formData.append("last_name", jobApplication.last_name);
    formData.append("middle_name", jobApplication.middle_name);
    formData.append("mobile_number", jobApplication.mobile_number);
    formData.append("email", jobApplication.email);
    formData.append(
      "highest_qualification",
      jobApplication.highest_qualification
    );
    formData.append("certifications", jobApplication.certifications);
    formData.append("languages_spoken", jobApplication.languages_spoken);
    formData.append("hr_job_opening_id", jobApplication.hr_job_opening_id);
    formData.append("resume", jobApplication.resume);

    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axios.post(
    //     `${config.ApiUrl}/api/v1/job_applicants.json`,
    //     formData
    //   );

    //   document.getElementById("applyBtn").click();
    //   setMessage("Application submitted successfully");
    //   setResIcon(success);

    //   setTimeout(() => {
    //     document.getElementById("closeBtn").click();
    //     navigate("/recruitment");
    //   }, 5000);
    // } catch (error) {
    //   console.log("error", error);
    //   setMessage(error?.response?.data?.error);
    //   setResIcon(info);
    //   document.getElementById("applyBtn").click();

    //   setTimeout(() => {
    //     document.getElementById("closeBtn").click();
    //     // navigate("/recruitment");
    //   }, 5000);
    // }

    axios
      .post(`${config.ApiUrl}/api/v1/job_applicants.json`, formData)
      .then((res) => {
        document.getElementById("applyBtn").click();
        setMessage("Application submitted successfully");
        setResIcon(success);
        setTimeout(() => {
          document.getElementById("closeBtn").click();
          navigate("/recruitment");
        }, 5000);
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err?.response?.data?.message);
        setResIcon(info);
        document.getElementById("applyBtn").click();

        setTimeout(() => {
          document.getElementById("closeBtn").click();
        }, 5000);
      });
  };

  return (
    <div className="card">
      <div className="card-header application-form-header">
        Review Application Form
      </div>
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          {Object.keys(jobReview).map((e) => (
            <>
              <div className="col-md-6 mt-3">
                <p className="job-field">{e.split("_").join(" ")}</p>
              </div>
              <div className="col-md-6 mt-3">
                {e === "languages_spoken" ? (
                  <div className="row">
                    {jobReview[e].map((lang) => (
                      <ul>
                        <li>{lang}</li>
                      </ul>
                    ))}
                  </div>
                ) : (
                  jobReview[e]
                )}
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="row flex justify-content-between px-5">
        <button
          type="button"
          className="nav-button btn btn-primary submit-btn"
          data-toggle="collapse"
          data-target={"#collapse2"}
          aria-expanded="false"
          aria-controls={"collapse2"}
        >
          Prev
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary submit-btn"
        >
          Submit Application
        </button>
      </div>

      <button
        style={{ opacity: 0 }}
        type="submit"
        id="applyBtn"
        data-toggle="modal"
        data-target="#exampleModal"
        className="btn btn-primary submit-btn"
      >
        Submit
      </button>

      <div
        className="modal custom-modal fade show"
        id="apply_job"
        role="dialog"
        aria-modal="true"
        // id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {message}
              </h5>
              <button
                id="closeBtn"
                style={{ opacity: 0 }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex row justify-content-center p-5 mx-5 mb-5">
                {" "}
                <img
                  style={{ width: "100px", alignSelf: "center", color: "red" }}
                  src={resIcon}
                  alt="success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
