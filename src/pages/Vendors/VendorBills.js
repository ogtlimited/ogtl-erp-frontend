import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorBillFormJson } from "../../components/FormJSON/vendors-clients/bill";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";

const VendorBills = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(vendorBillFormJson);
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
      dataField: "number",
      text: "Number",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "vendor",
      text: "Vendor",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "bill_date",
      text: "Bill Date",
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
      dataField: "reference",
      text: "Reference",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "total",
      text: "Total",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: () => (
        <a href="#" className="btn btn-sm btn-primary">
          PDF
        </a>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Bills</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Bills</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Vendor
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
        title="Create Vendor"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default VendorBills;
