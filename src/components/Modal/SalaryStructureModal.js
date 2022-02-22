import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

const SalaryStructureModal = ({ type, fetchSalaryStructures }) => {
  const { combineRequest, showAlert } = useAppContext();
  const [formOptions, setFormOptions] = useState([]);
  const [earningsOpt, setEarningsOpt] = useState([]);
  const [deductionssOpt, setDeductionssOpt] = useState([]);

  const initialValues = {
    title: "",
    type: "",
    earnings: [],
    deductions: [],
  };
  useEffect(() => {
    console.log("my type", type);
  }, [type]);

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { departments, projects } = res.data.createEmployeeFormSelection;
      const departmentsOpts = departments?.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      const projectsOpts = projects?.map((e) => {
        return {
          label: e.project_name,
          value: e._id,
        };
      });
      if (type === "projectId") {
        setFormOptions(projectsOpts);
      } else {
        setFormOptions(departmentsOpts);
      }
    });
  }, [type]);

  const fetchSalaryComponent = async (id) => {
    try {
      const result = await axiosInstance.get(
        `/api/salary-component?${type}=${id}`
      );
      const earnings = await result.data.data.filter(
        (type) => type.type === "earning"
      );
      const deductions = await result.data.data.filter(
        (type) => type.type === "deduction"
      );
      const earningsOpt = earnings?.map((e) => {
        return {
          label: `${e.title} - ${e.amount}`,
          value: e._id,
        };
      });
      const deductionssOpt = deductions?.map((e) => {
        return {
          label: `${e.title} - ${e.amount}`,
          value: e._id,
        };
      });
      setEarningsOpt(earningsOpt);
      setDeductionssOpt(deductionssOpt);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="SalaryStructureModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Salary Structure
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);

                  let earnings = values.earnings.map(
                    (earning) => earning.value
                  );
                  let deductions = values.deductions.map(
                    (deduction) => deduction.value
                  );
                  const newValues = {
                    earnings,
                    deductions,
                    title: values.title,
                    [type]: values.type,
                  };
                  console.log("my new values", newValues);
                  axiosInstance
                    .post("/api/salary-structure", newValues)
                    .then((res) => {
                      console.log(res);
                      fetchSalaryStructures();
                      showAlert(
                        true,
                        "Salary structured added.",
                        "alert alert-success"
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                      showAlert(
                        true,
                        error?.response?.data?.message,
                        "alert alert-danger"
                      );
                    });
                }}
                validationSchema={Yup.object().shape({})}
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

                  return (
                    <form
                      onSubmit={handleSubmit}
                      className="tab-content edit-employee"
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Title <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title"
                                value={values.title}
                                className="form-control "
                                type="text"
                              />
                            </div>
                            {errors.title && touched.title && (
                              <div className="error float-left">
                                {errors.title}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              {type} <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <Select
                                options={formOptions}
                                defaultValue={values.type}
                                name="type"
                                onChange={(opt) => {
                                  fetchSalaryComponent(opt.value);
                                  setFieldValue("type", opt.value);
                                }}
                                onBlur={setFieldTouched}
                                className=" ml-0 w-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Earnings <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <Select
                                options={earningsOpt}
                                isMulti
                                defaultValue={values.earnings}
                                name="earnings"
                                onChange={(val) =>
                                  setFieldValue("earnings", val)
                                }
                                onBlur={setFieldTouched}
                                className=" ml-0 w-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Deductions <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <Select
                                options={deductionssOpt}
                                isMulti
                                defaultValue={values.deductions}
                                name="deductions"
                                onChange={(val) =>
                                  setFieldValue("deductions", val)
                                }
                                onBlur={setFieldTouched}
                                className=" ml-0 w-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="submit-section">
                            <button
                              type="submit"
                              onClick={handleSubmit}
                              data-dismiss="modal"
                              className="btn btn-primary submit-btn"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryStructureModal;
