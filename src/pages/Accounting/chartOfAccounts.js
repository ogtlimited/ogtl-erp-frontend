import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/charts/dashboard-stats";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";
import { vendorsClientsFormJson } from "../../components/FormJSON/vendors-clients/vendorsClient";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import chartofaccounts from "../../db/chartofaccounts.json";
import InvoiceModal from "../../components/Modal/invoiceModal";
const ChartOfAccounts = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(vendorsClientsFormJson);
  const [submitted, setSubmitted] = useState(false);
  const columns = [
    {
      dataField: "number",
      text: "Number",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { width: "300px" },
    },
    {
      dataField: "account",
      text: "Account",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val,row) =>(
        <>
          {row.balance.length > 0 ? <a href="#" className="">View Register</a>: ''
          }
          
        </>
      ),
          
      
    },
  ];
  const cards = [
      {
          title: 'Account Payables',
          amount: '260,900',
          icon: 'las la-hand-holding-usd',
      },
      {
          title: 'Account Receivables',
          amount: '672,300',
          icon: 'las la-money-bill-wave-alt',
      },
      {
          title: 'Bank',
          amount: '523,000',
          icon: 'las la-coins',
      },
      {
          title: 'Invoices',
          amount: '23,000',
          icon: 'las la-file-invoice-dollar',
      },
  ]
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Chart of Accounts</h3>
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
              <i className="fa fa-plus"></i> New Account
            </a>
          </div>
        </div>
      </div>
      <div className="row">
          {cards.map(card =>(
            <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
                <div class="card-body">
                <span class="dash-widget-icon">
                <i class={card.icon}></i>
                </span>
                <div class="dash-widget-info">
                    <h3>${card.amount}</h3>
                    <span>{card.title}</span>
                </div>
                </div>
            </div>
            </div>

          ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={chartofaccounts} />
        </div>
      </div>
      <InvoiceModal />
    </>
  );
};

export default ChartOfAccounts;
