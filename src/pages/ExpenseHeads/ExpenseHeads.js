import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { expenseHeadsFormJson } from "../../components/FormJSON/vendors-clients/expenseHeads";

const ExpenseHeads = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, setformUpdate, user } = useAppContext();
  const [submitted, setSubmitted] = useState(false);
  const [template, setTemplate] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };
  const fetchDept = () => {
    axiosInstance.get("/department").then((e) => {
      console.log(e.data.data);
      const departOpts = e.data.data.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      const finalForm = expenseHeadsFormJson.Fields.map((field) => {
        if (field.name === "departmentId") {
          field.options = departOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: expenseHeadsFormJson.title,
        Fields: finalForm,
      });
    });
  };
  useEffect(() => {
    fetchDept();
  }, []);
  const fetchVendor = () => {
    axiosInstance
      .get("/api/expense-head-draft")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchVendor();
  }, []);

  useEffect(() => {
    if (formValue) {
      if (!editData) {
        axiosInstance
          .post("/api/expense-head-draft", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchVendor();
            showAlert(true, res.data?.message, "alert alert-success");
          })
          .catch((error) => {
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
          .put("/api/expense-head-draft/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchVendor();
            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
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

  const deleteVendor = (row) => {
    axiosInstance
      .delete(`/api/expense-head-draft/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchVendor();
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
      dataField: "title",
      text: "title",
      sort: true,
      headerStyle: { width: "350px" },
    },
    {
      dataField: "departmentId.department",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "flagAlert",
      text: "Flag At %",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {user?.role?.account?.update && (
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => editRow(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.account?.delete && (
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setSelectedRow(row);
                }}
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
        <div className="row">
          <div className="col">
            <h3 className="page-title">Expense Heads</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Expense Heads</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.account?.create && (
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Expense Heads
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <FormModal2
        title="Create Expense Head"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(expenseHeadsFormJson.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Product Item"
        selectedRow={selectedRow}
        deleteFunction={deleteVendor}
      />
    </>
  );
};

export default ExpenseHeads;
