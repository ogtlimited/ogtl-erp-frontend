import React from 'react'
import { useForm } from 'react-hook-form';
import { template } from '../FormJSON/login';
import CustomForm from '../Forms/CustomForm'

const FormModal = () => {    
     const { register, handleSubmit, formState  } = useForm();
      let handleform= {
        register:register,
        errors:formState
     };
     const onSubmit = (data) => console.log(data); 
    return (
        <>
           <div class="modal fade" id="FormModal" tabIndex="-1" aria-labelledby="FormModalModalLabel" aria-hidden="true">
  <div class="modal-dialog">
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
