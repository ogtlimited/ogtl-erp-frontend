import moment from "moment";
import React, { useState } from "react";

const ScheduleInterview = ({ jobApplication, handleUpdate, setModalType }) => {
  const [form, setform] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setform(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const update = {
      interview_date: moment(form).format("llll"),
      id: jobApplication.id,
      process_status: "Interview scheduled",
    };
    handleUpdate(jobApplication.id, update);
    setModalType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Interview Date </label>
            <input
              type="datetime-local"
              className="form-control"
              onChange={handleChange}
              name="interview_date"
              defaultValue={form.interview_date}
            />
          </div>
        </div>
      </div>
      <div className="submit-section">
        <button className="btn btn-primary submit-btn">Schedule</button>
      </div>
    </form>
  );
};

export default ScheduleInterview;
