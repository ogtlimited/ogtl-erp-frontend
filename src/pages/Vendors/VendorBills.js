import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { BillForm } from "./components/form";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatter } from "../../services/numberFormatter";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { EditBillForm } from "./components/form/editForm";
import InvoiceBillApprover from "../../components/AccountingApproverBtn";

const VendorBills = () => {
  const [data, setData] = useState([]);
  const [editData, seteditData] = useState(null);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    setclickedRow(row);
  };

  const fetchBills = () => {
    axiosInstance
      .get("/api/bills")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow]);

  const deleteBill = (row) => {
    axiosInstance
      .delete(`/api/bills/${row._id}`)
      .then((res) => {
        fetchBills();
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
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
        .patch("/api/bills/status/" + statusRow._id, update)
        .then((res) => {
          fetchBills();
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
      text: "Billed Amount",
      sort: true,
      headerStyle: { minWidth: "200px" },
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
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <>
          <div className="dropdown dropdown-action text-right">
            <a
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              {row?.status === "Draft" && user?.role?.account?.update && (
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#EditFormModal"
                  onClick={() => editRow(row)}
                >
                  <i className="fa fa-pencil m-r-5"></i> Edit
                </a>
              )}
              {user?.role?.account?.read && (
                <Link className="dropdown-item" to={`/admin/bills/${row._id}`}>
                  <i className="fa fa-eye m-r-5"></i> View
                </Link>
              )}
              {user?.role?.account?.delete && (
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
              )}
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
            <h3 className="page-title">Bills</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Bills</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.account?.create && (
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Bill
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>

      <EditBillForm fetchBills={fetchBills} editData={editData} />

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
