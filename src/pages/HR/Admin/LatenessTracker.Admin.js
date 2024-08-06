// *IN USE

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { LatenessTrackerForm } from "../../../components/FormJSON/CreateLatenessTracker";
import { LatenessTrackerModal } from "../../../components/Modal/LatenessTrackerModal";
import ViewModal from "../../../components/Modal/ViewModal";
import LatenessTrackerContent from "../../../components/ModalContents/LatenessTrackerContent";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import moment from "moment";

const LatenessTracker = () => {
  const { user, ErrorHandler, getAvatarColor } = useAppContext();

  const [view, setView] = useState("all");

  const [data, setData] = useState([]);
  const [mode, setMode] = useState("Create");
  const [modalData, setModalData] = useState([]);
  const [loadingLatenessTrackers, setLoadingLatenessTrackers] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);

  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [CampaignPage, setCampaignPage] = useState(1);
  const [CampaignSizePerPage, setCampaignSizePerPage] = useState(10);
  const [totalCampaignPages, setTotalCampaignPages] = useState("");

  const [DepartmentPage, setDepartmentPage] = useState(1);
  const [DepartmentSizePerPage, setDepartmentSizePerPage] = useState(10);
  const [totalDepartmentPages, setTotalDepartmentPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

  const firstweekDay = moment().utc().startOf("week").format("YYYY-MM-DD");
  const lastWeekDay = moment().local().endOf("week").format("YYYY-MM-DD");

  const [fromDate, setFromDate] = useState(firstweekDay);
  const [toDate, setToDate] = useState(lastWeekDay);

  // Lateness Tracker:
  const fetchLatenessTracker = useCallback(async () => {
    setLoadingLatenessTrackers(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/lateness_trackers.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            page: page,
            limit: sizePerPage,
            start_date: fromDate,
            end_date: toDate
          }
        }
      );

      const resData = response?.data?.data?.lateness_tracker_records;
      let totalPages = response?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      console.log("Lateness Tracker:", response?.data?.data);

      const formattedData = resData.map((data) => ({
        ...data,
        employee: data?.full_name,
        officeType: data?.office_type?.toUpperCase(),
        caller: data?.caller_name,
        callerIsEmployee: data?.caller_is_employee ? "Yes" : "No",
        expectedArrivalTime: moment(data?.expected_arrival_time).format(
          "ddd, DD MMM YYYY - h:mma"
        ),
        willComeIn: data?.will_come_in ? "Yes" : "No",
        modeOfCommunication: data?.mode_of_communication?.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        ),
        enteredBy: data?.entered_by?.fullName
      }));

      setData(formattedData);
      setLoadingLatenessTrackers(false);
    } catch (error) {
      const component = "Lateness Tracker error | ";
      ErrorHandler(error, component);
      setLoadingLatenessTrackers(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchLatenessTracker();
  }, [fetchLatenessTracker]);

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
      setLoadingCampaigns(false);
    } catch (error) {
      console.log("All Campaigns error:", error);
      setLoadingCampaigns(false);
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
      setLoadingDepartments(false);
    } catch (error) {
      console.log("All Departments error:", error);
      setLoadingDepartments(false);
    }
  }, [DepartmentPage, DepartmentSizePerPage]);

  useEffect(() => {
    fetchAllCampaigns();
    fetchAllDepartments();
  }, [fetchAllCampaigns, fetchAllDepartments]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to=""
            // to={`/dashboard/hr/office/employee-attendance/${row?.full_name}/${row?.ogid}`}
          >
            {value?.toUpperCase()}
          </Link>
        </h2>
      )
    },
    {
      dataField: "officeType",
      text: "Office Type",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "caller",
      text: "Caller's Name",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "callerIsEmployee",
      text: "Caller is Employee?",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "modeOfCommunication",
      text: "Mode Of Communication",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "expectedArrivalTime",
      text: "Expected Arrival Time?",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "willComeIn",
      text: "Will Come In?",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "enteredBy",
      text: "Entered By",
      sort: true,
      headerStyle: { width: "15%" }
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-info"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType("view-details");
                setViewRow(row);
              }}
            >
              View
            </button>

            {CurrentUserCanCreateAndEdit && (
              <button
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#LatenessTrackerModal"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      )
    }
  ];

  const campaignColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/lateness/campaign/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    }
  ];

  const departmentColumns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => (
        <p>
          <Link
            to={`/dashboard/hr/lateness/department/employees/${row?.title}/${row.id}`}
            className="attendance-record-for-office"
          >
            {val?.toUpperCase()}
          </Link>
        </p>
      )
    }
  ];

  const handleCreate = () => {
    setMode("Create");
    setModalData(LatenessTrackerForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setModalData(row);
  };

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
            {CurrentUserCanCreateAndEdit && view === "all" ? (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#LatenessTrackerModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"> </i> Create Lateness Tracker
              </a>
            ) : null}
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
                  href="#tab_all"
                  onClick={() => setView("all")}
                >
                  All Lateness Trackers
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_departments"
                  onClick={() => setView("office")}
                >
                  Departments
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_campaigns"
                  onClick={() => setView("office")}
                >
                  Campaigns
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_all" className="col-12 tab-pane show active">
            <div className="row" style={{ marginTop: "2rem" }}>
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
                  />
                </div>
              </div>
            </div>

            <UniversalPaginatedTable
              columns={columns}
              data={data}
              loading={loadingLatenessTrackers}
              setLoading={setLoadingLatenessTrackers}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div>

          <div id="tab_departments" className="col-12 tab-pane">
            <UniversalPaginatedTable
              columns={departmentColumns}
              data={departments}
              loading={loadingDepartments}
              setLoading={setLoadingDepartments}
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
              loading={loadingCampaigns}
              setLoading={setLoadingCampaigns}
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

      {modalType === "view-details" ? (
        <ViewModal
          title="Lateness Tracker Details"
          content={<LatenessTrackerContent Content={viewRow} />}
        />
      ) : null}

      <LatenessTrackerModal
        from="all"
        mode={mode}
        data={modalData}
        refetchData={fetchLatenessTracker}
      />
    </>
  );
};

export default LatenessTracker;
