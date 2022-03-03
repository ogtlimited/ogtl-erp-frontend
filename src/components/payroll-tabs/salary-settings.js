import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalarySettings = ({ setformType, formValue, submitted, setsubmitted }) => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();

  const handleChange = (type) => {
    setformType(type);
  };
  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/salary-settings`)
      .then((res) => {
        setData(res.data.data[0]);
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
        basic: formValue.basic/100,
        medical: formValue.medical/100,
        housing: formValue.housing/100,
        transport: formValue.transport/100,
        monthlyEmployeePension: formValue.monthlyEmployeePension/100,
        CRA: formValue.CRA/100,
        CRABonusAmount: formValue.CRABonusAmount,
        active: true
      };

      axiosInstance
        .post("/api/salary-settings", newValue)
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
    setsubmitted(true);

  };

  return (
    <>
      <div className="tab-pane" id="tab_settings">
        <Formik
        enableReinitialize
      initialValues={{
        basic: data.basic * 100,
        medical: data.medical * 100,
        housing: data.housing * 100,
        transport: data.transport * 100,
        monthlyEmployeePension: data.monthlyEmployeePension * 100,
        CRA: data.CRA * 100,
        CRABonusAmount: data.CRABonusAmount,
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
                  type="number"
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
                <label>Housing</label>
                <Field
                  name="housing"
                  type="number"
                  className={
                    "form-control" +
                    (errors.housing && touched.housing
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="housing"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="col-md-6">
                <label>Transport</label>
                <Field
                  name="transport"
                  type="number"
                  className={
                    "form-control" +
                    (errors.transport && touched.transport
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="transport"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-6">
                <label>Monthly Employee Pension</label>
                <Field
                  name="monthlyEmployeePension"
                  type="number"
                  className={
                    "form-control" +
                    (errors.monthlyEmployeePension && touched.monthlyEmployeePension
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="monthlyEmployeePension"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="col-md-6">
                <label>CRA</label>
                <Field
                  name="CRA"
                  type="number"
                  className={
                    "form-control" +
                    (errors.CRA && touched.CRA
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="CRA"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-6">
                <label>CRA Bonus Amount</label>
                <Field
                  name="CRABonusAmount"
                  type="number"
                  className={
                    "form-control" +
                    (errors.CRABonusAmount && touched.CRABonusAmount
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="CRABonusAmount"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
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
        </div>
       
      )}
    />
        
      </div>
    </>
  );
};

export default SalarySettings;
