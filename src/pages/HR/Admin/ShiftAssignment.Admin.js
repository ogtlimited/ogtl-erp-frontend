/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
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
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import Select from "react-select";
import helper from "../../../services/helper";

const ShiftAssignment = () => {
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState({});

  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const imageUrl = "https://erp.outsourceglobal.com";
  const [template, setTemplate] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [shiftsOpt, setShiftOpts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const { createShifts, showAlert, setformUpdate } = useAppContext();
  const [loadSelect, setloadSelect] = useState(false);
  const [mode, setmode] = useState("add");
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
      // console.log(i);
    }
    setmode("add");
    setFormValue(initialValues);
    seteditData(initialValues);
  };
  const editRow = (row) => {
    // setformUpdate(null)
    setmode("edit");
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchShiftAssignments = () => {
    axiosInstance
      .get("/api/shiftAssignment")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setunfiltered(res?.data?.data);
        const shiftOpts = res.data.data.map((e) => {
          return {
            label: e.shift_type_id.shift_name,
            value: e._id,
          };
        });
        setShiftOpts(shiftOpts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchShiftAssignments();
  }, []);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) =>
        i.label.includes(e.shift_type_id.shift_name)
      );

      setData(filt);
    }
  };
  useEffect(() => {
    createShifts().then((res) => {
      console.log(res);
      const { shifts, employees } = res.data.createShiftForm;

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
      console.log(finalForm);
      console.log(helper.formArrayToObject(finalForm));
      if (finalForm.length) {
        setTemplate(helper.formArrayToObject(finalForm));
        setloadSelect(true);
      }
    });
  }, [loadSelect]);

  useEffect(() => {
    if (submitted) {
      if (mode == "add") {
        axiosInstance
          .post("/api/shiftAssignment", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchShiftAssignments();
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
          .patch("/api/shiftAssignment/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchShiftAssignments();
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
  }, [formValue, editData]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

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

  const columns = [
    {
      dataField: "employee_id",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "410px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row?.employee_id?.image
                  ? imageUrl + row?.employee_id?.image
                  : row?.employee_id?.gender === "male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to="/admin/profile-dashboard">
            {row?.employee_id?.first_name} {row?.employee_id?.last_name}{" "}
          </Link>
        </h2>
      ),
    },
    {
      dataField: "shift_type_id",
      text: "Shift Type",
      sort: true,
      headerStyle: { minWidth: "350px" },
      formatter: (value, row) => <h2>{row?.shift_type_id?.shift_name}</h2>,
    },
    {
      dataField: "assignment_date",
      text: "Assignment Date",
      sort: true,
      headerStyle: { minWidth: "350px" },
      formatter: (value, row) => (
        <h2>{moment(row?.assignment_date).format("L")}</h2>
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
              data-target="#FormModal"
              onClick={() => editRow(helper.handleEdit(row))}
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
            <h3 className="page-title">Shift Assignment</h3>
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
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => create()}
              >
                Add Shift Assignment
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2">
            <Select
              defaultValue={[]}
              onChange={handleClick}
              options={shiftsOpt}
              placeholder="Filter Shift Assignments"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {/* <FormModal
        editData={editData}
        setformValue={setFormValue}
        template={template}
        setsubmitted={setSubmitted}
      /> */}
      {loadSelect && (
        <FormModal2
          title="Create Shift Assignment"
          editData={editData}
          setformValue={setFormValue}
          template={template}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Shift Assignment"
        selectedRow={selectedRow}
        deleteFunction={deleteShiftAssignment}
      />
    </>
  );
};

export default ShiftAssignment;
