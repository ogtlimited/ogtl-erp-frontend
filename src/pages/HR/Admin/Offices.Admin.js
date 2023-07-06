/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import { OfficeFormModal } from "../../../components/Modal/OfficeFormModal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { OfficeForm } from "../../../components/FormJSON/CreateOffices.js";
import moment from "moment";

const Offices = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [mode, setMode] = useState("Create");
  const [officeType, setOfficeType] = useState("Campaign");
  const [office, setOffice] = useState([]);

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "hr_associate"]

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: CampaignPage,
          limit: CampaignSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = CampaignSizePerPage;
      const thisTotalPageSize = totalPages;

      setCampaignSizePerPage(thisPageLimit);
      setTotalCampaignPages(thisTotalPageSize);

      const formattedCampaigns = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("Get All Campaigns error:", error);
      setLoading(false);
    }
  }, [CampaignPage, CampaignSizePerPage]);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: DepartmentPage,
          limit: DepartmentSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = DepartmentSizePerPage;
      const thisTotalPageSize = totalPages;

      setDepartmentSizePerPage(thisPageLimit);
      setTotalDepartmentPages(thisTotalPageSize);

      const formattedDepartments = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("Get All Departments error:", error);
      setLoading(false);
    }
  }, [DepartmentPage, DepartmentSizePerPage]);

  useEffect(() => {
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllCampaigns, fetchAllDepartments]);

  const toggleCampaignAction = () => {
    setOfficeType("Campaign");
    setMode("Create");
  };

  const toggleDepartmentAction = () => {
    setOfficeType("Department");
    setMode("Create");
  };

  const handleCreate = () => {
    setMode("Create");
    setOffice(OfficeForm);
  };

  const handleEdit = (row) => {
    setOffice(row);
    setMode("Edit");
  };

  const columns = [
    // {
    //   dataField: "index",
    //   text: "S/N",
    //   sort: true,
    //   headerStyle: { width: "5%" },
    // },
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
            {CurrentUserRoles.includes("hr_manager") && (
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
            <h3 className="page-title">Offices</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Office</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {canCreate.includes(...CurrentUserRoles) ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#OfficeFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Office
              </a>
            ) : null}
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
            <UniversalPaginatedTable
              columns={columns}
              data={campaigns}
              loading={loading}
              setLoading={setLoading}
              page={CampaignPage}
              setPage={setCampaignPage}
              sizePerPage={CampaignSizePerPage}
              setSizePerPage={setCampaignSizePerPage}
              totalPages={totalCampaignPages}
              setTotalPages={setTotalCampaignPages}
            />
          </div>

          <div id="tab_departments" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={columns}
              data={departments}
              loading={loading}
              setLoading={setLoading}
              page={DepartmentPage}
              setPage={setDepartmentPage}
              sizePerPage={DepartmentSizePerPage}
              setSizePerPage={setDepartmentSizePerPage}
              totalPages={totalDepartmentPages}
              setTotalPages={setTotalDepartmentPages}
            />
          </div>
        </div>
      </div>

      <OfficeFormModal
        mode={mode}
        officeType={officeType}
        setOfficeType={setOfficeType}
        fetchAllCampaigns={fetchAllCampaigns}
        fetchAllDepartments={fetchAllDepartments}
        data={office}
      />
    </>
  );
};

export default Offices;
