/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import { CampaignFormModal } from "../../../components/Modal/CampaignFormModal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { DepartmentCampaignForm } from "../../../components/FormJSON/CreateOffices.js";
import moment from "moment";

const DepartmentCampaigns = () => {
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
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

  // All Department Campaign:
  const fetchAllDepartmentCampaign = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: page,
          limit: sizePerPage,
        },
      });
      // console.log("All campaigns.", response?.data);
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedDepartmentCampaign = resData.map((e, index) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setCampaigns(formattedDepartmentCampaign);
      setLoading(false);
    } catch (error) {
      const component = "Campaign Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDepartmentCampaign();
  }, [fetchAllDepartmentCampaign]);

  const handleCreate = () => {
    setMode("Create");
    setOffice(DepartmentCampaignForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setOffice(row);
  };

  const columns = [
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
    <div className="tab-pane" id="tab_campaigns">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit ? (
            <div className="col-auto float-right ml-auto">
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#CampaignFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Add Campaign
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={campaigns}
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

      <CampaignFormModal
        mode={mode}
        data={office}
        fetchAllCampaigns={fetchAllDepartmentCampaign}
      />
    </div>
  );
};

export default DepartmentCampaigns;
