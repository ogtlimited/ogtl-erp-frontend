import React, { useState } from "react";
import moment from "moment";
import { useAppContext } from "../../../Context/AppContext";
import resignationIcon from "../../../assets/img/resign.png";
import axiosInstance from "../../../services/api";

const ResignationUser = () => {
  const { showAlert, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    effective_date: "",
    reason_for_resignation: "",
  });

  const today = moment().utc().format("yyyy-MM-DD");

  const currentUserOgid = user?.employee_info?.ogid;

  const cancelEvent = () => {
    setData({
      effective_date: "",
      reason_for_resignation: "",
    });
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleApplyResignation = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axiosInstance.post(`/api/v1/resignations.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          ogid: currentUserOgid,
          effective_date: moment(data.effective_date).format(
            "ddd, DD MMM YYYY"
          ),
          reason_for_resignation: data.reason_for_resignation,
        },
      });

      // eslint-disable-next-line no-unused-vars
      const resData = res?.data?.data;

      showAlert(
        true,
        "Your resignation application is successfully submitted",
        "alert alert-success"
      );

      setData({
        effective_date: "",
        reason_for_resignation: "",
      });
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
    setLoading(false);
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
                  Resignation Form
                </h4>
              </div>

              <div className="modal-body">
                <form onSubmit={handleApplyResignation}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="effective_date">Effective Date</label>
                        <input
                          type="date"
                          name="effective_date"
                          value={data.effective_date}
                          onChange={handleFormChange}
                          className="form-control "
                          min={today}
                          required
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
                    <button type="submit" className="btn btn-primary">
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResignationUser;
