/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import departments from "../../db/departments.json";

import LeaveTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link } from "react-router-dom";
import { ticketFormJson } from "../../components/FormJSON/Apps/ticket";
import { departmentFormJson } from "../../components/FormJSON/HR/Employee/department";
import FormModal2 from "../../components/Modal/FormModal2";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";
import helper from "../../services/helper";
import { Title } from "chart.js";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import ViewModal from "../../components/Modal/ViewModal";
import TicketContent from "../../components/ModalContents/TicketContent";

const Tickets = () => {
  const [template, settemplate] = useState({});
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [departMentOpts, setDepartmentOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState("add");
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];


  const [allDepartments, setallDepartments] = useState([]);

  const breadcrumb = "Departments";
  const fetchDept = () => {
    axiosInstance.get("/department").then((e) => {
      setallDepartments(e?.data?.data);
      setunfiltered(e?.data?.data);
      const departOpts = e.data.data.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      setDepartmentOts(departOpts);
      ticketFormJson.department.options = departOpts;
      settemplate(ticketFormJson);
    });
  };

  const fetchTickets = () => {
    axiosInstance.get(`api/ticketing/employee/${user._id}`).then((e) => {
      let mapid = e.data.data.map((t) => ({...t, id: t._id}))
      setEmployeeTickets(mapid);
    });
  };

  const [ticket, setTicket] = useState([]);
  const getTicketbyId = (id) => {
    axiosInstance.get(`api/ticketing/${id}`).then((e) => {
      const data = e.data.data;
      setTicket(data);
      const prefill = {...ticketFormJson, title: {...ticketFormJson.title, value: data.title} };
      settemplate(prefill);
    });
  }

  const handleEdit = (row) => {
    let hash = {};
    seteditData(null);
    for (let d in row) {
      if (typeof row[d] == "object" && row[d] !== null) {
        hash[d] = row[d]._id;
      } else {
        hash[d] = row[d];
      }
    }
    setmode("edit");
    seteditData(hash);
  };

  const deleteTicket = (row) => {
    axiosInstance
      .delete(`api/ticketing/${row._id}`)
      .then((res) => {
        setEmployeeTickets((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setallDepartments(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.department));

      setallDepartments(filt);
    }
  };

  useEffect(() => {
    fetchDept();
    fetchTickets();
    setallDepartments(departments);
  }, []);

  useEffect(() => {
    if (submitted) {
      if (mode === 'add') {
        const body = {
          ...formValue,
          employee_id: user._id,
        }
        axiosInstance
          .post("api/ticketing", body)
          .then((e) => {
            showAlert(
              true,
              "Ticket successfully created",
              "alert alert-success"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
       const {_id, employee_id, department, title, content, status} = formValue;
        axiosInstance
        .patch(`api/ticketing/${editData?._id}`, {_id, employee_id, department, title, content, status})
        .then((e) => {
          fetchTickets();
          seteditData({});
          showAlert(
            true,
            "Ticket successfully edited",
            "alert alert-success"
          );
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
    }
  }, [formValue]);

  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "60%" },
    },
    {
      dataField: "department.department",
      text: "Department",
      sort: true,
      headerStyle: { width: "85%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "85%" },
      formatter: (value, row) => (
        <>
          {value === "Resolved" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-ticket status-online"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : value === "Processing" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-ticket status-pending"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-ticket status-open"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
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
                  href="#"
                  data-toggle="modal"
                  data-target="#generalModal"
                  onClick={() => { setViewRow(row);}}
                >
                  <i className="lab la-readme m-r-5"></i> View
                </a>
                {row.status === 'Open' && <>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#FormModal"
                  onClick={() => handleEdit(row)}
                >
                  <i className="fa fa-pencil m-r-5"></i> Edit
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setSelectedRow(row);
                  }}
                >
                  <i className="fa fa-trash m-r-5"></i> Delete
                </a>
                </>}
              </div>
            </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Tickets</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Tickets</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="las la-clipboard-check"></i> Generate Ticket
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={departMentOpts}
            placeholder="Filter Departments"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div> */}
        <LeaveTable
          data={employeeTickets}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      {/* departmentFormJson */}
      <FormModal2
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
      <ConfirmModal
        title="Tickets"
        selectedRow={selectedRow}
        deleteFunction={deleteTicket}
      />
      <ViewModal
          title={viewRow?.title}
          content={<TicketContent ticket={viewRow} />}
        />
    </>
  );
};

export default Tickets;
