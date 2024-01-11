import React, { useState, useEffect } from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import resignationIcon from "../../../assets/img/resign.png";
import axiosInstance from "../../../services/api";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ResignationFormModal } from "../../../components/Modal/ResignationFormModal";

const resignationModel = {
  effective_today: "",
  effective_date: "",
  reason_for_resignation: "",
};

const ResignationUser = () => {
  const { showAlert, user } = useAppContext();
  const [data, setData] = useState(resignationModel);

  const today = moment().utc().format("yyyy-MM-DD");
  const [todaySelected, setTodaySelected] = useState(false);
  const [surveyFormFilled, setSurveyFormFilled] = useState(false);
  const [resignationSurveyForm, setResignationSurveyForm] = useState([])

  const [selectedRow, setSelectedRow] = useState(null);

  const currentUserDesignation = user?.employee_info?.designation.toLowerCase();
  const currentUserIsLead = user?.employee_info?.is_lead;
  // const currentUserIsManagement = user;

  const [minDate, setMinDate] = useState(null);

  // Calculates Resignation Notice Period:
  useEffect(() => {
    let noticePeriod = 0;

    if (currentUserIsLead) {
      noticePeriod = 30;
    } else if (currentUserDesignation === "agent") {
      noticePeriod = 14;
    }

    const todayDate = moment().utc();
    const minDate = todayDate.add(noticePeriod, "days").format("yyyy-MM-DD");

    setMinDate(minDate);
  }, [currentUserDesignation, currentUserIsLead]);

  // Cancel Application:
  const cancelEvent = () => {
    setData({
      effective_today: "",
      effective_date: "",
      reason_for_resignation: "",
    });
    setTodaySelected(false);
  };

  // Get resignation Survey Form

  // Handle Form Change:
  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Apply Resignation:
  const handleApplyResignation = async (data) => {
    try {
      const res = await axiosInstance.post(`/api/v1/resignations.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          effective_date: todaySelected
            ? moment(data.effective_today).format("ddd, DD MMM YYYY")
            : moment(data.effective_date).format("ddd, DD MMM YYYY"),
          reason_for_resignation: data.reason_for_resignation,
        },
      });

      const resData = res?.data?.data;
      const exitDate = resData?.resignation?.exit_date;

      showAlert(
        true,
        `Your resignation application is successfully submitted, your exit date is ${moment(
          exitDate
        ).format("ddd, DD MMM YYYY")} `,
        "alert alert-success"
      );

      setData(resignationModel);
      setTodaySelected(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
    }
  };

  return (
    <>
      <div className="row resignation_form">
        <div className="col-sm-6">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <img
              src={resignationIcon}
              alt="resignation"
              className="resignation_icon"
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="resignation_form_inner">
              <div className="modal-header">
                <h4 className="modal-title" id="FormModalLabel">
                  Resignation
                </h4>
              </div>

              <div className="modal-body">
                <div>
                  <div className="row">
                    {/* Today */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="effective_date">
                          Effective Immediately (to start today)
                        </label>
                        <input
                          type="checkbox"
                          name="effective_date"
                          className="form-control resignation_effective_today"
                          value={true}
                          checked={todaySelected}
                          onChange={(e) => {
                            setTodaySelected(e.target.checked);
                            setData({
                              ...data,
                              effective_today: today,
                              effective_date: "",
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* Later Date */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="effective_date">Future Date</label>
                        <input
                          type="date"
                          name="effective_date"
                          value={data.effective_date}
                          onChange={handleFormChange}
                          className="form-control "
                          readOnly={todaySelected}
                          required={!todaySelected}
                          min={minDate}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="reason_for_resignation">
                          Reason for Resignation
                        </label>
                        <textarea
                          name="reason_for_resignation"
                          className="form-control resignation_reason"
                          value={data.reason_for_resignation}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer resignation_form_footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                    {surveyFormFilled ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => setSelectedRow(data)}
                        disabled={
                          (!data?.effective_today.length &&
                            !data?.effective_date.length) ||
                          !data?.reason_for_resignation.length
                        }
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#ResignationFormModal"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        title="Resignation"
        selectedRow={selectedRow}
        deleteFunction={handleApplyResignation}
        message="Are you sure you want to submit your resignation?"
      />

      <ResignationFormModal />
    </>
  );
};

export default ResignationUser;
