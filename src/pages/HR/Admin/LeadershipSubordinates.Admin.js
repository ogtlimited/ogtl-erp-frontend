import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import LeadersSubordinatesTable from '../../../components/Tables/EmployeeTables/leadersSubordinatesTable';

const LeadershipSubordinateAdmin = () => {
  const { id } = useParams();
  const { employee } = useParams();
  const [loading, setLoading] = useState(true);
  const [allLeadersSubordinates, setAllLeadersSubordinates] = useState([]);

  // All Leaders Subordinates:
  const fetchAllLeadersSubordinates = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/v1/subordinates.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          ogid: id,
        }
      });

      const resData = response?.data?.data?.subordinates;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + ' ' + e?.last_name,
        };
      });

      setAllLeadersSubordinates(mapp);
      setLoading(false);
    } catch (error) {
      console.log("Get All Leaders subordinates error:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAllLeadersSubordinates();
  }, [fetchAllLeadersSubordinates]);

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
            <h3 className="page-title">{employee}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/hr/all-employees/employee/leader">Leadership</Link>
              </li>
              <li className="breadcrumb-item active">Subordinates</li>
            </ul>
          </div>
        </div>
      </div>

      <LeadersSubordinatesTable
        data={allLeadersSubordinates}
        setData={setAllLeadersSubordinates}
        loading={loading}
        setLoading={setLoading}
      />

    </>
  );
};

export default LeadershipSubordinateAdmin;
