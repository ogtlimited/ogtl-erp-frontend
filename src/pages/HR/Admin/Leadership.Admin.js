import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import LeadersTable from '../../../components/Tables/EmployeeTables/leadersTable';

const LeadershipAdmin = () => {
  const [allLeaders, setAllLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // All Leaders:
  const fetchAllLeaders = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/leaders.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.leaders;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + ' ' + e?.last_name,
        };
      });

      setAllLeaders(mapp);
      setLoading(false);
    } catch (error) {
      console.log("Get All Leaders error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaders()
  }, []);

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
            <h3 className="page-title">Leaders <span style={{fontSize: '25px', color: '#999'}}>(Supervisors & Team leads)</span></h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">HR</Link>
              </li>
              <li className="breadcrumb-item active">Leadership</li>
            </ul>
          </div>
        </div>
      </div>

      <LeadersTable
        data={allLeaders}
        setData={setAllLeaders}
        loading={loading}
        setLoading={setLoading}
      />

    </>
  );
};

export default LeadershipAdmin;
