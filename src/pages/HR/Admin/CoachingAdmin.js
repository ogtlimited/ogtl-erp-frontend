/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../../assets/img/male_avater.png";
import FormModal from "../../../components/Modal/Modal";
import { coachingFormJSON } from "../../../components/FormJSON/CoachingForm/coachingAdmin";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import CoachingModal from "../../../components/Modal/coachingModal";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";

const statusOptions = [
  {
    title: "submitted",
    color: "text-primary",
  },
];

const CoachingAdmin = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [formSubmitted, setformSubmitted] = useState(false);
  const [coachingForm, setcoachingForm] = useState({});
  const [template, settemplate] = useState({});
  const [status, setStatus] = useState("");
  const [statusRow, setstatusRow] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [coachingList, setcoachingList] = useState([]);
  const { allEmployees, showAlert } = useAppContext();
  const [editData, seteditData] = useState({});
  const [isEdit, setisEdit] = useState(false);
  const [coachingFormEdit, setcoachingFormEdit] = useState("");
  const create = () => {
    setcoachingFormEdit("add");
  };
  useEffect(() => {
    if (formSubmitted === true) {
      fetchCoachingForms();
    }
  }, [formSubmitted]);
  const fetchCoachingForms = () => {
    axiosInstance.get("/api/coaching-form").then((e) => {
      if (e?.data) {
        const list = e.data.data;
        setcoachingList(e.data.data);

        setformSubmitted(false);
      }
    });
  };
  useEffect(() => {
    setformValue(editData);
  }, [editData]);
  useEffect(() => {
    fetchCoachingForms();
    const employeeOpts = allEmployees.map((e) => {
      return {
        label: e.first_name + " " + e.last_name + " (" + e.ogid + ")",
        value: e._id,
      };
    });

    const finalForm = coachingFormJSON.Fields.map((field) => {
      if (field.name === "employeeId") {
        field.options = employeeOpts;
        return field;
      }
      return field;
    });
    // settemplate({
    //   title: coachingFormJSON.title,
    //   Fields: finalForm
    // })
    const objTemplate = {};
    finalForm.forEach((e) => {
      objTemplate[e.name] = {
        type: e.type,
        label: e.title,
        required: e.required ? true : false,
        options: e.options,
      };
    });
    // objTemplate.employeeId.options = employeeOpts
    settemplate(objTemplate);
  }, [allEmployees]);
  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/coaching-form", formValue)
        .then((res) => {
          setsubmitted(false);
          showAlert(
            true,
            "Coaching form submitted successfully",
            "alert-success"
          );
          fetchCoachingForms();
        })
        .catch((err) => {
          console.log(err);
          showAlert(
            true,
            "Unable to submit coaching form application",
            "alert-danger"
          );
        });
    }
  }, [submitted, formValue]);
  useEffect(() => {
    if (status.length) {
      const update = {
        ...statusRow,
        status: status,
      };

      delete update.__v;
      delete update._id;
      delete update.employee_id;
      axiosInstance
        .put("/api/coaching-form/" + statusRow._id, update)
        .then((res) => {
          // fetchLeaves();
          fetchCoachingForms();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    return () => {
      setStatus("");
      setstatusRow(null);
      showAlert(false);
    };
  }, [status, statusRow]);
  const editAction = (row) => {
    setcoachingForm(row);
    setcoachingFormEdit("edit");
  };
  const duplicate = (row) => {
    // setcoachingForm(row)
    // setcoachingFormEdit('duplicate')
  };
  const columns = [
    {
      dataField: "employee_id",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img alt="" src={row.image} />
          </a>
          <a href="">{value?.first_name + " " + value?.last_name} </a>
        </h2>
      ),
    },
    {
      dataField: "employee_id",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <span>{value?.ogid}</span>,
    },
    {
      dataField: "coaching_type",
      text: "Coaching Type",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    // {
    //     dataField: "type",
    //     text: "Type",
    //     sort: true,
    //     headerStyle: {minWidth: "150px"},

    // },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "120px" },
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={statusOptions}
            setStatus={setStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
          {/* {value == "submitted" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : (
            <div className="dropdown action-label text-center ">
              <a
                className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
                href=""
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <i className="fa fa-dot-circle-o text-success"></i> Draft
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{
                  position: "absolute",
                  willChange: "transform",
                  top: "0px",
                  left: "0px",
                  transform: "translate3d(106px, 31px, 0px)",
                }}
                x-placement="bottom-end"
              >
                <a
                  className="dropdown-item"
                  href=""
                  onClick={() => setStatus("submitted")}
                >
                  <i className="fa fa-dot-circle-o text-primary"></i> Submitted
                </a>
                <a className="dropdown-item" href="">
                  <i className="fa fa-dot-circle-o text-danger"></i> CLOSED
                </a>
              </div>
            </div>
          )} */}
        </>
      ),
    },
    {
      dataField: "user_response",
      text: "User Response",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
          {value === "Accepted" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value === "Rejected" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">Pending</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "incident_date",
      text: "Incident Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    // {
    //   dataField: "designation",
    //   text: "Designation",
    //   sort: true,
    //   headerStyle: {minWidth: "150px"},

    // },

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
              onClick={() => editAction(row)}
              href="#"
              data-toggle="modal"
              data-target="#coachingForm"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => duplicate(row)}
              href="#"
              data-toggle="modal"
              data-target="#coachingForm"
            >
              <i className="fa fa-copy m-r-5"></i> Duplicate
            </a>
            <a
              className="dropdown-item"
              onClick={() => duplicate(row)}
              href="#"
              data-toggle="modal"
              data-target="#printCoachForm"
            >
              <i className="fa fa-print m-r-5"></i> Print
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header d-print-none">
        <div className="row">
          <div className="col">
            <h3 className="page-title"></h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Coaching Form</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#coachingForm"
              onClick={() => create()}
            >
              <i className="fa fa-plus"></i> Coaching Form
            </a>
          </div>
        </div>
      </div>
      <div className="row mb-5 d-print-none">
        <div className="col-md-12">
          <div className="card-group m-b-30">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="d-block">New Issues</span>
                  </div>
                </div>
                <h3 className="mb-3">6</h3>
                <div className="progress mb-2" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="d-block">Solved Issues</span>
                  </div>
                </div>
                <h3 className="mb-3">11</h3>
                <div className="progress mb-2" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "55%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="d-block">Rejected Issues</span>
                  </div>
                </div>
                <h3 className="mb-3">3</h3>
                <div className="progress mb-2" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="d-block">Pending Issues</span>
                  </div>
                </div>
                <h3 className="mb-3">12</h3>
                <div className="progress mb-2" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={coachingList} />
        </div>
        <CoachingModal
          setformSubmitted={setformSubmitted}
          coachingForm={coachingForm}
          fetchCoachingForms={fetchCoachingForms}
          coachingFormEdit={coachingFormEdit}
        />
      </div>
    </>
  );
};

export default CoachingAdmin;
