// *IN USE - FIXED!

import React, { useState, useEffect, useCallback } from "react";
import { officeTypeOptions } from "../FormJSON/AddEmployee";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const ReportToModal = ({
  data,
  fetchEmployeeProfile,
  setHideReportToModal,
}) => {
  const { selectCampaigns, selectDepartments, showAlert } = useAppContext();
  const [reportTo, setReportTo] = useState([]);
  const [allLeaders, setAllLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");

  useEffect(() => {
    setReportTo(data);
    setOfficeType(data?.office?.office_type);
  }, [data]);

  // All Leaders:
  const fetchAllLeaders = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/leaders.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office: reportTo?.office?.id,
          pages: 1,
          limit: 1000,
        },
      });

      const resData = response?.data?.data?.leaders;

      const formattedLeaders = resData
        .map((e) => ({
          label: e?.first_name + " " + e?.last_name,
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllLeaders(formattedLeaders);
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 403) {
        return setHideReportToModal(true);
      }
      setLoading(false);
    }
  }, [reportTo?.office?.id, setHideReportToModal]);

  useEffect(() => {
    fetchAllLeaders();
  }, [fetchAllLeaders]);

  const handleOfficeTypeChange = (e) => {
    setReportTo({
      ...reportTo,
      office: {
        ...reportTo.office,
        office_type: e?.value,
        id: "",
        title: "",
      },
      employee: {
        ...reportTo.employee,
        reports_to: {
          ogid: "",
          full_name: "",
        },
      },
    });
    setOfficeType(e?.value);
  };

  const handleEditReportTo = async (e) => {
    e.preventDefault();

    const employeeId = data?.employee?.ogid;
    const reportToId = reportTo?.employee?.reports_to?.ogid;

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/add_reports_to/${reportToId}.json?ogid=${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(true, `Report To updated successfully!`, "alert alert-success");
      fetchEmployeeProfile();
      $("#ReportToModal").modal("toggle");
      setLoading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="ReportToModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Report To
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
              <form onSubmit={handleEditReportTo}>
                <div className="row">
                  {/* Office Type */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="office_type">Office Type</label>
                      <Select
                        options={officeTypeOptions}
                        value={{
                          label: reportTo?.office?.office_type,
                          value: officeType,
                        }}
                        style={{ display: "inline-block" }}
                        onChange={(e) => handleOfficeTypeChange(e)}
                      />
                    </div>
                  </div>

                  {/* Office */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="operation_office_id">Office</label>
                      <Select
                        name="operation_office_id"
                        options={
                          officeType === "department"
                            ? selectDepartments
                            : selectCampaigns
                        }
                        value={{
                          label: reportTo?.office?.title,
                          value: reportTo?.office?.id,
                        }}
                        onChange={(e) =>
                          setReportTo({
                            ...reportTo,
                            office: {
                              ...reportTo.office,
                              id: e?.value,
                              title: e?.label,
                            },
                            employee: {
                              ...reportTo.employee,
                              reports_to: {
                                ogid: "",
                                full_name: "",
                              },
                            },
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  {/* Supervisor/Team Lead */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="report_to">Supervisor/Team Lead</label>
                      <Select
                        name="report_to"
                        options={allLeaders}
                        value={{
                          label: reportTo?.employee?.reports_to?.full_name,
                          value: reportTo?.employee?.reports_to?.ogid,
                        }}
                        onChange={(e) =>
                          setReportTo({
                            ...reportTo,
                            employee: {
                              ...reportTo.employee,
                              reports_to: {
                                ogid: e?.value,
                                full_name: e?.label,
                              },
                            },
                          })
                        }
                        style={{ display: "inline-block" }}
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
