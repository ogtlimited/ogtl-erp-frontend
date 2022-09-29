/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import axiosInstance from '../../services/api';
import AcademyStatistics2 from '../../components/charts/academy-statistics-2';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio2 = () => {
  const { combineRequest, showAlert } = useAppContext();
  const [applicantData, setApplicantData] = useState([]);

  const initialChartState = { keys: ['No Record Found'], values: [0] };
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [chartData4, setChartData4] = useState([]);
  const [error, setError] = useState('');

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        const data = res?.data?.data;
        setApplicantData(data);
        if (data.length === 0) {
          return setError('No Academy Data');
        }
        const interested_program = {};
        const highest_qualification_attained = {};
        const mode_of_engagement = {};
        const stack = {};

        const intPos = data.map((item) => item.interested_program);
        const hiQuAt = data.map((item) => item.highest_qualification_attained);
        const modOfEng = data.map((item) => item.mode_of_engagement);
        const stk = data.map((item) => item.stack);

        // eslint-disable-next-line no-unused-vars
        const interested_program_count = intPos.forEach((x) => {
          interested_program['keys'] = [
            ...new Set(
              data.map((item) =>
                item.interested_program &&
                item.interested_program !== undefined
                  ? item.interested_program
                  : 'No Interested Program Specified'
              )
            ),
          ];
          interested_program['values'] = [
            ...new Set(data.map((item) => item.interested_program)),
          ].map((y) => intPos.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const highest_qualification_attained_count = hiQuAt.forEach((x) => {
          highest_qualification_attained['keys'] = [
            ...new Set(
              data.map((item) =>
                item.highest_qualification_attained &&
                item.highest_qualification_attained !== undefined
                  ? item.highest_qualification_attained
                  : 'No Highest Qualification Attained Specified'
              )
            ),
          ];
          highest_qualification_attained['values'] = [
            ...new Set(data.map((item) => item.highest_qualification_attained)),
          ].map((y) => hiQuAt.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const mode_of_engagement_count = modOfEng.forEach((x) => {
          mode_of_engagement['keys'] = [
            ...new Set(
              data.map((item) =>
                item.mode_of_engagement && item.mode_of_engagement !== undefined
                  ? item.mode_of_engagement
                  : 'No Mode of Engagement Specified'
              )
            ),
          ];
          mode_of_engagement['values'] = [
            ...new Set(data.map((item) => item.mode_of_engagement)),
          ].map((y) => modOfEng.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const stack_count = stk.forEach((x) => {
          stack['keys'] = [
            ...new Set(
              data.map((item) =>
                item.stack && item.stack !== undefined
                  ? item.stack
                  : 'No Stack Specified'
              )
            ),
          ];
          stack['values'] = [...new Set(data.map((item) => item.stack))].map(
            (y) => stk.filter((z) => z === y).length
          );
        });

        setApplicantData(
          interested_program,
          highest_qualification_attained,
          mode_of_engagement,
          stack
        );
        setChartData1(interested_program);
        setChartData2(highest_qualification_attained);
        setChartData3(mode_of_engagement);
        setChartData4(stack);
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
