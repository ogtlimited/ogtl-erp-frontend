/** @format */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { CREATE_PROFILE } from "../FormJSON/AddEmployee";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";
import EmployeeHelperService from "../../pages/HR/Admin/employee.helper";

export const AddEmployeeModal = () => {
  const selectInputRef = useRef();
  const { fetchEmployee, createEmployee, showAlert, status } = useAppContext();
  const [employee, setEmployee] = useState(CREATE_PROFILE);
  const [loading, setLoading] = useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isReportToValid, setIsReportToValid] = useState(false);
  // const [isDesignationValid, setIsDesignationValid] = useState(false);
  const [isEmploymentTypeValid, setIsEmploymentTypeValid] = useState(false);

  const [services, setServices] = useState([]);
  // const [DesignationServices, setDesignationServices] = useState([]);
  const [reportsTo, setReportsTo] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [projectId, setProjectId] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [validShift, setValidShift] = useState("");
  const [validDesignation, setValidDesignation] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [officeId, setOfficeId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsGenderValid(employee.gender ? true : false);
    setIsReportToValid(employee.reports_to ? true : false);
    // setIsDesignationValid(employee.designation ? true : false);
    setIsEmploymentTypeValid(employee.employeeType ? true : false);
    setIsAllValid(
      employee.gender &&
        employee.reports_to &&
        // employee.designation &&
        employee.employeeType
        ? true
        : false
    );
  }, [employee]);

  const handleDepartmentClick = (e) => {
    setEmployee({ ...employee, department: e?.value });
    setOfficeType("Department ");
    setOfficeId(e.value);

    selectInputRef.current.select.clearValue();
    axiosInstance.get(`/designation/office?department_id=${e.value}`).then((e) => {
      const response = e?.data?.data;
      const designationOpts = response?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setValidDesignation(designationOpts);
    }).catch((e) => {
      console.log("designation error:", e);
    });

    axiosInstance.get(`/api/shiftType/office?departmentId=${e.value}`).then((e) => {
      const response = e?.data?.shiftData;
      const shiftOpts = response?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      setValidShift(shiftOpts);
    }).catch((e) => {
      console.log("shift error:", e);
    });
  };

  const handleCampaignClick = (e) => {
    setEmployee({ ...employee, projectId: e?.value });
    setOfficeType("Campaign ");
    setOfficeId(e.value);

    selectInputRef.current.select.clearValue();
    axiosInstance.get(`/designation/office?campaign_id=${e.value}`).then((e) => {
      const response = e?.data?.data;
      const designationOpts = response?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setValidDesignation(designationOpts);
    }).catch((e) => {
      console.log("designation error:", e);
    });

    axiosInstance.get(`/api/shiftType/office?campaignId=${e.value}`).then((e) => {
      const response = e?.data?.shiftData;
      const shiftOpts = response?.map((e) => {
        return {
          label: e.shift_name,
          value: e._id,
        };
      });
      setValidShift(shiftOpts);
    }).catch((e) => {
      console.log("shift error:", e);
    });
  };

  useEffect(() => {
    createEmployee().then((res) => {
      const {
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees,
      } = res.data.createEmployeeForm;

      const empHelper = new EmployeeHelperService(
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees,
        status
      );

      const service = empHelper.mapRecords();
      setServices([service]);

      const reports_to = service.reportstoOpts;
      setReportsTo(reports_to);

      const department = service.deptopts;
      setDepartment(department);

      const projectId = service.campaingOpts;
      setProjectId(projectId);

      // const designation = service.designationOpts;
      // const validDesignation = designation.filter(
      //   (designation) => designation.officeId === officeId
      // );
      // setValidDesignation(validDesignation);


      // const default_shift = service.shiftsopts;
      // const validShift = default_shift.filter(
      //   (shift) => shift.officeId === officeId
      // );
      // setValidShift(validShift);

      const branch = service.branchOpts;
      setBranch(branch);

      const emp_status = service.employeestatusOpts;
      setEmployeeStatus(emp_status);
    });
  }, [createEmployee, officeId, status]);

  const genders = [
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Male",
      value: "male",
    },
  ];

  const employmentTypes = [
    {
      label: "Apprentice",
      value: "Apprentice",
    },
    {
      label: "Intern",
      value: "Intern",
    },
    {
      label: "Commission",
      value: "Commission",
    },
    {
      label: "Contract",
      value: "Contract",
    },
    {
      label: "Probation",
      value: "Probation",
    },
    {
      label: "PartTime",
      value: "PartTime",
    },
    {
      label: "FullTime",
      value: "FullTime",
    },
  ];

  const cancelEvent = () => {
    setEmployee(CREATE_PROFILE);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post("/employees", {
        ...employee,
        leaveCount: +employee.leaveCount,
      });
      // eslint-disable-next-line no-unused-vars
      const resData = res.data.data;

      showAlert(
        true,
        "New Employee created successfully",
        "alert alert-success"
      );
      $("#AddEmployeeFormModal").modal("toggle");
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      console.log("Add Employee Record Error:", errorMsg);
      setEmployee(CREATE_PROFILE);
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#AddEmployeeFormModal").modal("toggle");
      setLoading(false);
    }
    fetchEmployee();
    setEmployee(CREATE_PROFILE);
    setLoading(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="AddEmployeeFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Add New Employee
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
              {!services.length ? (
                <>
                  <p style={{ textAlign: "center" }}>Loading Form...</p>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                <form onSubmit={handleAddEmployee}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                          className="form-control"
                          name="first_name"
                          type="text"
                          value={employee.first_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="middle_name">Middle Name</label>
                        <input
                          className="form-control"
                          name="middle_name"
                          type="text"
                          value={employee.middle_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                          className="form-control"
                          name="last_name"
                          type="text"
                          value={employee.last_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ogid">OGID</label>
                        <input
                          className="form-control"
                          name="ogid"
                          type="text"
                          value={employee.ogid}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="company_email">Email</label>
                        <input
                          className="form-control"
                          name="company_email"
                          type="email"
                          value={employee.company_email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="gender">
                          Gender {!isGenderValid && <span>*</span>}
                        </label>
                        <Select
                          options={genders}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, gender: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date_of_joining">Date of Joining</label>
                        <input
                          className="form-control"
                          name="date_of_joining"
                          type="date"
                          value={employee.date_of_joining}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="reports_to">
                          Reports To {!isReportToValid && <span>*</span>}
                        </label>
                        <Select
                          options={reportsTo}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, reports_to: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="department">Department</label>
                        {officeType === "Campaign " ? (
                          <Select
                            options={department}
                            isSearchable={true}
                            value={employee.department === null}
                            onChange={(e) => handleDepartmentClick(e)}
                            style={{ display: "inline-block" }}
                          />
                        ) : (
                          <Select
                            options={department}
                            isSearchable={true}
                            onChange={(e) => handleDepartmentClick(e)}
                            style={{ display: "inline-block" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="projectId">Campaign</label>
                        {officeType === "Department " ? (
                          <Select
                            options={projectId}
                            isSearchable={true}
                            value={employee.projectId === null}
                            onChange={(e) => handleCampaignClick(e)}
                            style={{ display: "inline-block" }}
                          />
                        ) : (
                          <Select
                            options={projectId}
                            isSearchable={true}
                            onChange={(e) => handleCampaignClick(e)}
                            style={{ display: "inline-block" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkbox-group">
                        <label htmlFor="isAdmin">Admin</label>
                        <input
                          className="checkbox-control"
                          name="isAdmin"
                          type="checkbox"
                          value={employee.isAdmin}
                          onChange={(e) =>
                            setEmployee({
                              ...employee,
                              isAdmin: e.target.checked,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkbox-group">
                        <label htmlFor="isExpatriate">Expatriate</label>
                        <input
                          className="checkbox-control"
                          name="isExpatriate"
                          type="checkbox"
                          value={employee.isExpatriate}
                          onChange={(e) =>
                            setEmployee({
                              ...employee,
                              isExpatriate: e.target.checked,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        {!validDesignation.length ? (
                          <label htmlFor="designation">Designation</label>
                        ) : (
                          <label htmlFor="designation">
                            {officeType} Designation
                          </label>
                        )}
                        <Select
                          options={!validDesignation.length ? validDesignation : validDesignation}
                          isSearchable={true}
                          isClearable={true}
                          ref={selectInputRef}
                          onChange={(e) =>
                            setEmployee({ ...employee, designation: e?.value })
                          }
                          style={{ display: 'inline-block' }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        {!validShift.length ? (
                          <label htmlFor="default_shift">Shift</label>
                        ) : (
                          <label htmlFor="default_shift">
                            {officeType} Shift
                          </label>
                        )}
                        <Select
                          options={!validShift.length ? validShift : validShift}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({
                              ...employee,
                              default_shift: e?.value,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employeeType">
                          Employment Type{" "}
                          {!isEmploymentTypeValid && <span>*</span>}
                        </label>
                        <Select
                          options={employmentTypes}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, employeeType: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <Select
                          options={branch}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, branch: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <Select
                          options={employeeStatus}
                          isSearchable={true}
                          isClearable={true}
                          onChange={(e) =>
                            setEmployee({ ...employee, status: e?.value })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="leaveCount">Leave Count</label>
                        <input
                          className="form-control"
                          name="leaveCount"
                          type="number"
                          value={employee.leaveCount}
                          onChange={handleFormChange}
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
                      style={{ zIndex: 0 }}
                      disabled={!isAllValid}
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
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
