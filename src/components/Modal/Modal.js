import React from 'react'
import { useForm } from 'react-hook-form';

import CustomForm from '../Forms/CustomForm'
import FieldArray from '../Forms/FieldArray';
import $ from 'jquery'
const FormModal = ({template, setformValue, setsubmitted}) => {    
     const {  control,
        register,
        handleSubmit,
        getValues,
        watch,
        errors,
        setValue, formState ,reset } = useForm();
      let handleform= {
        register:register,
        errors:formState,
        control: control,
        setValue: setValue,
        watch: watch,
     };
     const onSubmit = (data) => {
       console.log(data)
       setformValue(data)
       setsubmitted(true)
         reset()
       $('#FormModal').modal('toggle')
      }; 
    return (
        <>
           <div class="modal fade" id="FormModal" tabIndex="-1" aria-labelledby="FormModalModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="FormModalLabel">{template.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form  onSubmit={handleSubmit(onSubmit)}>                  
      <div class="row">       
     
      <CustomForm  
        template={template} 
        handleform={handleform}
       />

       <div class="col-md-12">
       {/* <FieldArray {...{ control, register, getValues, setValue, errors }} /> */}
       </div>
       <div class="col-md-12">
     
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
       </div>
       </div>
 
      </form>
    
    </div>
  </div>
  </div>
</div>
        </>
    )
}

export default FormModal
