// *IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { TeamFormModal } from "../../../components/Modal/TeamFormModal";
import { TeamForm } from "../../../components/FormJSON/CreateOffices";
import moment from "moment";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";

const Teams = () => {
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
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

  // All Teams:
  const fetchAllTeams = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/teams.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: page,
          limit: sizePerPage,
        },
      });
      console.log("team data:", response.data);
      const resData = response?.data?.data?.teams;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedTeams = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setTeams(formattedTeams);
      setLoading(false);
    } catch (error) {
      const component = "Team Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllTeams();
  }, [fetchAllTeams]);

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
      headerStyle: { width: "60%" },
      formatter: (val, row) => (
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
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Teams</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Teams</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#TeamFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Team
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          data={teams}
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

      <TeamFormModal mode={mode} data={office} fetchAllTeams={fetchAllTeams} />
    </>
  );
};

export default Teams;
