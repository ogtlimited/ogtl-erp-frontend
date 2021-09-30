import React, { useState, useEffect } from "react";
// import './App.css';
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  DateField,
  TextareaField,
  PasswordField,
  CheckField,
  NumberField,
  TimeField,
} from "./FormElements";
import * as Yup from "yup";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";

const DynamicForm = ({ formSchema, value, setvalue }) => {
  const [formData, setFormData] = useState(null);
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
    console.log(formUpdate);
    initForm(formSchema, formUpdate);
    seteditRow(value);
  }, [formUpdate]);

  const initForm = (formSchema, value) => {
    console.log(formUpdate, value);
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
        // _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.number();
      } else if (formSchema[key].type === "time") {
        _validationSchema[key] = Yup.string();
      }

      if (formSchema[key].required) {
        console.log(formSchema[key]);
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    console.log(elementSchema)
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options,
      disabled: elementSchema.disabled
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

    if (elementSchema.type === "select") {
      return <SelectField {...props} />;
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    $("#FormModal").modal("toggle");
    setvalue(values);

    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="App">
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div class="row">
          {Object.keys(formSchema).map((key, ind) => (
            <div className="col-sm-6" key={key}>
              {getFormElement(key, formSchema[key])}
            </div>
          ))}
        </div>
        <div class="row">
          <div class="col-sm-12">
            <SubmitButton title="Submit" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DynamicForm;
