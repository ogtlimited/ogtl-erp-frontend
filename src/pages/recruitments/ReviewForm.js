import React, { useEffect } from "react";
import { useNoAuthContext } from "../../Context/NoAuthContext";
import axios from "axios";
import config from "../../config.json";
import { useParams, useNavigate } from "react-router-dom";
import success from "../../assets/img/success.svg";
const ReviewForm = () => {
  let navigate = useNavigate();
  const { jobApplication } = useNoAuthContext();
  useEffect(() => {}, [jobApplication]);
  const handleSubmit = () => {
    delete jobApplication.referred;
    axios
      .post(config.ApiUrl + "/api/jobApplicant", jobApplication)
      .then((res) => {
        document.getElementById("applyBtn").click();

        setTimeout(() => {
          // setafterSuccess(false)
          document.getElementById("closeBtn").click();
          navigate("/recruitment");
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
          {Object.keys(jobApplication).map((e) => (
            <>
              <div className="col-md-6 mt-3">
                <p className="job-field">{e.split("_").join(" ")}</p>
              </div>
              <div className="col-md-6 mt-3">{jobApplication[e]}</div>
            </>
          ))}
        </div>
      </div>

      <div className="row flex justify-content-between px-5 pb-5">
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
          Submit
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
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Application submitted successfully
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
              <div className="d-flex row justify-content-center p-5 m-5">
                {" "}
                <img
                  style={{ width: "100px", alignSelf: "center" }}
                  src={success}
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
