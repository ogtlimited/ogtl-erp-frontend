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
const Invoices = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(clientInvoiceFormJson);
  const [submitted, setSubmitted] = useState(false);
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
    </>
  );
};

export default Invoices;
