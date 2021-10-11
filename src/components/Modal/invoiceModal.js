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
const initForm = {
    customerId: '',
    invoice_date: "",
    invoice_no: "",
    title: "",
    itemName: "",
    quantity: "",
  };
const InvoiceModal = () => {
    const [isEdit, setisEdit] = useState(false);
  const [initialValues, setinitialValues] = useState(initForm);
  const [submitted, setsubmitted] = useState(false)
    return (
        <Formik
        enableReinitialize
        initialValues={{ ...initialValues }}
        onSubmit={(values, { setSubmitting }) => {
          const payload = {
            ...values,
          };
          console.log(payload);
          setTimeout(() => {
            if (isEdit) {
              // alert('edit')
              const coachingUrl = `/api/coaching-form`;
              axiosInstance
                .put(coachingUrl, payload)
                .then((res) => {
                  console.log(res);
                  setsubmitted(true);
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
                  setsubmitted(true);
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
              id="invoiceForm"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Invoice Form</h5>
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
                    
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    
    )
}

export default InvoiceModal
