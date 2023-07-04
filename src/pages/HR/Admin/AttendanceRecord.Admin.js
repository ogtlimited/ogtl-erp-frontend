import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import moment from "moment";

const AttendanceRecord = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: CampaignPage,
          limit: CampaignSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = CampaignSizePerPage;
      const thisTotalPageSize = totalPages;

      setCampaignSizePerPage(thisPageLimit);
      setTotalCampaignPages(thisTotalPageSize);

      const formattedCampaigns = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("Get All Campaigns error:", error);
      setLoading(false);
    }
  }, [CampaignPage, CampaignSizePerPage]);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: DepartmentPage,
          limit: DepartmentSizePerPage,
        },
      });
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = DepartmentSizePerPage;
      const thisTotalPageSize = totalPages;

      setDepartmentSizePerPage(thisPageLimit);
      setTotalDepartmentPages(thisTotalPageSize);

      const formattedDepartments = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("Get All Departments error:", error);
      setLoading(false);
    }
  }, [DepartmentPage, DepartmentSizePerPage]);

  useEffect(() => {
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllCampaigns, fetchAllDepartments]);

  // const campaignColumns = [
  //   {
  //     dataField: 'sn',
  //     text: 'S/N',
  //     sort: true,
  //     headerStyle: { width: '5px' },
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  //   {
  //     dataField: 'project_name',
  //     text: 'Campaign',
  //     sort: true,
  //     formatter: (val, row) =>
  //       <p>
  //         <Link to={`/dashboard/hr/campaign/employees/${row?.project_name}/${row._id}`} className='attendance-record-for-office'>
  //           {val}
  //         </Link>
  //       </p>
  //   },
  //   {
  //     dataField: 'client',
  //     text: 'Client',
  //     sort: true,
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  //   {
  //     dataField: 'type',
  //     text: 'Type',
  //     sort: true,
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  //   {
  //     dataField: 'createdAt',
  //     text: 'Created',
  //     sort: true,
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  // ];

  // const departmentColumns = [
  //   {
  //     dataField: 'sn',
  //     text: 'S/N',
  //     sort: true,
  //     headerStyle: { width: '5px' },
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  //   {
  //     dataField: 'department',
  //     text: 'Department',
  //     sort: true,
  //     formatter: (val, row) =>
  //     <p>
  //       <Link to={`/dashboard/hr/department/employees/${row?.department}/${row._id}`} className='attendance-record-for-office'>
  //         {val}
  //       </Link>
  //     </p>,
  //   },
  //   {
  //     dataField: 'createdAt',
  //     text: 'Created',
  //     sort: true,
  //     formatter: (val, row) => <p>{val}</p>,
  //   },
  // ];

  const columns = [
    // {
    //   dataField: "index",
    //   text: "S/N",
    //   sort: true,
    //   headerStyle: { width: "5%" },
    // },
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "35%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/${row?.office_type}/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val}
          </Link>
        </p>
      ),
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Attendance Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
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
                  href="#tab_campaigns"
                >
                  Campaigns
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                >
                  Departments
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_campaigns" className="col-12 tab-pane show active">
            <UniversalPaginatedTable
              columns={columns}
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

          <div id="tab_departments" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={columns}
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
        </div>
      </div>
    </>
  );
};

export default AttendanceRecord;
