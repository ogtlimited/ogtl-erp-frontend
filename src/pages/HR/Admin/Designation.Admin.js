import React, { useMemo, useState, useEffect, useContext } from "react";

import departments from "../../../db/designationList.json";
import { designation } from "../../../components/FormJSON/HR/Employee/designation";
import list from "../../../designation.json";
import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import Select from "react-select";
import dates from "./dates.json";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import helper from "../../../services/helper";

let qualityFilter;

const Designations = () => {
  // console.log(uniqueArray)
  const [allDesignation, setallDesignation] = useState([]);
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [template, settemplate] = useState({});
  const [designationOpts, setDesignationOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState("add");
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
      // console.log(i);
    }
    setmode("add");
    setformValue(initialValues);
    seteditData(initialValues);
  };
  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row);
    setmode("edit");
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const fetchDesignation = () => {
    settemplate(designation);
    axiosInstance.get("/designation").then((res) => {
      setallDesignation(res.data.data);
      setunfiltered(res?.data?.data);
      const depsigOpts = res.data.data.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setDesignationOts(depsigOpts);
    });
  };
  useEffect(() => {
    fetchDesignation();
  }, []);

  const handleClick = (i) => {
    console.log(i, unfiltered);
    if (i?.value === "All" || i === null) {
      setallDesignation(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => {
        console.log(e);
        return i.label.includes(e.designation);
      });

      setallDesignation(filt);
    }
  };

  useEffect(() => {
    console.log(formValue);
    fetchDesignation();
    console.log(submitted, mode);
    if (submitted) {
      if (mode == "add") {
        axiosInstance
          .post("/designation", formValue)
          .then((e) => {
            console.log(e);
            showAlert(
              true,
              "Designation successfully created",
              "alert alert-success"
            );
            // setformValue(null);
            fetchDesignation();
          })
          .catch((err) => {
            // setformValue(null);
            console.log(err);
          });
      } else {
        console.log(editData);
        console.log(formValue);
        // formValue._id = formUpdate._id;
        axiosInstance
          .put("/designation/" + formUpdate._id, formValue)
          .then((e) => {
            console.log(e);
            showAlert(
              true,
              "Designation successfully updated",
              "alert alert-success"
            );
            setformValue(null);
            fetchDesignation();
          })
          .catch((err) => {
            setformValue(null);
            console.log(err);
          });
      }
    }
    // setallDepartments(departments);
  }, [formValue]);

  const defaultSorted = [
    {
      dataField: "designation",
      order: "desc",
    },
  ];
  const breadcrumb = "Departments";
  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      headerStyle: { width: "70%" },
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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
            {user?.role?.hr?.update && (
              <a
                className="dropdown-item"
                onClick={() => {
                  setmode("edit");
                  setformUpdate(helper.handleEdit(row));
                }}
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.hr?.delete && (
              <a
                className="dropdown-item"
                onClick={() => console.log(row)}
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-trash m-r-5"></i> Delete
              </a>
            )}
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
            <h3 className="page-title">Designations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Designations</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => create()}
              >
                <i className="fa fa-plus"></i> Add Designation
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={designationOpts}
            placeholder="Filter Designations"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDesignation}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2
        title="Create Department"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
    </>
  );
};

export default Designations;
