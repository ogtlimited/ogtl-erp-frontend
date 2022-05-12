import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import success from "../../../assets/img/success.svg";
import axiosInstance from "../../../services/api";

const SocialHandleForm = ({ id, userData }) => {
  const [submitted, setsubmitted] = useState(false);
  const [progress, setprogress] = useState(10);
  const [fileName, setfileName] = useState("");
  const [afterSuccess, setafterSuccess] = useState(false);
  const [employee, setemployee] = useState({})
  const [header, setheader] = useState("Add Your Details");
  useEffect(() => {
    setemployee(userData?.employee)
   console.log(userData?.employee)
  }, [userData])

  const handleSubmit = (e, field) => {
    setsubmitted(true);
    axiosInstance.put("/employees/" + id, field).then((res) => {
      console.log(res);
      setsubmitted(false);
      setafterSuccess(true);
      setheader("Your Application has been submitted sucessfully");
      setTimeout(() => {
        setafterSuccess(false);
      }, 4000);
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        twitter: employee?.socialHandle?.twitter,
        facebook: employee?.socialHandle?.facebook,
        instagram: employee?.socialHandle?.instagram,
        linkedIn: employee?.socialHandle?.linkedIn,
      }}
      onSubmit={(fields) => {
        handleSubmit(null, { socialHandle: fields });
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
          <div className="card-body">
            {!afterSuccess ? (
              <Form>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="twitter">Twitter</label>
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
                    <label htmlFor="facebook">Facebook</label>
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
                      name="linkedIn"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="instagram">Instagram</label>
                    <Field
                      name="instagram"
                      type="text"
                      className={
                        "form-control" +
                        (errors.instagram && touched.instagram
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="instagram"
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
                    Submit
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
