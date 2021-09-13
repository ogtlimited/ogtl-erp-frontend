/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import { useAppContext } from "../../../Context/AppContext";
import { shiftRequestFormJson } from "../../../components/FormJSON/HR/shift/ShiftRequest";
import axiosInstance from "../../../services/api";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import moment from "moment";

const ShiftRequest = () => {
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [editData, seteditData] = useState({});
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const imageUrl = "https://erp.outsourceglobal.com";

  const { showAlert } = useAppContext();

  const fetchShiftRequests = () => {
    axiosInstance
      .get("/api/shiftRequest")
      .then((res) => {
        console.log("Shifts requests", res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchShiftRequests();
  }, []);

  //delete shift Request
  const deleteShiftRequest = (row) => {
    axiosInstance
      .delete(`/api/shiftRequest/${row._id}`)
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
      dataField: "employee_id",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "410px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.employee_id.image
                  ? imageUrl + row.employee_id.image
                  : row.employee_id.gender == "Male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to="/admin/profile-dashboard">
            {row.employee_id.first_name} {row.employee_id.last_name}{" "}
            <span>{row.employee_id.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "shift_type_id",
      text: "Shift Type",
      sort: true,
      headerStyle: { minWidth: "350px" },
      formatter: (value, row) => <h2>{row.shift_type_id.shift_name}</h2>,
    },
    {
      dataField: "from_date",
      text: "From Date",
      sort: true,
      headerStyle: { minWidth: "170px" },
      formatter: (value, row) => <h2>{moment(row.from_date).format("L")}</h2>,
    },
    {
      dataField: "to_date",
      text: "To Date",
      sort: true,
      headerStyle: { minWidth: "170px" },
      formatter: (value, row) => <h2>{moment(row.to_date).format("L")}</h2>,
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
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
              onClick={() => {}}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <Link
              className="dropdown-item"
              onClick={() => deleteShiftRequest(row)}
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
            <h3 className="page-title">Shift Requests</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Shift Requests List</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <FormModal editData={editData} setformValue={setFormValue} template={shiftRequestFormJson} />
    </>
  );
};

export default ShiftRequest;
