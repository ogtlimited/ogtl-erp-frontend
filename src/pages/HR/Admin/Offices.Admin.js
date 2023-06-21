/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import UniversalTable from "../../../components/Tables/UniversalTable";
import { OfficeFormModal } from "../../../components/Modal/OfficeFormModal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import moment from "moment";

const Offices = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [mode, setMode] = useState("Create");
  const [officeType, setOfficeType] = useState("Campaign");
  const [editOffice, setEditOffice] = useState([]);

  const actionUser = user?.employee_info?.roles;

  // All Offices:
  const fetchAllOffices = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.offices;

      const allDepartments = resData.filter(
        (e) => e?.office_type === "department"
      );
      const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

      const formattedDepartments = allDepartments.map((e, index) => ({
        ...e,
        index: index + 1,
        title: e?.title.toUpperCase(),
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      const formattedCampaigns = allCampaigns.map((e, index) => ({
        ...e,
        index: index + 1,
        title: e?.title.toUpperCase(),
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartments(formattedDepartments);
      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("Get All Offices error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOffices();
  }, []);

  const toggleCampaignAction = () => {
    setOfficeType("Campaign");
    setMode("Create");
  };

  const toggleDepartmentAction = () => {
    setOfficeType("Department");
    setMode("Create");
  };

  const handleEdit = (row) => {
    setEditOffice(row);
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
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
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
            {actionUser.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#OfficeFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {actionUser.includes("hr_manager") && (
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
            <h3 className="page-title">Offices</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">HR</a>
              </li>
              <li className="breadcrumb-item active">Office</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_campaigns"
                  onClick={toggleCampaignAction}
                >
                  Campaigns
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                  onClick={toggleDepartmentAction}
                >
                  Departments
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_campaigns" className="col-12 tab-pane show active">
            <UniversalTable
              columns={columns}
              data={campaigns}
              loading={loading}
            />
          </div>

          <div id="tab_departments" className="col-12 tab-pane">
            <UniversalTable
              columns={columns}
              data={departments}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <OfficeFormModal
        mode={mode}
        officeType={officeType}
        fetchAllOffices={fetchAllOffices}
        data={editOffice}
      />
    </>
  );
};

export default Offices;
