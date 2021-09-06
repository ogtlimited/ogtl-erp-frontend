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
    return fields?.map((field) => {
      let { type, title, name, required, validation } = field;

      switch (type) {
        case "text":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label">{title} <span style={required?.value ? { color: "red" } : {}}>*</span></label>
                <input
                 {...register(name)}
                 class="form-control" type="text" />
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );
        case "password":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
                <input {...register(name)} class="form-control" type="password" />
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );
        case "email":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
                <input {...register(name)} class="form-control" type="email" />
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );
        case "date":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
                <input {...register(name)} class="form-control" type="date" />
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );
        case "check":
          return (
           
                <div class="col-sm-12">
                <div class="form-group">
                <input {...register(name)}  type="checkbox" />
                <label htmlFor={name} class="col-form-label ml-2">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
                </div>
                {errors[name] && <small>{errors[name].message}</small>}
                </div>
             
           
          );
        case "file":
          return (
           
                <div class="col-sm-6">
                <div class="form-group">
                <label htmlFor={name} class="col-form-label ml-2">{title}</label>
               
                <input  id="upload" {...register(name)} hidden type="file" />
                <label htmlFor="upload" class="form-control btn btn-primary"><i class="fa fa-upload"></i> {title}</label>
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
                    <select className="form-control" type="select" {...register(name)} >
                        {renderOptions(options)}
                    </select>
            </div>
            </div>
          );
        case "role":
            let {roleList} = field;
          return (
            <div class="table-responsive m-t-15 x-15">
            <table class="table table-striped custom-table">
            <thead>
            <tr>
            <th>Module Permission</th>
            <th class="text-center">Read</th>
            <th class="text-center">Write</th>
            <th class="text-center">Update</th>
            <th class="text-center">Delete</th>
            <th class="text-center">Import</th>
            <th class="text-center">Export</th>
            </tr>
            </thead>
            <tbody>
            {/* <tr> */}
            {roleList.map(role =>{
                return (
                    <tr>
                    <td>{role.name}</td>
                    {role.nestedArray.map(arr =>{
                        return (
                            <>
                            <td class="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                            {/* <td class="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                            <td class="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                            <td class="text-center"> <input  {...register(arr.name)} type="checkbox" /></td>
                          */}
                            </>
                        )
                    })}
                    
                    </tr>

                )
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
  return (
    <>

        {renderFields(Fields)}
      
    </>
  );
};

export default CustomForm;
