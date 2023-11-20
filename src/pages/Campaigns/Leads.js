/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
// import data from '../../db/campaigns.json';
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";

const Leads = () => {
  const [data, setData] = useState([]);

  const fetchLeads = () => {
    axiosInstance
      .get("/employees/all/team-leads")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchLeads();
  }, []);
  const columns = [
    {
      dataField: "lead",
      text: "Lead Name",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="#" className="avatar">
            <img alt="" src={avater} />
          </a>
          <a href="#">{row.first_name + row.last_name}</a>
        </h2>
      ),
    },
    {
      dataField: "company_email",
      text: "Email",
      sort: true,
      headerStyle: { width: "150px" },
    },
    {
      dataField: "ogid",
      text: "OG ID",
      sort: true,
      headerStyle: { width: "150px" },
    },
    {
      dataField: "projectId",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "450px" },
      formatter: (value, row) => <h2>{row?.projectId?.project_name}</h2>,
    },
    {
      dataField: "teamMembers",
      text: "Team members",
      sort: true,
      headerStyle: { minWidth: "180px" },
      formatter: (value, row) => (
        <ul className="team-members">
          {value.slice(0, 3).map((mem, i) => {
            return (
              <li>
                {i + 1 <= 3 ? (
                  <a
                    href="#"
                    data-toggle="tooltip"
                    title=""
                    data-original-title={mem.first_name + mem.last_name}
                  >
                    <img alt="" src={avater} />
                  </a>
                ) : (
                  <a href="#" className="all-users">
                    +{value.length}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
          {value === "active" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value === "left" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value === "terminated" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Leads</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leads</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Leads;
