/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
// import data from "../../../db/aptitude-test.json";
// import FormModal from "../../../components/Modal/Modal";
import RecruitmentResultTable from "./RecruitmentResultTable";
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
import RecruitmentResultUpload from "../../../components/Modal/RecruitmentResultUpload";


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
  const [toggleModal, settoggleModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);
  const [unfiltered, setunfiltered] = useState([]);
  const { showAlert, user, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(applicationTestFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState({});
  const [loadSelect, setloadSelect] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [status, setStatus] = useState("");
  const [statusRow, setstatusRow] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [mode, setmode] = useState("add");

  const editRow = (row) => {
    // setformUpdate(null)
    seteditData(row);
    setmode("edit");
    let formatted = helper.handleEdit(row);
    seteditData(formatted);
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const create = () => {
    let initialValues = {};
    let temp = HelperService.formArrayToObject(template.Fields);
    for (let i in temp) {
      initialValues[i] = "";
    }
    setmode("add");
    setFormValue(initialValues);
    seteditData(initialValues);
  };

  const fetchAllTests = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/api/recruitment-result", {
        params: {
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        }
      })
      .then((res) => {
        let resData = res?.data?.data?.result;
        let resOptions = res?.data?.data?.pagination;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions.numberOfPages;
        
        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        setLoading(false);
        setData(resData);
        setunfiltered(resData);
        // console.log("interview resData", resData)
      })
      .catch((error) => {
        console.log("Interview Test Error:", error?.response);
      });
  }, [page, searchTerm, sizePerPage]);

  useEffect(() => {
    fetchAllTests();
  }, [fetchAllTests]);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/api/jobApplicant", {
  //       params: { interview_status: "Scheduled for interview" },
  //     })
  //     .then((res) => {
  //       const jobApplicantsOpts = res?.data?.data?.map((e) => {
  //         return {
  //           label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
  //           value: e._id,
  //         };
  //       });

  //       const finalForm = applicationTestFormJson.Fields.map((field) => {
  //         if (field.name === "job_applicant_id") {
  //           field.options = jobApplicantsOpts;
  //           return field;
  //         }
  //         return field;
  //       });
  //       // setTemplate({
  //       //   title: applicationTestFormJson.title,
  //       //   Fields: finalForm,
  //       // });
  //       if (!loadSelect) {
  //         setloadSelect(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Interview List Error:", error?.response);
  //     });
  // }, [loadSelect]);

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
        let newFormValue = {
          ...formValue,
          _id: editData._id,
        };
        axiosInstance
          .patch("/api/test/" + editData?._id, newFormValue)
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
  }, [formValue, editData, mode]);


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
            <h3 className="page-title">Recruitment Result</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Recruitment</Link>
              </li>
              <li className="breadcrumb-item active">Recruitment Result</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <button
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#uploadRecruitmentResult"
                onClick={() => settoggleModal(true)}
              >
            Import Results
          </button>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RecruitmentResultTable 
            data={data} 
            loading={loading}
            setLoading={setLoading}
            setData={setData} 
            columns={columns} 
            context="interview"
            page={page}
            setPage={setPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            searchTerm={searchTerm}
            fetchAllTests={fetchAllTests}
            setSearchTerm={setSearchTerm}
          />
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

      {toggleModal && (
        <div>
          <RecruitmentResultUpload
            settoggleModal={settoggleModal}
            title="Upload Result"
            url="/api/academy"
            setUploadSuccess={setUploadSuccess}
          />
        </div>
      )}
    </>
  );
};

export default AptitudeTest;
