/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import axiosInstance from '../../services/api';
import AcademyStatistics from '../../components/charts/academy-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio = () => {
  const { combineRequest, showAlert } = useAppContext();
  const [genderData, setGenderData] = useState([]);

  const initialChartState = { keys: ['No Record Found'], values: [0] };
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');

  const fetchByGender = () => {
    axiosInstance
      .get('/api/academy/report/all')
      .then((res) => {
        const data = res?.data?.data[0].gender;
        setGenderData(data);

        if (data.length === 0) {
          return setError('No Academy Data');
        }
        const gender = {};

        gender['keys'] = data.map((item) =>
          item._id && item._id !== null ? item._id : 'No Gender Specified'
        );
        gender['values'] = data.map((item) => item.total);

        setGenderData(gender);
        setChartData(gender);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchByGender();
  }, []);

  return (
    <>
      <div className="row">
        {error ? (
          <AcademyStatistics
            chartTitle="Gender"
            chartData={initialChartState}
          />
        ) : (
          <AcademyStatistics chartTitle="Gender" chartData={chartData} />
        )}
      </div>
    </>
  );
};

export default AcademyRatio;
