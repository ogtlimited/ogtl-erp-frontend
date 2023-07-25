/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";
import EmployeesTable from "../../../components/Tables/EmployeeTables/employeeTable";
import { useAppContext } from "../../../Context/AppContext";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const AllEmployeesAdmin = () => {
  const navigate = useNavigate();
  const { showAlert } = useAppContext();
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

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
          fullName: emp?.full_name,
          office: emp?.office?.office_type,
          officeName: emp?.office?.title,
          designation: emp?.designation,
          company_email: emp?.email,
        };
      });

      setallEmployees(mapp);
      setLoading(false);
    } catch (error) {
      showAlert(true, error?.response?.data?.errors, "alert alert-warning");
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

  // All Campaigns:
  const fetchAllCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedCampaigns = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setCampaigns(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.log("Get All Campaigns error:", error);
      setLoading(false);
    }
  };

  // All Departments:
  const fetchAllDepartments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedDepartments = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setDepartments(formattedDepartments);
      setLoading(false);
    } catch (error) {
      console.log("Get All Departments error:", error);
      setLoading(false);
    }
  };

  // All Designations:
  const fetchDesignation = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/designations.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.designations;

      const formattedDesignation = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setDesignations(formattedDesignation);
      setLoading(false);
    } catch (error) {
      console.log("Get All Designations error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchAllCampaigns();
    fetchAllDepartments();
    fetchDesignation();
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

    setLoading(true);
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

      if (modalType === "deactivate" ) {
        showAlert(
          true,
          fullName + ` has been deactivated`,
          "alert alert-info"
        );
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

      // showAlert(
      //   true,
      //   fullName + ` status has been updated to ${modalType}`,
      //   "alert alert-success"
      // );

      fetchAllEmployees();
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employees</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr-dashboard">HR</Link>
              </li>
              <li className="breadcrumb-item active">Employees</li>
            </ul>
          </div>
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
      />
    </>
  );
};

export default AllEmployeesAdmin;
