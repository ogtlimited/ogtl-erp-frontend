import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../config.json";
import success from "../../assets/img/success.svg";

const SocialHandleForm = () => {
  const [submitted, setsubmitted] = useState(false);
  const [progress, setprogress] = useState(10);
  const [fileName, setfileName] = useState("");
  const [afterSuccess, setafterSuccess] = useState(false);
  const [header, setheader] = useState("Add Your Details");

  const handleSubmit = (e, field) => {
    console.log(field);
    // setprogress(65)
    setsubmitted(true);

    axios.post(config.ApiUrl + "/api/employee", field).then((res) => {
      console.log(res);
      setsubmitted(false);
      setafterSuccess(true);
      setheader("Your Application has been submitted sucessfully");
      setTimeout(() => {
        setafterSuccess(false);
        document.getElementById("closeBtn").click();
      }, 4000);
    });
  };

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        twitter: "",
        facebook: "",
        middle_name: "",
      }}
      onSubmit={(fields) => {
        handleSubmit(null, fields);
        console.log("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      }}
      render={({
        errors,
        dirty,
        isValid,
        touched,
        setFieldValue,
        values,
        handleChange,
      }) => (
        <div className="card">
          <div className="card-header application-form-header">
            Application Form
          </div>
          <div className="card-body">
            {!afterSuccess ? (
              <Form>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="twitter">
                      Twitter <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="twitter"
                      type="text"
                      className={
                        "form-control" +
                        (errors.twitter && touched.twitter ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="twitter"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="facebook">
                      Facebook <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="facebook"
                      type="text"
                      className={
                        "form-control" +
                        (errors.facebook && touched.facebook
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="facebook"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>LinkedIn</label>
                    <Field
                      name="middle_name"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="linkedIn">
                      Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="linkedIn"
                      type="text"
                      className={
                        "form-control" +
                        (errors.linkedIn && touched.linkedIn
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="linkedIn"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="row flex justify-content-between px-3">
                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    className="nav-button btn btn-primary submit-btn"
                    data-toggle="collapse"
                    data-target={"#collapse3"}
                    aria-expanded="false"
                    aria-controls={"collapse3"}
                  >
                    Next
                  </button>
                </div>
              </Form>
            ) : (
              <div className="d-flex row justify-content-center p-5 m-5">
                {" "}
                <img
                  style={{ width: "100px", alignSelf: "center" }}
                  src={success}
                />
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default SocialHandleForm;
