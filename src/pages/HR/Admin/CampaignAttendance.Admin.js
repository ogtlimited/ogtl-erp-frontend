
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import CampaignAttendanceTable from '../../../components/Tables/EmployeeTables/CampaignAttendanceTable';
import axiosInstance from '../../../services/api';

const CampaignAttendanceAdmin = () => {
  const [allEmployees, setallEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState([]);
  const { campaign } = useParams();
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [designationFilter, setDesignationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployeeByCampaign = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`/office/employees?campaign=${id}`, {
        params: {
          designation: designationFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data.employees;
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
    fetchEmployeeByCampaign();
    fetchDesignationByDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDesignationByDepartment, fetchEmployeeByCampaign]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{campaign}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Campaign</li>
            </ul>
          </div>

        </div>
      </div>
    
      <CampaignAttendanceTable
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
        fetchEmployeeByCampaign={fetchEmployeeByCampaign}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
         
    </>
  );
};

export default CampaignAttendanceAdmin;
