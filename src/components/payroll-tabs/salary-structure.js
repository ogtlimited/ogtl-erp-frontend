import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/api";
import SalaryStructureModal from "../Modal/SalaryStructureModal";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalaryStructure = () => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);

  const [type, settype] = useState(null);

  const fetchSalaryStructures = () => {
    axiosInstance
      .get("/api/salary-structure")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryStructures();
  }, []);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "projectId",
      text: "Project",
      sort: true,
      headerStyle: { minWidth: "150px" },

      formatter: (val, row) => (
        <p>{row?.projectId?.project_name || "Not Available"}</p>
      ),
    },
    {
      dataField: "departmentId",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },

      formatter: (val, row) => (
        <p>{row?.departmentId?.department || "Not Available"}</p>
      ),
    },
    {
      dataField: "earnings",
      text: "Earnings",
      sort: true,
      formatter: (val, row) => (
        <>
          {row?.earnings.map((earn) => (
            <p>
              {earn?.title} - ₦{earn?.amount}
            </p>
          ))}
        </>
      ),
    },
    {
      dataField: "deductions",
      text: "Deductions",
      sort: true,
      formatter: (val, row) => (
        <>
          {row?.deductions.map((deduction) => (
            <p>
              {deduction?.title} - ₦{deduction?.amount}
            </p>
          ))}
        </>
      ),
    },
    {
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      formatter: (val, row) => <p>₦{row?.netPay}</p>,
    },
    {
      dataField: "",
      text: "",

      style: {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
  ];
  return (
    <>
      <div className="tab-pane" id="tab_structure">
        <div className="text-right mb-4 clearfix">
          <div className="dropdown">
            <button
              className="btn btn-secondary btn-primary add-btn "
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Add Structure
              <i className="fa fa-plus px-1"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link
                className="dropdown-item"
                onClick={() => settype("projectId")}
                data-toggle="modal"
                data-target="#SalaryStructureModal"
                href=""
              >
                Project
              </Link>
              <Link
                className="dropdown-item"
                onClick={() => settype("departmentId")}
                data-toggle="modal"
                data-target="#SalaryStructureModal"
                href=""
              >
                Department
              </Link>
            </div>
          </div>
        </div>
        <LeavesTable data={data} columns={columns} />
        <SalaryStructureModal
          type={type}
          fetchSalaryStructures={fetchSalaryStructures}
        />
      </div>
    </>
  );
};

export default SalaryStructure;
