/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
// import data from "../../../db/aptitude-test.json";
import FormModal from "../../../components/Modal/Modal";
import { applicationTestFormJson } from "../../../components/FormJSON/HR/recruitment/ApplicationTest";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";

const AptitudeTest = () => {
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);
  const { showAlert, combineRequest } = useAppContext();
  const [template, setTemplate] = useState(applicationTestFormJson);
  const [submitted, setSubmitted] = useState(false);

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
    combineRequest()
      .then((res) => {
        console.log(res);
        const { jobApplicants, employees } =
          res.data.createEmployeeFormSelection;
        const jobApplicantsOpts = jobApplicants?.map((e) => {
          return {
            label: e.applicant_name,
            value: e._id,
          };
        });
        const employeeOpts = employees?.map((e) => {
          return {
            label: `${e.first_name} ${e.last_name}`,
            value: e._id,
          };
        });
        const finalForm = applicationTestFormJson.Fields.map((field) => {
          if (field.name === "job_applicant_id") {
            field.options = jobApplicantsOpts;
            return field;
          } else if (field.name === "hr_user") {
            field.options = employeeOpts;
            return field;
          }
          return field;
        });
        setTemplate({
          title: applicationTestFormJson.title,
          Fields: finalForm,
        });
        console.log(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //create aptitude test
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/test", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchAllTests();
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
      dataField: "test_type",
      text: "Test Type",
      sort: true,
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
      dataField: "job_applicant_id",
      text: "Job Applicant",
      sort: true,
      formatter: (value, row) => (
        <h2>{row?.job_applicant_id?.applicant_name}</h2>
      ),
    },
    {
      dataField: "hr_user",
      text: "HR User",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.hr_user?.first_name} {row?.hr_user?.last_name}
        </h2>
      ),
    },
    {
      dataField: "score",
      text: "Score",
      sort: true,
    },
    {
      dataField: "interview_date",
      text: "Interview Date",
      sort: true,
    },
    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "notes",
      text: "Notes",
      sort: true,
    },
    {
      dataField: "",
      text: "Action",
      sort: false,
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
            <Link className="dropdown-item" onClick={() => deleteTest(row)}>
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
            <h3 className="page-title">Aptitude Test List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Aptitude Test List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Aptitude Test
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
        template={applicationTestFormJson}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default AptitudeTest;
