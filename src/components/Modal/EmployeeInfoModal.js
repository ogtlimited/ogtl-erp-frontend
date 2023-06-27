import React, { useState, useEffect } from "react";
import { officeTypeOptions, categoryOptions } from "../FormJSON/AddEmployee";
import axiosInstance from "../../services/api";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import Select from "react-select";

export const EmployeeInfoModal = ({ data, fetchEmployeeProfile }) => {
  const {
    selectCampaigns,
    selectDepartments,
    selectDesignations,
  } = useAppContext();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [officeType, setOfficeType] = useState("");

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
      "date_of_joining": employeeInfo?.employee?.date_of_joining,
      "office_type": employeeInfo?.office?.office_type,
      "operation_office_id": employeeInfo?.office?.id,
      "hr_designation_id": employeeInfo?.employee?.designation?.id,
      "remote": employeeInfo?.employee?.remote,
      "leave_count": employeeInfo?.employee?.leave_count,
    }

    setLoading(true);
    try {
      const id = employeeInfo?.employee?.ogid;
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/api/v1/employees/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            "employee_info": editedEmployeeInfo,
          }
        }
      );

      fetchEmployeeProfile();
      $("#EmployeeInfoModal").modal("toggle");
      setEmployeeInfo(data);
      setLoading(false);
    } catch (error) {
      console.log("Edit Employee Info error:", error);
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date_of_joining">Date of Joining</label>
                      <input
                        name="date_of_joining"
                        type="date"
                        className="form-control"
                        value={employeeInfo?.employee?.date_of_joining?.split("T")[0]}
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

                  {/* Office */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="operation_office_id">Office</label>
                      <Select
                        name="operation_office_id"
                        options={officeType === "department" ? selectDepartments : selectCampaigns}
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="remote">
                        Is this Employee a Remote Staff?
                      </label>
                      <Select
                        name="remote"
                        options={categoryOptions}
                        value={{
                          label: employeeInfo?.employee?.remote ? "Yes" : "No",
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
