import React, { useState} from "react";
import axiosInstance from "../../services/api";

const ApprovePayroll = ({previewData}) => {
    const [generating, setgenerating] = useState(false);
    const approvePayroll = () => {
        setgenerating(true);
        axiosInstance
          .post("/api/salary-slip/approve/batch", { action: "generate" })
          .then((res) => {
            // setData(res.data.data[0].salarySlips);
          })
          .catch((error) => {
            console.log(error?.response);
          });
      };
  return (
    <div className="d-flex flex-column justify-content-center">
        <table className="table table-bordered">
      <tbody>
        <tr>
          <td>
            <strong>Total Salary</strong>
            <span className="float-end">
             {previewData?.salary}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong>
              Total Campaign
            </strong>
            <span className="float-end">
              {previewData?.projects}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong>No. of Active Employee</strong>
            <span className="float-end">
              {previewData?.employees}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Tax</strong>
            <span className="float-end">
              0.00
            </span>
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
    <button onClick={() =>approvePayroll()} className="btn add-btn">Approve</button>
    </div>
  );
};

export default ApprovePayroll;
