import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import SuccessError from "./successError";

const ApprovePayroll = ({ previewData,setdisplayState, state }) => {
  const [generating, setgenerating] = useState(false);
  const [message, setmessage] = useState(state);
  const [response, setresponse] = useState("");
  useEffect(() => {
    console.log(state)
    setmessage(state)
  }, [state])
  
  const approvePayroll = () => {
    setgenerating(true);
    const obj = {
      action: "generate",
    };
    axiosInstance
      .post("/api/salary-slip/approve/batch", obj)
      .then((res) => {
        setgenerating(false);
        setmessage("success");
        setdisplayState("success")
        setresponse("Payroll approval submitted successfully")
        // setData(res.data.data[0].salarySlips);
      })
      .catch((error) => {
        console.log(error?.response.data.message);
        setresponse(error?.response.data.message)
        setmessage("error");
        setdisplayState("error")
        setgenerating(false);
      });
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      {state === "raw" ? (
        <>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <strong>Total Salary</strong>
                  <span className="float-end">{previewData?.salary}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total Campaign</strong>
                  <span className="float-end">{previewData?.projects}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>No. of Active Employee</strong>
                  <span className="float-end">{previewData?.employees}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Tax</strong>
                  <span className="float-end">0.00</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Pension</strong>
                  <span className="float-end">
                    <strong>0.00</strong>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => approvePayroll()} className="btn add-btn">
            {!generating ? (
              <>
                <i className="fa fa-check-circle"></i> Approve
              </>
            ) : (
              <div
                className="spinner-border text-light pl-2"
                role="status"
              ></div>
            )}
          </button>
        </>
      ) : (
        <SuccessError response={response} message={message} />
      )}
    </div>
  );
};

export default ApprovePayroll;
