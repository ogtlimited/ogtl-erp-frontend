/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { BranchForm } from "../../../components/FormJSON/CreateBranch";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { BranchFormModal } from "../../../components/Modal/BranchFormModal";
import moment from "moment";

const BranchAdmin = () => {
  const [allBranch, setallBranch] = useState([]);
  const { user } = useAppContext();
  const [mode, setMode] = useState("Create");
  const [branch, setBranch] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "hr_associate"]

  // All Branches:
  const fetchAllBranches = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/branches.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.branches;

      const formatted = resData.map((branch, index) => ({
        ...branch,
        index: index + 1,
        title: branch?.title.toUpperCase(),
        state: branch?.state,
        country: branch?.country,
        created_at: moment(branch?.created_at).format("Do MMMM, YYYY"),
        value: branch.id,
      }));

      setallBranch(formatted);
    } catch (error) {
      console.log("All Branches error:", error);
    }
  };

  useEffect(() => {
    fetchAllBranches();
  }, []);

  const handleCreate = () => {
    setMode("Create");
    setBranch(BranchForm);
  };

  const handleEdit = (row) => {
    setBranch(row);
    setMode("Edit");
  };

  const columns = [
    {
      dataField: "index",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "title",
      text: "Branch",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
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
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#BranchFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {CurrentUserRoles.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
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
            <h3 className="page-title">Branch</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Branch</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {canCreate.includes(...CurrentUserRoles) ? (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#BranchFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Branch
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row  ">
        <UniversalTable data={allBranch} columns={columns} />
      </div>

      <BranchFormModal
        mode={mode}
        data={branch}
        fetchAllBranches={fetchAllBranches}
      />
    </>
  );
};

export default BranchAdmin;
