
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployeeAttendanceRecordTable from '../../../components/Tables/EmployeeTables/EmployeeAttendanceRecordTable';
import axiosInstance from '../../../services/api';

const EmployeeAttendanceRecordAdmin = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const { employee } = useParams();
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [designationFilter, setDesignationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{employee}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Employee</Link>
              </li>
              <li className="breadcrumb-item active">Attendance Record</li>
            </ul>
          </div>
        </div>
      </div>
    
      <EmployeeAttendanceRecordTable
        data={employeeAttendance}
        setData={setEmployeeAttendance}
        loading={loading}
        setLoading={setLoading}
        page={page}
        sizePerPage={sizePerPage}
        totalPages={totalPages}
        setPage={setPage}
        setSizePerPage={setSizePerPage}
        setTotalPages={setTotalPages}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
         
    </>
  );
};

export default EmployeeAttendanceRecordAdmin;
