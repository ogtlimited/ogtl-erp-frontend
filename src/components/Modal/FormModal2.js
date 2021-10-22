import React, {useEffect, useState} from 'react'
import DynamicForm from '../Forms/DynamicForm';
const FormModal2 = ({template, editData, setformValue, setsubmitted, title, formValue }) => {
    const [value, setvalue] = useState(null)
   useEffect(() => {
     setvalue(value)
     console.log(editData)
   }, [value])
   useEffect(() => {
     console.log(editData)
   }, [editData])

     const onSubmit = (data) => {
       console.log(data)
       setformValue(data)
       setsubmitted(true)
      };
      useEffect(() => {
        setformValue(value)

      }, [value])
      useEffect(() => {

      }, [template, formValue])
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
        {template && <DynamicForm value={editData} setvalue={setvalue} formSchema={template}  />}
    </div>
  </div>
  </div>
</div>
        </>
    )
}

export default FormModal2
