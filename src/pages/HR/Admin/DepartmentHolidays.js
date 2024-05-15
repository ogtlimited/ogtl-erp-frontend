/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { DepartmentHolidayFormModal } from "../../../components/Modal/DepartmentHolidayFormModal";
import { useAppContext } from "../../../Context/AppContext";
import { DepartmentHolidayForm } from "../../../components/FormJSON/CreateOffices";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import moment from "moment";
import $ from "jquery";

const DepartmentHolidays = () => {
  const { id } = useParams();
  const { user, ErrorHandler, goToTop, showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [departmentHolidays, setDepartmentHolidays] = useState([]);
  const [mode, setMode] = useState("Add");
  const [holiday, setHoliday] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const today_date = moment().utc().format("yyyy-MM-DD");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Department Holiday:
  const fetchAllDepartmentHolidays = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/department_holidays/${id}.json`,
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
      const resData = response?.data?.data?.holidays;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formatted = resData.map((e) => ({
        ...e,
        title: e?.public_holiday?.title.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
        from: moment(e?.public_holiday?.start_date).format("Do MMMM, YYYY"),
        to: moment(e?.public_holiday?.end_date).format("Do MMMM, YYYY"),
        status:
          moment(e?.public_holiday?.end_date).utc().format("yyyy-MM-DD") <
          today_date
            ? "past"
            : today_date <
                moment(e?.public_holiday?.start_date)
                  .utc()
                  .format("yyyy-MM-DD") &&
              moment(e?.public_holiday?.start_date)
                .utc()
                .format("yyyy-MM-DD") !== today_date
            ? "pending"
            : "happening",
      }));

      setDepartmentHolidays(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Holiday Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDepartmentHolidays();
  }, [fetchAllDepartmentHolidays]);

  const handleAdd = () => {
    setMode("Add");
    setHoliday(DepartmentHolidayForm);
  };

  const handleDeleteDepartmentHoliday = async () => {
    setIsDeleting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/department_holidays/${selectedData?.id}.json`,
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
        "Department public holiday deleted successfully!",
        "alert alert-info"
      );
      $("#exampleModal").modal("toggle");
      fetchAllDepartmentHolidays();
      setIsDeleting(false);
    } catch (error) {
      goToTop();
      const errorMsg = error.response?.data?.errors;
      showAlert(
        true,
        `${errorMsg || "Unable to Delete Department Public Holiday"}`,
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
    CurrentUserCanCreateAndEdit && {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-danger"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => setSelectedData(row)}
            >
              Remove
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tab-pane" id="tab_department_holidays">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#DepartmentHolidayFormModal"
                onClick={handleAdd}
              >
                Add Public Holiday
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={departmentHolidays}
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

      <DepartmentHolidayFormModal
        mode={mode}
        data={holiday}
        refetchData={fetchAllDepartmentHolidays}
      />

      <ConfirmModal
        title="Public Holiday"
        selectedRow={selectedData}
        deleteFunction={handleDeleteDepartmentHoliday}
        message="Are you sure you want to delete this department public holiday?"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DepartmentHolidays;
