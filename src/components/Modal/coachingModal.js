import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppContext } from "../../Context/AppContext";
import tokenService from "../../services/token.service";
import axiosInstance from "../../services/api";
const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "submit", label: "Submit" },
];
const baseURL = "http://15.236.1.91";
const initForm = {
  employee_id: '',
  incident_date: "",
  supervisor: "",
  coaching_type: "",
  goals: "",
  reality: "",
  opportunities: "",
  way_forward: "",
  status: "",
  user_response: "",
};
const CoachingModal = ({ coachingForm, setformSubmitted }) => {
  const { allEmployees, coachingFormEdit, setcoachingFormSubmitted } =
    useAppContext();
  const user = tokenService.getUser();
  console.log(coachingFormEdit);
  const [isEdit, setisEdit] = useState(false);
  const [initialValues, setinitialValues] = useState(initForm);
  const [employeeOptions, setemployeeOptions] = useState([]);
  const [goals, setgoals] = useState("");
  const [reality, setreality] = useState("");
  const [opportunities, setopportunities] = useState("");
  const [way_forward, setway_forward] = useState("");
  const [goalCount, setgoalCount] = useState(0);
  const [realityCount, setrealityCount] = useState(0);
  const [way_forwardCount, setway_forwardCount] = useState(0);
  const [opportunityCount, setopportunityCount] = useState(0);
  const [validCount, setvalidCount] = useState(true);
  const [supervisor, setsupervisor] = useState("");
  const [coachingPoints, setcoachingPoints] = useState(false);
  useEffect(() => {
    console.log(allEmployees);
    let emp = allEmployees?.map((e) => {
      return {
        label: e.first_name + " " + e.last_name + " -" + e.ogid,
        value: e._id,
        id: e.ogid,
      };
    });

    setinitialValues({
      ...initialValues,
      supervisor: supervisor,
    });
    if (coachingFormEdit == "edit") {
      setisEdit(true);
      setinitialValues(coachingForm);
      setgoals(coachingForm.goals);
      setreality(coachingForm.reality);
      setopportunities(coachingForm.opportunities);
      setway_forward(coachingForm.way_forward);
      //   set(coachingForm.type);
    } else if (coachingFormEdit == "duplicate") {
      setisEdit(false);
      setinitialValues({
        ...coachingForm,
        incident_date: "",
        employee_id: "",
        coaching_type: "",
      });
    } else {
      setisEdit(false);
      setinitialValues({
        ...initForm,
        supervisor: supervisor,
      });
    }
    setemployeeOptions(emp);
    setsupervisor(user.reports_to);
  }, [supervisor, coachingForm, coachingFormEdit, allEmployees]);
  useEffect(() => {
    setgoalCount(goals.split(" ").length);
    setopportunityCount(opportunities.split(" ").length);
    setrealityCount(reality.split(" ").length);
    setway_forwardCount(way_forward.split(" ").length);
    if (
      goalCount >= 30 &&
      realityCount >= 30 &&
      opportunityCount >= 30 &&
      way_forwardCount >= 30
    ) {
      setvalidCount(false);
    } else {
      setvalidCount(true);
    }
  }, [
    validCount,
    goals,
    reality,
    opportunities,
    way_forward,
    goalCount,
    realityCount,
    opportunityCount,
    way_forwardCount,
  ]);
  const handleClick = (opt) => {
    console.log(opt);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues }}
      onSubmit={(values, { setSubmitting }) => {
        setcoachingPoints(false);
        const payload = {
          ...values,
          supervisor,
          goals,
          opportunities,
          reality,
          way_forward,
        };
        console.log(payload);
        console.log(goals);
        setTimeout(() => {
          if (isEdit) {
            // alert('edit')
            const coachingUrl = `/api/coaching-form`;
            axiosInstance
              .put(coachingUrl, payload)
              .then((res) => {
                console.log(res);
                setcoachingFormSubmitted(true);
              })
              .catch((err) => {
                console.log(err.response?.data);
              });
          } else {
            const coachingUrl = `/api/coaching-form`;
            delete payload.ogid;
            delete payload.user_response;
            payload.status = "draft";
            axiosInstance
              .post(coachingUrl, payload)
              .then((res) => {
                console.log(res);
                setcoachingFormSubmitted(true);
                setformSubmitted(true)
              })
              .catch((err) => {
                console.log(err.response?.data);
                //   setShow(true);
                //   setMessage(err.response?.data);
              });
          }
          //   setSubmitting(false);
        }, 300);
      }}
      validationSchema={Yup.object().shape({
        employee_id: Yup.string().required("Employee is required"),
        supervisor: Yup.string().required("Supervisor is required."),
        incident_date: Yup.string().required("Incident date is required."),
        coaching_type: Yup.string().required("coaching type is required."),
        // goals: Yup.string().required("goals is required."),
        // reality: Yup.string().required("reality is required."),
        // opportunities: Yup.string().required("opportunities is required."),
        // way_forward: Yup.string().required("way_forward is required."),
        //   .min(6, "Password is too short - should be 6 chars minimum"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,

          setFieldValue,
          setFieldTouched,
          isValid,
        } = props;
        // console.log(isValid);
        // console.log(values);
        console.log(errors);
        return (
          <div
            className="modal custom-modal fade"
            id="coachingForm"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Employee Coaching Form</h5>
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
                  {/* {errors} */}
                  <form
                    onSubmit={handleSubmit}
                    className="tab-content edit-employee"
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee Name
                          </label>
                          <div className="">
                            {isEdit ? (
                              <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="employee_name"
                                value={values.employee_name}
                                readOnly
                                className="form-control "
                                type="text"
                              />
                            ) : (
                              <Select
                                options={employeeOptions}
                                defaultValue={values.employee_name}
                                name="employee_name"
                                onChange={(opt) => {
                                  console.log(employeeOptions);
                                  setFieldValue("employee_id", opt.value);
                                  setFieldValue("ogid", opt.id);
                                }}
                                onBlur={setFieldTouched}
                                className=" ml-0 w-100"
                              />
                            )}

                            {errors.employee_name && touched.employee_name && (
                              <div className="error float-left">
                                {errors.employee_name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            OGID <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="ogid"
                              value={values.ogid}
                              className="form-control "
                              type="text"
                            />
                          </div>
                          {errors.ogid && touched.ogid && (
                            <div className="error float-left">
                              {errors.ogid}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Incident Date <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="incident_date"
                              readOnly={isEdit}
                              value={values.incident_date}
                              className="form-control "
                              type="date"
                            />
                          </div>
                          {errors.incident_date && touched.incident_date && (
                            <div className="error float-left">
                              {errors.incident_date}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Supervisor <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                              name="supervisor"
                              value={values.supervisor}
                              className="form-control "
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div class="form-group ">
                          <label class="col-form-label">Coaching Type</label>
                          <div class="col-md-10">
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type ===
                                    "MPR (Monthly Performance Review)"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "MPR (Monthly Performance Review)"
                                    )
                                  }
                                  value="MPR (Monthly Performance Review)"
                                  name="coaching_type"
                                />{" "}
                                MPR (Monthly Performance Review)
                              </label>
                            </div>
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type ===
                                    "Developmental Coaching"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "Developmental Coaching"
                                    )
                                  }
                                  value="Developmental Coaching"
                                  name="coaching_type"
                                />{" "}
                                Developmental Coaching{" "}
                              </label>
                            </div>
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type ===
                                    "Behavioural Coaching"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "Behavioural Coaching"
                                    )
                                  }
                                  value="Behavioural Coaching"
                                  name="coaching_type"
                                />{" "}
                                Behavioural Coaching{" "}
                              </label>
                            </div>
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type ===
                                    "Quality Monitoring Coaching"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "Quality Monitoring Coaching"
                                    )
                                  }
                                  value="Quality Monitoring Coaching"
                                  name="coaching_type"
                                />{" "}
                                Quality Monitoring Coaching{" "}
                              </label>
                            </div>
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type === "Coaching Triad"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "Coaching Triad"
                                    )
                                  }
                                  value="Coaching Triad"
                                  name="coaching_type"
                                />{" "}
                                Coaching Triad{" "}
                              </label>
                            </div>
                            <div class="radio">
                              <label>
                                <input
                                  type="radio"
                                  checked={
                                    values.coaching_type === "Corrective Action"
                                  }
                                  onChange={() =>
                                    setFieldValue(
                                      "coaching_type",
                                      "Corrective Action"
                                    )
                                  }
                                  value="Corrective Action"
                                  name="coaching_type"
                                />{" "}
                                Corrective Action{" "}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="tab-box">
                              <div className="row user-tabs">
                                <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                                  <ul className="nav nav-tabs nav-tabs-solid">
                                    <li className="nav-item">
                                      <a
                                        href="#goals"
                                        data-toggle="tab"
                                        className="nav-link active"
                                      >
                                        Goals
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        href="#reality"
                                        data-toggle="tab"
                                        className="nav-link"
                                      >
                                        Reality
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        href="#opportunity_options"
                                        data-toggle="tab"
                                        className="nav-link"
                                      >
                                        Opportunities/Options
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        href="#way_forward"
                                        data-toggle="tab"
                                        className="nav-link"
                                      >
                                        Way Forward
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="tab-content">
                              <div
                                id="goals"
                                className="pro-overview tab-pane fade show active"
                              >
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label
                                        className="col-form-label"
                                        htmlFor=""
                                      >
                                        What do you want to accomplish? How will
                                        you know when it is achieved?
                                      </label>
                                      <ReactQuill
                                        onChange={(html) => setgoals(html)}
                                        name="goals"
                                        value={goals}
                                      />
                                      <small>Minimum of 30 words </small>
                                      <small className="float-right">
                                        {" "}
                                        {goalCount} / 30
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane fade" id="reality">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label
                                        className="col-form-label"
                                        htmlFor=""
                                      >
                                        What’s happening now in terms of the
                                        goal? How far am I away from the goal?
                                      </label>
                                      <ReactQuill
                                        onChange={(html) => setreality(html)}
                                        name="reality"
                                        value={reality}
                                      />
                                      <small>Minimum of 30 words </small>
                                      <small className="float-right">
                                        {" "}
                                        {realityCount} / 30
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="opportunity_options"
                              >
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label
                                        className="col-form-label"
                                        htmlFor=""
                                      >
                                        What options do I have to resolve the
                                        issues or obstacles?
                                      </label>
                                      <ReactQuill
                                        onChange={(html) =>
                                          setopportunities(html)
                                        }
                                        name="opportunities"
                                        value={opportunities}
                                      />
                                      <small>Minimum of 30 words </small>
                                      <small className="float-right">
                                        {" "}
                                        {opportunityCount} / 30
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane fade" id="way_forward">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label
                                        className="col-form-label"
                                        htmlFor=""
                                      >
                                        Which option will I commit to?
                                      </label>
                                      <ReactQuill
                                        onChange={(html) =>
                                          setway_forward(html)
                                        }
                                        name="way_forward"
                                        value={way_forward}
                                      />
                                      <small>Minimum of 30 words </small>
                                      <small className="float-right">
                                        {" "}
                                        {way_forwardCount} / 30
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label
                            className="col-form-label"
                            htmlFor="exampleFormControlSelect2"
                          >
                            Status
                          </label>
                          <select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="status"
                            value={values.status}
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option value="Draft">Draft</option>
                            {isEdit && (
                              <option value="Submitted">Submit</option>
                            )}
                          </select>
                        </div>
                      </div>
                      {coachingForm.reason?.length && (
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label
                              className="col-form-label"
                              htmlFor="exampleFormControlSelect2"
                            >
                              Reason
                            </label>
                            <div
                              className="well"
                              dangerouslySetInnerHTML={{
                                __html: coachingForm?.reason,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isValid || validCount}
                        data-dismiss="modal"
                        className="btn btn-primary submit-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default CoachingModal;
