/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import Papa from 'papaparse';
import helper from '../../services/helper';
import { useAppContext } from '../../Context/AppContext';

const RecruitmentResultUpload = ({ settoggleModal, title, url, setUploadSuccess, fetchAllTests }) => {
  const { showAlert } = useAppContext();
  const [buttonRef, setbuttonRef] = useState(React.createRef());
  const [loading, setloading] = useState(false);
  const [uploadState, setuploadState] = useState(title);
  const [fileName, setfileName] = useState('');
  const [invalid, setinvalid] = useState(false);
  const [data, setData] = useState([]);
  const [path, setpath] = useState(url);
  
  const updateState = (path, msg) => {
    setpath(path);
    setuploadState(msg);
    setfileName('');
    setinvalid(false);
  };

  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      setfileName(files[0]?.name);
      Papa.parse(files[0], {
        complete: function (results) {
          const res = helper.arrayToJSONObject(results.data);
          // eslint-disable-next-line array-callback-return
          const jsonData = res.filter((element) => {
            if (typeof element == 'object') {
              const emptyStringCount = Object.values(element).filter((e) =>
                typeof e == 'string' ? e.length === 0 : true
              ).length;
              // console.log(emptyStringCount);
              if (Object.values(element).length !== emptyStringCount) {
                return element;
              }
            }
          });
          if (
            Object.values(jsonData[jsonData.length - 1]).includes(undefined) ||
            Object.values(jsonData[jsonData.length - 1]).includes('')
          ) {
            setData(jsonData.slice(0, jsonData.length));
            // console.log('This is the data', jsonData.slice(0, jsonData.length));
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
    let obj = {};
    if (path === 'api/recruitment-result/bulk-upload') {
      const formatted = data.map((e) => {
        return {
          typing_speed_score: e['Typing Speed Score'],
          typing_accuracy_score: e['Typing Accuracy Score/100'],
          interviewer: e['Interviewer'],
          email_address: e['Email Address'],
          status: e['Status'],
          accent_test_score: e['Accent Test Score/100'],
          attention_to_details_test: e['Attention to Details Test/6'],
          multitasking_skills_test: e['Multitasking Skills Test/6'],
          professional_writing_email_test: e["Professional Writing Email Test/10"],
          dictation_test: e['Dictation Test/10'],
          testGorilla_invitation_date: e['Testgorilla Invitation Date'],
          send_for_testGorilla_skype_interview: e['Send for Testgorilla/Skype/Interview?'],
          assessment_completion_date: e['Assessment Completion Date'],
          stage: e['Stage'],
          personality_score: e['16 Types Personality Score'],
          average_score: e['Average Score'],
          attention_to_detail_score: e['Attention to Detail (textual) Score'],
          communication_score: e['Communication Score'],
          english_score: e['English (intermediate/B1) Score'],
          disc_profile_score: e['DISC Profile Score'],
          filed_out_only_once_from_ip_address: e['Filled Out Only Once From IP Address?'],
          webcam_enabled: e['Webcam Enabled?'],
          full_screen_mode_always_active: e['Full-Screen Mode Always Active?'],
          mouse_always_in_assessment_window: e['Mouse Always In Assessment Window?'],
          interviewer_rating: e["Interviewer's Rating"],
          notes: e['Notes On Candidate or Assessment'],
          interview_status: e['Interview Status'],
        };
      });

      obj = {
        data: formatted,
      };
    }

    axiosInstance
      .post(path, obj.data)
      .then((res) => {
        showAlert(true, 'Data successfully uploaded', 'alert alert-success');
        settoggleModal(false);
        setloading(false);
        fetchAllTests();
        buttonRef.click();
        setUploadSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        showAlert(true, err?.response?.data?.message, 'alert alert-danger');
        setloading(false);
        buttonRef.click();
        settoggleModal(false);
      });
  };

  return (
    <div
      className="modal fade"
      id="uploadRecruitmentResult"
      tabIndex="-1"
      aria-labelledby="FormModalModalLabel"
      style={{ display: 'block' }}
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
                      style={{ display: 'none' }}
                      accept=".csv"
                      onChange={(e) => onFileUpload(e)}
                    />
                    <i
                      style={{ fontSize: '20px' }}
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
                'Upload'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentResultUpload;
