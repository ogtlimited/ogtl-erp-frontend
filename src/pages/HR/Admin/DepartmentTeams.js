/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DepartmentCampaignForm } from "../../../components/FormJSON/CreateOffices";
import { DepartmentCampaignFormModal } from "../../../components/Modal/DepartmentCampaignFormModal";
import { CampaignFormModal } from "../../../components/Modal/CampaignFormModal";

const DepartmentTeams = () => {
  const { id } = useParams();
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [departmentCampaigns, setDepartmentCampaigns] = useState([]);
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

  // All Department Campaign:
  const fetchAllDepartmentCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/departments_campaigns/${id}.json`,
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
      const resData = response?.data?.data?.campaigns;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedDepartmentCampaign = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartmentCampaigns(formattedDepartmentCampaign);
      setLoading(false);
    } catch (error) {
      const component = "Campaign Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDepartmentCampaigns();
  }, [fetchAllDepartmentCampaigns]);

  const handleCreate = () => {
    setMode("Add");
    setOffice(DepartmentCampaignForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setOffice(row);
  };

  const columns = [
    {
      dataField: "title",
      text: "Campaign",
      sort: true,
      headerStyle: { width: "30%" },
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
              data-target="#CampaignFormModal"
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
    <div className="tab-pane" id="tab_department_campaigns">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#DepartmentCampaignFormModal"
                onClick={handleCreate}
              >
                Add Campaign
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={departmentCampaigns}
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

      <DepartmentCampaignFormModal
        mode={mode}
        data={office}
        fetchAllDepartmentCampaigns={fetchAllDepartmentCampaigns}
      />

      <CampaignFormModal
        mode={mode}
        data={office}
        fetchAllCampaigns={fetchAllDepartmentCampaigns}
      />
    </div>
  );
};

export default DepartmentTeams;
