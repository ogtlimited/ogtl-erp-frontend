/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
// import data from "../../../db/aptitude-test.json";
// import FormModal from "../../../components/Modal/Modal";
import { applicationTestFormJson } from "../../../components/FormJSON/HR/recruitment/ApplicationTest";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import ViewModal from "../../../components/Modal/ViewModal";
import HelperService from "../../../services/helper";

import helper from "../../../services/helper";
import InterviewContent from "../../../components/ModalContents/interviewContents";
import FormModal2 from "../../../components/Modal/FormModal2";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";

const statusOptions = [
  {
    title: "Invitation Sent",
    color: "text-primary",
  },
  {
    title: "Invitation Opened",
    color: "text-secondary",
  },
  {
    title: "Assessment Started",
    color: "text-info",
  },
  {
    title: "Assessment Completed",
    color: "text-success",
  },
];

const AptitudeTest = () => {
  const [formValue, setFormValue] = useState(null);
  const [data, setData] = useState([]);
  const { showAlert, user, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(applicationTestFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [status, setStatus] = useState("");
  const [statusRow, setstatusRow] = useState(null);

  const [mode, setmode] = useState("add");

  const editRow = (row) => {
    // setformUpdate(null)

    setmode("edit");
    setformUpdate(row);
    setclickedRow(row);
  };
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
      // console.log(i);
    }
    setmode("add");
    setFormValue(initialValues);
    seteditData(initialValues);
  };

  const fetchAllTests = () => {
    axiosInstance
      .get("/api/test")
      .then((res) => {
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
        if (!loadSelect) {
          setloadSelect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadSelect]);

  //create aptitude test
  useEffect(() => {
    if (submitted) {
      if (mode === "add") {
        axiosInstance
          .post("/api/test", formValue)
          .then((res) => {
            setSubmitted(false);
            fetchAllTests();
            setData((prevData) => [...prevData, res.data.data]);
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      } else {
        axiosInstance
          .patch("/api/test/" + editData?._id, formValue)
          .then((res) => {
            setSubmitted(false);
            fetchAllTests();
            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      }
    }
  }, [submitted, formValue, editData?._id]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  //delete aptitude test
  const deleteTest = (row) => {
    axiosInstance
      .delete(`/api/test/${row._id}`)
      .then((res) => {
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

  useEffect(() => {
    if (status.length) {
      const update = {
        _id: statusRow._id,
        status,
      };

      delete update.__v;
      axiosInstance
        .patch("/api/test/" + statusRow._id, update)
        .then((res) => {
          fetchAllTests();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    return () => {
      setStatus("");
      setstatusRow(null);
      showAlert(false);
    };
  }, [status, statusRow]);

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
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={statusOptions}
            setStatus={setStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
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
      dataField: "interview_status",
      text: "Interview Status",
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
              <a
                className="dropdown-item"
                onClick={() => editRow(helper.handleEdit(row))}
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setSelectedRow(helper.handleEdit(row));
                }}
              >
                <i className="fa fa-eye m-r-5"></i> View
              </a>
              {user?.role?.hr?.delete && (
                <a className="dropdown-item" onClick={() => deleteTest(row)}>
                  <i className="fa fa-trash m-r-5"></i> Delete
                </a>
              )}
            </div>
          </>
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
                onClick={() => create()}
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
        <FormModal2
          title={applicationTestFormJson.title}
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(
            applicationTestFormJson.Fields
          )}
          setsubmitted={setSubmitted}
        />
      )}
      {selectedRow && (
        <ViewModal
          title="Interview Details"
          content={<InterviewContent interviewContent={selectedRow} />}
        />
      )}
    </>
  );
};

export default AptitudeTest;
