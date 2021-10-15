import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";
import { ClientsFormJson } from "../../components/FormJSON/vendors-clients/clients";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const Clients = () => {
  const [editData, seteditData] = useState(null);
  const [template, setTemplate] = useState(ClientsFormJson);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchClient = () => {
    axiosInstance
      .get("/api/client")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchClient();
  }, []);

  //create new client
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        console.log(formValue);
        axiosInstance
          .post("/api/client", formValue)
          .then((res) => {
            setFormValue(null);
            fetchClient();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;

        axiosInstance
          .patch("/api/client/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchClient();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
    }
  }, [formValue, editData]);
  useEffect(() => {
    seteditData(clickedRow);
    return () => {
      seteditData(null);
    };
  }, [clickedRow, submitted]);

  const deleteClient = (row) => {
    axiosInstance
      .delete(`/api/client/${row._id}`)
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

  const columns = [
    {
      dataField: "client_name",
      text: "Full name",
      sort: true,
      headerStyle: { width: "350px" },
    },
    {
      dataField: "code",
      text: "Code",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "contact_phone",
      text: "Phone",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "state",
      text: "State/Region",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "country",
      text: "Country",
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
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
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
            <h3 className="page-title">Client List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Client List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Client
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
        title="New Client"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Assets"
        selectedRow={selectedRow}
        deleteFunction={deleteClient}
      />
    </>
  );
};

export default Clients;
