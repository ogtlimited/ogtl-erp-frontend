// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { LatenessTrackerModal } from "../../../components/Modal/LatenessTrackerModal";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import moment from "moment";

const LatenessTracker = () => {
  const { user, ErrorHandler, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);

  // const [page, setPage] = useState(1);
  // const [sizePerPage, setSizePerPage] = useState(10);
  // const [totalPages, setTotalPages] = useState("");

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreate = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

  const firstDay = moment().startOf("month").utc().format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").utc().format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/campaigns.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: CampaignPage,
          limit: CampaignSizePerPage
        }
      });
      const resData = response?.data?.data?.campaigns;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = CampaignSizePerPage;
      const thisTotalPageSize = totalPages;

      setCampaignSizePerPage(thisPageLimit);
      setTotalCampaignPages(thisTotalPageSize);

      const formattedCampaigns = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY")
      }));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("All Campaigns error:", error);
      setLoading(false);
    }
  }, [CampaignPage, CampaignSizePerPage]);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/departments.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: DepartmentPage,
          limit: DepartmentSizePerPage
        }
      });
      const resData = response?.data?.data?.departments;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = DepartmentSizePerPage;
      const thisTotalPageSize = totalPages;

      setDepartmentSizePerPage(thisPageLimit);
      setTotalDepartmentPages(thisTotalPageSize);

      const formattedDepartments = resData.map((e) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY")
      }));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("All Departments error:", error);
      setLoading(false);
    }
  }, [DepartmentPage, DepartmentSizePerPage]);

  useEffect(() => {
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllCampaigns, fetchAllDepartments]);

  const campaignColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/campaign/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" }
    }
  ];

  const departmentColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/department/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" }
    }
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Lateness Tracker</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Lateness Tracker</li>
            </ul>
          </div>

          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreate && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#LatenessTrackerModal"
              >
                Create Lateness Tracker
              </a>
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
                  href="#tab_departments"
                >
                  Departments
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_campaigns">
                  Campaigns
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row" style={{marginTop: "2rem"}}>
          <div
            className="col-md-3"
            style={{
              marginLeft: "1rem"
            }}
          >
            <div className="form-group">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control "
                // disabled={loadingPayday}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control "
                // disabled={loadingPayday}
              />
            </div>
          </div>
        </div>

        <div className="row tab-content">
          <div id="tab_departments" className="col-12 tab-pane show active">
            <UniversalPaginatedTable
              columns={departmentColumns}
              data={departments}
              loading={loading}
              setLoading={setLoading}
              page={CampaignPage}
              setPage={setDepartmentPage}
              sizePerPage={CampaignSizePerPage}
              setSizePerPage={setCampaignSizePerPage}
              totalPages={totalDepartmentPages}
              setTotalPages={setTotalCampaignPages}
            />
          </div>

          <div id="tab_campaigns" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={campaignColumns}
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
        </div>
      </div>

      <LatenessTrackerModal
        fetchHRLeaves={null}
        fetchHRLeaveHistory={null}
        fetchAllEmpOnLeave={null}
      />
    </>
  );
};

export default LatenessTracker;
