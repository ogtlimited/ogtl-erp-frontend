import React, { useState, useContext, useEffect } from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useAppContext } from "../../Context/AppContext";
export function Form(props) {

  console.log(props);
  return (
    <Formik {...props}>
      render=
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => <> {props.children}</>}
      {/* <FormikForm className="needs-validation" novalidate="">
        {props.children}
      </FormikForm> */}
    </Formik>
  );
}

export function TextField(props) {
  // console.log(props)
  const { name, label, disabled, placeholder, defaultValue, ...rest } = props;
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          className="form-control"
          type="text"
          name={name}
          disabled={disabled}
          placeholder={placeholder || ""}
          // defaultValue={defaultValue ? defaultValue : ''}
        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}

export function NumberField(props) {
  // console.log(props)
  const { name, label, placeholder, defaultValue, ...rest } = props;

  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          className="form-control"
          type="number"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          defaultValue={defaultValue ? defaultValue : ''}
          {...rest}
        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function PasswordField(props) {
  const { name, label, placeholder,defaultValue, ...rest } = props;
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          className="form-control"
          type="password"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          value={defaultValue ? defaultValue : ''}
          {...rest}
        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function RichTextField(props) {
  const { name, label, placeholder,setFieldValue, defaultValue, ...rest } = props;
  let key = `${Math.floor((Math.random() * 1000))}-min`
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
         <Field
          component={ReactQuill}
          name={name}
          key={defaultValue}
          defaultValue={defaultValue ? defaultValue : ''}

          onChange={(html) => {
            console.log(html);
            setFieldValue(name, html);
          }}
          className=" ml-0 w-100"
        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function CheckField(props) {
  const { name, label, placeholder, defaultValue, ...rest } = props;
  const { isChecked, setIsChecked } = useAppContext();
  // console.log(defaultValue)
  return (
    <>
      <div className="form-group">
        <Field
          type="checkbox"
          className="pt-2"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          key={name}
          onClick={() =>
            isChecked === true ? setIsChecked(false) : setIsChecked(true)
          }
        />
        {label && (
          <label className="col-form-label pl-2" for={name}>
            {label}
          </label>
        )}

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function DateField(props) {

  const { name, label, placeholder,defaultValue,setFieldValue, ...rest  } = props;
  console.log(defaultValue)
  const [date, setdate] = useState(new Date().toISOString().slice(0,10))
  // let date = n;
  useEffect(() => {
    if(defaultValue){
      setdate(new Date(defaultValue).toISOString().slice(0,10));
    }
  }, [])
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <input
          className="form-control"
          type="date"
          key={name}
          // value={date}
          // defaultValue={date ? date : null}
          name={name}
          id={name}
          placeholder={placeholder || ""}
          onChange={(e) =>{

            setFieldValue(name, e.target.value)
            // setdateState(e.target.value)
            console.log(e.target.value)
          }}

        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function FileField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <label
          class="upload-csv"
          style={{ padding: "5% 8px" }}
          id="v-pills-home"
        >
          <input type="file" style={{ display: "none" }} />
          <i
            style={{ fontSize: "20px" }}
            className="fa fa-cloud-upload pr-4"
          ></i>
          Upload File
          {/* <p className="pt-3">{fileName}</p>  */}
        </label>
        {/* <Field
          className="form-control"
          type="file"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          {...rest}
        /> */}

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function TimeField(props) {
  const { name, label, placeholder, defaultValue, ...rest } = props;
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          className="form-control"
          type="time"
          name={name}
          id={name}
          placeholder={placeholder || ""}


        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function TextareaField(props) {
  const { name, label, placeholder, defaultValue, ...rest } = props;
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          className="form-control"
          type="textarea"
          as="textarea"
          name={name}
          id={name}
          placeholder={placeholder || ""}

        />

        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}

export function SelectField(props) {
  const { name, label, options, defaultValue, setFieldValue } = props;
  let val = options.filter(e => e.value === defaultValue)[0]
  return (
    <>
      <div className="form-group">
        {label && (
          <label className="col-form-label" for={name}>
            {label}
          </label>
        )}
        <Field
          options={options}
          component={Select}
          defaultValue={val}
          key={val}
          name={name}
          onChange={(opt) => {
            console.log(opt);
            setFieldValue(name, opt.value);
            // setFieldValue("employee_name", opt.value);
          }}
          className=" ml-0 w-100"
        />
        {/* <Field as="select" id={name} className="form-control" name={name}>
          <option value="">Choose...</option>
          {options.map((optn, index) => (
            <option value={optn.value} label={optn.label || optn.value} />
          ))}
        </Field> */}
        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button
      className="btn btn-primary btn-add"
      type="submit"
      {...rest}
      disabled={isSubmitting}
    >
      {title}
    </button>
  );
}
