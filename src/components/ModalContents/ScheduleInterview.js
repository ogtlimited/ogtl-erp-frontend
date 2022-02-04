import moment from "moment";
import React, {useState} from "react";

const ScheduleInterview = ({jobApplication, handleUpdate}) => {
    const [form, setform] = useState("");
    
  const handleChange =(event)=> {
    const target = event.target;
    const value =  target.value;
    setform(value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(jobApplication);
    const update ={
        interview_date: moment(form).format('llll'),
        _id: jobApplication._id,
        interview_status: 'Scheduled for interview'
    }
    handleUpdate(jobApplication._id,update );

  }


  return (
    <form onSubmit={handleSubmit}>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Interview Date </label>
            <input
              type="datetime-local"
              class="form-control"
              onChange={handleChange}
              name="interview_date"
              defaultValue={form.interview_date}
            />
          </div>
        </div>

      </div>
      <div class="submit-section">
        <button class="btn btn-primary submit-btn">Save</button>
      </div>
    </form>
  );
};

export default ScheduleInterview;
