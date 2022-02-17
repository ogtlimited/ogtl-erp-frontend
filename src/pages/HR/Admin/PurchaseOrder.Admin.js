import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from "../../../db/promotion.json";
import { PurchaseOrderFormJson } from "../../../components/FormJSON/Assets/purchase-order";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import tokenService from "../../../services/token.service";
import { ApproverBtn } from "../../../components/ApproverBtn";

const PurchaseOrder = () => {
  const [template, setTemplate] = useState(PurchaseOrderFormJson);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");
  const user = tokenService.getUser();
  const [loadSelect, setloadSelect] = useState(false);
  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchPurchaseOrder = () => {
    axiosInstance
      .get("/api/purchase-order")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPurchaseOrder();
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      const { departments, branches, projects } =
        res.data.createEmployeeFormSelection;
      const departmentOpts = departments?.map((e) => {
        return {
          label: `${e.department}`,
          value: e._id,
        };
      });
      const branchOpts = branches?.map((e) => {
        return {
          label: `${e.branch}`,
          value: e._id,
        };
      });
      const projectOpts = projects?.map((e) => {
        return {
          label: `${e.project_name}`,
          value: e._id,
        };
      });

      const finalForm = PurchaseOrderFormJson.Fields.map((field) => {
        if (field.name === "departmentId") {
          field.options = departmentOpts;
          return field;
        } else if (field.name === "projectId") {
          field.options = projectOpts;
          return field;
        } else if (field.name === "location") {
          field.options = branchOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: PurchaseOrderFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
    });
  }, []);

  //create purchase orders
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        let newFormValue = {
          ...formValue,
        };
        if (newFormValue.projectId == "") {
          delete newFormValue.projectId;
        } else if (newFormValue.departmentId == "") {
          delete newFormValue.departmentId;
        }

        axiosInstance
          .post("/api/purchase-order", newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchPurchaseOrder();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;

        axiosInstance
          .patch("/api/purchase-order/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchPurchaseOrder();
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
    return () => {
      seteditData(null);
    };
  }, [clickedRow, submitted]);

  //delete purchase order
  const deletePurchaseOrder = (row) => {
    axiosInstance
      .delete(`/api/purchase-order/${row._id}`)

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
  const columns = [
    {
      dataField: "purchaseOrderId",
      text: "Purchase Order",
      sort: true,
    },
    {
      dataField: "productName",
      text: "Asset name",
      sort: true,
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
      dataField: "departmentId",
      text: "Department",
      sort: true,
      formatter: (value, row) => (
        <h2>{row?.departmentId?.department || "N/A"}</h2>
      ),
    },
    {
      dataField: "projectId",
      text: "Project",
      sort: true,
      formatter: (value, row) => (
        <h2>{row?.projectId?.project_name || "N/A"} </h2>
      ),
    },

    {
      dataField: "location",
      text: "Branch",
      sort: true,
      formatter: (value, row) => <h2>{row?.location?.branch || "N/A"}</h2>,
    },
    {
      dataField: "model",
      text: "model",
      sort: true,
    },
    {
      dataField: "manufacturer",
      text: "manufacturer",
      sort: true,
    },
    {
      dataField: "amount",
      text: "amount",
      sort: true,
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
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Purchase Order</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Purchase Order</li>
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
                <i className="fa fa-plus"></i> Add Purchase Order
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
        <FormModal2
          title="Create Purchase Order"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      )}
      <ConfirmModal
        title="Purchase Order"
        selectedRow={selectedRow}
        deleteFunction={deletePurchaseOrder}
      />
    </>
  );
};

export default PurchaseOrder;
