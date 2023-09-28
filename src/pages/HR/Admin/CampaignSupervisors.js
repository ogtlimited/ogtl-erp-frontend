/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";
import moment from "moment";
import { CampaignSupervisorForm } from "../../../components/FormJSON/CreateOffices";
import { CampaignSupervisorFormModal } from "../../../components/Modal/CampaignSupervisorFormModal";

const CampaignSupervisor = () => {
  const { id } = useParams();
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaignSupervisor, setCampaignSupervisor] = useState([]);
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

  // All Campaign Supervisor:
  const fetchAllCampaignSupervisors = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/campaigns_supervisors/${id}.json`,
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
      const resData = response?.data?.data?.supervisors;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedCampaignSupervisor = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setCampaignSupervisor(formattedCampaignSupervisor);
      setLoading(false);
    } catch (error) {
      const component = "Campaign Supervisor Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllCampaignSupervisors();
  }, [fetchAllCampaignSupervisors]);

  const handleCreate = () => {
    setMode("Add");
    setOffice(CampaignSupervisorForm);
  };

  const columns = [
    {
      dataField: "name",
      text: "Supervisor",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.campaign}</span>
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
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <div className="tab-pane" id="tab_campaign_supervisors">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#CampaignSupervisorFormModal"
                onClick={handleCreate}
              >
                Add Supervisor
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={campaignSupervisor}
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

      <CampaignSupervisorFormModal
        mode={mode}
        data={office}
        fetchAllCampaignSupervisors={fetchAllCampaignSupervisors}
      />
    </div>
  );
};

export default CampaignSupervisor;
