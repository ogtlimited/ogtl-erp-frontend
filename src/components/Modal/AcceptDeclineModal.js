import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import axiosInstance from "../../services/api";
const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "submit", label: "Submit" },
];
const baseURL = "http://15.236.1.91";
const AcceptDeclineModal = ({
  setsubmitAction,
  reason,
  setreason,
  file,
  setfile,
}) => {
  const [showReason, setshowReason] = useState(false);
  const [upload, setupload] = useState(file);
  const [wordCount, setwordCount] = useState(0);
  const [disabled, setdisabled] = useState(true);
  const handleClick = (e, str) => {
    if (str == "Accepted") {
      setsubmitAction(str);
    } else {
      setshowReason(true);
    }
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    setsubmitAction("Rejected");
    e.preventDefault();
  };
  useEffect(() => {
    setwordCount(reason.split(" ").length);
    if (reason.split(" ").length >= 30) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [reason]);
  const onFileChange = (event) => {
    // Update the state
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    axiosInstance
      .post("/api/employee/upload", formData)
      .then((res) => {
        setfile("https://erp.outsourceglobal.com" + res.data.file_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="modal custom-modal fade show"
      id="acceptDecline"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              <h3>Accept / Reject Coaching Form Review</h3>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    onClick={(e) => handleClick(e, "Accepted")}
                    data-dismiss="modal"
                    className="btn btn-primary continue-btn text-light"
                  >
                    Accept
                  </a>
                </div>
                <div className="col-6">
                  <a
                    onClick={(e) => setshowReason(true)}
                    className="btn btn-primary cancel-btn text-light"
                  >
                    Decline
                  </a>
                </div>
                {showReason && (
                  <>
                    <div className="col-12 mt-3">
                      <ReactQuill
                        value={reason}
                        onChange={(html) => setreason(html)}
                      />
                      <small>Minimum of 30 words </small>
                      <small className="float-right"> {wordCount} / 30</small>
                    </div>
                    <div className="col-12 mt-3">
                      <input
                        type="file"
                        value={upload}
                        onChange={onFileChange}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <button
                        disabled={disabled}
                        onClick={(e) => handleSubmit(e)}
                        data-dismiss="modal"
                        className="btn btn-primary btn-block cancel-btn text-light"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptDeclineModal;
