/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { jobOpeningFormJson } from "../../../components/FormJSON/HR/recruitment/JobOpening";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ApproverBtn } from "../../../components/ApproverBtn";
import ReactHtmlParser from "react-html-parser";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import Select from "react-select";

const jobOpts = [
  {
    label: "CLOSED",
    value: "CLOSED",
  },
  {
    label: "OPEN",
    value: "OPEN",
  },
];

const JobOpening = () => {
  const [formValue, setFormValue] = useState(null);
  const [template, setTemplate] = useState(jobOpeningFormJson);
  const [submitted, setSubmitted] = useState(false);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, seteditData] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");
  const [clickedRow, setclickedRow] = useState(null);

  const [unfiltered, setunfiltered] = useState([]);

  const editRow = (row) => {
    // setformUpdate(null)
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchJobOpenings = () => {
    axiosInstance
      .get("/api/jobOpening")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setunfiltered(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobOpenings();
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
    combineRequest()
      .then((res) => {
        const { projects, designations } = res.data.createEmployeeFormSelection;
        const projectsOpts = projects?.map((e) => {
          return {
            label: e.project_name,
            value: e._id,
          };
        });
        const designationOpts = designations?.map((e) => {
          return {
            label: e.designation,
            value: e._id,
          };
        });
        const finalForm = jobOpeningFormJson.Fields.map((field) => {
          if (field.name === "designation_id") {
            field.options = designationOpts;
            return field;
          } else if (field.name === "project_id") {
            field.options = projectsOpts;
            return field;
          }
          return field;
        });
        setTemplate({
          title: jobOpeningFormJson.title,
          Fields: finalForm,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //create job opening
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        axiosInstance
          .post("/api/jobOpening", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchJobOpenings();

            showAlert(true, res.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      } else {
        formValue._id = editData._id;
        delete formValue.__v;
        delete formValue.createdAt;
        delete formValue.updatedAt;
        axiosInstance
          .patch("/api/jobOpening/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchJobOpenings();
            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
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

  //delete job opening
  const deleteJobOpening = (row) => {
    axiosInstance
      .delete(`/api/jobOpening/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  //update jobOpening
  useEffect(() => {
    if (status.length) {
      const update = {
        ...statusRow,
        status: status,
        designation_id: statusRow.designation_id?._id,
        project_id: statusRow.project_id?._id,
      };
      delete update.__v;
      axiosInstance
        .patch("/api/jobOpening/" + statusRow._id, update)
        .then((res) => {
          fetchJobOpenings();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [status, statusRow]);

  const columns = [
    {
      dataField: "job_title",
      text: "Job Title",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <>
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
            context="job_opening"
          />
        </>
      ),
    },
    {
      dataField: "designation_id",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{row?.designation_id?.designation}</h2>,
    },
    {
      dataField: "project_id",
      text: "Project",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>{row?.project_id?.project_name || "Not Available"}</h2>
      ),
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.description)}</h2>,
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
              onClick={() => editRow(row)}
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
            <h3 className="page-title">Job Opening List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Job Opening List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Job Opening
            </a>
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
              placeholder="Filter Job Openings"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>

      <FormModal2
        title="Create Job Opening"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(jobOpeningFormJson.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Job Opening"
        selectedRow={selectedRow}
        deleteFunction={deleteJobOpening}
      />
    </>
  );
};

export default JobOpening;
