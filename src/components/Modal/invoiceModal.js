/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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
  customerId: "",
  invoice_date: "",
  invoice_no: "",
  title: "",
  itemName: "",
  quantity: "",
};
const InvoiceModal = () => {
  const [isEdit, setisEdit] = useState(false);
  const [initialValues, setinitialValues] = useState(initForm);
  const [submitted, setsubmitted] = useState(false);
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues }}
      validationSchema={Yup.object().shape({
        customerId: Yup.string().required("Customer Id is required"),
        invoice_date: Yup.string().required("Invoice Date is required."),
        title: Yup.string().required("Title  is required."),
        // goals: Yup.string().required("goals is required."),
        // reality: Yup.string().required("reality is required."),
        // opportunities: Yup.string().required("opportunities is required."),
        // way_forward: Yup.string().required("way_forward is required."),
        //   .min(6, "Password is too short - should be 6 chars minimum"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const payload = {
          ...values,
        };

        setTimeout(() => {
          if (isEdit) {
            // alert('edit')
            const coachingUrl = `/api/coaching-form`;
            axiosInstance
              .put(coachingUrl, payload)
              .then((res) => {
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
      // validationSchema={Yup.object().shape({
      //   employee_id: Yup.string().required("Employee is required"),
      //   supervisor: Yup.string().required("Supervisor is required."),
      //   incident_date: Yup.string().required("Incident date is required."),
      //   coaching_type: Yup.string().required("coaching type is required."),
      // })}
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
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label" for="customer">
                            Customer
                          </label>
                          <select className="form-control" name="" id="">
                            <option value="">Select employee</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label" for="invoice_date">
                            Invoice Date
                          </label>
                          <input
                            name="invoice_date"
                            className="form-control"
                            type="date"
                            id="invoice_date"
                            placeholder=""
                            value=""
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label" for="due-date">
                            Due Date
                          </label>
                          <input
                            name="due-date"
                            className="form-control"
                            type="date"
                            id="due-date"
                            placeholder=""
                            value=""
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label" for="total_amount">
                            Total
                          </label>
                          <input
                            name="total"
                            className="form-control"
                            type="text"
                            id="total"
                            placeholder=""
                            value=""
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label" for="status">
                            Status
                          </label>
                          <input
                            name="status"
                            className="form-control"
                            type="text"
                            id="status"
                            placeholder=""
                            value=""
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label
                            className="col-form-label"
                            for="payment-status"
                          >
                            Payment Status
                          </label>
                          <input
                            name="payment-status"
                            className="form-control"
                            type="text"
                            id="payment-status"
                            placeholder=""
                            value=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="col-4">Product/Service</th>
                            <th className="col-1">Rate</th>
                            <th className="col-2">Price</th>
                            <th className="col-1">Tax %</th>
                            <th className="col-2">Sub Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              {" "}
                              <select className="form-control" name="" id="">
                                <option value="">Select Product</option>
                              </select>
                            </th>
                            <td>
                              <input
                                name="product"
                                className="form-control"
                                type="text"
                              />
                            </td>
                            <td>
                              <input
                                name="rate"
                                className="form-control"
                                type="text"
                              />
                            </td>
                            <td>
                              <input
                                name="price"
                                className="form-control"
                                type="text"
                              />
                            </td>
                            <td>
                              <input
                                name="subtotal"
                                className="form-control"
                                type="text"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex text-center mb-4">
                        <a
                          className="edit-icon ml-2  text-center pos-relative"
                          style={{ paddingLeft: "2px" }}
                        >
                          <i
                            className="las la-plus"
                            style={{ fontSize: "21px" }}
                          ></i>
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <button
                          className="btn btn-primary btn-add"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
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

export default InvoiceModal;
