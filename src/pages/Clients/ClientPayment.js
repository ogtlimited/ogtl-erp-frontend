import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorsClientsFormJson } from "../../components/FormJSON/vendors-clients/vendorsClient";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";


const ClientPayments = () => {
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
      dataField: "no",
      text: "Number",
      sort: true,
      headerStyle: { minWidth: "150px" }
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "journal",
      text: "Journal",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "paymentMethod",
      text: "Payment Method",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "client",
      text: "Client",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "100px" }
    }
  ];
  return (
    <>
       <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payments</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Payments</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Payment
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <FormModal2
        title="Make Payments"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
    </>
  );
}

export default ClientPayments
