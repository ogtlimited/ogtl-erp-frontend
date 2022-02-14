import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import CustomForm from "../Forms/CustomForm";
import FieldArray from "../Forms/FieldArray";
import $ from "jquery";
const FormModal = ({
  template,
  setformValue,
  setsubmitted,
  editData,
  formMode,
}) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    errors,
    setValue,
    formState,
    reset,
  } = useForm();
  let handleform = {
    register: register,
    errors: formState,
    control: control,
    setValue: setValue,
    watch: watch,
  };
  // useEffect(() => {
  //   if (formMode === "edit") {
  //     const fields = Object.keys(editData);
  //     fields.forEach((field) => setValue(field, editData[field]));
  //     console.log(formMode);
  //   } else {
  //     const fields = Object.keys(editData);
  //     fields.forEach((field) => setValue(field, ""));
  //   }
  //   console.log(formMode);
  // }, [editData, formMode]);
  const onSubmit = (data) => {
    let newObj = {};
    template.Fields.forEach((temp) => {
      for (const dt in data) {
        if (temp.name === dt) {
          newObj[temp.name] = data[dt];
        }
      }
    });
    setformValue(newObj);
    setsubmitted(true);
    reset();
    $("#FormModal").modal("toggle");
  };
  
  return (
    <>
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                {template?.title}
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <CustomForm template={template} handleform={handleform} />

                  <div className="col-md-12">
                    {/* <FieldArray {...{ control, register, getValues, setValue, errors }} /> */}
                  </div>
                  <div className="col-md-12">
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
