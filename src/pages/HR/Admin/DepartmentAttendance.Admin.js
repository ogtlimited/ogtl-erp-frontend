
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import DepartmentAttendanceTable from '../../../components/Tables/EmployeeTables/DepartmentAttendanceTable';
import axiosInstance from '../../../services/api';

const DepartmentAttendanceAdmin = () => {
  const [allEmployees, setallEmployees] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [totalGenderCount, setTotalGenderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState([]);
  const { department } = useParams();
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [designationFilter, setDesignationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGenderByDepartment = async () => {

    try {
      const response = await axiosInstance.get(
        `/departments/gender-count/${id}`
      );

      const formattedFemale =
        response.data?.data?.genderCountByDepartment.filter(
          (gender) => gender._id === 'female'
        );
      const female = formattedFemale[0] ? formattedFemale[0]?.total : 0;
      setFemale(female);

      const formattedMale = response.data?.data?.genderCountByDepartment.filter(
        (gender) => gender._id === 'male'
      );
      const male = formattedMale[0] ? formattedMale[0]?.total :0;
      setMale(male);

      const headCount = male + female;
      setTotalGenderCount(headCount);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEmployeeByDepartment = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`/departments/employees/${id}`, {
        params: {
          designation: designationFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data.employeesByDepartment;
        let resOptions = res?.data?.data?.pagination;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        let formatted = resData.map((e) => ({
          ...e,
          fullName: e.first_name + ' ' + e.last_name + ' ' + e?.middle_name,
          designation_name: e?.designation?.designation,
          department_name: e?.department?.department,
        }));

        setallEmployees(formatted);
        setLoading(false);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [designationFilter, id, page, searchTerm, sizePerPage]);


  const fetchDesignationByDepartment = useCallback(() => {  
  axiosInstance
      .get(`/departments/employees/designations/${id}`)
      .then((res) => {
        let resData = res?.data?.data.designationsByDepartment;
        
        const filteredData = resData.filter((e) => e._id !== null);

        let formattedDesignation = filteredData.map((e) => {
          return {
            label: e._id?.designation,
            value: e._id?.designation,
          };
        });
        console.log("formatted designation:", formattedDesignation);
        setDesignation(formattedDesignation);
      })
      .catch((error) => {
        console.log(error);
      })
    }, [id]);

  useEffect(() => {
    fetchGenderByDepartment();
    fetchEmployeeByDepartment();
    fetchDesignationByDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDesignationByDepartment, fetchEmployeeByDepartment]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{department}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>

          <div className="dept-dashboard-card-group">
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-users"></i>
                </span>
                <div className="card-info">
                  <h3>{totalGenderCount}</h3>
                </div>
              </div>
              <span>Head Count</span>
            </div>
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-male"></i>
                </span>
                <div className="card-info">
                  <h3>{male}</h3>
                </div>
              </div>
              <span>Male</span>
            </div>
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-female"></i>
                </span>
                <div className="card-info">
                  <h3>{female}</h3>
                </div>
              </div>
              <span>Female</span>
            </div>
          </div>

        </div>
      </div>
    
      <DepartmentAttendanceTable
        designation={designation}
        data={allEmployees}
        setData={setallEmployees}
        loading={loading}
        setLoading={setLoading}
        page={page}
        sizePerPage={sizePerPage}
        totalPages={totalPages}
        setPage={setPage}
        setSizePerPage={setSizePerPage}
        setTotalPages={setTotalPages}
        fetchEmployeeByDepartment={fetchEmployeeByDepartment}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
         
    </>
  );
};

export default DepartmentAttendanceAdmin;
