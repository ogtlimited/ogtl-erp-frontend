/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import axiosInstance from '../../services/api';
import AcademyStatistics2 from '../../components/charts/academy-statistics-2';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio2 = () => {
  const { combineRequest, showAlert } = useAppContext();

  const initialChartState = { keys: ['No Record Found'], values: [0] };
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [chartData4, setChartData4] = useState([]);
  const [error, setError] = useState('');

  const fetchInterestedPrograms = () => {
    axiosInstance
    .get('/api/academy/interested_program')
    .then((res) => {
      const data = res?.data?.data;
      
      if (data.length === 0) {
        return setError('No Academy Data');
      }
      const interested_program = {};

      interested_program['keys'] = data.map((item) =>
        item._id && item._id !== null ? item._id : 'No Interested Program Specified'
      );
      interested_program['values'] = data.map((item) => item.count);

      setChartData1(interested_program);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fetchQualifications = () => {
    axiosInstance
    .get('/api/academy/qualification')
    .then((res) => {
      const data = res?.data?.data;

      if (data.length === 0) {
        return setError('No Academy Data');
      }
      const highest_qualification_attained = {};

      highest_qualification_attained['keys'] = data.map((item) =>
        item._id && item._id !== null ? item._id : 'No Highest Qualification Attained Specified'
      );
      highest_qualification_attained['values'] = data.map((item) => item.count);

      setChartData2(highest_qualification_attained);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fetchEngagement = () => {
    axiosInstance
    .get('/api/academy/mode')
    .then((res) => {
      const data = res?.data?.data;

      if (data.length === 0) {
        return setError('No Academy Data');
      }
      const mode_of_engagement = {};

      mode_of_engagement['keys'] = data.map((item) =>
        item._id && item._id !== null ? item._id : 'No Mode of Engagement Specified'
      );
      mode_of_engagement['values'] = data.map((item) => item.count);

      setChartData3(mode_of_engagement);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fetchStack = () => {
    axiosInstance
    .get('/api/academy/stack')
    .then((res) => {
      const data = res?.data?.data;

      if (data.length === 0) {
        return setError('No Academy Data');
      }
      const stack = {};

      stack['keys'] = data.map((item) =>
        item._id && item._id !== null ? item._id : 'No Stack Specified'
      );
      stack['values'] = data.map((item) => item.count);

      setChartData4(stack);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchInterestedPrograms();
    fetchQualifications();
    fetchEngagement();
    fetchStack();
  }, []);

  return (
    <>
      <div className="row">
        {error ? (
          <AcademyStatistics2
            chartData1={initialChartState}
            chartData2={initialChartState}
            chartData3={initialChartState}
            chartData4={initialChartState}
          />
        ) : (
          <AcademyStatistics2
            chartData1={chartData1}
            chartData2={chartData2}
            chartData3={chartData3}
            chartData4={chartData4}
          />
        )}
      </div>
    </>
  );
};

export default AcademyRatio2;
