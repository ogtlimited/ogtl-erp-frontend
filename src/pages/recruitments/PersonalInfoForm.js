import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import success from "../../assets/img/success.svg";
import { languages, qualifications, referredOpts } from "./options";
import { useNoAuthContext } from "../../Context/NoAuthContext";
import { DefaultJobOpening } from ".././../components/FormJSON/DefaultJobOpening";

const PersonalInfoForm = () => {
  const [jobId, setJobId] = useState(useParams());
  const [initialId, setinitialId] = useState(useParams());
  const { jobApplication, setJobApplication } = useNoAuthContext();
  const [defaultJob, setDefaultJob] = useState([]);
  const FILE_SIZE = 160 * 10240;
  const [showProgress, setShowProgress] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [progress, setProgress] = useState(10);
  const [fileName, setFileName] = useState("");
  const [afterSuccess, setafterSuccess] = useState(false);
  const [header, setheader] = useState("Add Your Details");
  const [jobTitle, setJobTitle] = useState("");

  const fetchDefaultJob = () => {
    axios
      .get("https://ogtl-erp.outsourceglobal.com/api/jobOpening/defaultJobs")
      .then((res) => {
        console.log("Default job openings:", res);
        const data = res.data.data.map((e) => {
          return {
            label: e.job_title,
            value: e._id,
          };
        });

        // setDefaultJob([
        //   {
        //     label: "Select Job",
        //     value: "",
        //   },
        //   ...data,
        // ]);
      });
  };

  useEffect(() => {
    console.log(jobId);
  }, [jobId]);

  const handleUpload = (e, setFieldValue) => {
    console.log(jobId);
    setProgress(65);
    setShowProgress(true);
    let formData = new FormData();
    let file = e.target.files[0];
    console.log(file);
    setFileName(file.name);
    formData.append("job_id", jobId.id);
    formData.append("document", file);
    setFieldValue("resume_attachment", file);
    setProgress(100);

    // axios
    //   .post("https://ogtl-erp.outsourceglobal.com/api/job-document", formData)
    //   .then((res) => {
    //     console.log(res);
    //     let path = res.data.data.file_path;
    //     setFieldValue("resume_attachment", path);
    //     setProgress(100);
    //   });
  };

  const handleSubmit = (e, fields) => {
    console.log("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
    console.log("Submit this fields:", fields);
    setsubmitted(true);

    let obj = {
      ...fields,
      resume_attachment: fileName,
      job_title: jobTitle,
    };

    console.log("Review this job Application:", obj);
    setJobApplication(obj);
  };

  useEffect(() => {
    setDefaultJob(DefaultJobOpening);
    fetchDefaultJob();
  }, []);

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        first_name: "",
        last_name: "",
        middle_name: "",
        mobile_number: "",
        email: "",
        highest_qualification: "",
        certifications: "",
        languages_spoken: [],
        hr_job_opening_id: jobId.id,
        resume_attachment: "",

        job_title: "",
        // alternate_mobile: "",
        // referred: false,
        // referal_name: "",
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        mobile_number: Yup.string()
          .min(8, "Must be exactly 8 digits")
          .required("Mobile is required"),
        highest_qualification: Yup.string().required(
          "This is a required question"
        ),
        certifications: Yup.string().required("This is a required question"),
        resume_attachment: Yup.mixed().required("A file is required"),
      })}
      onSubmit={(fields) => {
        handleSubmit(null, fields);
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
                  <div className="col-md-6 ml-1">
                    <label>
                      All field with <span className="text-danger">*</span> are
                      required
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="first_name">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={
                        "form-control" +
                        (errors.first_name && touched.first_name
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="last_name"
                      type="text"
                      className={
                        "form-control" +
                        (errors.last_name && touched.last_name
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Middle Name</label>
                    <Field
                      name="middle_name"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="mobile_number">
                      Mobile <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="mobile_number"
                      type="text"
                      className={
                        "form-control" +
                        (errors.mobile_number && touched.mobile_number
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="alternate_mobile">
                      Alternate Phone Number
                    </label>
                    <Field
                      name="alternate_mobile"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {initialId.id === "general" && (
                    <div className="col-md-6">
                      <label htmlFor="job_opening_id">
                        Which Job application are you applying for{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="job_opening_id"
                        onChange={(e) => {
                          setFieldValue(
                            "job_opening_id",
                            e.currentTarget.value
                          );
                          setJobTitle(e.currentTarget.label);
                          setJobId({ id: e.currentTarget.value });
                        }}
                        className={
                          "form-control" +
                          (errors.hr_job_opening_id && touched.hr_job_opening_id
                            ? " is-invalid"
                            : "")
                        }
                      >
                        {defaultJob.map((e, i) => (
                          <option value={e.value}>{e.label}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="job_opening_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  )}
                  <div className="col-md-6">
                    <label htmlFor="highest_qualification">
                      Highest Qualification Attained{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      name="highest_qualification"
                      className={
                        "form-control" +
                        (errors.highest_qualification &&
                        touched.highest_qualification
                          ? " is-invalid"
                          : "")
                      }
                    >
                      <option disabled>Select field</option>
                      {qualifications.map((e) => (
                        <option value={e.label}>{e.label}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="highest_qualification"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div
                    className={
                      jobId.id === "general" ? "col-md-6 mt-3" : "col-md-6 mt-3"
                    }
                  >
                    <label htmlFor="certifications">
                      Certifications (if any){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="certifications"
                      component="textarea"
                      className={
                        "form-control" +
                        (errors.certifications && touched.certifications
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="certifications"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-8">
                    <div id="checkbox-group" className="mb-2">
                      Language(s) spoken (Fluently){" "}
                      <span className="text-danger">*</span>
                    </div>
                    <div role="group" aria-labelledby="checkbox-group">
                      {languages.map((l) => (
                        <label className="block">
                          <Field
                            type="checkbox"
                            name="languages_spoken"
                            value={l}
                          />
                          <span className="pl-3"> {l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* <div className="col-md-6 mt-3">
                    <label htmlFor="referred">
                      Were you referred by an OGTL employee?{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <Field
                      as="select"
                      name="referred"
                      className={
                        "form-control" +
                        (errors.referred && touched.referred
                          ? " is-invalid"
                          : "")
                      }
                    >
                      {referredOpts.map((e) => (
                        <option value={e.value}>{e.label}</option>
                      ))}
                    </Field>
                  </div> */}

                  {/* <div className="col-md-6 mt-3">
                    {values.referred === "true" ? (
                      <>
                        <label htmlFor="referal_name">
                          {" "}
                          Referrers full name.{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Field
                          name="referal_name"
                          className={
                            "form-control" +
                            (errors.referal_name && touched.referal_name
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </>
                    ) : null}
                  </div> */}
                </div>

                <div className="form-group" style={{ marginBottom: "30px" }}>
                  <label>
                    Upload your CV <span className="text-danger">*</span>
                  </label>
                  <div className="custom-file">
                    <Field
                      type="file"
                      name="resume_attachment"
                      value={undefined}
                      onChange={(e) => handleUpload(e, setFieldValue)}
                      className={
                        "custom-file-input" +
                        (errors.resume_attachment && touched.resume_attachment
                          ? " is-invalid"
                          : "")
                      }
                      id="resume_attachment"
                    />
                    <label
                      className="custom-file-label"
                      for="resume_attachment"
                    >
                      {fileName.length ? fileName : "Choose file"}
                    </label>
                    {showProgress && (
                      <div className="progress mt-1" style={{ height: "3px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: progress + "%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    )}
                    <ErrorMessage
                      name="resume_attachment"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="row flex justify-content-between px-3">
                  <button
                    type="button"
                    className="nav-button btn btn-primary submit-btn"
                    data-toggle="collapse"
                    data-target={"#collapse1"}
                    aria-expanded="false"
                    aria-controls={"collapse1"}
                  >
                    Prev
                  </button>

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
                  alt="success"
                />
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default PersonalInfoForm;
