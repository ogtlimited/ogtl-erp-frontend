/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import Papa from "papaparse";
import helper from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";

const GeneralUpload = ({ settoggleModal, title, url, setUploadSuccess }) => {
  const { showAlert } = useAppContext();
  const [buttonRef, setbuttonRef] = useState(React.createRef());
  const [loading, setloading] = useState(false);
  const [uploadState, setuploadState] = useState(title);
  const [fileName, setfileName] = useState("");
  const [invalid, setinvalid] = useState(false);
  const [data, setData] = useState([]);
  const [path, setpath] = useState(url);
  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      setfileName(files[0]?.name);
      Papa.parse(files[0], {
        complete: function (results) {
          const res = helper.arrayToJSONObject(results.data);
           const jsonData = res.filter(element => {
            if(typeof element == "object") {
              const emptyStringCount = Object.values(element).filter(e => typeof e == "string" ? e.length === 0 : true).length
              console.log(emptyStringCount);
              if(Object.values(element).length !== emptyStringCount){
                return element
              }
            }

           });
          if (
            Object.values(jsonData[jsonData.length - 1]).includes(undefined) || Object.values(jsonData[jsonData.length - 1]).includes("")
            
          ) {
            setData(jsonData.slice(0, jsonData.length - 1));
          } else {
            setinvalid(false);
            setData(jsonData);
          }
        },
      });
    }
  };
  useEffect(() => {}, [uploadState]);

  const uploadData = () => {
    setloading(true);
    let obj = {}
    if(path === '/api/employees-salary'){
      console.log(data)
      const formatted = data.map(e => {
        return {
          ...e,
          annualGrossSalary:  Number(e.annualGrossSalary.replace(/[^0-9.-]+/g,""))
        }
      })
      obj = {
        data: formatted
      }
      
    }else{
      obj = data
    }
    axiosInstance
      .post(path, obj)
      .then((res) => {
        showAlert(true, "Data successfully uploaded", "alert alert-success");
        settoggleModal(false);
        setloading(false);
        buttonRef.click();
        setUploadSuccess(true)
        //   fetchEmployee()
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
      className="modal fade"
      id="uploadAttendance"
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
              ref={(input) => setbuttonRef(input)}
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
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-cloud-upload pr-4"
                    ></i>
                    Click to {uploadState}
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

export default GeneralUpload;
