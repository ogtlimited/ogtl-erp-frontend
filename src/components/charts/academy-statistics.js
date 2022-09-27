
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const AcademyStatistics = ({ chartData, chartTitle }) => {
  const data = {
    labels: chartData.keys,
    datasets: [
      {
        label: '# of Votes',
        data: chartData.values,
        backgroundColor: [
          '#ffffff',
          '#007bff',
          '#e83e8c',
        ],
        borderColor: [
          '#000000',
          '#007bff',
          '#e83e8c',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="academy-pieChart">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">{chartTitle}</h4>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyStatistics;
