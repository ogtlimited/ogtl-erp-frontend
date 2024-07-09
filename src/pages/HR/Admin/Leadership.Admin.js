/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { AddLeaderModal } from "../../../components/Modal/AddLeaderModal";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import LeadersTable from "../../../components/Tables/EmployeeTables/leadersTable";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import $ from "jquery";

const LeadershipAdmin = () => {
  const {
    selectDepartments,
    selectCampaigns,
    showAlert,
    user,
    ErrorHandler,
    getAvatarColor,
  } = useAppContext();
  const [allLeaders, setAllLeaders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResolving, setIsResolving] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");
  const [tab, setTab] = useState("team_lead");

  const CurrentUserRoles = user?.employee_info?.roles;

  const canCreate = ["hr_manager", "senior_hr_associate"];
  const CurrentUserCanCreateLeave = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

  useEffect(() => {
    setDepartments(selectDepartments);
    setCampaigns(selectCampaigns);
  }, [selectCampaigns, selectDepartments]);

  // All Leaders:
  const fetchAllLeaders = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/leaders.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          office: officeFilter.length ? officeFilter : null,
          title: tab
        },
      });

      const resData = response?.data?.data?.leaders;
      const totalPages = response?.data?.data?.total_pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + " " + e?.last_name,
        };
      });

      setAllLeaders(mapp);
      setLoading(false);
    } catch (error) {
      const component = "All Leaders:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [officeFilter, page, sizePerPage, tab]);

  useEffect(() => {
    fetchAllLeaders();
  }, [fetchAllLeaders]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

    // Handle Viewing Team Leads:
    const handleViewingTeamLeads = () => {
      setTab("team_lead");
      setPage(1);
    };
  
    // Handle Viewing Supervisors:
    const handleViewingSupervisors = () => {
      setTab("supervisor");
      setPage(1);
    };

  //Remove Leader
  const removeLeader = async (row) => {
    const fullName = row.fullName;
    const userId = row?.id;

    setIsResolving(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/remove_leader/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        fullName + " has been removed and is no longer a leader",
        "alert alert-success"
      );

      fetchAllLeaders();
      setIsResolving(false);
      $("#exampleModal").modal("toggle");
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setIsResolving(false);
      $("#exampleModal").modal("toggle");
    }
  };

  const columns = [
    {
      dataField: "fullName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to={`/dashboard/hr/all-employees/employee/leader/${row.fullName}/${row.ogid}`}
          >
            {value?.toUpperCase()} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "20%" },
    },
    CurrentUserRoles.includes("hr_manager") && {
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Remove
            </a>
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
            <h3 className="page-title">Leaders</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leadership</li>
              <li className="breadcrumb-item">Leaders</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateLeave && (
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  data-target="#LeaderFormModal"
                >
                  <i className="fa fa-plus"></i> Add Leader
                </a>
              </>
            )}
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
                  href="#tab_team-lead"
                  onClick={handleViewingTeamLeads}
                >
                  Team Leads
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_supervisor"
                  onClick={handleViewingSupervisors}
                >
                  Supervisors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LeadersTable
        columns={columns}
        data={allLeaders}
        setData={setAllLeaders}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        departments={departments}
        campaigns={campaigns}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        campaignFilter={campaignFilter}
        setCampaignFilter={setCampaignFilter}
        officeFilter={officeFilter}
        setOfficeFilter={setOfficeFilter}
      />

      <AddLeaderModal fetchLeaders={fetchAllLeaders} />

      <ConfirmModal
        title="Leader"
        message={`Are you sure you want to remove ${selectedRow?.fullName} from being a leader?`}
        selectedRow={selectedRow}
        deleteFunction={removeLeader}
        isLoading={isResolving}
      />
    </>
  );
};

export default LeadershipAdmin;
