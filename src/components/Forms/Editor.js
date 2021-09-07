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
            <div class="col-12">
            <div class="form-group">
            <label htmlFor={name} class="col-form-label">{title} <span style={required ? { color: "red" } : {}}>*</span></label>
            <ReactQuill  
                onChange={(onEditorStateChange)} {...register(name)}
               />
            </div>
            {errors[name] && <small>{errors[name].message}</small>}
            </div>
        )
}




export default Editor
