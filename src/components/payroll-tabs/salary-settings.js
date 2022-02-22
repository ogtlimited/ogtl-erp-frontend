import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalarySettings = ({ setformType, formValue, submitted }) => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();

  const handleChange = (type) => {
    setformType(type);
  };
  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/salary-setting`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryAssignments();
  }, []);

  useEffect(() => {
    if (submitted === true) {
      let newValue = {
        title: formValue.title,
        percentage: parseInt(formValue.percentage),
        type: formValue.type,
        startRange: parseInt(formValue.startRange),
        endRange: parseInt(formValue.endRange),
      };

      axiosInstance
        .post("/api/salary-setting", newValue)
        .then((res) => {
          fetchSalaryAssignments();
          showAlert(true, "Salary settings created.", "alert alert-success");
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
      headerStyle: { minWidth: "300px" },
    },
    {
      dataField: "percentage",
      text: "Percentage",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { width: "200px" },
    },
    {
      dataField: "startRange",
      text: "Start Range",
      sort: true,
      headerStyle: { width: "200px" },
    },
    {
      dataField: "endRange",
      text: "End Range",
      sort: true,
      headerStyle: { width: "200px" },
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
  ];
  return (
    <>
      <div className="tab-pane" id="tab_settings">
        <div className="text-right mb-4 clearfix">
          {user?.role?.hr?.create && (
            <button
              className="btn btn-primary add-btn"
              type="button"
              onClick={() => handleChange("settings")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add Salary Settings
            </button>
          )}
        </div>

        <LeavesTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default SalarySettings;
