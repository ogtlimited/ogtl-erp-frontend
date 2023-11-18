/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { promotionFormJson } from "../../../components/FormJSON/HR/Employee-lifecycle/Promotion";
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";

const Promotion = () => {
  const [template, setTemplate] = useState(promotionFormJson);
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { createPerfomance, showAlert, user } = useAppContext();
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const fetchPromotion = () => {
    axiosInstance
      .get("/api/promotion")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPromotion();
  }, []);

  useEffect(() => {
    createPerfomance().then((res) => {
      const { employees, designations } = res.data.createPerformanceForm;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const designationOpts = designations?.map((e) => {
        return {
          label: `${e.designation}`,
          value: e._id,
        };
      });
      const finalForm = promotionFormJson.Fields.map((field) => {
        if (field.name === "employee") {
          field.options = employeeOpts;
          return field;
        } else if (field.name === "newDesignation") {
          field.options = designationOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: promotionFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, [loadSelect]);
  //create promotion
  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/api/promotion", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchPromotion();
          setData((prevData) => [...data, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);

  //delete score card
  const deletePromotion = (row) => {
    axiosInstance
      .delete(`/api/promotion/${row._id}`)
      .then((res) => {
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

  const updatePromotion = (row) => {
    axiosInstance
      .patch(`/api/promotion/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchPromotion();
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "employee",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee?.first_name} {row?.employee?.last_name}
        </h2>
      ),
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.employee?.department?.title}</h2>,
    },
    {
      dataField: "promotion_from",
      text: "Former Designation",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{row?.employee?.designation?.designation}</h2>
      ),
    },
    {
      dataField: "newDesignation",
      text: "New Designation",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{row?.newDesignation?.designation}</h2>,
    },
    {
      dataField: "promotionDate",
      text: "Promotion Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.promotionDate).format("L")}</h2>
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
            {user?.role?.hr?.update && (
              <a
                className="dropdown-item"
                onClick={() => console.log(row)}
                href="#"
                data-toggle="modal"
                data-target="#edit_employee"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.hr?.delete && (
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
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Promotion</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Promotion</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Promotion
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
        deleteFunction={deletePromotion}
      />
    </>
  );
};

export default Promotion;
