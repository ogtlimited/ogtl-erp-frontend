/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import axiosInstance from '../../services/api';
import AcademyStatistics from '../../components/charts/academy-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio = () => {
  const { combineRequest, showAlert } = useAppContext();
  const [applicantData, setApplicantData] = useState([]);
  
  const initialChartState = { keys: ["No Record Found"], values: [0] };
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");


  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        const data = res?.data?.data
        setApplicantData(data);
        if (data.length === 0) {
          return setError("No Academy Data")
        }
        const gender = {};

        const sex = data.map((item) => item.gender);

        // eslint-disable-next-line no-unused-vars
        const gender_count = sex.forEach((x) => {
          gender['keys'] = [
            ...new Set(data.map((item) => item.gender && item.gender !== undefined ? item.gender : "No Gender Specified")),
          ];
          gender['values'] = [
            ...new Set(data.map((item) => item.gender)),
          ].map((y) => sex.filter((z) => z === y).length);
        });
        
        setApplicantData(gender);
        setChartData(gender);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAcademyApplicants();
  }, []);
  
  return (
    <>
      <div className="row">
        {error ? <AcademyStatistics
          chartTitle="Gender"
          chartData={initialChartState}
        /> : <AcademyStatistics
          chartTitle="Gender"
          chartData={chartData}
        />}
      </div>
    </>
  );
};

export default AcademyRatio;
