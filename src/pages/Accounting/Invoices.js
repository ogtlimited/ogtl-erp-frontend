import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/charts/dashboard-stats";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";
import { clientInvoiceFormJson } from "../../components/FormJSON/clients/client-invoice";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import InvoiceModal from "../../components/Modal/invoiceModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const Invoices = () => {
  const [data, setData] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, combineRequest, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(clientInvoiceFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchInvoice = () => {
    axiosInstance
      .get("/api/invoice")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    if (formValue) {
      if (!editData) {
        console.log(formValue);
        axiosInstance
          .post("/api/invoice", formValue)
          .then((res) => {
            setFormValue(null);
            fetchInvoice();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;
        delete formValue.__v;
        delete formValue._id;
        delete formValue.createdAt;
        delete formValue.updatedAt;
        axiosInstance
          .patch("/api/invoice" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchInvoice();
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

  const deleteInvoice = (row) => {
    axiosInstance
      .delete(`/api/client/${row._id}`)
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
      dataField: "no",
      text: "Number",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "customer",
      text: "Customer",
      sort: true,
      headerStyle: { width: "300px" },
    },
    {
      dataField: "date",
      text: "Invoice Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "due_date",
      text: "Due Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "total",
      text: "Total",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
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
              data-target="#InvoiceModal"
              onClick={() => editRow(row)}
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
            <h3 className="page-title">Invoices</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#invoiceForm"
            >
              <i className="fa fa-plus"></i> Add Invoice
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <DashboardStats />
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <InvoiceModal
        title="Create Invoice"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Assets"
        selectedRow={selectedRow}
        deleteFunction={deleteInvoice}
      />
    </>
  );
};

export default Invoices;
