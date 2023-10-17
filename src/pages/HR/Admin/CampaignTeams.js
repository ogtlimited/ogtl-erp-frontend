/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { TeamForm } from "../../../components/FormJSON/CreateOffices";
import { TeamFormModal } from "../../../components/Modal/TeamFormModal";

const CampaignTeams = () => {
  const { id } = useParams();
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaignTeams, setCampaignTeams] = useState([]);
  const [mode, setMode] = useState("Add");
  const [office, setOffice] = useState([]);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Campaign Teams:
  const fetchAllCampaignTeams = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/campaigns_teams/${id}.json`,
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
      const resData = response?.data?.data?.teams;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedCampaignTeam = resData.map((e) => ({
        ...e?.team,
        created_at: moment(e?.team?.created_at).format("Do MMMM, YYYY"),
      }));

      setCampaignTeams(formattedCampaignTeam);
      setLoading(false);
    } catch (error) {
      const component = "Campaign Team Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllCampaignTeams();
  }, [fetchAllCampaignTeams]);

  const handleCreate = () => {
    setMode("Create");
    setOffice(TeamForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setOffice(row);
  };

  const columns = [
    {
      dataField: "title",
      text: "Team",
      sort: true,
      headerStyle: { width: "30%" },formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/teams/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      ),
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "30%" },
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
              data-target="#TeamFormModal"
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
    <div className="tab-pane" id="tab_campaign_teams">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#TeamFormModal"
                onClick={handleCreate}
              >
                Create Team
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={campaignTeams}
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

      <TeamFormModal
        mode={mode}
        data={office}
        fetchAllTeams={fetchAllCampaignTeams}
      />
    </div>
  );
};

export default CampaignTeams;
