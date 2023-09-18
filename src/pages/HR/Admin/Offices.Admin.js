/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import { OfficeFormModal } from "../../../components/Modal/OfficeFormModal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { OfficeForm } from "../../../components/FormJSON/CreateOffices.js";
import moment from "moment";

const Offices = () => {
  const { user, ErrorHandler } = useAppContext();
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
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

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
      const component = "Campaigns Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const component = "Department Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const toggleTeamAction = () => {
    setOfficeType("Team");
    setMode("Create");
  };

  const handleCreate = () => {
    setMode("Create");
    setOffice(OfficeForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setOffice(row);
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
      headerStyle: { width: "40%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "leave_approval_level",
      text: "Leave Approval Level",
      sort: true,
      headerStyle: { width: "20%" },
    },
    CurrentUserCanCreateAndEdit && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#OfficeFormModal"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
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
            <h3 className="page-title">Facility</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Facility</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#OfficeFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add Facility
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
                  href="#tab_departments"
                  onClick={toggleDepartmentAction}
                >
                  Departments
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
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
                  href="#tab_teams"
                  onClick={toggleTeamAction}
                >
                  Teams
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
