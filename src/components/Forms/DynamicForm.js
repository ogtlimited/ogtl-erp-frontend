import React, { useState, useEffect } from "react";
// import './App.css';
import {
  Form,
  TextField,
  CheckboxField,
  SelectField,
  SubmitButton,
  DateField,
  TextareaField,
  PasswordField,
  CheckField,
  NumberField,
  TimeField,
  FileField,
  RichTextField,
} from "./FormElements";
import * as Yup from "yup";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import { Formik } from "formik";

const DynamicForm = ({ formSchema, value, setvalue, setformSubmitted }) => {
  const [formData, setFormData] = useState({});
  const [editRow, seteditRow] = useState(null);
  const { formUpdate } = useAppContext();
  const [validationSchema, setValidationSchema] = useState({});
  useEffect(() => {
    if (formSchema) {
      initForm(formSchema, value);
    }
  }, []);
  useEffect(() => {
    setFormData(value);
  }, [value]);
  useEffect(() => {
    initForm(formSchema, formUpdate);
    seteditRow(value);
  }, [formUpdate]);

  const initForm = (formSchema, value) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      if (formUpdate !== null) {
        _formData[key] = formUpdate[key];
      } else {
        _formData[key] = "";
      }
      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string().email();
      } else if (formSchema[key].type === "date") {
        _validationSchema[key] = Yup.date();
      } else if (formSchema[key].type === "textarea") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.string()
          .nullable(true)
          .oneOf([null, ...formSchema[key].options.map((o) => o.value)]);
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.number();
      } else if (formSchema[key].type === "time") {
        _validationSchema[key] = Yup.string();
      }

      if (formSchema[key].required) {
        _validationSchema[key] =
          _validationSchema[key]?.required("Field Required");
      }
    }
    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema, setFieldValue, value) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      // defaultValue: formData[elementName] ? formData[elementName] : "",
      options: elementSchema.options,
      disabled: elementSchema.disabled,
      setFieldValue: setFieldValue,
    };
    if (elementSchema.type === "text" || elementSchema.type === "email") {
      return <TextField {...props} />;
    }
    if (elementSchema.type === "number") {
      return <NumberField {...props} />;
    }
    if (elementSchema.type === "password") {
      return <PasswordField {...props} />;
    }
    if (elementSchema.type === "check") {
      return <CheckField {...props} />;
    }
    if (elementSchema.type === "radio") {
      return <CheckField {...props} />;
    }
    if (elementSchema.type === "date") {
      return <DateField {...props} />;
    }
    if (elementSchema.type === "time") {
      return <TimeField {...props} />;
    }
    if (elementSchema.type === "textarea") {
      return <TextareaField {...props} />;
    }
    if (elementSchema.type === "richText") {
      return <RichTextField {...props} />;
    }

    if (elementSchema.type === "select") {
      return <SelectField {...props} />;
    }
    if (elementSchema.type === "file") {
      return <FileField {...props} />;
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    $("#FormModal").modal("toggle");
    setvalue(values);
    console.log(values);
    setformSubmitted(true);
  };
  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
         {(props) => {
        const {
          handleSubmit,
          setFieldValue
        } = props;
        return (
          <form onSubmit={handleSubmit}>
          <div className="row">
          { Object.keys(formSchema).length && Object.keys(formSchema).map((key, ind) => (
            <div className={(formSchema[key]?.type === 'textarea' ||formSchema[key]?.type ===  'richText') ?  "col-sm-12" : formSchema[key]?.type === 'file' ? "col-sm-12" :  "col-sm-6"} key={key} >
              {getFormElement(key, formSchema[key], setFieldValue, formData[key])}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-sm-12">
          <button
                        type="submit"

                        // data-dismiss="modal"
                        className="btn btn-primary submit-btn"
                      >
                        Submit
                      </button>
          </div>
        </div>
        </form>
        );
      }}

      </Formik>
    </div>
  );
};

export default DynamicForm;
