import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";
import ReactHtmlParser from "react-html-parser";
import { ApproverBtn } from "../ApproverBtn";

const SalaryComponents = ({ setformType, formValue, submitted }) => {
  const handleChange = (type) => {
    setformType(type);
  };
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");

  const fetchSalaryComponents = () => {
    axiosInstance
      .get("/api/salary-component")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryComponents();
  }, []);

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        ...formValue,
        amount: parseInt(formValue.amount),
      };
      axiosInstance
        .post("/api/salary-component", newFormValue)
        .then((res) => {
          fetchSalaryComponents();
          showAlert(true, "Salary component created.", "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue]);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "250px" },
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: (val, row) => <p>₦{row?.amount || "Not Available"}</p>,
      // headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (value, row) => (
        <>
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
            context="salary_component"
          />
        </>
      ),
    },
    {
      dataField: "projectId",
      text: "Project",
      sort: true,
      headerStyle: { minWidth: "200px" },

      formatter: (val, row) => (
        <p>{row?.projectId?.project_name || "Not Available"}</p>
      ),
    },
    {
      dataField: "departmentId",
      text: "Department",
      sort: true,
      // headerStyle: { minWidth: "200px" },

      formatter: (val, row) => (
        <p>{row?.departmentId?.department || "Not Available"}</p>
      ),
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { width: "200px" },

      formatter: (val, row) => <p>{row?.type.toUpperCase()}</p>,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: { width: "300px" },

      formatter: (value, row) => <h2>{ReactHtmlParser(row?.description)}</h2>,
    },
    {
      dataField: "",
      text: "",
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
    // {
    //   dataField: "over_time",
    //   text: "Overtime",
    //   headerStyle: { minWidth: "100px" },
    //   sort: true,
    //   style: {
    //     fontSize: "12px",
    //     lineHeight: "16px",
    //   },
    //},
  ];
  return (
    <>
      <div className="tab-pane show active" id="tab_components">
        <div className="text-right mb-4 clearfix">
          {user?.role?.hr?.create && (
            <button
              className="btn btn-primary add-btn"
              type="button"
              onClick={() => handleChange("components")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Components
            </button>
          )}
        </div>

        <LeavesTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default SalaryComponents;
