/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { maintenanceReportFormJson } from "../../components/FormJSON/Maintenance/MaintenanceReport";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import HelperService from "../../services/helper";
import axiosInstance from "../../services/api";
import tokenService from "../../services/token.service";
import FormModal2 from "../../components/Modal/FormModal2";

const MaintenanceReport = () => {
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const { showAlert, setformUpdate } = useAppContext();
  const user = tokenService.getUser();

  const editRow = (row) => {
    // setformUpdate(null)
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchMaintenanceReport = () => {
    axiosInstance
      .get("/api/maintenanceReport")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMaintenanceReport();
  }, []);

  //create shift
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        let newFormValue = {
          created_by: user?._id,
          ...formValue,
        };
        axiosInstance
          .post("/api/maintenanceReport", newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchMaintenanceReport();
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
          .patch("/api/maintenanceReport/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchMaintenanceReport();
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
  }, [formValue, user?._id, editData]);
  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  //delete shift
  const deleteMaintenanceReport = (row) => {
    axiosInstance
      .delete(`/api/maintenanceReport/${row._id}`)
      .then((res) => {
        fetchMaintenanceReport();
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "created_by",
      text: "Created By",
      sort: true,

      formatter: (value, row) => (
        <h2>
          {row?.created_by?.first_name} {row?.created_by?.middle_name}{" "}
          {row?.created_by?.last_name}
        </h2>
      ),
    },

    {
      dataField: "description",
      text: "Description",
      sort: true,
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.description)}</h2>,
    },
    {
      dataField: "issues",
      text: "issues",
      sort: true,
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.issues)}</h2>,
    },
    {
      dataField: "recommendation",
      text: "Recommendation",
      sort: true,
      formatter: (value, row) => (
        <h2>{ReactHtmlParser(row?.recommendation)}</h2>
      ),
    },
    {
      dataField: "date_of_report",
      text: "Date of report",
      sort: true,

      formatter: (value, row) => (
        <h2>{moment(row?.date_of_report).format("L")}</h2>
      ),
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { textAlign: "left" },
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
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
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
            <h3 className="page-title">Maintenance Report List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>

              <li className="breadcrumb-item active">
                Maintenance Report List
              </li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Maintenance Report
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <FormModal2
        title="Create Maintenance Report"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(
          maintenanceReportFormJson.Fields
        )}
        setsubmitted={setSubmitted}
      />

      <ConfirmModal
        title="Maintenance Report"
        selectedRow={selectedRow}
        deleteFunction={deleteMaintenanceReport}
      />
    </>
  );
};

export default MaintenanceReport;
