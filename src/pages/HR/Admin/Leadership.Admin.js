/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { Link } from "react-router-dom";
import LeadersTable from "../../../components/Tables/EmployeeTables/leadersTable";
import { AddLeaderModal } from "../../../components/Modal/AddLeaderModal";
import { useAppContext } from "../../../Context/AppContext";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const LeadershipAdmin = () => {
  const { showAlert, user } = useAppContext();
  const [allLeaders, setAllLeaders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState(null);
  const imageUrl = "https://erp.outsourceglobal.com";
  const males = [male, male2, male3];
  const females = [female, female2, female3];

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;

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
      showAlert(true, error?.response?.data?.errors, "alert alert-danger");
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

  //Remove Leader
  const removeLeader = async (row) => {
    const fullName = row.fullName;
    const userId = row?.id;

    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  const columns = [
    {
      dataField: "fullName",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "300px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row?.gender === "male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link
            to={`/dashboard/hr/all-employees/employee/leader/${row.fullName}/${row.ogid}`}
          >
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "email",
      text: "Company Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
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
        selectedRow={selectedRow}
        deleteFunction={removeLeader}
      />
    </>
  );
};

export default LeadershipAdmin;
