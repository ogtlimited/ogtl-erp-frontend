import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalarySettings = ({ setformType, formValue, submitted }) => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();

  const handleChange = (type) => {
    setformType(type);
  };
  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/salary-setting`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryAssignments();
  }, []);

  useEffect(() => {
    if (submitted === true) {
      let newValue = {
        title: formValue.title,
        percentage: parseInt(formValue.percentage),
        type: formValue.type,
        startRange: parseInt(formValue.startRange),
        endRange: parseInt(formValue.endRange),
      };

      axiosInstance
        .post("/api/salary-setting", newValue)
        .then((res) => {
          fetchSalaryAssignments();
          showAlert(true, "Salary settings created.", "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);
  const handleSubmit = (e, field) => {
    // setprogress(65)

  };

  return (
    <>
      <div className="tab-pane" id="tab_settings">
       
        <Formik
      initialValues={{
        basic:"",
        medical: "",
        housing: "",
        transport: "",
        monthlyEmployeePension: "",
        CRA:"",
        CRABonusAmount:"",
        active: true
      }}
      validationSchema={Yup.object().shape({
        basic: Yup.number().required("Basic is required"),
        medical: Yup.number().required("Medical is required"),
        housing: Yup.number().required("Housing is required"),
        transport: Yup.number().required("Transport is required"),
        monthlyEmployeePension: Yup.number().required("Monthly Employee Pension is required"),
        CRA:Yup.number().required("CRA is required"),
        CRABonusAmount:Yup.number().required("CRA Bonus Amount is required"),
        active: Yup.boolean().required("Active is required")
       
      })}
      onSubmit={(fields) => {
        handleSubmit(null, fields);
        console.log("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      }}
      render={({ errors, status, touched, setFieldValue }) => (
        <div id="tab_settings" >
       
                
                  <Form>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="basic">Basic</label>
                        <Field
                          name="basic"
                          type="number"
                          className={
                            "form-control" +
                            (errors.basic && touched.basic
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="basic"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="medical">Medical</label>
                        <Field
                          name="medical"
                          type="text"
                          className={
                            "form-control" +
                            (errors.medical && touched.medical
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="medical"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label>Transport</label>
                        <Field
                          name="transport"
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email_address">Email</label>
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

                    <div className="form-group">
                      <label>Cover Letter</label>
                      <Field
                        component="textarea"
                        rows="4"
                        name="cover_letter"
                        className="form-control"
                      ></Field>
                    </div>
                    
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {/* Submit */}
                        {submitted ? (
                          <div className="spinner-grow" role="status"></div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </Form>
                ) 
                 
                
              </div>
       
      )}
    />
        
      </div>
    </>
  );
};

export default SalarySettings;
