// *IN USE!

import React, { useState } from "react";
import axiosInstance from "../../services/api";
import $ from "jquery";

export const EmailModal = ({ data, fetchEmployeeProfile }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditEmail = async (e) => {
    e.preventDefault();

    const employeeId = data?.employee?.ogid;
    console.log("edit this email:", email)

    // setLoading(true);
    // try {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await axiosInstance.put(
    //     `/api/v1/add_reports_to/${}.json?ogid=${employeeId}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "ngrok-skip-browser-warning": "69420",
    //       },
    //     }
    //   );

    //   fetchEmployeeProfile();
    //   $("#ReportToModal").modal("toggle");
    //   setLoading(false);
    // } catch (error) {
    //   console.log("Edit Report To Info error:", error);
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="EmailModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered col-md-6">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Email
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleEditEmail}>
                <div className="row">
                  {/* Email */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={data?.employee?.email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
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
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
