import React from "react";

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
  let { register, errors } = handleform;
  const renderFields = (fields) => {
    return fields.map((field) => {
      let { type, title, name, required, validation } = field;

      switch (type) {
        case "text":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
                <input name={name} class="form-control" type="text" />
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );

        case "select":
          let { options } = field;
          return (
            <div  class="col-sm-6" key={name}>
                 <div class="form-group">
                    <label htmlFor={name}>
                        {title}
                        <span style={required ? { color: "red" } : {}}>*</span>
                    </label>
                    <select type="select" name={name} >
                        {renderOptions(options)}
                    </select>
            </div>
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
  return (
    <>

        {renderFields(Fields)}
      
    </>
  );
};

export default CustomForm;
