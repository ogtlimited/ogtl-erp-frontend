import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { scoreCardsJSON } from "../../../components/FormJSON/HR/Performance/score-cards";
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const ScoreCards = () => {
  const [template, setTemplate] = useState(scoreCardsJSON);
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { createPerfomance, showAlert, user } = useAppContext();
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const fetchScoreCard = () => {
    axiosInstance
      .get("/scoreCard")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchScoreCard();
  }, []);

  useEffect(() => {
    createPerfomance().then((res) => {
      console.log(res);
      const { employees } = res.data.createPerformanceForm;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = scoreCardsJSON.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = employeeOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: scoreCardsJSON.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
      console.log(template);
    });
  }, []);

  //create score card
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/scoreCard", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchScoreCard();

          console.log(res);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error?.response?.data);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  //delete score card
  const deleteScoreCard = (row) => {
    axiosInstance
      .delete(`/scoreCard/${row._id}`)
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

  //update score card
  const updateScoreCard = (row) => {
    axiosInstance
      .patch(`/scoreCard/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchScoreCard();
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
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee_id?.first_name} {row?.employee_id?.last_name}
        </h2>
      ),
    },

    {
      dataField: "company_values_score",
      text: "Company Values Score",
      sort: true,
    },

    {
      dataField: "performance_score",
      text: "Performance Score",
      sort: true,
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
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
            {user?.role?.hr?.update && (
              <a
                className="dropdown-item"
                onClick={() => console.log(row)}
                href="#"
                data-toggle="modal"
                data-target="#edit_employee"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.hr?.delete && (
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
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Perfomance</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Score Cards</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Score Card
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect && (
        <FormModal
          editData={editData}
          template={template}
          setsubmitted={setSubmitted}
          setformValue={setFormValue}
        />
      )}
      <ConfirmModal
        title="Assets"
        selectedRow={selectedRow}
        deleteFunction={deleteScoreCard}
      />
    </>
  );
};

export default ScoreCards;
