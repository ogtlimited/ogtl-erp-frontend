import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { clientPaymentFormJson } from "../../components/FormJSON/vendors-clients/clientPayment";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { Link } from "react-router-dom";
import moment from "moment";
import InvoiceBillApprover from "../../components/AccountingApproverBtn";

const ClientPayments = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, setformUpdate, user } = useAppContext();
  const [template, setTemplate] = useState(clientPaymentFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");

  const editRow = (row) => {
    // setformUpdate(null)
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchClientPayment = () => {
    axiosInstance
      .get("/api/payment")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchClientPayment();
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/invoice")
      .then((res) => {
        console.log("invoice", res);
        const formOp = res.data.data.map((e) => {
          return {
            label: e?.customer?.company + " - " + e.ref,
            value: e._id,
          };
        });
        const finalForm = clientPaymentFormJson.Fields.map((field) => {
          if (field.name === "invoice") {
            field.options = formOp;
            return field;
          }
          return field;
        });
        setTemplate({
          title: clientPaymentFormJson.title,
          Fields: finalForm,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (formValue) {
      if (!editData) {
        axiosInstance
          .post("/api/payment/draft", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchClientPayment();
            showAlert(true, res.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      } else {
        formValue._id = editData._id;
        delete formValue.__v;
        delete formValue.createdAt;
        delete formValue.updatedAt;
        axiosInstance
          .patch("/api/payment/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchClientPayment();
            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(
              true,
              error?.response?.data?.message,
              "alert alert-danger"
            );
          });
      }
    }
  }, [formValue, editData]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted]);

  const deleteClientPayment = (row) => {
    axiosInstance
      .delete(`/api/payment/${row._id}`)
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

  //update payment status
  useEffect(() => {
    if (status.length) {
      const update = {
        _id: statusRow._id,
        status: status,
        number: statusRow.number,
        invoice: statusRow.invoice._id,
        date: statusRow.date,
        paymentMethod: statusRow.paymentMethod,
        total_amount: statusRow.total_amount,
        paymentStatus: statusRow.paymentStatus,
      };

      delete update.__v;
      // console.log("update", update);
      // return;
      axiosInstance
        .post("/api/payment/published", update)
        .then((res) => {
          fetchClientPayment();
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
      dataField: "number",
      text: "Number",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row.date).format("L")}</h2>,
    },
    {
      dataField: "journal",
      text: "Journal",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "paymentMethod",
      text: "Payment Method",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "invoice",
      text: "Invoice",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{row?.invoice?.ref}</h2>,
    },
    {
      dataField: "total_amount",
      text: "Amount",
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
        <div className="dropdown dropdown-action text-right">
          {row?.status === "Draft" && (
            <>
              <a
                className="action-icon dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {user?.role?.account?.update && (
                  <a
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target="#FormModal"
                    onClick={() => editRow(row)}
                  >
                    <i className="fa fa-pencil m-r-5"></i> Edit
                  </a>
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
            </>
          )}
        </div>
      ),
    },
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
            {user?.role?.account?.create && (
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Payment
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
      <FormModal2
        title="Create Client Payment"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Client Payment"
        selectedRow={selectedRow}
        deleteFunction={deleteClientPayment}
      />
    </>
  );
};

export default ClientPayments;
