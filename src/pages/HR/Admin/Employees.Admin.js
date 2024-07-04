//* IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";
import EmployeesTable from "../../../components/Tables/EmployeeTables/employeeTable";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import $ from "jquery";

const AllEmployeesAdmin = () => {
  const navigate = useNavigate();
  const {
    showAlert,
    ErrorHandler,
    user,
    selectDepartments,
    selectCampaigns,
    selectDesignations,
  } = useAppContext();
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [modalType, setModalType] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const CurrentUserRoles = user?.employee_info?.roles;

  useEffect(() => {
    setDepartments(selectDepartments);
    setCampaigns(selectCampaigns);
    setDesignations(selectDesignations);
  }, [selectCampaigns, selectDepartments, selectDesignations]);

  // All Employees:
  const fetchAllEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          operation_office_id: officeFilter.length ? officeFilter : null,
          hr_designation_id: designationFilter.length
            ? designationFilter
            : null,
          status: statusFilter.length ? statusFilter : null,
        },
      });

      const resData = response?.data?.data?.employees;

      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const mapp = resData.map((emp) => {
        return {
          ...emp,
          fullName: emp?.full_name?.toUpperCase(),
          office: emp?.office?.office_type,
          officeName: emp?.office?.title,
          designation: emp?.designation,
          company_email: emp?.email,
          pic: emp?.profile_picture,
        };
      });

      setallEmployees(mapp);
      setLoading(false);
    } catch (error) {
      const component = "All Employees | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    designationFilter,
    officeFilter,
    page,
    searchTerm,
    sizePerPage,
    statusFilter,
  ]);

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  //Deactivate Employee
  const handleEmployeeAction = async (row) => {
    const fullName = row.fullName;
    const userId = row?.ogid;

    setIsResolving(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(
        `/api/v1/deactivate_employees/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            status: modalType,
          },
        }
      );

      if (modalType === "deactivate") {
        showAlert(true, fullName + ` has been deactivated`, "alert alert-info");
      } else if (modalType === "left") {
        showAlert(
          true,
          fullName + ` status has been updated to resigned`,
          "alert alert-info"
        );
      } else if (modalType === "terminated") {
        showAlert(
          true,
          fullName + ` status has been updated to terminated`,
          "alert alert-info"
        );
      }

      fetchAllEmployees();

      $("#exampleModal").modal("toggle");
      setIsResolving(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");

      $("#exampleModal").modal("toggle");
      setIsResolving(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employees</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">All Employees</li>
            </ul>
          </div>
          {CurrentUserRoles.includes("hr_manager") ||
          CurrentUserRoles.includes("senior_hr_associate") ? (
            <div className="col-auto float-right ml-auto">
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  onClick={() =>
                    navigate("/dashboard/hr/all-employees/employee/add")
                  }
                >
                  <i className="fa fa-plus"></i> Add Employee
                </a>
              </>
            </div>
          ) : null}
        </div>
      </div>

      <EmployeesTable
        data={allEmployees}
        setData={setallEmployees}
        loading={loading}
        setLoading={setLoading}
        departments={departments}
        campaigns={campaigns}
        designations={designations}
        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        campaignFilter={campaignFilter}
        setCampaignFilter={setCampaignFilter}
        officeFilter={officeFilter}
        setOfficeFilter={setOfficeFilter}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setModalType={setModalType}
        setSelectedRow={setSelectedRow}
        fetchAllEmployees={fetchAllEmployees}
      />

      <ConfirmModal
        title="Employee"
        selectedRow={selectedRow}
        deleteFunction={handleEmployeeAction}
        modalType={modalType}
        message="Are you sure you want to deactivate this employee?"
        isLoading={isResolving}
      />
    </>
  );
};

export default AllEmployeesAdmin;
