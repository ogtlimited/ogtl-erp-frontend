import React, { useMemo, useState, useEffect, useContext } from "react";

import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import Select from "react-select";

import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import { branchFormJSON } from "../../../components/FormJSON/HR/Employee/branch";
import helper from "../../../services/helper";

const Branch = () => {
  const [allBranch, setallBranch] = useState([]);
  const { formUpdate, setformUpdate } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [branchOpts, setbranchOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const fetchBranch = () => {
    axiosInstance.get("/branch").then((res) => {
      setallBranch(res.data.data);
      setunfiltered(res?.data?.data);
      const branchOpts = res.data.data.map((e) => {
        return {
          label: e.branch,
          value: e._id,
        };
      });
      setbranchOts(branchOpts);
    });
  };
  useEffect(() => {
    fetchBranch();
  }, []);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setallBranch(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => {
        console.log(e);
        return i.label.includes(e.branch);
      });

      setallBranch(filt);
    }
  };

  useEffect(() => {
    fetchBranch();
    if (formValue) {
      if (!formUpdate) {
        axiosInstance
          .post("/branch", formValue)
          .then((e) => {
            setformValue(null);
          })
          .catch((err) => {
            setformValue(null);
            console.log(err);
          });
      } else {
        formValue._id = formUpdate._id;
        axiosInstance
          .put("/branch/" + formUpdate._id, formValue)
          .then((e) => {
            setformValue(null);
            fetchBranch();
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
      dataField: "branch",
      order: "desc",
    },
  ];
  const breadcrumb = "Branch";
  const columns = [
    {
      dataField: "",
      text: "#",
      headerStyle: { width: "5%" },
      formatter: (cell, row, rowIndex) => <span>{rowIndex + 1}</span>,
    },
    {
      dataField: "branch",
      text: "Branch",
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
            <a
              className="dropdown-item"
              onClick={() => setformUpdate(row)}
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => console.log(row)}
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a>
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
            <h3 className="page-title">Branch</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Branch</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Branch
            </a>
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={branchOpts}
            placeholder="Filter Branch"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allBranch}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2
        title="Create Branch"
        editData={editData}
        setformValue={setformValue}
        template={helper.formArrayToObject(branchFormJSON.branch)}
        setsubmitted={setsubmitted}
      />
    </>
  );
};

export default Branch;
