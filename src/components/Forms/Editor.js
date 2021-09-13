import React,{useEffect, useState} from 'react'
import ReactQuill from 'react-quill'; 


const Editor = ({name,title,required,register,errors, setValue}) => {

    useEffect(() => {
        register({ name: name, required: true });
    }, [])
    const onEditorStateChange = val => {
        setValue(name, val);
    };
   
        return (
            <div className="col-12">
            <div className="form-group">
            <label htmlFor={name} className="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
            <ReactQuill  
                onChange={(onEditorStateChange)} {...register(name)}
               />
            </div>
            {errors[name] && <small>{errors[name].message}</small>}
            </div>
        )
}




export default Editor
