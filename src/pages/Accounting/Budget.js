import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { budgetFormJson } from "../../components/FormJSON/Accounting/budget";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";

const Budget = () => {
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(budgetFormJson);
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
      dataField: "budget",
      text: "Budget",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "startDate",
      text: "Start Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "endDate",
      text: "End Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
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
              <i className="fa fa-plus"></i> Create Budget
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
        title="Create New Budget"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default Budget;
