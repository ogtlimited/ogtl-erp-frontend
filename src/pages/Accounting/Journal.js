/* eslint-disable no-unused-vars */
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
import InvoiceModal from "../../components/Modal/invoiceModal";

const Journals = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(vendorsClientsFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [clickedRow, setclickedRow] = useState(null);

  const fetchJournal = () => {
    axiosInstance
      .get("/Journal")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJournal();
  }, []);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow]);
  const columns = [
    {
      dataField: "account",
      text: "Account",
      sort: true,
      headerStyle: { width: "300px" },
      formatter: (value, row) => <h2>{row?.account?.account_name}</h2>,
    },
    {
      dataField: "debit",
      text: "Debit",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "credit",
      text: "Credit",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Journals</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <InvoiceModal />
    </>
  );
};

export default Journals;
