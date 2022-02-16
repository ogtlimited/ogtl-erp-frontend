import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

const SalaryAssignmentModal = ({ salaryStructure }) => {
  const { combineRequest, showAlert } = useAppContext();
  const [formOptions, setFormOptions] = useState([]);
  const [employeeOpts, setEmployeeOpts] = useState([]);

  const initialValues = {
    employeeIds: [],
    salaryStructureId: "",
    fromDate: "",
  };

  useEffect(() => {
    const salaruStruc = salaryStructure.map((e) => {
      return {
        label: e.title,
        value: e._id,
      };
    });
    setFormOptions(salaruStruc);
  }, [salaryStructure]);

  useEffect(() => {
    combineRequest().then((res) => {
      const { employees } = res.data.createEmployeeFormSelection;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      setEmployeeOpts(employeeOpts);
    });
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="SalaryAssignmentModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Salary Structure Assignment
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
                  let employeeIds = values.employeeIds.map(
                    (employeeId) => employeeId.value
                  );

                  let newFormValue = {
                    employeeIds,
                    salaryStructureId: values.salaryStructureId,
                    fromDate: values.fromDate,
                  };

                  axiosInstance
                    .post("/api/salary-structure-assignment", newFormValue)
                    .then((res) => {
                      showAlert(
                        true,
                        "Salary assignment added.",
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
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="col-form-label">
                              Employees <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <Select
                                options={employeeOpts}
                                isMulti
                                defaultValue={values.employeeIds}
                                name="employeeIds"
                                onChange={(val) =>
                                  setFieldValue("employeeIds", val)
                                }
                                onBlur={setFieldTouched}
                                className=" ml-0 w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Salary Structure{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <Select
                                options={formOptions}
                                defaultValue={values.salaryStructureId}
                                name="salaryStructureId"
                                onChange={(opt) => {
                                  setFieldValue("salaryStructureId", opt.value);
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
                              Assignment Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="">
                              <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="fromDate"
                                value={values.fromDate}
                                className="form-control "
                                type="date"
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

export default SalaryAssignmentModal;
