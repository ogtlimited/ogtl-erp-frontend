//* IN-USE
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { PublicHolidayFormModal } from "../../components/Modal/PublicHolidayFormModal";
import UniversalPaginatedTable from "../../components/Tables/UniversalPaginatedTable";
import PublicHolidayContent from "../../components/ModalContents/PublicHolidayContent";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import ViewModal from "../../components/Modal/ViewModal";
import axiosInstance from "../../services/api";
import moment from "moment";
import $ from "jquery";

const PublicHoliday = () => {
  const navigate = useNavigate();
  const {
    user,
    showAlert,
    ErrorHandler,
    goToTop,
    fetchPublicHolidays,
    fetchAllPublicHolidays,
  } = useAppContext();
  const [allHolidays, setAllHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [holiday, setHoliday] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const today_date = moment().utc().format("yyyy-MM-DD");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchHolidays = useCallback(async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(`/api/v1/public_holidays.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      });

      const resData = response?.data?.data?.public_holidays;
      const totalPages = response?.data?.data?.pages;

      console.log("HR | Public Holiday:", resData);

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((e) => ({
        ...e,
        title: e?.title.replace(/\b\w/g, (char) => char.toUpperCase()),
        from: moment(e?.start_date).format("Do MMMM, YYYY"),
        to: moment(e?.end_date).format("Do MMMM, YYYY"),
        status:
          moment(e?.end_date).utc().format("yyyy-MM-DD") < today_date
            ? "past"
            : today_date < moment(e?.start_date).utc().format("yyyy-MM-DD") &&
              moment(e?.start_date).utc().format("yyyy-MM-DD") !== today_date
            ? "pending"
            : "happening",
      }));

      setAllHolidays(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Public Holiday | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  // const handleCreate = () => {
  //   const publicHolidayForm = {
  //     title: "",
  //     start_date: "",
  //     end_date: "",
  //   };

  //   setHoliday(publicHolidayForm);
  //   setMode("Create");
  // };

  const handleEdit = (row) => {
    setHoliday(row);
    setMode("Edit");
  };

  const handleDeletePublicHoliday = async () => {
    setIsDeleting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/public_holidays/${selectedData?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      goToTop();
      showAlert(
        true,
        "Public holiday deleted successfully!",
        "alert alert-info"
      );
      $("#exampleModal").modal("toggle");
      
      fetchHolidays();
      fetchPublicHolidays();
      fetchAllPublicHolidays();
      setIsDeleting(false);
    } catch (error) {
      goToTop();
      const errorMsg = error.response?.data?.errors;
      showAlert(
        true,
        `${errorMsg || "Unable to Delete Public Holiday"}`,
        "alert alert-warning"
      );
      $("#exampleModal").modal("toggle");
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      dataField: "title",
      text: "Public Holiday",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "from",
      text: "From",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (value, row) => (
        <>
          {value === "past" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-info"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value?.replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          ) : value === "happening" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i
                className="fa fa-dot-circle-o text-danger"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value?.replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          ) : value === "pending" ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i
                className="fa fa-dot-circle-o text-warning"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              {value?.replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "5%" },
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
              data-target="#generalModal"
              onClick={() => {
                setSelectedData(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {CurrentUserCanCreateAndEdit ? (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#PublicHolidayFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            ) : null}

            {/* {CurrentUserCanCreateAndEdit ? (
              <Link
                className="dropdown-item"
                to="/dashboard/hr/public-holiday/edit"
                state={row}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </Link>
            ) : null} */}

            {CurrentUserCanCreateAndEdit ? (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => setSelectedData(row)}
              >
                <i className="fa fa-trash m-r-5"></i> Delete
              </a>
            ) : null}
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
            <h3 className="page-title">Public Holiday</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Time Off Planner</li>
            </ul>
          </div>
          {/* <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#PublicHolidayFormModal"
              onClick={handleCreate}
            >
              <i className="las la-plus"></i> Create Public Holiday
            </a>
          </div> */}
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <button
                className="btn add-btn"
                onClick={() => navigate("/dashboard/hr/public-holiday/create")}
              >
                <i className="fa fa-plus"></i> Create Public Holiday
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={allHolidays}
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

      <PublicHolidayFormModal
        mode={mode}
        data={holiday}
        refetchData={fetchHolidays}
      />

      <ViewModal
        title="Public Holiday"
        content={<PublicHolidayContent data={selectedData} />}
      />

      <ConfirmModal
        title="Public Holiday"
        selectedRow={selectedData}
        deleteFunction={handleDeletePublicHoliday}
        message={`Are you sure you want to delete ${selectedData?.title.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )} public holiday?`}
        isLoading={isDeleting}
      />
    </>
  );
};

export default PublicHoliday;
