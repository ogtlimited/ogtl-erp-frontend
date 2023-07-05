/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import LeadersTable from "../../../components/Tables/EmployeeTables/leadersTable";
import { AddLeaderModal } from "../../../components/Modal/AddLeaderModal";
import { useAppContext } from "../../../Context/AppContext";

const LeadershipAdmin = () => {
  const { showAlert } = useAppContext();
  const [allLeaders, setAllLeaders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");

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
      showAlert(
      true,
      error?.response?.data?.errors ,
      "alert alert-danger"
    );
      setLoading(false);
    }
  }, [officeFilter, page, showAlert, sizePerPage]);

  // All Campaigns:
  const fetchAllCampaigns = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedCampaigns = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("Get All Campaigns error:", error);
      setLoading(false);
    }
  };

  // All Departments:
  const fetchAllDepartments = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedDepartments = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("Get All Departments error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaders();
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllLeaders]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">
              Leaders{" "}
              <span style={{ fontSize: "25px", color: "#999" }}>
                (Supervisors & Team leads)
              </span>
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Leadership</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
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
          </div>
        </div>
      </div>

      <LeadersTable
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
    </>
  );
};

export default LeadershipAdmin;
