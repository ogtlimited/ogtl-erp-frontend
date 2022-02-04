/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
// import data from "../../../db/aptitude-test.json";
import FormModal from "../../../components/Modal/Modal";
import { applicationTestFormJson } from "../../../components/FormJSON/HR/recruitment/ApplicationTest";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const AptitudeTest = () => {
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [template, setTemplate] = useState(applicationTestFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState({});
  const [loadSelect, setloadSelect] = useState(false);

  const fetchAllTests = () => {
    axiosInstance
      .get("/api/test")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllTests();
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/jobApplicant-accepted")
      .then((res) => {
        console.log("accepted job applicants", res);
        const jobApplicantsOpts = res?.data?.data?.map((e) => {
          return {
            label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
            value: e._id,
          };
        });

        const finalForm = applicationTestFormJson.Fields.map((field) => {
          if (field.name === "job_applicant_id") {
            field.options = jobApplicantsOpts;
            return field;
          }
          return field;
        });
        setTemplate({
          title: applicationTestFormJson.title,
          Fields: finalForm,
        });
        console.log("load", loadSelect);
        if (!loadSelect) {
          setloadSelect(true);
          console.log(loadSelect);
        }
        console.log(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadSelect]);

  //create aptitude test
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/test", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchAllTests();
          setData((prevData) => [...prevData, res.data.data]);
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  //delete aptitude test
  const deleteTest = (row) => {
    axiosInstance
      .delete(`/api/test/${row._id}`)
      .then((res) => {
        console.log(res);
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  //update aptitude test
  const updateTest = (row) => {
    axiosInstance
      .patch(`/api/test/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchAllTests();
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "job_applicant_id",
      text: "Job Applicant",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2>
          {row?.job_applicant_id?.first_name}{" "}
          {row?.job_applicant_id?.middle_name}{" "}
          {row?.job_applicant_id?.last_name}
        </h2>
      ),
    },
    {
      dataField: "test_type",
      text: "Test Type",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          <div className="action-label">
            <a className="btn btn-white btn-sm btn-rounded" href="">
              <i className="fa fa-dot-circle-o text-success"></i> {row.status}
            </a>
          </div>
        </>
      ),
    },
    {
      dataField: "interview_date",
      text: "Interview Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.interview_date).format("L")}</h2>
      ),
    },
    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "interviewer",
      text: "Interviewer",
      sort: true,
    },
    {
      dataField: "email_address",
      text: "Email Address",
      sort: true,
    },
    {
      dataField: "typing_speed_score",
      text: "Typing Speed Score",
      sort: true,
    },
    {
      dataField: "typing_accuracy_score",
      text: "Typing Accuracy Score/100",
      sort: true,
    },
    {
      dataField: "accent_test_score",
      text: "Accent Test Score/100",
      sort: true,
    },
    {
      dataField: "attention_to_details_test",
      text: "Attention to Details Test/6",
      sort: true,
    },
    {
      dataField: "multitasking_skills_test",
      text: "Multitasking Skills Test/6",
      sort: true,
    },
    {
      dataField: "dictation_test",
      text: "Dictation Test/10",
      sort: true,
    },
    {
      dataField: "professional_writing_email_test",
      text: "Professional Writing Email Test/10",
      sort: true,
    },
    {
      dataField: "send_for_testGorilla_skype_interview",
      text: "Send for Testgorilla/Skype/Interview?",
      sort: true,
    },
    {
      dataField: "testGorilla_invitation_date",
      text: "Testgorilla Invitation Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.testGorilla_invitation_date).format("L")}</h2>
      ),
    },
    {
      dataField: "assessment_completion_date",
      text: "Assessment Completion Date",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.assessment_completion_date).format("L")}</h2>
      ),
    },
    {
      dataField: "stage",
      text: "Stage",
      sort: true,
    },
    {
      dataField: "average_score",
      text: "Average Score",
      sort: true,
    },
    {
      dataField: "personality_score",
      text: "16 Types Personality Score",
      sort: true,
    },
    {
      dataField: "attention_to_detail_score",
      text: "Attention to Detail (textual) Score",
      sort: true,
    },
    {
      dataField: "communication_score",
      text: "Communication Score",
      sort: true,
    },
    {
      dataField: "disc_profile_score",
      text: "DISC Profile Score",
      sort: true,
    },
    {
      dataField: "english_score",
      text: "English (intermediate/B1) Score",
      sort: true,
    },
    {
      dataField: "filed_out_only_once_from_ip_address",
      text: "Filled Out Only Once From IP Address?",
      sort: true,
    },
    {
      dataField: "webcam_enabled",
      text: "Webcam Enabled?",
      sort: true,
    },
    {
      dataField: "full_screen_mode_always_active",
      text: "Full-Screen Mode Always Active?",
      sort: true,
    },
    {
      dataField: "mouse_always_in_assessment_window",
      text: "Mouse Always In Assessment Window?",
      sort: true,
    },
    {
      dataField: "interviewer_rating",
      text: "Interviewer's Rating",
      sort: true,
    },
    {
      dataField: "notes",
      text: "Notes",
      sort: true,
      headerStyle: { minWidth: "230px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.notes)}</h2>,
    },
    {
      dataField: "",
      text: "Action",
      sort: false,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          {user?.role?.hr?.delete && (
            <>
              {" "}
              <a
                href="#"
                className="action-icon dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {/* <a
              className="dropdown-item"
              onClick={() => {}}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a> */}
                <a className="dropdown-item" onClick={() => deleteTest(row)}>
                  <i className="fa fa-trash m-r-5"></i> Delete
                </a>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Interview List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Interview List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {/* && user?.role?.hr?.create */}
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
              >
                Add New Interview
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} context="interview" />
        </div>
      </div>
      {loadSelect && (
        <FormModal
          editData={editData}
          setformValue={setFormValue}
          template={applicationTestFormJson}
          setsubmitted={setSubmitted}
        />
      )}
    </>
  );
};

export default AptitudeTest;
