import React from "react";
import ReactQuill from "react-quill";
import InputMask from "react-input-mask";
import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";
import Select from "react-select";
const renderOptions = (options) => {
  return options.map((child) => {
    return (
      <option key={child.value} value={child.value}>
        {child.label}
      </option>
    );
  });
};

const CustomForm = ({ template, data, handleform }) => {
  let { register, errors, control, setValue, watch } = handleform;
  const onEditorStateChange = (editorState, name) => {
    console.log(editorState);
    console.log(name);
    setValue(name, editorState);
  };
  const handleFile = (e, name) => {
    console.log(e.target.files, name);
    setValue(name, e.target.files);
  };
  const renderFields = (fields) => {
    return fields?.map((field) => {
      let { type, title, name, required, validation } = field;

      switch (type) {
        case "text":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  {required?.value && (
                    <span style={required?.value ? { color: "red" } : {}}>
                      *
                    </span>
                  )}
                </label>
                <input
                  {...register(name)}
                  className="form-control"
                  type="text"
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "number":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required?.value ? { color: "red" } : {}}>*</span>
                </label>
                {/* <InputMask className="form-control" {...register(name)} mask="999" maskChar=" " />; */}
                <input
                  {...register(name)}
                  className="form-control"
                  type="number"
                  pattern="[0-9]*"
                  data-politespace
                  data-grouplength="3"
                  data-delimiter=","
                  data-reverse
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );

        case "password":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <input
                  {...register(name)}
                  className="form-control"
                  type="password"
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "email":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <input
                  {...register(name)}
                  className="form-control"
                  type="email"
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "date":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <input
                  {...register(name)}
                  className="form-control"
                  type="date"
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "time":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <input
                  {...register(name)}
                  className="form-control"
                  type="time"
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "textarea":
          return (
            <div className="col-12">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <Controller
                  name={name}
                  control={control}
                  render={({ value, onChange }) => (
                    <>
                      {console.log(value)}
                      <ReactQuill
                        onChange={(state) => onEditorStateChange(state, name)}
                        name={name}
                      />
                    </>
                  )}
                />
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "check":
          return (
            <div className="col-sm-12">
              <div className="form-group">
                <input {...register(name)} type="checkbox" />
                <label htmlFor={name} className="col-form-label ml-2">
                  {title}{" "}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );
        case "file":
          return (
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor={name} className="col-form-label ml-2">
                  {title}
                </label>
                <input
                  id="upload"
                  {...register(name)}
                  onChange={(e) => handleFile(e, name)}
                  type="file"
                />
                <label
                  htmlFor="upload"
                  className="form-control btn btn-primary"
                >
                  <i className="fa fa-upload"></i> {title}
                </label>
              </div>
              {errors[name] && <small>{errors[name].message}</small>}
            </div>
          );

        case "select":
          let { options, full } = field;
          return (
            <div class={full ? "col-sm-12" : "col-sm-6"} key={name}>
              <div className="form-group">
                <label htmlFor={name}>
                  {title}
                  <span style={required ? { color: "red" } : {}}>*</span>
                </label>
                <Controller
                  name={name}
                  control={control}
                  render={({ value, onChange }) => (
                    <>
                      {console.log(value)}
                      <Select
                        onChange={(state) =>
                          onEditorStateChange(state.value, name)
                        }
                        options={options}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          );
        case "role":
          let { roleList } = field;
          return (
            <div className="table-responsive m-t-15 x-15">
              <table className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th>Module Permission</th>
                    <th className="text-center">Read</th>
                    <th className="text-center">Write</th>
                    <th className="text-center">Update</th>
                    <th className="text-center">Delete</th>
                    <th className="text-center">Import</th>
                    <th className="text-center">Export</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> */}
                  {roleList.map((role) => {
                    return (
                      <tr>
                        <td>{role.name}</td>
                        {role.nestedArray.map((arr) => {
                          return (
                            <>
                              <td className="text-center">
                                {" "}
                                <input
                                  {...register(arr.name)}
                                  type="checkbox"
                                />
                              </td>
                              {/* <td className="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                            <td className="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                            <td className="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                          */}
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );

        default:
          return (
            <div>
              <span>Invalid Field</span>
            </div>
          );
      }
    });
  };
  let { title, Fields } = template;
  return <>{renderFields(Fields)}</>;
};

export default CustomForm;
