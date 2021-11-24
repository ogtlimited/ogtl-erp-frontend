/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { shiftTypeFormJson } from "../../../components/FormJSON/HR/shift/ShiftType";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import Select from "react-select";
import helper from "../../../services/helper";

const ShiftAdmin = () => {
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [template, settemplate] = useState({})
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [shiftsOpt, setShiftOpts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const { fetchTypesShift, showAlert, setformUpdate } = useAppContext();
  const [mode, setmode] = useState("add")
  const editRow = (row) => {
    // setformUpdate(null)
    setmode("edit")
    setformUpdate(row);
    setclickedRow(row);
  };
  const create = () =>{
    let initialValues = {};
      for (let i in template) {
        initialValues[i] = "";
        // console.log(i);
      }
      setmode('add')
      setFormValue(initialValues)
      seteditData(initialValues)
  }

  useEffect(() => {
    settemplate(HelperService.formArrayToObject(shiftTypeFormJson.Fields))
    fetchTypesShift()
      .then((res) => {
        setData(res.data.data);
        setunfiltered(res?.data?.data);
        const shiftOpts = res.data.data.map((e) => {
          return {
            label: e.shift_name,
            value: e._id,
          };
        });
        setShiftOpts(shiftOpts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchTypesShift]);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.shift_name));

      setData(filt);
    }
  };
  useEffect(() => {
    console.log(formValue)
    if (submitted) {
      if (mode == "add") {
        axiosInstance
          .post("/api/shiftType", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchTypesShift();
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
        // formValue._id = editData._id;
        console.log(formValue)
        axiosInstance
          .patch("/api/shiftType/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchTypesShift();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  //delete shift
  const deleteShift = (row) => {
    axiosInstance
      .delete(`/api/shiftType/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchTypesShift();
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
      dataField: "shift_name",
      text: "Shift Name",
      sort: true,
      headerStyle: { minWidth: "410px" },
    },

    {
      dataField: "start_time",
      text: "Start time",
      sort: true,
      headerStyle: { minWidth: "350px" },
    },
    {
      dataField: "end_time",
      text: "End time",
      sort: true,
      headerStyle: { minWidth: "350px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "100px", textAlign: "left" },
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
              data-target="#FormModal"
              onClick={() => {editRow(helper.handleEdit(row))}}
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
              <li className="breadcrumb-item active">Shift List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => create()}
            >
              Add Shifts
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
              options={shiftsOpt}
              placeholder="Filter Shifts"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
        
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>

      <FormModal2
        title="Create Shift"
        editData={editData}
        setformValue={setFormValue}
        template={template}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Shift type"
        selectedRow={selectedRow}
        deleteFunction={deleteShift}
      />
    </>
  );
};

export default ShiftAdmin;
