/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { jobOfferFormJson } from "../../../components/FormJSON/HR/recruitment/JobOffer";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { jobOpeningFormJson } from "../../../components/FormJSON/HR/recruitment/JobOpening";
import ReactHtmlParser from "react-html-parser";
import { ApproverBtn } from "../../../components/ApproverBtn";
import moment from "moment";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import Select from "react-select";
import helper from "../../../services/helper";

const jobOpts = [
  {
    label: "Rejected",
    value: "Rejected",
  },
  {
    label: "Accepted",
    value: "Accepted",
  },
  {
    label: "Open",
    value: "Open",
  },
];

const JobOffer = () => {
  const [formValue, setFormValue] = useState(null);
  const [data, setData] = useState([]);
  const { showAlert, createRecruitmens, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(jobOpeningFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [loadSelect, setloadSelect] = useState(false);
  const [mode, setmode] = useState("add");
  const editRow = (row) => {
    // setformUpdate(null)
    console.log(row);
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

  const fetchJobOffers = () => {
    axiosInstance
      .get("/api/jobOffer")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setunfiltered(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobOffers();
  }, []);
  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.status));

      setData(filt);
    }
  };
  useEffect(() => {
    createRecruitmens()
      .then((res) => {
        console.log(res);
        const { designations, passedApplicants } =
          res.data.createRecruitmentForm;
        const designationOpts = designations?.map((e) => {
          return {
            label: e.designation,
            value: e._id,
          };
        });
        const jobApplicantsOpts = passedApplicants?.map((e) => {
          return {
            label: `${e.job_applicant_id.first_name} ${e.job_applicant_id.middle_name} ${e.job_applicant_id.last_name}`,
            value: e.job_applicant_id._id,
          };
        });
        const finalForm = jobOfferFormJson.Fields.map((field) => {
          if (field.name === "designation_id") {
            field.options = designationOpts;
            return field;
          } else if (field.name === "job_applicant_id") {
            field.options = jobApplicantsOpts;
            return field;
          }
          return field;
        });
        setTemplate({
          title: jobOfferFormJson.title,
          Fields: finalForm,
        });
        if (!loadSelect) {
          setloadSelect(true);
        }
        console.log(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //create job offer
  useEffect(() => {
    if (submitted) {
      if (mode === "add") {
        axiosInstance
          .post("/api/jobOffer", formValue)
          .then((res) => {
            // setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            setSubmitted(false);
            fetchJobOffers();
            showAlert(true, res.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            // setFormValue(null);
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      } else {
        axiosInstance
          .patch("/api/jobOffer/" + editData._id, formValue)
          .then((res) => {
            // setFormValue(null);
            fetchJobOffers();
            setSubmitted(false);
            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            // setFormValue(null);
            setSubmitted(false);
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      }
    }
  }, [formValue, editData, data]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  //delete job offer
  const deleteJobOffer = (row) => {
    axiosInstance
      .delete(`/api/jobOffer/${row._id}`)
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
  //update job offer
  useEffect(() => {
    if (status.length) {
      console.log(status);
      console.log(statusRow);
      const update = {
        ...statusRow,
        status: status,
        designation_id: statusRow.designation_id._id,
        job_applicant_id: statusRow.job_applicant_id._id,
        job_offer_terms: statusRow.job_offer_terms[0],
      };
      console.log("Job offer update", update);

      delete update.__v;
      axiosInstance
        .patch("/api/jobOffer/" + statusRow._id, update)
        .then((res) => {
          console.log(res);
          fetchJobOffers();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [status, statusRow]);

  const columns = [
    {
      dataField: "job_applicant_id",
      text: "Job Applicant",
      sort: true,
      headerStyle: { minWidth: "200px" },
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
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
            context="job offer"
          />
        </>
      ),
    },
    {
      dataField: "offer_date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.offer_date).format("L")}</h2>,
    },
    {
      dataField: "designation_id",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{row?.designation_id?.designation}</h2>,
    },
    {
      dataField: "job_offer_terms",
      text: "Job Offer Terms",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>{ReactHtmlParser(row?.job_offer_terms)}</h2>
      ),
    },
    {
      dataField: "terms_and_conditions",
      text: "Term and Conditions",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>{ReactHtmlParser(row?.terms_and_conditions)}</h2>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(helper.handleEdit(row))}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Job Offer List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Job Offers</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => create()}
              >
                Add Job Offer
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2">
            <Select
              defaultValue={[]}
              onChange={handleClick}
              options={jobOpts}
              placeholder="Filter Job Offers"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect && (
        <FormModal2
          title="Create Job Offer"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(jobOfferFormJson.Fields)}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Job Offer"
        selectedRow={selectedRow}
        deleteFunction={deleteJobOffer}
      />
    </>
  );
};

export default JobOffer;
