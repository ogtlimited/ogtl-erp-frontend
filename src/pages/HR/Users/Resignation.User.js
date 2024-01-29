import React, { useState, useEffect } from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import resignationIcon from "../../../assets/img/resign.png";
import axiosInstance from "../../../services/api";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Skeleton from "@material-ui/lab/Skeleton";

const resignationModel = {
  effective_today: "",
  effective_date: "",
  reason_for_resignation: "",
};

const ResignationUser = () => {
  const {
    showAlert,
    user,
    loadingUserResignation,
    userResignations,
    fetchStaffResignation,
  } = useAppContext();
  const [data, setData] = useState(resignationModel);

  const [selectedRow, setSelectedRow] = useState(null);

  const currentUserOffice = user?.office?.office_type;
  const currentUserDesignation = user?.employee_info?.designation.toLowerCase();
  const currentUserIsLead = user?.employee_info?.is_lead;
  const { first_name, last_name } = user?.employee_info?.personal_details;
  const currentUserName = `${first_name} ${last_name}`.trim();
  // const currentUserIsManagement = user;

  const [noticePeriod, setNoticePeriod] = useState(0);

  // Calculates Resignation Notice Period:
  useEffect(() => {
    let noticePeriod = 30;

    if (currentUserOffice === "campaign" && !currentUserIsLead) {
      noticePeriod = 14;
    } else if (currentUserOffice === "department" && !currentUserIsLead) {
      noticePeriod = 30;
    } else if (currentUserIsLead) {
      noticePeriod = 30;
    }

    setNoticePeriod(noticePeriod);
  }, [currentUserDesignation, currentUserIsLead, currentUserOffice]);

  // Cancel Application:
  const cancelEvent = () => {
    setData({
      reason_for_resignation: "",
    });
  };

  // Handle Form Change:
  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Apply Resignation:
  const handleApplyResignation = async (data) => {
    const resignationPayload = {
      reason_for_resignation: data.reason_for_resignation,
    };

    try {
      const res = await axiosInstance.post(`/api/v1/resignations.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: resignationPayload,
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
      fetchStaffResignation();
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

        {!loadingUserResignation ? (
          <>
            {userResignations && userResignations?.pending_resignation ? (
              <div className="col-sm-6 resignation_form_container">
                <div style={{ marginBottom: "20px" }}>
                  <div className="resignation_form_inner">
                    <div className="modal-header">
                      <h4>Resignation Application Submitted Successfully</h4>
                    </div>
                    <div className="modal-body">
                      <p>Dear {currentUserName},</p>
                      <p>
                        Your resignation application has been successfully
                        submitted. We appreciate your dedication during your
                        time with us.
                      </p>
                      <p>
                        Please be informed that your exit date has been set for
                        <strong>
                          {" "}
                          {moment(userResignations?.last_date).format(
                            "dddd Do [of] MMMM YYYY"
                          )}
                        </strong>
                        . During this period, you won't be able to apply for any
                        new leaves. Additionally, if you currently have any
                        leave applications within this timeframe, they will be
                        automatically canceled.
                      </p>
                      <p>
                        If you have any concerns or queries, please don't
                        hesitate to reach out to the HR department.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-sm-6 resignation_form_container">
                <div style={{ marginBottom: "20px" }}>
                  <div className="resignation_form_inner">
                    <div className="modal-header">
                      <p className="modal-title" id="FormModalLabel">
                        You have a notice period of{" "}
                        <strong>{noticePeriod}</strong> days.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="resignation_form_inner">
                    <div className="modal-header">
                      <h4 className="modal-title" id="FormModalLabel">
                        Resignation
                      </h4>
                    </div>

                    <div className="modal-body">
                      <div>
                        <div className="row">
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
                          <button
                            type="submit"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => setSelectedRow(data)}
                            disabled={!data?.reason_for_resignation.length}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="col-sm-6 resignation_form_container">
            <div style={{ marginBottom: "20px" }}>
              <div className="resignation_form_inner">
                <div className="modal-header">
                  <Skeleton variant="rect" width="40%" animation="wave" />
                </div>
              </div>
            </div>

            <div>
              <div className="resignation_form_inner">
                <div className="modal-header">
                  <Skeleton variant="rect" width="20%" animation="wave" />
                </div>

                <div className="modal-body">
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div style={{ marginBottom: "20px" }}>
                            <Skeleton
                              variant="rect"
                              width="30%"
                              animation="wave"
                            />
                          </div>
                          <Skeleton
                            variant="rect"
                            width="100%"
                            height={100}
                            animation="wave"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer resignation_form_footer">
                      <Skeleton
                        variant="rect"
                        width="15%"
                        height={37}
                        animation="wave"
                      />
                      <Skeleton
                        variant="rect"
                        width="15%"
                        height={37}
                        animation="wave"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        title="Resignation"
        selectedRow={selectedRow}
        deleteFunction={handleApplyResignation}
        message="Are you sure you want to submit your resignation?"
      />
    </>
  );
};

export default ResignationUser;
