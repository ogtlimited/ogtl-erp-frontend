/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import { warningLetterFormJson } from "../../../components/FormJSON/HR/Performance/Warning";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const WarningLetter = () => {
  const [formValue, setFormValue] = useState({});
  const [template, setTemplate] = useState(warningLetterFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert } = useAppContext();
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false)
  const fetchWarningLetter = () => {
    axiosInstance
      .get("/api/warningLetter")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchWarningLetter();
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { employees } = res.data.createEmployeeFormSelection;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = warningLetterFormJson.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = employeeOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: warningLetterFormJson.title,
        Fields: finalForm,
      });
      if(!loadSelect) setloadSelect(true)
      console.log(template);
    });
  }, []);

  //create warning Letter
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/warningLetter", formValue)
        .then((res) => {
          setSubmitted(false);
          setData((prevData) => [...data, res.data.data]);
          fetchWarningLetter();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  //delete aptitude test
  const deleteWarningLetter = (row) => {
    axiosInstance
      .delete(`/api/warningLetter/${row._id}`)
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

  const columns = [
    {
      dataField: "employee_id",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee_id?.first_name} {row?.employee_id?.last_name}
        </h2>
      ),
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.reason)}</h2>,
    },
    {
      dataField: "details",
      text: "Details",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.details)}</h2>,
    },
    {
      dataField: "actions",
      text: "Actions To Take",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.actions)}</h2>,
    },
    {
      dataField: "date_issued",
      text: "Date Issued",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.date_issued).format("L")}</h2>
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
            <h3 className="page-title">Warning Letter List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Warning Letter List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && 
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
              >
                Add Warning Letter
              </a>
            
            }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {
        loadSelect &&
        <FormModal
          setformValue={setFormValue}
          template={template}
          setsubmitted={setSubmitted}
        />

      }
      <ConfirmModal
        title="Warning Letter"
        selectedRow={selectedRow}
        deleteFunction={deleteWarningLetter}
      />
    </>
  );
};

export default WarningLetter;
