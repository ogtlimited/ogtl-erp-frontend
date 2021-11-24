import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { terminationFormJson } from "../../../components/FormJSON/HR/Employee-lifecycle/Termination";
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
const Termination = () => {
  const [template, setTemplate] = useState(terminationFormJson);
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { createPerfomance, showAlert } = useAppContext();
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const fetchTermination = () => {
    axiosInstance
      .get("/api/termination")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTermination();
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
      const finalForm = terminationFormJson.Fields.map((field) => {
        if (field.name === "employee") {
          field.options = employeeOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: terminationFormJson.title,
        Fields: finalForm,
      });
      if (!loadSelect) setloadSelect(true);
      console.log(template);
    });
  }, []);

  //create termination
  useEffect(() => {
    console.log(submitted);
    if (submitted === true) {
      axiosInstance
        .post("/api/termination", formValue)
        .then((res) => {
          setSubmitted(false);
          fetchTermination();
          //   setData((prevData) => [...prevData, res.data.data]);

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    console.log(formValue);
  }, [submitted, formValue]);

  //delete score card
  const deleteTermination = (row) => {
    axiosInstance
      .delete(`/api/termination/${row._id}`)
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

  const updateTermination = (row) => {
    axiosInstance
      .patch(`/api/termination/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchTermination();
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "employee",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee?.first_name} {row?.employee?.last_name}
        </h2>
      ),
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
    },
    {
      dataField: "terminationType",
      text: "Termination Type",
      sort: true,
    },

    {
      dataField: "terminationDate",
      text: "Termination Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.terminationDate).format("L")}</h2>
      ),
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
            <a
              className="dropdown-item"
              onClick={() => console.log(row)}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
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
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">termination</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Termination</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Termination
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
        deleteFunction={deleteTermination}
      />
    </>
  );
};
export default Termination;
