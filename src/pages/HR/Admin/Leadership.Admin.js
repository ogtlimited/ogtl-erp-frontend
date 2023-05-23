/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import LeadersTable from '../../../components/Tables/EmployeeTables/leadersTable';
import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';
import EmployeeHelperService from './employee.helper';

const LeadershipAdmin = () => {
  const { createEmployee, status } = useAppContext();
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setfilters] = useState([]);
  const [loadForm, setloadForm] = useState(false);
  const { user } = useAppContext();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ogidFilter, setOgidFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [designations, setDesignations] = useState([]);

  const fetchAllEmployee = useCallback(() => {
    axiosInstance
      .get('/leads', {
        params: {
          department: departmentFilter,
          designation: designationFilter,
          status: statusFilter,
          ogid: ogidFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employees;
        let resOptions = e?.data?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName:
              emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
            designation_name: emp?.designation?.designation,
            department_name: emp?.department?.department,
            project: emp?.projectId?.project_name,
          };
        });

        setallEmployees(mapp);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [
    departmentFilter,
    designationFilter,
    ogidFilter,
    page,
    searchTerm,
    sizePerPage,
    statusFilter,
  ]);

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        department: e.department,
      })).sort((a, b) => a.department.localeCompare(b.department));

      setDepartments(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/api/project');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        project: e?.project_name        ,
      })).sort((a, b) => a.project.localeCompare(b.project));
      
      setProjects(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchDesignation = async () => {
    try {
      const response = await axiosInstance.get('/designation');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        designation: e.designation,
      })).sort((a, b) => a.designation.localeCompare(b.designation));

      setDesignations(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployee();
    fetchDepartment();
    fetchProjects();
    fetchDesignation();
  }, [fetchAllEmployee, user]);

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

      setfilters([
        {
          name: 'projectId',
          placeholder: 'Filter by campaign',
          options: service.campaingOpts,
        },
        {
          name: 'department',
          placeholder: 'Filter by department',
          options: service.deptopts,
        },
        {
          name: 'designation',
          placeholder: 'Filter by designation',
          options: service.designationOpts,
        },
        {
          name: 'status',
          placeholder: 'Filter by status',
          options: service.employeestatusOpts,
        },
      ]);

      if (!loadForm) setloadForm(true);
    });
  }, [createEmployee, loadForm, status]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  const defaultSorted = [
    {
      dataField: 'designation',
      order: 'desc',
    },
  ];

 
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaders <span style={{fontSize: '25px', color: '#999'}}>(Supervisors & Team leads)</span></h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leadership</li>
            </ul>
          </div>
        </div>
      </div>

      <LeadersTable
        loading={loading}
        data={allEmployees}
        setData={setallEmployees}
        filters={filters}
        loadForm={loadForm}
        defaultSorted={defaultSorted}
        departments={departments}
        projects={projects}
        designations={designations}

        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        ogidFilter={ogidFilter}
        setOgidFilter={setOgidFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setLoading={setLoading}
      />

    </>
  );
};

export default LeadershipAdmin;
