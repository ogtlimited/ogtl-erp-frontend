import React, { useState } from "react";
import axiosInstance from "../../services/api";
import Papa from "papaparse";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";

const EmployeeAllowanceUpload = ({
  settoggleModal,
  title,
  url,
  uploadSuccess,
  setUploadSuccess,
  fetchAllSalaries,
}) => {
  const { showAlert } = useAppContext();
  const [buttonRef, setButtonRef] = useState(React.createRef());
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(title);
  const [fileName, setFilename] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [data, setData] = useState([]);
  const [path, setPath] = useState(url);

  // eslint-disable-next-line no-unused-vars
  const updateState = (path, msg) => {
    setPath(path);
    setUploadState(msg);
    setFilename("");
    setInvalid(false);
  };

  const onFileUpload = (e) => {
    const files = e.target.files;
    console.log(files)
    if (files) {
      setFilename(files[0]?.name);

      Papa.parse(files[0], {
        complete: function (results) {
          const res = helper.arrayToJSONObject(results.data);
          // eslint-disable-next-line array-callback-return
          const jsonData = res.filter((element) => {
            if (typeof element == "object") {
              const emptyStringCount = Object.values(element).filter((e) =>
                typeof e == "string" ? e.length === 0 : true
              ).length;
              if (Object.values(element).length !== emptyStringCount) {
                return element;
              }
            }
          });
          console.log('Hello',jsonData)
          if (
            Object.values(jsonData[jsonData.length - 1]).includes(undefined) ||
            Object.values(jsonData[jsonData.length - 1]).includes("")
          ) {
            
            setData(jsonData.slice(0, jsonData.length));
          } else {
            setInvalid(false);
            setData(jsonData);
          }
        },
      });
    }
  };

  const uploadData = () => {
    setLoading(true);
    let obj = {};
    if (path === "/api/v1/bulk_allowances.json") {
      const formatted = data.map((e) => {
        console.log(e)
        return {
          ogid: e["ogid"],
          amount: e["amount"],
          effective_date: e["effective_date"],
          allowance_type: e["allowance_type"]
        }
      });

      obj = {
        payload: {allowances: formatted},
      };
    }
    console.log(obj)
    axiosInstance
      .post(path, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: obj.payload
      })
      .then((res) => {
        console.log(res)

        showAlert(
          true,
          res?.data?.data?.salary || "Allowances are being generated",
          "alert alert-success"
        );
        settoggleModal(false);
        setLoading(false);
        fetchAllSalaries();
        buttonRef.click();
        setUploadSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        showAlert(true, err?.response?.data?.errors, "alert alert-danger");
        setLoading(false);
        buttonRef.click();
        settoggleModal(false);
      });
  };

  return (
    <div
      className="modal fade"
      id="EmployeeSalaryUploadModal"
      tabIndex="-1"
      aria-labelledby="FormModalModalLabel"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {uploadState}
            </h5>
            <button
              ref={(input) => setButtonRef(input)}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="v-pills-tabContent">
                  <label
                    className="tab-pane fade upload-csv show active"
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
                    {!fileName && (
                      <div>
                        <i
                          style={{ fontSize: "20px" }}
                          className="fa fa-cloud-upload pr-4"
                        ></i>
                        Click to {uploadState}
                      </div>
                    )}
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>

            <button
              onClick={() => uploadData()}
              type="button"
              className="btn btn-primary"
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
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

export default EmployeeAllowanceUpload;
