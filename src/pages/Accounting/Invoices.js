import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/charts/dashboard-stats";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";
import { clientInvoiceFormJson } from "../../components/FormJSON/clients/client-invoice";
import { InvoiceForm } from "./components";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import InvoiceModal from "../../components/Modal/invoiceModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { EditInvoiceForm } from "./components/editForm";
import InvoiceBillApprover from "../../components/AccountingApproverBtn";

const Invoices = () => {
  const card = [];
  const [data, setData] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, combineRequest, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(clientInvoiceFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [earnings, setearnings] = useState(0);
  const editRow = (row) => {
    setclickedRow(row);
  };

  const fetchInvoice = () => {
    axiosInstance
      .get("/api/invoice")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        const invoices = res.data.data;
        let earn = invoices.reduce((a, b) => a.paid + b.paid, 0);
        setearnings(earn);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow]);

  const deleteInvoice = (row) => {
    axiosInstance
      .delete(`/api/invoice/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchInvoice();
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

  useEffect(() => {
    if (status.length) {
      const update = {
        status,
      };
      delete update.__v;
      axiosInstance
        .patch("/api/invoice/status/" + statusRow._id, update)
        .then((res) => {
          fetchInvoice();
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    return () => {
      setStatus("");
      setstatusRow(null);
      showAlert(false);
    };
  }, [status, statusRow]);

  const columns = [
    {
      dataField: "customer",
      text: "Customer",
      sort: true,
      headerStyle: { width: "300px" },
      formatter: (value, row) => <h2>{row?.customer?.company}</h2>,
    },
    {
      dataField: "invoice_date",
      text: "Invoice Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.invoice_date).format("L")}</h2>
      ),
    },
    {
      dataField: "due_date",
      text: "Due Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.due_date).format("L")}</h2>,
    },
    {
      dataField: "ref",
      text: "Reference",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "total_amount",
      text: "Total",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.total_amount)}</p>,
    },
    {
      dataField: "paid",
      text: "Amount Paid",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.paid) || 0}</p>,
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.balance)}</p>,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <>
          <InvoiceBillApprover
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
          />
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
          <div className="dropdown dropdown-action text-right">
            <Link
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              {row?.status === "Draft" && (
                <Link
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#EditFormModal"
                  onClick={() => editRow(row)}
                >
                  <i className="fa fa-pencil m-r-5"></i> Edit
                </Link>
              )}
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
        </>
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
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Invoices</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Invoice
            </a>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-12">
          <div className="card-group m-b-30">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="d-block">New Invoices</span>
                  </div>
                  <div>
                    <span className="text-success">+10%</span>
                  </div>
                </div>
                <h3 className="mb-3">10</h3>
                <div className="progress mb-2" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "70%" }}
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="mb-0">Overall Invoices 218</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>

      <EditInvoiceForm fetchInvoice={fetchInvoice} editData={editData} />
      <InvoiceForm fetchInvoice={fetchInvoice} />

      <ConfirmModal
        title="Invoice"
        selectedRow={selectedRow}
        deleteFunction={deleteInvoice}
      />
    </>
  );
};

export default Invoices;
