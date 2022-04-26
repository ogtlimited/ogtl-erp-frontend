import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Pdf from "react-to-pdf";
import logo from "../../assets/img/outsource.png";
// import jobs from "./job.json";
// import { useParams } from "react-router-dom";
// import config from "../../config.json";
// import axios from "axios";
import RecruitmentHeader from "./recruitmentHeader";

const AcceptJoboffer = () => {
  const [applicantName, setApplicantName] = useState();
  const [submitted, setSubmitted] = useState(false);
  const ref = React.createRef();

  // let { id } = useParams();
  // const [state, setstate] = useState({});
  // const fetchJobOpening = () => {
  //   axios.get(config.ApiUrl + "/api/jobOpening/" + id).then((res) => {
  //     setstate(res.data.data);
  //   });
  // };

  // useEffect(() => {
  //   fetchJobOpening();
  // }, []);

  const handleApplicantName = (full_name) => {
    setApplicantName(full_name);
  };

  const handleSubmit = (e, field) => {
    setSubmitted(true);
  };

  return (
    <>
      <RecruitmentHeader/>
      <div className="letter-box">
        <div ref={ref} className="row justify-content-center">
          <div className="col-md-10 mt-5">
            <div className="card px-5 ">
              <div className="card-body">
                <h4 className="payslip-title">
                  Job Offer Letter
                </h4>
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={logo} className="inv-logo" alt="" />
                    <ul className="list-unstyled mb-3">
                      <li>Outsource Global Technologies</li>
                      <li> 2nd Floor, ASTA GALLERY Plot 1185, Mabushi </li>
                      <li>Abuja FCT, Nigeria</li>
                    </ul>
                  </div>
                  <div className="offer-letter-content">
                    <p>We are delighted to extend this offer of employment for the position of <b>[Job_title]</b> with <b>Outsource Global Limited</b>. 
                      We believe your skills and experience are excellent match for this role.
                    </p>

                    <p>
                    In this role you will be required to <em>[list of generalised possible tasks]</em>. 
                    If you accept this offer, your start date will be <b>[Start Date]</b> or another mutually agreed upon date, and you would report to <b>[Manager_name]</b>.
                    </p>

                    <p>Accepted by</p>
                    <h3 className="applicant-signature">{applicantName}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {!submitted &&
        <>
        <p className="confirmation">Do you Accept this offer?</p>
        <div className="confirmation-btns">
          <button
            data-toggle="modal"
            data-target="#confirmationModal"
            type="button"
            className="btn btn-primary confirmation-btn"
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-secondary confirmation-btn"
          >
            Decline
          </button>
        </div>
        </>}
      </div>

      <Formik
        initialValues={{
          full_name: "",
          email_address: "",
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().required("Full Name is required"),
          email_address: Yup.string().email("Invalid Email").required("Email is required"),
        })}
        onSubmit={(fields) => {
          handleSubmit(null, fields);
          console.log("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
        }}
        onChange={(fields) => {
          // handleChange(null, fields);
          console.log("Hello")
        }}
        render={({ errors, status, touched, setFieldValue, handleChange }) => (
          <div
            id="confirmationModal"
            className="modal custom-modal fade show"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Fill the form to comfirm acceptance</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Form>
                    <div className="form-group">
                      <div className="col-md-12">
                        <label>Full Name</label>
                        <Field
                          name="full_name"
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            handleChange(e);
                            handleApplicantName(e.currentTarget.value)
                          }}
                        />
                        <ErrorMessage
                          name="full_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-12">
                        <label htmlFor="email_address">Email</label>
                        <Field
                          name="email_address"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email_address"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="submit-section">
                      <Pdf targetRef={ref} filename="outsouce-offer-letter.pdf" x={1} y={1} scale={0.81}>
                        {({ toPdf }) => (
                          <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            onClick={() => {
                              toPdf();
                            }}
                          >
                            Submit
                          </button>
                        )}
                      </Pdf>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
)}
/>
    </>
  );
};

export default AcceptJoboffer;



