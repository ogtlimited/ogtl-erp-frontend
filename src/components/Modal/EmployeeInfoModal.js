import React, { useState, useEffect } from "react";
import { officeTypeOptions, categoryOptions } from "../FormJSON/AddEmployee";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const EmployeeInfoModal = ({
  data,
  fetchEmployeeProfile,
  setEmployeeOgid,
}) => {
  const navigate = useNavigate();
  const {
    selectCampaigns,
    selectDepartments,
    selectDesignations,
    user,
    showAlert,
  } = useAppContext();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canView = ["hr_manager", "senior_hr_associate"];

  useEffect(() => {
    setEmployeeInfo(data);
    setOfficeType(data?.office?.office_type);
  }, [data]);

  const handleOfficeTypeChange = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      office: {
        ...employeeInfo.office,
        office_type: e?.value,
      },
    });
    setOfficeType(e?.value);
  };

  const handleEditEmployeeInfo = async (e) => {
    e.preventDefault();

    const editedEmployeeInfo = {
      date_of_joining: employeeInfo?.employee?.date_of_joining,
      office_type: employeeInfo?.office?.office_type,
      operation_office_id: employeeInfo?.office?.id,
      hr_designation_id: employeeInfo?.employee?.designation?.id,
      leave_approval_level: Number(
        employeeInfo?.employee?.leave_approval_level
      ),
      remote: employeeInfo?.employee?.remote,
      leave_count: employeeInfo?.employee?.leave_count,
      ogid: employeeInfo?.employee?.ogid,
    };

    setLoading(true);
    try {
      const id = data?.employee?.ogid;
      console.log(id);
      const response = await axiosInstance.put(`/api/v1/employees/${id}.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        payload: {
          employee_info: editedEmployeeInfo,
          user_info: {
            email: employeeInfo?.employee?.email,
          },
        },
      });

      const newOgid = employeeInfo?.employee?.ogid;
      setEmployeeOgid(newOgid);
      const successMessage = response?.data?.data?.message;

      showAlert(true, successMessage, "alert alert-success");
      navigate(`/dashboard/user/profile/${newOgid}`);
      fetchEmployeeProfile(newOgid);
      $("#EmployeeInfoModal").modal("toggle");
      setEmployeeInfo(data);
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
        id="EmployeeInfoModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Edit Employee Information
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
              <form onSubmit={handleEditEmployeeInfo}>
                <div className="row">
                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ogid">OGID</label>
                        <input
                          name="ogid"
                          type="text"
                          className="form-control"
                          value={employeeInfo?.employee?.ogid}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                ogid: e?.target?.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}

                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          value={employeeInfo?.employee?.email}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                email: e?.target?.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}

                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date_of_joining">Date of Joining</label>
                        <input
                          name="date_of_joining"
                          type="date"
                          className="form-control"
                          value={
                            employeeInfo?.employee?.date_of_joining?.split(
                              "T"
                            )[0]
                          }
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                date_of_joining: e?.target?.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <Select
                        name="branch"
                        options={selectBranches}
                        value={{
                          label: employeeInfo?.employee?.branch,
                          value: employeeInfo?.employee?.operation_branch_id,
                        }}
                        onChange={(e) =>
                          setEmployeeInfo({
                            ...employeeInfo,
                            employee: {
                              ...employeeInfo.employee,
                              id: e?.value,
                              title: e?.label,
                            },
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div> */}

                  {/* Office Type */}
                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="office_type">Office Type</label>
                        <Select
                          options={officeTypeOptions}
                          value={{
                            label: employeeInfo?.office?.office_type,
                            value: officeType,
                          }}
                          style={{ display: "inline-block" }}
                          onChange={(e) => handleOfficeTypeChange(e)}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Office */}
                  {selectCampaigns.length || selectDepartments.length ? (
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
                            label: employeeInfo?.office?.title,
                            value: employeeInfo?.office?.id,
                          }}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              office: {
                                ...employeeInfo.office,
                                id: e?.value,
                                title: e?.label,
                              },
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {selectDesignations.length ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hr_designation_id">Designation</label>
                        <Select
                          name="hr_designation_id"
                          options={selectDesignations}
                          value={{
                            label: employeeInfo?.employee?.designation?.title,
                            value: employeeInfo?.employee?.designation.id,
                          }}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                designation: {
                                  ...employeeInfo.employee.designation,
                                  id: e?.value,
                                  title: e?.label,
                                },
                              },
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="remote">
                          Is this Employee a Remote Staff?
                        </label>
                        <Select
                          name="remote"
                          options={categoryOptions}
                          value={{
                            label: employeeInfo?.employee?.remote
                              ? "Yes"
                              : "No",
                            value: employeeInfo?.employee?.remote,
                          }}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                remote: e?.value,
                                remoteName: e?.label,
                              },
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="leave_count">Leave Count</label>
                        <input
                          name="leave_count"
                          type="number"
                          className="form-control"
                          value={employeeInfo?.employee?.leave_count}
                          onChange={(e) =>
                            setEmployeeInfo({
                              ...employeeInfo,
                              employee: {
                                ...employeeInfo.employee,
                                leave_count: e?.target?.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}

                  {CurrentUserRoles.includes("hr_manager") ||
                  CurrentUserRoles.includes("senior_hr_associate") ? <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="leave_approval_level">
                        Leave Approval Level
                      </label>
                      <input
                        name="leave_approval_level"
                        type="number"
                        className="form-control"
                        value={employeeInfo?.employee?.leave_approval_level}
                        onChange={(e) =>
                          setEmployeeInfo({
                            ...employeeInfo,
                            employee: {
                              ...employeeInfo.employee,
                              leave_approval_level: e?.target?.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div> : null}
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
