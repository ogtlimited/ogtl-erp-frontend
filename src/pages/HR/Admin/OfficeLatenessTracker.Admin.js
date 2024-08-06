// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { LatenessTrackerForm } from "../../../components/FormJSON/CreateLatenessTracker";
import { LatenessTrackerModal } from "../../../components/Modal/LatenessTrackerModal";
import ViewModal from "../../../components/Modal/ViewModal";
import LatenessTrackerContent from "../../../components/ModalContents/LatenessTrackerContent";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import moment from "moment";

const OfficeLatenessTrackerAdmin = () => {
  const { office_type, office, id } = useParams();
  const { user, ErrorHandler, getAvatarColor } = useAppContext();

  const [data, setData] = useState([]);
  const [mode, setMode] = useState("Create");
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreate.includes(role)
  );

  const firstweekDay = moment().utc().startOf("week").format("YYYY-MM-DD");
  const lastWeekDay = moment().local().endOf("week").format("YYYY-MM-DD");

  const [fromDate, setFromDate] = useState(firstweekDay);
  const [toDate, setToDate] = useState(lastWeekDay);

  // Office Lateness Tracker:
  const fetchOfficeLatenessTracker = useCallback(async () => {
    setLoading(true);

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
            end_date: toDate,
            office_type: office_type,
            operation_office_id: id
          }
        }
      );

      const resData = response?.data?.data?.lateness_tracker_records;
      let totalPages = response?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      console.log("Office Lateness Tracker:", response?.data?.data);

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
      setLoading(false);
    } catch (error) {
      const component = "Office Lateness Tracker error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, id, office_type]);

  useEffect(() => {
    fetchOfficeLatenessTracker();
  }, [fetchOfficeLatenessTracker]);

  const handleCreate = () => {
    setMode("Create");
    setModalData(LatenessTrackerForm);
  };

  const handleEdit = (row) => {
    setMode("Edit");
    setModalData(row);
  };

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

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{office.toUpperCase()}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/attendance-record">
                  Lateness Tracker
                </Link>
              </li>
              <li className="breadcrumb-item active">Staff</li>
            </ul>
          </div>

          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit && (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#LatenessTrackerModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"> </i> Create Lateness Tracker
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
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

      {modalType === "view-details" ? (
        <ViewModal
          title="Lateness Tracker Details"
          content={<LatenessTrackerContent Content={viewRow} />}
        />
      ) : null}

      <LatenessTrackerModal
        from="office"
        mode={mode}
        data={modalData}
        refetchData={fetchOfficeLatenessTracker}
      />
    </>
  );
};

export default OfficeLatenessTrackerAdmin;
