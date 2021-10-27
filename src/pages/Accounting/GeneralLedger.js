import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorsClientsFormJson } from "../../components/FormJSON/vendors-clients/vendorsClient";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";


const GeneralLedger = () => {
    const [data, setData] = useState([]);
    const [formValue, setFormValue] = useState({});
    const [editData, seteditData] = useState({});
    const { showAlert } = useAppContext();
    const [template, setTemplate] = useState(vendorsClientsFormJson);
    const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchClient = () => {
      axiosInstance
        .get("/api/clients")
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchClient();
  }, []);

  const columns = [
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "journalEntry",
      text: "Journal Entry",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "account",
      text: "Account",
      sort: true,
      headerStyle: { minWidth: "150px" }
    },
    {
      dataField: "debit",
      text: "Debit",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "credit",
      text: "Credit",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "reference",
      text: "Reference",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "total",
      text: "Total",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
  ];
  return (
    <>
       <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">General Ledger</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">General Ledger</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {/* <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Vendor
            </a> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
     
    </>
  );
}


export default GeneralLedger
