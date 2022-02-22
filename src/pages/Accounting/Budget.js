import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import FormModal2 from "../../components/Modal/FormModal2";
import { budgetFormJson } from "../../components/FormJSON/Accounting/budget";
import { useAppContext } from "../../Context/AppContext";
import helper from "../../services/helper";
import { BudgetForm } from "./components/budgetIndex";
import moment from "moment";
import { Link } from "react-router-dom";

import ApproveModal from "../../components/Modal/approveModal";
import GeneralApproverBtn from "../../components/Misc/GeneralApproverBtn";

const Budget = () => {
  const [approval, setApproval] = useState([
    {
      title: "draft",
      color: "text-primary",
    },
    {
      title: "approved",
      color: "text-success",
    },
    {
      title: "rejected",
      color: "text-danger",
    },
  ]);
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const { showAlert } = useAppContext();
  const [template, setTemplate] = useState(budgetFormJson);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [loadedSelect, setloadedSelect] = useState(false);
  const { user } = useAppContext();
  const fetchBudget = () => {
    axiosInstance
      .get("/api/budget")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBudget();
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow]);

  const deleteBudget = (row) => {
    axiosInstance
      .delete(`/api/budget/${row._id}`)
      .then((res) => {
        console.log(res);
        fetchBudget();
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

  useEffect(() => {
    if (status.length) {
      console.log("sttayus", { status, statusRow });
      axiosInstance
        .patch(`/api/budget/approve/${statusRow._id}?status=${status}`)
        .then((res) => {
          console.log(res);
          fetchBudget();
          setData((prevData) =>
            prevData.filter((pdata) => pdata._id !== statusRow._id)
          );
          showAlert(true, res.data.data, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error.response.data.data, "alert alert-danger");
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
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "250px" },
      // formatter: (value, row) => <h2>{row?._id.title}</h2>,
    },
    {
      dataField: "startDate",
      text: "Start Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.startDate).format("L")}</h2>,
    },
    {
      dataField: "endDate",
      text: "End Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.endDate).format("L")}</h2>,
    },
    {
      dataField: "budget",
      text: "Budget",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "flagAlert",
      text: "Flag Alert",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={approval}
            setStatus={setStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Budget</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Budget</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.account?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Create Budget
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

      {/* <EditBudgetForm fetchBudget={fetchBudget} editData={editData} /> */}
      <BudgetForm fetchBudget={fetchBudget} />
    </>
  );
};

export default Budget;
