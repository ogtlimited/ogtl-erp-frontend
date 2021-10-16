import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorBillFormJson } from "../../components/FormJSON/vendors-clients/bill";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import { BillForm } from "./components/form";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatter } from "../../services/numberFormatter";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const VendorBills = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(vendorBillFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    // setformUpdate(null)

    setclickedRow(row);
  };

  const fetchBills = () => {
    axiosInstance
      .get("/api/bills")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBills();
  }, []);

  const deleteBill = (row) => {
    axiosInstance
      .delete(`/api/bills/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchBills();
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
    // {
    //   dataField: "number",
    //   text: "Number",
    //   sort: true,
    //   headerStyle: { minWidth: "150px" },
    // },
    {
      dataField: "vendor",
      text: "Vendor",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.vendor?.company}</h2>,
    },
    {
      dataField: "bill_date",
      text: "Bill Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.bill_date).format("L")}</h2>,
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
      text: "Total Amount",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (val, row) => <p>{formatter.format(row?.total_amount)}</p>,
    },
    {
      dataField: "paid",
      text: "Amount Paid",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.paid)}</p>,
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
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <Link
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </Link>
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
            <h3 className="page-title">Bills</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Bills</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <Link
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Bill
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <BillForm fetchBills={fetchBills} />
      <ConfirmModal
        title="Bill"
        selectedRow={selectedRow}
        deleteFunction={deleteBill}
      />
    </>
  );
};

export default VendorBills;
