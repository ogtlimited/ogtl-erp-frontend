// *IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import {
  TeamLeadForm,
  TeamMemberForm,
} from "../../../components/FormJSON/CreateOffices";
import { TeamMemberFormModal } from "../../../components/Modal/TeamMembersFormModal";
import { TeamLeadFormModal } from "../../../components/Modal/TeamLeadFormModal";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import $ from "jquery";

const TeamMembers = () => {
  const { id } = useParams();
  const { title } = useParams();
  const navigate = useNavigate();
  const { user, ErrorHandler, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [teamLead, setTeamLead] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [mode, setMode] = useState("Create");
  const [office, setOffice] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  // Team Lead:
  const fetchTeamLead = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/teams_leads/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const resData = response?.data?.data?.leads;

      setTeamLead(resData);
      setLoading(false);
      $("#TeamLeadFormModal").modal("hide");
    } catch (error) {
      const component = "Team Lead Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All Team Members:
  const fetchAllTeamMembers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/teams_employees/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: page,
            limit: sizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.employees;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedTeamMembers = resData.map((e) => ({
        ...e,
      }));

      setTeamMembers(formattedTeamMembers);
      setLoading(false);
    } catch (error) {
      const component = "Team Members Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchTeamLead();
    fetchAllTeamMembers();
  }, [fetchTeamLead, fetchAllTeamMembers]);

  const handleAssignLead = () => {
    setMode("Assign");
    setOffice(TeamLeadForm);
  };

  const handleCreate = () => {
    setMode("Create");
    setOffice(TeamMemberForm);
  };

  const handleEdit = () => {
    setMode("Update");
    setOffice(TeamMemberForm);
  };

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: { width: "50%" },
      formatter: (val, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(val?.charAt(0)) }}
          >
            {val?.charAt(0)}
          </span>
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {val?.toUpperCase()} <span>{row?.ogid}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "50%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">
              {title?.charAt(0).toUpperCase() + title.slice(1)}
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Team Members</li>
            </ul>
          </div>
          {!teamLead.length && (
            <div className="col-auto float-right ml-auto">
              {CurrentUserCanCreateAndEdit ? (
                <a
                  href="/"
                  className="btn add-btn"
                  data-toggle="modal"
                  data-target="#TeamLeadFormModal"
                  onClick={handleAssignLead}
                >
                  <i className="fa fa-plus"></i> Assign Team Lead
                </a>
              ) : null}
            </div>
          )}
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#TeamMembersFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add Team Member
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {teamLead.length ? (
        <div class="tl row">
          <div
            class="tl card"
            onClick={() =>
              navigate(`/dashboard/user/profile/${teamLead[0]?.ogid}`)
            }
          >
            <h4>Team Lead</h4>
            <p>
              <Link
                className="tl link"
                to={`/dashboard/user/profile/${teamLead[0]?.ogid}`}
              >
                {teamLead[0]?.name}
              </Link>{" "}
            </p>
            <p>{teamLead[0]?.ogid}</p>
            <p>
              <a className="tl link" href={`mailto:${teamLead[0]?.email}`}>
                {teamLead[0]?.email}
              </a>
            </p>
          </div>
          {CurrentUserCanCreateAndEdit && (
            <a
              className="edit-icon teams"
              data-toggle="modal"
              data-target="#TeamLeadFormModal"
              onClick={handleEdit}
            >
              <i className="fa fa-pencil"></i>
            </a>
          )}
        </div>
      ) : null}

      <div className="row">
        <UniversalPaginatedTable
          data={teamMembers}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>

      <TeamLeadFormModal
        mode={mode}
        data={office}
        fetchTeamLead={fetchTeamLead}
      />

      <TeamMemberFormModal
        mode={mode}
        data={office}
        fetchAllTeamMembers={fetchAllTeamMembers}
      />
    </>
  );
};

export default TeamMembers;
