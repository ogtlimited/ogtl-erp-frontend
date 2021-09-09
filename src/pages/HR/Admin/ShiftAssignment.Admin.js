/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import { shiftAssignmentFormJson } from "../../../components/FormJSON/HR/shift/ShiftAssignment";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import moment from "moment";

const ShiftAssignment = () => {
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const imageUrl = "https://erp.outsourceglobal.com";
  const [template, setTemplate] = useState(shiftAssignmentFormJson);
  const [data, setData] = useState([]);

  const { combineRequest, showAlert } = useAppContext();

  const fetchShiftAssignments = () => {
    axiosInstance
      .get("/api/shiftAssignment")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchShiftAssignments();
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { shifts, employees } = res.data.createEmployeeFormSelection;

      const shiftsOpts = shifts?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = shiftAssignmentFormJson.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = employeeOpts;
          return field;
        } else if (field.name === "shift_type_id") {
          field.options = shiftsOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: shiftAssignmentFormJson.title,
        Fields: finalForm,
      });
      console.log(template);
    });
  }, []);

  //create shift
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/shiftAssignment", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchShiftAssignments();
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

  //delete shift
  const deleteShiftAssignment = (row) => {
    axiosInstance
      .delete(`/api/shiftAssignment/${row._id}`)
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

  //update shiftAssignment
  const updateShiftAssignment = (row) => {
    axiosInstance
      .patch(`/api/shiftAssignment/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchShiftAssignments();
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
      headerStyle: { minWidth: "350px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.employee_id.image
                  ? imageUrl + row.employee_id.image
                  : row.employee_id.gender == "Male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to="/admin/profile-dashboard">
            {row.employee_id.first_name} {row.employee_id.last_name}{" "}
          </Link>
        </h2>
      ),
    },
    {
      dataField: "shift_type_id",
      text: "Shift Type",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{row.shift_type_id.shift_name}</h2>,
    },
    {
      dataField: "assignment_date",
      text: "Assignment Date",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>{moment(row.assignment_date).format("L")}</h2>
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
            <a
              className="dropdown-item"
              onClick={() => {}}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <Link
              className="dropdown-item"
              onClick={() => deleteShiftAssignment(row)}
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
            <h3 className="page-title">Shift List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Shift Assignment List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Shift Assignment
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
        template={template}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default ShiftAssignment;
