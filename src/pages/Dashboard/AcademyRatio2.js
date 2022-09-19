
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
  const [data, setdata] = useState(initialChartState);

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        setApplicantData(res?.data?.data);
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
        <AcademyStatistics2 data={data} />
      </div>
    </>
  );
};

export default AcademyRatio2;
