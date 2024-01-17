import React, { useState } from "react";
import axiosInstance from "../../services/api";
import Papa from "papaparse";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";

const EmployeePayslipUpload = ({
  setToggleUploadModal,
  title,
  url,
  uploadSuccess,
  setUploadSuccess,
  fetchPayrollTotals,
  fetchEmployeeSalarySlip,
}) => {
  const { showAlert } = useAppContext();
  const [buttonRef, setButtonRef] = useState(React.createRef());
  const [loading, setLoading] = useState(false);
  const [fileName, setFilename] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [data, setData] = useState([]);

  function convertCurrencyToNumber(currencyString) {
    const numberValue = parseInt(currencyString?.replace(/[^\d]/g, ""), 10);
    return numberValue;
  }

  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      setFilename(files[0]?.name);

      Papa.parse(files[0], {
        complete: function (results) {
          const res = helper.arrayToJSONObject(results.data);
          // eslint-disable-next-line array-callback-return
          const jsonData = res.filter((element) => {
            if (typeof element === "object") {
              const emptyStringCount = Object.values(element).filter((e) =>
                typeof e === "string" ? e.length === 0 : true
              ).length;
              if (Object.values(element).length !== emptyStringCount) {
                return element;
              }
            }
          });
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

    if (url) {
      const formatted = data.map((e) => {
        const formattedEntry = Object.entries(e).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            const formattedKey = key.replace(/\s+/g, "_").toLowerCase();

            if (["EMPLOYEE", "EMAIL", "REFERENCE ID"].includes(key)) {
              return acc;
            }

            acc[formattedKey] = ["OGID"].includes(key)
              ? value
              : convertCurrencyToNumber(value);
          }
          return acc;
        }, {});

        return formattedEntry;
      });

      obj = {
        payload: {
          salary_slips: formatted,
        },
      };

      // console.log("submit this", obj);
    }

    axiosInstance
      .put(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: obj.payload,
      })
      .then((res) => {
        showAlert(
          true,
          "Payslips successfully uploaded",
          "alert alert-success"
        );
        setToggleUploadModal(false);
        setLoading(false);
        fetchPayrollTotals();
        fetchEmployeeSalarySlip();
        buttonRef.click();
        setUploadSuccess(true);
      })
      .catch((err) => {
        console.log(err?.response?.data?.errors);
        showAlert(true, err?.response?.data?.errors, "alert alert-danger");
        setLoading(false);
        buttonRef.click();
        setToggleUploadModal(false);
      });
  };

  return (
    <div
      className="modal fade"
      id="EmployeePayslipUploadModal"
      tabIndex="-1"
      aria-labelledby="FormModalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="FormModalLabel">
              {title}
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
                    {!fileName ? (
                      <div>
                        <i
                          style={{ fontSize: "20px" }}
                          className="fa fa-cloud-upload pr-4"
                        ></i>
                        Click to {title}
                      </div>
                    ) : (
                      <p className="pt-3">{fileName}</p>
                    )}

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

export default EmployeePayslipUpload;
