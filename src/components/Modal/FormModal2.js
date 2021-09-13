import React, {useEffect} from 'react'
import $ from 'jquery'
import DynamicForm from '../Forms/DynamicForm';
const FormModal2 = ({template, settemplate, setformValue, setsubmitted, title }) => {    
    console.log(template)
     const onSubmit = (data) => {
       console.log(data)
       setformValue(data)
       setsubmitted(true)

       $('#FormModal').modal('toggle')
      }; 
    return (
        <>
           <div className="modal fade" id="FormModal" tabIndex="-1" aria-labelledby="FormModalModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="FormModalLabel">{title}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <DynamicForm formSchema={template} />
    </div>
  </div>
  </div>
</div>
        </>
    )
}

export default FormModal2
