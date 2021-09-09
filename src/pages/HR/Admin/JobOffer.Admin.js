/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import { jobOfferFormJson } from "../../../components/FormJSON/HR/recruitment/JobOffer";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { jobOpeningFormJson } from "../../../components/FormJSON/HR/recruitment/JobOpening";

const JobOffer = () => {
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);
  const { showAlert, combineRequest } = useAppContext();
  const [template, setTemplate] = useState(jobOpeningFormJson);
  const [submitted, setSubmitted] = useState(false);

  const fetchJobOffers = () => {
    axiosInstance
      .get("/api/jobOffer")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobOffers();
  }, []);

  useEffect(() => {
    combineRequest()
      .then((res) => {
        console.log(res);
        const { designations, jobApplicants } =
          res.data.createEmployeeFormSelection;
        const designationOpts = designations?.map((e) => {
          return {
            label: e.designation,
            value: e._id,
          };
        });
        const jobApplicantsOpts = jobApplicants?.map((e) => {
          return {
            label: e.applicant_name,
            value: e._id,
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
        console.log(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //create job offer
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/jobOffer", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchJobOffers();
          setData((prevData) => [...data, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

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
  const updateJobOffer = (row) => {
    axiosInstance
      .patch(`/api/jobOffer/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchJobOffers();
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
      text: "Job Title",
      sort: true,
      formatter: (value, row) => (
        <h2>{row?.job_applicant_id?.applicant_name}</h2>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          <div className="action-label">
            <a className="btn btn-white btn-sm btn-rounded" href="">
              <i className="fa fa-dot-circle-o text-success"></i> {row?.status}
            </a>
          </div>
        </>
      ),
    },
    {
      dataField: "offer_date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "designation_id",
      text: "Designation",
      sort: true,
      formatter: (value, row) => <h2>{row?.designation_id?.designation}</h2>,
    },
    {
      dataField: "job_offer_terms",
      text: "Job Offer Terms",
      sort: true,
    },
    {
      dataField: "terms_and_conditions",
      text: "Term and Conditions",
      sort: true,
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
            <a
              className="dropdown-item"
              onClick={() => {}}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <Link className="dropdown-item" onClick={() => deleteJobOffer(row)}>
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
              <li className="breadcrumb-item active">Job Offer List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Job Offer
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <FormModal
        setformValue={setFormValue}
        template={jobOfferFormJson}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default JobOffer;
