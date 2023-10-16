// *IN USE - FIXED!

import React, { useState, useEffect, useCallback } from "react";
import { officeTypeOptions, leaderTypeOptions } from "../FormJSON/AddEmployee";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const ReportToModal = ({
  data,
  fetchEmployeeProfile,
  setHideReportToModal,
}) => {
  const { selectCampaigns, selectDepartments, showAlert, user } = useAppContext();
  const [reportTo, setReportTo] = useState([]);
  const [allLeaders, setAllLeaders] = useState([]);
  const [teamSelected, setTeamSelected] = useState(false);
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");
  const [leadershipType, setLeadershipType] = useState({
    label: "",
    value: "",
  });

  useEffect(() => {
    setReportTo(data);
    setOfficeType(data?.office?.office_type);
  }, [data]);

  // Office Type change:
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
    setLeadershipType({
      label: "",
      value: "",
    });
    setTeamSelected(false);
  };

  // Office change:
  const handleOfficeChange = (e) => {
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
    });
    setLeadershipType({
      label: "",
      value: "",
    });
    setTeamSelected(false);
  };

  // Leadership Type change:
  const handleLeadershipTypeChange = useCallback(
    async (e) => {
      setLeadershipType({
        label: e?.label,
        value: e?.value,
      });
      setAllLeaders([]);
      setTeamSelected(false);
      setReportTo({
        ...reportTo,
        employee: {
          ...reportTo.employee,
          reports_to: {
            ogid: "",
            full_name: "",
          },
        },
      });

      const reportToData = {
        office: officeType + "s",
        leadershipType: e?.value,
        officeId: reportTo?.office?.id,
      };

      try {
        if (reportToData?.leadershipType === "supervisor") {
          const response = await axiosInstance.get(
            `/api/v1/${reportToData?.office}_supervisors/${reportToData?.officeId}.json`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
              params: {
                pages: 1,
                limit: 400,
              },
            }
          );
          const resData = response?.data?.data?.supervisors;

          const formattedLeaders = resData
            .map((e) => ({
              label: e?.name,
              value: e.ogid,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          setAllLeaders(formattedLeaders);
        } else if (reportToData?.leadershipType === "team_lead") {
          setTeamSelected(true);
          const response = await axiosInstance.get(
            `/api/v1/${reportToData?.office}_teams/${reportToData?.officeId}.json`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
              params: {
                pages: 1,
                limit: 400,
              },
            }
          );

          const resData = response?.data?.data?.teams;

          if (officeType === "campaign") {
            const formattedTeams = resData
              .map((e) => ({
                ...e?.team,
                label: e?.team?.title,
                value: e?.team?.id,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));

            setAllTeams(formattedTeams);
          } else {
            const formattedTeams = resData
              .map((e) => ({
                label: e?.title,
                value: e?.id,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));

            setAllTeams(formattedTeams);
          }
        } else {
          return;
        }
      } catch (error) {
        if (error?.response?.status === 403) {
          return setHideReportToModal(true);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [officeType, reportTo]
  );

  // Teams change:
  const handleTeamsChange = async (e) => {
    setReportTo({
      ...reportTo,
      employee: {
        ...reportTo.employee,
        reports_to: {
          ogid: "",
          full_name: "",
        },
      },
    });

    try {
      const response = await axiosInstance.get(
        `/api/v1/teams_leads/${e?.value}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const resData = response?.data?.data?.leads;

      const formattedLeaders = resData
        .map((e) => ({
          label: e?.name,
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllLeaders(formattedLeaders);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Report To:
  const handleUpdateReportTo = async (e) => {
    e.preventDefault();

    const employeeId = data?.employee?.ogid;
    const reportToId = reportTo?.employee?.reports_to?.ogid;

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/add_reports_to/${user?.employee_info?.ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            employee_ogid: employeeId,
            manager_ogid: reportToId,
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
                Update Reports To
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
              <form onSubmit={handleUpdateReportTo}>
                <div className="row">
                  {/* Office Type */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="office_type">Office Type</label>
                      <Select
                        options={officeTypeOptions}
                        value={{
                          label:
                            reportTo?.office?.office_type
                              .charAt(0)
                              .toUpperCase() +
                            reportTo?.office?.office_type.slice(1),
                          value: officeType,
                        }}
                        style={{ display: "inline-block" }}
                        onChange={handleOfficeTypeChange}
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
                        onChange={handleOfficeChange}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>

                  {/* Leadership Type */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leadership_type">Leadership Type</label>
                      <Select
                        options={leaderTypeOptions}
                        value={{
                          label: leadershipType?.label,
                          value: leadershipType?.value,
                        }}
                        style={{ display: "inline-block" }}
                        onChange={(e) => handleLeadershipTypeChange(e)}
                      />
                    </div>
                  </div>

                  {/* Teams */}
                  {teamSelected && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_team_id">Teams</label>
                        <Select
                          name="operation_team_id"
                          options={allTeams}
                          onChange={handleTeamsChange}
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Supervisor/Team Lead */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="report_to">Leaders</label>
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
                              ...reportTo?.employee,
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
