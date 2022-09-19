/** @format */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import axiosInstance from '../../services/api';
import AcademyStatistics2 from '../../components/charts/academy-statistics-2';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio2 = () => {
  const { combineRequest, showAlert } = useAppContext();
  const [applicantData, setApplicantData] = useState([]);

  const initialChartState = { labels: [], datasets: [] };
  const [chartData, setChartData] = useState([]);
  const [data, setdata] = useState(initialChartState);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        const interested_position = {};
        const highest_qualification_attained = {};
        const mode_of_engagement = {};
        const stack = {};

        const intPos = res?.data?.data.map((item) => item.interested_position);
        const hiQuAt = res?.data?.data.map((item) => item.highest_qualification_attained);
        const modOfEng = res?.data?.data.map((item) => item.mode_of_engagement);
        const stk = res?.data?.data.map((item) => item.stack);

        const interested_position_count = intPos.forEach((x) => {
          interested_position[x] = (interested_position[x] || 0) + 1;
        });
        const highest_qualification_attained_count = hiQuAt.forEach((x) => {
          highest_qualification_attained[x] = (highest_qualification_attained[x] || 0) + 1;
        });
        const mode_of_engagement_count = modOfEng.forEach((x) => {
          mode_of_engagement[x] = (mode_of_engagement[x] || 0) + 1;
        });
        const stack_count = stk.forEach((x) => {
          stack[x] = (stack[x] || 0) + 1;
        });

        setData1(interested_position)
        setData2(highest_qualification_attained)
        setData3(mode_of_engagement)
        setData4(stack)
        setChartData([interested_position, highest_qualification_attained, mode_of_engagement, stack])

        setApplicantData(res?.data?.data);
        console.log('work with this data', res?.data?.data);
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
        <AcademyStatistics2 chartData={chartData} />
      </div>
    </>
  );
};

export default AcademyRatio2;
