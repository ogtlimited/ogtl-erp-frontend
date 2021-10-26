import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorPaymentFormJson } from "../../components/FormJSON/vendors-clients/payment";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import InvoiceBillApprover from "../../components/AccountingApproverBtn";

import moment from "moment";
import { formatter } from "../../services/numberFormatter";

const VendorPayments = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, setformUpdate } = useAppContext();
  const [template, setTemplate] = useState(vendorPaymentFormJson);
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
  const fetchVendorPayment = () => {
    axiosInstance
      .get("/api/payment")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchVendorPayment();
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/bills")
      .then((res) => {
        const formOp = res.data.data.map((e) => {
          return {
            label: `${e.vendor.company} - ${e.ref}`,
            value: e._id,
          };
        });
        const finalForm = vendorPaymentFormJson.Fields.map((field) => {
          if (field.name === "bill") {
            field.options = formOp;
            return field;
          }
          return field;
        });
        setTemplate({
          title: vendorPaymentFormJson.title,
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
            fetchVendorPayment();
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
            fetchVendorPayment();
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

  const deleteVendorPayment = (row) => {
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
        bill: statusRow.bill._id,
        date: statusRow.date,
        paymentMethod: statusRow.paymentMethod,
        total_amount: statusRow.total_amount,
        paymentStatus: statusRow.paymentStatus,
      };

      delete update.__v;
      axiosInstance
        .post("/api/payment/published", update)
        .then((res) => {
          fetchVendorPayment();
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
      formatter: (value, row) => <h2>{moment(row?.date).format("L")}</h2>,
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
      dataField: "bill",
      text: "Bill",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{row?.bill?.ref}</h2>,
    },
    {
      dataField: "total_amount",
      text: "Amount",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{formatter.format(row?.total_amount)}</p>,
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
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          {row?.status === "Draft" && (
            <>
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
            <Link
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Payment
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
      <FormModal2
        title="Create Vendor Payment"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Vendor Payment"
        selectedRow={selectedRow}
        deleteFunction={deleteVendorPayment}
      />
    </>
  );
};

export default VendorPayments;
