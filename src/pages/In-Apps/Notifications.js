import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { NotForm } from "../../components/Modal/Notmodal";

const Notifications = () => {
  const [data, setData] = useState([]);
  const [editData, seteditData] = useState(null);
  const { showAlert } = useAppContext();

  const [selectedRow, setSelectedRow] = useState(null);

  const editRow = (row, stri) => {
    if (stri === "edit") {
      seteditData(row);
    } else {
      seteditData(null);
    }
  };

  const fetchNotifications = () => {
    axiosInstance
      .get("/api/notification")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = (row) => {
    axiosInstance
      .delete(`/api/notification/${row._id}`)
      .then((res) => {
        fetchNotifications();
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "document_name",
      text: "Document Name",
      sort: true,
      // headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "send_alert_on",
      text: "Send On",
      sort: true,
      // headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "sender",
      text: "Sender",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "disabled",
      text: "Disabled",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "receiver_role",
      text: "Recipient ",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <p>
          {value.map((val) => (
            <p>{val}</p>
          ))}
        </p>
      ),
    },
    {
      dataField: "message",
      text: "Message",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "50px" },
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
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => editRow(row, "edit")}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
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
            <h3 className="page-title">Notifications</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Notifications</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(null)}
            >
              <i className="fa fa-plus"></i> Add Notification
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>

      <NotForm fetchNotifications={fetchNotifications} editData={editData} />
      <ConfirmModal
        title="Notification"
        selectedRow={selectedRow}
        deleteFunction={deleteNotification}
      />
    </>
  );
};

export default Notifications;
