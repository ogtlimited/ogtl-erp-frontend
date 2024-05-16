/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { CampaignHolidayFormModal } from "../../../components/Modal/CampaignHolidayFormModal";
import { useAppContext } from "../../../Context/AppContext";
import { CampaignHolidayForm } from "../../../components/FormJSON/CreateOffices";
import { useParams } from "react-router-dom";
import DeleteModal from "../../../components/Modal/DeleteModal";
import moment from "moment";
import $ from "jquery";

const CampaignHolidays = () => {
  const { id } = useParams();
  const { user, ErrorHandler, goToTop, showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [campaignHolidays, setCampaignHolidays] = useState([]);
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

  // All Campaign Holiday:
  const fetchAllCampaignHolidays = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/campaign_holidays/${id}.json`,
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

      setCampaignHolidays(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Holiday Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllCampaignHolidays();
  }, [fetchAllCampaignHolidays]);

  const handleAdd = () => {
    setMode("Add");
    setHoliday(CampaignHolidayForm);
  };

  const handleDeleteCampaignHoliday = async () => {
    setIsDeleting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/campaign_holidays/${selectedData?.public_holiday?.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            operation_campaign_ids: [+id],
          },
        }
      );

      goToTop();
      showAlert(
        true,
        "Public holiday removed successfully!",
        "alert alert-info"
      );
      $("#deleteModal").modal("toggle");
      fetchAllCampaignHolidays();
      setIsDeleting(false);
    } catch (error) {
      goToTop();
      const errorMsg = error.response?.data?.errors;
      showAlert(
        true,
        `${errorMsg || "Unable to remove public holiday"}`,
        "alert alert-warning"
      );
      $("#deleteModal").modal("toggle");
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
              data-target="#deleteModal"
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
    <div className="tab-pane" id="tab_campaign_holidays">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#CampaignHolidayFormModal"
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
          data={campaignHolidays}
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

      <CampaignHolidayFormModal
        mode={mode}
        data={holiday}
        refetchData={fetchAllCampaignHolidays}
      />

      <DeleteModal
        title="Public Holiday"
        selectedRow={selectedData}
        deleteFunction={handleDeleteCampaignHoliday}
        message="Are you sure you want to remove this public holiday?"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CampaignHolidays;
