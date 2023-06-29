/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import EmployeesTable from '../../../components/Tables/EmployeeTables/employeeTable';

const AllEmployeesAdmin = () => {
  const navigate = useNavigate();
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');
  
  const [departments, setDepartments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [designations, setDesignations] = useState([]);
  
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // All Employees:
  const fetchAllEmployees = useCallback(async () => {

    try {
      const response = await axiosInstance.get('/api/v1/employees.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
          search: searchTerm,
          operation_office_id: officeFilter.length ? officeFilter : null,
          hr_designation_id: designationFilter.length ? designationFilter : null,
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
          company_email: emp?.email
        };
      });

      setallEmployees(mapp);
      setLoading(false);
    } catch (error) {
      console.log("Get All Employees error:", error);
      setLoading(false);
    }
  },[designationFilter, officeFilter, page, searchTerm, sizePerPage, statusFilter]);

  // // All Offices:
  // const fetchAllOffices = async () => {
  //   try {
  //     const response = await axiosInstance.get('/api/v1/offices.json', {
  //       headers: {          
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //     });
  //     const resData = response?.data?.data?.offices;

  //     const allDepartments = resData.filter((e) => e?.office_type === "department");
  //     const allCampaigns = resData.filter((e) => e?.office_type === "campaign");

  //     const formattedDepartments = allDepartments.map((e) => ({
  //       label: e?.title.toUpperCase(),
  //       value: e.id,
  //     })).sort((a, b) => a.label.localeCompare(b.label));

  //     const formattedCampaigns = allCampaigns.map((e) => ({
  //       label: e?.title.toUpperCase(),
  //       value: e.id,
  //     })).sort((a, b) => a.label.localeCompare(b.label));

  //     setDepartments(formattedDepartments);
  //     setCampaigns(formattedCampaigns);
  //   } catch (error) {
  //     console.log("Get All Offices error:", error);
  //   }
  // };

  // All Campaigns:
  const fetchAllCampaigns = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/offices.json",
        {
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
        }
      );
      const resData = response?.data?.data?.offices;

      const formattedCampaigns = resData.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

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
      const response = await axiosInstance.get(
        "/api/v1/offices.json",
        {
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
        }
      );
      const resData = response?.data?.data?.offices;

      const formattedDepartments = resData.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

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
      const response = await axiosInstance.get('/api/v1/designations.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.designations;

      const formattedDesignation = resData.map((e) => ({
        label: e?.title.toUpperCase(),
        value: e.id,
      })).sort((a, b) => a.label.localeCompare(b.label));

      setDesignations(formattedDesignation);
    } catch (error) {
      console.log("Get All Designations error:", error);
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
                  onClick={() => navigate('/dashboard/hr/all-employees/employee/add')}
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
      />
    </>
  );
};

export default AllEmployeesAdmin;
