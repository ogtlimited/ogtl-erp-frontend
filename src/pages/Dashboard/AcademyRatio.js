/** @format */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import AcademyStackStatistics from '../../components/charts/academy-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio = () => {
  const { combineRequest, showAlert } = useAppContext();
  const [headACount, setheadACount] = useState(0);
  
  const initialChartState = { labels: [], datasets: [] };
  const [chartData, setChartData] = useState(initialChartState);


  useEffect(() => {

  }, []);
  
  return (
    <>
      <div className="row">
        <AcademyStackStatistics
          chartTitle="Gender"
          chartData={chartData}
        />
      </div>
    </>
  );
};

export default AcademyRatio;
