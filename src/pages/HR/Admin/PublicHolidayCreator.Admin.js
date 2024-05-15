/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import DropdownCheckbox from "../../../components/Forms/DropdownCheckbox";

const PublicHolidayCreator = () => {
  const navigate = useNavigate();
  const {
    showAlert,
    selectDepartments,
    selectCampaigns,
    goToTop,
    fetchPublicHolidays,
    fetchAllPublicHolidays,
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [viewingOffice, setViewingOffice] = useState(false);

  const [publicHolidayData, setPublicHolidayData] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });

  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState(
    []
  );
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedCampaignOptions, setSelectedCampaignOptions] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setPublicHolidayData({
      ...publicHolidayData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelEvent = () => {
    navigate("/dashboard/hr/public-holiday");
  };

  const handleCreatePublicHoliday = async () => {
    setLoading(true);

    console.log(
      "publicHolidayData",
      publicHolidayData,
      selectedDepartment,
      selectedCampaign
    );

    try {
      const response = await axiosInstance.post(
        `/api/v1/public_holidays.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: publicHolidayData,
        }
      );

      goToTop();
      showAlert(
        true,
        `${publicHolidayData?.title} Public Holiday Successfully Created!`,
        "alert alert-success"
      );

      if (response.status === 201) {
        const holidayId = response?.data?.data?.public_holiday?.id;

        if (selectedDepartment?.length) {
          const departmentIds = selectedDepartment.map((item) => item.value);

          await axiosInstance.post(`/api/v1/department_holidays.json`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            payload: {
              hr_public_holiday_id: holidayId,
              operation_department_ids: departmentIds,
            },
          });

          showAlert(
            true,
            `Assigned to Applicable Departments ✅`,
            "alert alert-success"
          );
        }

        if (selectedCampaign?.length) {
          const campaignIds = selectedCampaign.map((item) => item.value);

          await axiosInstance.post(`/api/v1/campaign_holidays.json`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            payload: {
              hr_public_holiday_id: holidayId,
              operation_campaign_ids: campaignIds,
            },
          });
        }

        showAlert(
          true,
          `Assigned to Applicable Campaigns ✅`,
          "alert alert-success"
        );
      } else {
        showAlert(
          true,
          `Failed to assign to applicable departments and campaigns`,
          "alert alert-warning"
        );
      }

      fetchPublicHolidays();
      fetchAllPublicHolidays();

      setPublicHolidayData({
        title: "",
        start_date: "",
        end_date: "",
      });
      setSelectedDepartmentOptions([]);
      setSelectedDepartment([]);
      setSelectedCampaignOptions([]);
      setSelectedCampaign([]);
      setCloseAll(true);
      setLoading(false);
    } catch (error) {
      goToTop();
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Create Public Holiday</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Time Off</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="column survey_builder"
        style={{ height: viewingOffice ? "100vh" : "" }}
      >
        {/* Title */}
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              name="title"
              type="text"
              value={publicHolidayData?.title}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>

        {/* Start & End */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="start_date">Start</label>
              <input
                type="datetime-local"
                name="start_date"
                value={publicHolidayData?.start_date}
                onChange={handleFormChange}
                className="form-control "
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="end_date">End</label>
              <input
                type="datetime-local"
                name="end_date"
                value={publicHolidayData?.end_date}
                onChange={handleFormChange}
                className="form-control "
                required
              />
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="row" style={{ paddingLeft: "1rem" }}>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="applicable_departments">
                Applicable Departments
              </label>
              <DropdownCheckbox
                office="department"
                options={selectDepartments}
                selectedOptions={selectedDepartmentOptions}
                setSelected={setSelectedDepartment}
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedDepartmentOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="applicable_campaigns">Applicable Campaign</label>
              <DropdownCheckbox
                office="campaign"
                options={selectCampaigns}
                selectedOptions={selectedCampaignOptions}
                setSelected={setSelectedCampaign}
                closeAll={closeAll}
                setViewingOffice={setViewingOffice}
                onSelectionChange={(updatedSelectedOptions) =>
                  setSelectedCampaignOptions(updatedSelectedOptions)
                }
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={cancelEvent}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleCreatePublicHoliday}
            disabled={
              !publicHolidayData?.title?.length ||
              !publicHolidayData?.start_date?.length ||
              !publicHolidayData?.end_date?.length
            }
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PublicHolidayCreator;
