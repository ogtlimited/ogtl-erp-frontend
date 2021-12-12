import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import Papa from "papaparse";
import helper from "../../services/helper";
import { object } from "yup/lib/locale";
import { useAppContext } from "../../Context/AppContext";
import { each } from "jquery";
const AttendanceModal = ({
  fetchedCombineRequest,
  settoggleModal,
  setuploading,
  setUploadSuccess,
}) => {
  const { combineRequest, showAlert } = useAppContext();
  const [buttonRef, setbuttonRef] = useState(React.createRef());
  const [loading, setloading] = useState(false);
  const [fileName, setfileName] = useState("");
  const [invalid, setinvalid] = useState(false);
  const [data, setData] = useState([]);
  const { allEmployees } = useAppContext();

  const onFileUpload = (e) => {
    const files = e.target.files;
    var employees = [];
    var result = [];
    var email = "";
    var clockIn = "";
    var clockOut = "";
    allEmployees.forEach((element) => {
      const name =
        element?.first_name +
        " " +
        element?.middle_name +
        " " +
        element.last_name;
      const email = element.company_email;

      employees.push({ name, email });
    });
    console.log("employees", employees);

    if (files) {
      setfileName(files[0]?.name);

      Papa.parse(files[0], {
        complete: function (results) {
          const jsonData = helper.arrayToJSONObjectAttendance(results.data);
          jsonData.forEach((element) => {
            employees.forEach((e) => {
              if (element?.Name?.toLowerCase() === e?.name?.toLowerCase()) {
                email = e?.email;
                clockIn = element?.ClockIn;
                clockOut = element?.ClockIn;
                result.push({
                  email: email,
                  clockIn: clockIn,
                  clockOut: clockOut,
                });
              }
            });
          });

          console.log("resultssss", result);

          setinvalid(false);
          setData(result);
        },
      });
    }
  };

  const uploadData = () => {
    console.log(data);
    setuploading(true);
    setloading(true);
    axiosInstance
      .post("/api/attendance", data)
      .then((res) => {
        console.log(res);
        showAlert(true, "Data successfully uploaded", "alert alert-success");
        settoggleModal(false);
        setuploading(false);
        setloading(false);
        buttonRef.click();
        fetchedCombineRequest();
      })
      .catch((err) => {
        console.log(err);
        showAlert(false, "Error uploading data", "alert alert-success");
        setloading(false);
        buttonRef.click();
        settoggleModal(false);
      });
  };
  return (
    <div
      class="modal fade show"
      id="uploadModal"
      tabIndex="-1"
      aria-labelledby="FormModalModalLabel"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Upload Attendance
            </h5>
            <button
              ref={(input) => setbuttonRef(input)}
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-8">
                <div class="tab-content" id="v-pills-tabContent">
                  <label
                    class="tab-pane fade upload-csv show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept=".csv"
                      onChange={(e) => onFileUpload(e)}
                    />
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-cloud-upload pr-4"
                    ></i>
                    Click to Upload Attendance
                    <p className="pt-3">{fileName}</p>
                    {invalid ? (
                      <small className="pt-3 text-danger">
                        This file contains invalid fields
                      </small>
                    ) : null}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>

            <button
              onClick={() => uploadData()}
              type="button"
              class="btn btn-primary"
            >
              {loading ? (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
