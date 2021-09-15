import React from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';

export function Form(props) {
    return (
        <Formik
            {...props}
        >
            <FormikForm className="needs-validation" novalidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}

export function TextField(props) {
    const { name, label, placeholder, ...rest } = props

    return (
        <>
            
                <div className="form-group">
                    {label && <label className="col-form-label" for={name}>{label}</label>}
                    <Field
                        className="form-control"
                        type="text"
                        className="form-control"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""} 
                        {...rest}
                    />
                
              
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
            
        </>
    )
}
export function PasswordField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            
                <div className="form-group">
                    {label && <label className="col-form-label" for={name}>{label}</label>}
                    <Field
                        className="form-control"
                        type="password"
                        className="form-control"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""} 
                        {...rest}
                    />
                
              
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
            
        </>
    )
}
export function CheckField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            
                <div className="form-group">
                    <Field
                        type="checkbox"
                        className="pt-2"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""} 
                        {...rest}
                        />
                        {label && <label className="col-form-label pl-2" for={name}>{label}</label>}
                
              
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
            
        </>
    )
}
export function DateField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            
                <div className="form-group">
                    {label && <label className="col-form-label" for={name}>{label}</label>}
                    <Field
                        className="form-control"
                        type="date"
                        className="form-control"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""} 
                        {...rest}
                    />
                
              
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
            
        </>
    )
}
export function TextareaField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            
                <div className="form-group">
                    {label && <label className="col-form-label" for={name}>{label}</label>}
                    <Field
                        className="form-control"
                        type="textarea"
                        as="textarea"
                        className="form-control"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""} 
                        {...rest}
                    />
                
              
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
            
        </>
    )
}

export function SelectField(props) {
    const { name, label, options } = props
    return (
        <>
           
                <div className="form-group">
                    {label && <label className="col-form-label" for={name}>{label}</label>}
                    <Field
                        as="select"
                        id={name}
                        className="form-control"
                        name={name}
                    >
                        <option value="" >Choose...</option>
                        {options.map((optn, index) => <option value={optn.value} label={optn.label || optn.value} />)}
                    </Field>
                    <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
                </div>
        </>
    )
}

export function SubmitButton(props){
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <button className="btn btn-primary btn-add" type="submit" {...rest} disabled={isSubmitting}>{title}</button>
    )
}
