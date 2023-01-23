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

  const fetchChartData = () => {
    axiosInstance
      .get('/api/academy/report/all')
      .then((res) => {
        const data1 = res?.data?.data[0].interested_program;
        const data2 = res?.data?.data[0].qualification;
        const data3 = res?.data?.data[0].engagement_mode;
        const data4 = res?.data?.data[0].stacks;

        const dataSamp = res?.data?.data;
        console.log('Chart data:', dataSamp);

        if (!data1.length || !data2.length || !data3.length || !data4.length) {
          return setError('No Academy Data');
        }
        const interested_program = {};
        const highest_qualification_attained = {};
        const mode_of_engagement = {};
        const stack = {};

        // Interested Program
        interested_program['keys'] = data1.map((item) =>
          item._id && item._id !== null
            ? item._id
            : 'No Interested Program Specified'
        );
        interested_program['values'] = data1.map((item) => item.total);

        setChartData1(interested_program);

        // Highest Qualification Attained
        highest_qualification_attained['keys'] = data2.map((item) =>
          item._id && item._id !== null
            ? item._id
            : 'No Highest Qualification Attained Specified'
        );
        highest_qualification_attained['values'] = data2.map(
          (item) => item.total
        );

        setChartData2(highest_qualification_attained);

        // Mode of Engagement
        mode_of_engagement['keys'] = data3.map((item) =>
          item._id && item._id !== null
            ? item._id
            : 'No Mode of Engagement Specified'
        );
        mode_of_engagement['values'] = data3.map((item) => item.total);

        setChartData3(mode_of_engagement);

        // Stack
        stack['keys'] = data4.map((item) =>
          item._id && item._id !== null ? item._id : 'No Stack Specified'
        );
        stack['values'] = data4.map((item) => item.total);

        setChartData4(stack);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchChartData();
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
