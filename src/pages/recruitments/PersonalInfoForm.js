import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../config.json";
import { useParams } from "react-router-dom";
import success from "../../assets/img/success.svg";
import { languages, qualifications, referredOpts } from "./options";
import { useNoAuthContext } from "../../Context/NoAuthContext";

const PersonalInfoForm = () => {
  const [jobId, setjobId] = useState(useParams());
  const [initialId, setinitialId] = useState(useParams());
  const { setjobApplication, jobApplication } = useNoAuthContext();
  const [defaultJob, setdefaultJob] = useState([]);
  const FILE_SIZE = 160 * 10240;
  const [showProgress, setshowProgress] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [progress, setprogress] = useState(10);
  const [fileName, setfileName] = useState("");
  const [afterSuccess, setafterSuccess] = useState(false);
  const [header, setheader] = useState("Add Your Details");

  const fetchDefaultJob = () => {
    axios.get("https://ogtl-erp.outsourceglobal.com/api/jobOpening/defaultJobs").then((res) => {
      console.log(res);
      const data = res.data.data.map((e) => {
        return {
          label: e.job_title,
          value: e._id,
        };
      });
      setdefaultJob([
        {
          label: "Select Job",
          value: "",
        },
        ...data,
      ]);
    });
  };
  useEffect(() => {
    console.log(jobId);
  }, [jobId]);

  const handleUpload = (e, setFieldValue) => {
    console.log(jobId);
    setprogress(65);
    setshowProgress(true);
    let formdata = new FormData();
    let file = e.target.files[0];
    console.log(file);
    setfileName(file.name);
    formdata.append("job_id", jobId.id);
    formdata.append("document", file);
    axios.post("https://ogtl-erp.outsourceglobal.com/api/job-document", formdata).then((res) => {
      console.log(res);
      let path = res.data.data.file_path;
      setFieldValue("resume_attachment", path);
      setprogress(100);
    });
  };
  const handleSubmit = (e, field) => {
    console.log(field);
    // setprogress(65)
    setsubmitted(true);
    let obj = {
      ...field,
      job_opening_id: jobId.id,
      default_job_opening_id: jobId.id,
    };
    console.log(obj);
    console.log(setjobApplication);
    setjobApplication(obj);
    // axios.post(config.ApiUrl +'/api/jobApplicant',obj ).then(res =>{
    //     console.log(res)
    //     setsubmitted(false)
    //     setafterSuccess(true)
    //     setheader('Your Application has been submitted sucessfully')
    //     setTimeout(() => {
    //         setafterSuccess(false)
    //         document.getElementById("closeBtn").click()
    //     }, 4000);

    // })
  };
  useEffect(() => {
    fetchDefaultJob();
  }, []);

  const SUPPORTED_FORMATS = ["application/pdf", "application/msword"];
  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        first_name: "",
        last_name: "",
        middle_name: "",
        email_address: "",
        mobile: "",
        alternate_mobile: "",
        resume_attachment: "",
        highest_qualification: "",
        certifications: "",
        languages_spoken: [],
        referred: false,
        referal_name: "",
        job_opening_id: jobId.id,
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        email_address: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        mobile: Yup.string()
          .min(8, "Must be exactly 8 digits")
          .required("Mobile is required"),
        highest_qualification: Yup.string().required(
          "This is a required question"
        ),
        certifications: Yup.string().required("This is a required question"),
        resume_attachment: Yup.mixed().required("A file is required"),
        // .test(
        //   "fileSize",
        //   "File too large",
        //   value => value && value.size <= FILE_SIZE
        // )
        // .test(
        //   "fileFormat",
        //   "Unsupported Format",
        //   value => value && SUPPORTED_FORMATS.includes(value.type)
        // )
      })}
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
                    <label htmlFor="email_address">
                      Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="email_address"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email_address && touched.email_address
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="email_address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="mobile">
                      Mobile <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="mobile"
                      type="text"
                      className={
                        "form-control" +
                        (errors.mobile && touched.mobile ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="mobile"
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
                          setjobId({ id: e.currentTarget.value });
                          console.log(jobId);
                        }}
                        className={
                          "form-control" +
                          (errors.job_opening_id && touched.job_opening_id
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
                      jobId.id === "general" ? "col-md-6 mt-3" : "col-md-6"
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
                  <div className="col-md-6 mt-3">
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
                  </div>

                  <div className="col-md-6 mt-3">
                    {values.referred == "true" ? (
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
                  </div>
                </div>

                <div className="form-group">
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
