// *IN USE

import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import VictoryDougnutChart from "../../../components/charts/VictoryDougnutChart";

function AttendanceAverageCard({ iconSrc, label, value }) {
  return (
    <div className="average_attendance_card_container">
      <div className="average_attendance_icon_div">
        <lord-icon
          src={iconSrc}
          trigger="loop"
          colors="primary:#121331,secondary:#0253cc"
          style={{ width: "20px", height: "20px" }}
        ></lord-icon>
      </div>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}

const AttendanceAverageAdmin = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  data,
  loading,
}) => {
  const { FontAwesomeIcon, faSpinner } = useAppContext();

  return (
    <>
      <div className="column page_container" style={{ marginTop: "2rem" }}>
        <div className="row">
          <div className="row col-md-6">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="fromDate">From</label>
                <input
                  type="date"
                  name="fromDate"
                  value={fromDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    setFromDate(e.target.value);
                  }}
                  className="form-control "
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="toDate">To</label>
                <input
                  type="date"
                  name="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="form-control "
                  min={fromDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="average_attendance_content">
          <div className="ave_att_top_div">
            <AttendanceAverageCard
              iconSrc="https://cdn.lordicon.com/qhkvfxpn.json"
              label="Total ERP Expected Attendance Count"
              value={
                loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    pulse
                    style={{ marginTop: "5px", fontSize: "20px" }}
                  />
                ) : (
                  data?.total_erp_expected_attendance_count
                )
              }
            />

            <AttendanceAverageCard
              iconSrc="https://cdn.lordicon.com/stxfyhky.json"
              label="Total Biometric Attendance Count"
              value={
                loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    pulse
                    style={{ marginTop: "5px", fontSize: "20px" }}
                  />
                ) : (
                  data?.total_biometric_attendance_count
                )
              }
            />

            <div className="percentage_average_card">
              <p>Percentage Average</p>
              <div className="percentage_average_card_doughnutChart">
                {loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    pulse
                    style={{ marginTop: "5px", fontSize: "20px" }}
                  />
                ) : (
                  <VictoryDougnutChart percent={data?.percentage_average} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceAverageAdmin;
