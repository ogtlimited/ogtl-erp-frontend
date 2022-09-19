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

  const initialChartState = { keys: ["No Record Found"], values: [0] };
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [chartData4, setChartData4] = useState([]);
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
        const interested_position = {};
        const highest_qualification_attained = {};
        const mode_of_engagement = {};
        const stack = {};

        const intPos = data.map((item) => item.interested_position);
        const hiQuAt = data.map(
          (item) => item.highest_qualification_attained
        );
        const modOfEng = data.map((item) => item.mode_of_engagement);
        const stk = data.map((item) => item.stack);

        // eslint-disable-next-line no-unused-vars
        const interested_position_count = intPos.forEach((x) => {
          interested_position['keys'] = [
            ...new Set(data.map((item) => item.interested_position)),
          ];
          interested_position['values'] = [
            ...new Set(data.map((item) => item.interested_position)),
          ].map((y) => intPos.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const highest_qualification_attained_count = hiQuAt.forEach((x) => {
          highest_qualification_attained['keys'] = [
            ...new Set(
              data.map((item) => item.highest_qualification_attained)
            ),
          ];
          highest_qualification_attained['values'] = [
            ...new Set(
              data.map((item) => item.highest_qualification_attained)
            ),
          ].map((y) => hiQuAt.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const mode_of_engagement_count = modOfEng.forEach((x) => {
          mode_of_engagement['keys'] = [
            ...new Set(data.map((item) => item.mode_of_engagement)),
          ];
          mode_of_engagement['values'] = [
            ...new Set(data.map((item) => item.mode_of_engagement)),
          ].map((y) => modOfEng.filter((z) => z === y).length);
        });

        // eslint-disable-next-line no-unused-vars
        const stack_count = stk.forEach((x) => {
          stack['keys'] = [
            ...new Set(data.map((item) => item.stack)),
          ];
          stack['values'] = [
            ...new Set(data.map((item) => item.stack)),
          ].map((y) => stk.filter((z) => z === y).length);
        });

        setChartData1(interested_position);
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
  }, [applicantData]);

  return (
    <>
      <div className="row">
       { error ? <AcademyStatistics2
          chartData1={initialChartState}
          chartData2={initialChartState}
          chartData3={initialChartState}
          chartData4={initialChartState}
        /> : <AcademyStatistics2
          chartData1={chartData1}
          chartData2={chartData2}
          chartData3={chartData3}
          chartData4={chartData4}
        />}
      </div>
    </>
  );
};

export default AcademyRatio2;
