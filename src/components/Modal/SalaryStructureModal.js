import React, {useEffect, useState} from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";

const SalaryStructureModal = ({type}) => {
    const initialValues = {
        title: '',
        type: '',
        earnings: [],
        deductions: []
    }
    useEffect(() => {
       console.log(type)
    }, [type])
    return (
        <>
             <div className="modal fade" id="SalaryStructureModal" tabIndex="-1" aria-labelledby="FormModalModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="FormModalLabel">Salary Structure</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
       console.log(values)
       
      }}
      validationSchema={
          Yup.object().shape({
        // ogid: Yup.string().required("ogid is required"),
        // employee_name: Yup.string().required("Employee Name is required"),
        // supervisor: Yup.string().required("Supervisor is required."),
        // incident_date: Yup.string().required("Incident date is required."),
        // coaching_type: Yup.string().required("coaching type is required."),
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
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
        // console.log(isValid);
        // console.log(values);
        // console.log(errors);
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
                                options={[]}
                                defaultValue={values.type}
                                name="type"
                                onChange={(opt) => {
                                  console.log(opt);
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
                                options={options}
                                isMulti
                                defaultValue={values.earnings}
                                name="earnings"
                                onChange={(opt) => {
                                  console.log(opt);
                                 
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
                  Deductions <span className="text-danger">*</span>
                  </label>
                  <div className="">
                  <Select
                                options={[]}
                                isMulti
                                defaultValue={values.deductions}
                                name="deductions"
                                onChange={(opt) => {
                                  console.log(opt);
                                 
                                }}
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
    )
}

export default SalaryStructureModal
