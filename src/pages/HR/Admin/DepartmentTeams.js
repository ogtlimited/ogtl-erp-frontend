/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import { useParams, Link } from "react-router-dom";
import { TeamForm } from "../../../components/FormJSON/CreateOffices";
import { TeamFormModal } from "../../../components/Modal/TeamFormModal";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
import $ from "jquery";

const DepartmentTeams = () => {
  const { id } = useParams();
  const { user, ErrorHandler, goToTop, showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [departmentTeams, setDepartmentTeams] = useState([]);
  const [mode, setMode] = useState("Add");
  const [office, setOffice] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Department Teams:
  const fetchAllDepartmentTeams = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/departments_teams/${id}.json`,
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

      const formattedDepartmentTeam = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartmentTeams(formattedDepartmentTeam);
      setLoading(false);
    } catch (error) {
      const component = "Department Team Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDepartmentTeams();
  }, [fetchAllDepartmentTeams]);

  const handleCreate = () => {
    setMode("Create");
    setOffice(TeamForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setOffice(row);
  };

  const handleDeleteTeam = async () => {
    setIsDeleting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/teams/${selectedData.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      goToTop();
      showAlert(true, "Team deleted successfully!", "alert alert-info");
      $("#exampleModal").modal("toggle");
      fetchAllDepartmentTeams();
      setIsDeleting(false);
    } catch (error) {
      goToTop();
      const errorMsg = error.response?.data?.errors;
      showAlert(
        true,
        `${errorMsg || "Unable to delete team"}`,
        "alert alert-warning"
      );
      $("#exampleModal").modal("toggle");
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      dataField: "title",
      text: "Team",
      sort: true,
      headerStyle: { width: "30%" },
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

            <button
              className="btn btn-sm btn-danger"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => setSelectedData(row)}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tab-pane" id="tab_department_teams">
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
          data={departmentTeams}
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
        fetchAllTeams={fetchAllDepartmentTeams}
        officeType="department"
      />

      <ConfirmModal
        title="Team"
        selectedRow={selectedData}
        deleteFunction={handleDeleteTeam}
        message={`Are you sure you want to delete ${selectedData?.title?.toUpperCase()}${
          selectedData?.title?.toUpperCase().includes("TEAM") ? "?" : " team?"
        }`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DepartmentTeams;
