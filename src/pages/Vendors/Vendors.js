import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { vendorsClientsFormJson } from "../../components/FormJSON/vendors-clients/vendorsClient";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";


const Vendors = () => {
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
      dataField: "fullName",
      text: "Full name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (val, row) => (
        <h2 className="table-avatar">
          <span>
            {row?.employeeId?.fullName} {" "}
          </span>
        </h2>
      ),
    },
    {
      dataField: "code",
      text: "Code",
      sort: true,
      headerStyle: { minWidth: "150px" }
    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "state-region",
      text: "State/Region",
      sort: true,
      headerStyle: { minWidth: "100px" }
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      headerStyle: { minWidth: "100px" }
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
            <h3 className="page-title">Vendor List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Vendor List</li>
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
}

export default Vendors
