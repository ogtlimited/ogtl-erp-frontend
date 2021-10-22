import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorsClientsFormJson } from "../../components/FormJSON/vendors-clients/vendorsClient";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const Vendors = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert, setformUpdate } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchVendor = () => {
    axiosInstance
      .get("/api/vendor")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchVendor();
  }, []);

  useEffect(() => {
    if (formValue) {
      if (!editData) {
        axiosInstance
          .post("/api/vendor", formValue)
          .then((res) => {
            setFormValue(null);
            setData((prevData) => [...prevData, res.data.data]);
            fetchVendor();
            showAlert(true, res.data?.message, "alert alert-success");
          })
          .catch((error) => {
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
          .patch("/api/vendor/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchVendor();

            showAlert(true, res?.data?.message, "alert alert-success");
          })
          .catch((error) => {
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

  const deleteVendor = (row) => {
    axiosInstance
      .delete(`/api/vendor/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchVendor();
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
      dataField: "fullName",
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
      dataField: "phone",
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
      dataField: "stateRegion",
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
            <h3 className="page-title">Vendor List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Vendor List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <Link
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Vendor
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
        title="Create Vendor"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(vendorsClientsFormJson.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Vendor"
        selectedRow={selectedRow}
        deleteFunction={deleteVendor}
      />
    </>
  );
};

export default Vendors;
