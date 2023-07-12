
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import CampaignAttendanceTable from '../../../components/Tables/EmployeeTables/CampaignAttendanceTable';
import axiosInstance from '../../../services/api';
import moment from 'moment';	

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

  const firstDay = moment().startOf('month').format('YYYY-MM-DD');
  const lastDay = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
	const [today, setToday] = useState(null);

  useEffect(() => {
		const time = new Date().toDateString();
		const today_date = moment(time).format("yyyy-MM-DD");
		setToday(today_date);
	}, []);
  

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
        setLoading(false);
      });
  }, [designationFilter, id, page, searchTerm, sizePerPage]);


  const fetchDesignationByCampaign = useCallback(() => {  
  axiosInstance
      .get(`/office/employees?campaign=${id}`)
      .then((res) => {
        let resData = res?.data?.data.employees;
        
        const filteredData = resData.map((data) => ({
          designation: data?.designation?.designation,
        }));

        const filteredDesignation = filteredData.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.designation === item.designation)
        );

        const formattedDesignation = filteredDesignation.map((data) => ({
          label: data.designation,
          value: data.designation,
        }));

        setDesignation(formattedDesignation);
      })
      .catch((error) => {
        console.log(error);
      })
    }, [id]);

  useEffect(() => {
    fetchEmployeeByCampaign();
    fetchDesignationByCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDesignationByCampaign, fetchEmployeeByCampaign]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{campaign}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/attendance-record">Attendance Records</Link>
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

        fromDate={fromDate}
        toDate={toDate}
        today={today}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
         
    </>
  );
};

export default CampaignAttendanceAdmin;
