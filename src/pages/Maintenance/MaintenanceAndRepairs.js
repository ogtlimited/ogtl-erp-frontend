/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import HelperService from "../../services/helper";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { maintenanceAndRepairFormJson } from "../../components/FormJSON/Maintenance/MaintenanceAndReparis";
import { formatter } from "../../services/numberFormatter";
import { ApproverBtn } from "../../components/ApproverBtn";
import tokenService from "../../services/token.service";

const MaintenanceAndRepairs = () => {
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [template, setTemplate] = useState(maintenanceAndRepairFormJson);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");
  const user = tokenService.getUser();
  const { showAlert, setformUpdate } = useAppContext();

  const editRow = (row) => {
    // setformUpdate(null)
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchMaintenanceAndRepairs = () => {
    axiosInstance
      .get("/api/maintenanceAndRepairs")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMaintenanceAndRepairs();
  }, []);

  useEffect(() => {
    axiosInstance.get("api/assets").then((res) => {
      const assetOpts = res.data.data?.map((e) => {
        return {
          label: `${e?.assetName?.productName} ${e?.assetName?.model}`,
          value: e._id,
        };
      });

      const finalForm = maintenanceAndRepairFormJson.Fields.map((field) => {
        if (field.name === "asset_id") {
          field.options = assetOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: maintenanceAndRepairFormJson.title,
        Fields: finalForm,
      });
    });
  }, []);

  useEffect(() => {
    if (formValue) {
      if (!editData) {
        axiosInstance
          .post("/api/maintenanceAndRepairs", formValue)
          .then((res) => {
            setFormValue(null);
            fetchMaintenanceAndRepairs();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;
        let newFormValue = {
          ...formValue,
          asset_id: formValue.asset_id.assetId,
        };
        delete newFormValue.__v;
        delete newFormValue.createdAt;
        delete newFormValue.updatedAt;
        axiosInstance
          .patch("/api/maintenanceAndRepairs/" + editData._id, newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchMaintenanceAndRepairs();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
    }
  }, [formValue, editData]);
  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  useEffect(() => {
    if (status.length) {
      const update = {
        status,
      };

      axiosInstance
        .patch("/api/maintenanceAndRepairs/status/" + statusRow._id, update)
        .then((res) => {
          fetchMaintenanceAndRepairs();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    return () => {
      setStatus("");
      setstatusRow(null);
      showAlert(false);
    };
  }, [status, statusRow]);

  //delete shift
  const deleteMaintenanceReport = (row) => {
    axiosInstance
      .delete(`/api/maintenanceAndRepairs/${row._id}`)
      .then((res) => {
        fetchMaintenanceAndRepairs();
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
      dataField: "asset_id",
      text: "Asset",
      sort: true,

      formatter: (value, row) => <h2>{row?.asset_id?.assetName} </h2>,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,

      formatter: (value, row) => (
        <>
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
            context="maintenance"
          />
        </>
      ),
    },

    {
      dataField: "issue",
      text: "Issue",
      sort: true,
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.issue)}</h2>,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: (value, row) => <h2>{formatter.format(row?.amount)}</h2>,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
    {
      dataField: "date_of_maintenance",
      text: "Date of report",
      sort: true,

      formatter: (value, row) => (
        <h2>{moment(row?.date_of_maintenance).format("L")}</h2>
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
            <h3 className="page-title">Maintenance And Repairs List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>

              <li className="breadcrumb-item active">
                Maintenance And Repairs List
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
              Add Maintenance And Repairs
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
        title="Create Maintenance And Repairs"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />

      <ConfirmModal
        title="Maintenance And Repairs"
        selectedRow={selectedRow}
        deleteFunction={deleteMaintenanceReport}
      />
    </>
  );
};

export default MaintenanceAndRepairs;
