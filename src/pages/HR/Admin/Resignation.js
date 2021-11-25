import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { resignationFormJson } from "../../../components/FormJSON/HR/Employee-lifecycle/Resignation";
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
const Resignation = () => {
  const [template, setTemplate] = useState(resignationFormJson);
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { createPerfomance, showAlert } = useAppContext();
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const fetchResignation = () => {
    axiosInstance
      .get("/Exit")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchResignation();
  }, []);

  useEffect(() => {
    createPerfomance().then((res) => {
      console.log(res);
      const { employees } = res.data.createPerformanceForm;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = resignationFormJson.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = employeeOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: resignationFormJson.title,
        Fields: finalForm,
      });
      console.log(template);
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  //create Resignation
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/Exit", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchResignation();

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  //delete score card
  const deleteResignation = (row) => {
    axiosInstance
      .delete(`/Exit/${row._id}`)
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
  const updateResignation = (row) => {
    axiosInstance
      .patch(`/Exit/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchResignation();
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
      text: "Employee name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee_id?.first_name} {row?.employee_id?.last_name}
        </h2>
      ),
    },
    {
      dataField: "reason_for_resignation",
      text: "Reason for Resignation",
      sort: true,
    },

    {
      dataField: "resignation_letter_date",
      text: "Resignation Letter Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.resignation_letter_date).format("L")}</h2>
      ),
    },
    {
      dataField: "relieving_date",
      text: "Effective Resignation Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.relieving_date).format("L")}</h2>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
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
              onClick={() => console.log(row)}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
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
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Resignation</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Resignation</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Resignation
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect && (
        <FormModal
          editData={editData}
          template={template}
          setsubmitted={setSubmitted}
          setformValue={setFormValue}
        />
      )}
      <ConfirmModal
        title="Assets"
        selectedRow={selectedRow}
        deleteFunction={deleteResignation}
      />
    </>
  );
};
export default Resignation;
