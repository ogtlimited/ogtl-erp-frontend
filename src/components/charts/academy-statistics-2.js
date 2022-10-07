/** @format */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const AcademyStatistics2 = ({
  stats,
  chartData1,
  chartData2,
  chartData3,
  chartData4,
  chartTitle,
}) => {

  const data1 = {
    labels: chartData1.keys,
    datasets: [
      {
        label: '# of Votes',
        data: chartData1.values,
        backgroundColor: [
          '#17a2b8',
          '#e83e8c',
          '#28a745',
          '#fd7e14',
          '#6610f2',
          '#4287f5',
          '#EAB543',
          '#B33771',
          '#6C3483',
          '#2C3A47',
          'rgb(88, 177, 159)'
        ],
        borderColor: [
          '#17a2b8',
          '#e83e8c',
          '#28a745',
          '#fd7e14',
          '#6610f2',
          '#4287f5',
          '#EAB543',
          '#B33771',
          '#6C3483',
          '#2C3A47',
          'rgb(88, 177, 159)'
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: chartData2.keys,
    datasets: [
      {
        label: '# of Votes',
        data: chartData2.values,
        backgroundColor: [
          '#28a745',
          'rgb(37, 204, 247)',
          '#2C3A47',
          'rgb(88, 177, 159)',
          '#fd7e14',
          '#B33771',
          '#6610f2',
          '#e83e8c',
          '#17a2b8',
          '#dc3545',
        ],
        borderColor: [
          '#28a745',
          'rgb(37, 204, 247)',
          '#2C3A47',
          'rgb(88, 177, 159)',
          '#fd7e14',
          '#B33771',
          '#6610f2',
          '#e83e8c',
          '#17a2b8',
          '#dc3545',
        ],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: chartData3.keys,
    datasets: [
      {
        label: '# of Votes',
        data: chartData3.values,
        backgroundColor: [
          '#ffb142',
          '#dc3545',
          '#6C3483',
          '#2C3A47',
          'rgb(88, 177, 159)',
          '#B33771',
          '#17a2b8',
          '#28a745',
          '#6610f2',
          '#e83e8c',
        ],
        borderColor: [
          '#ffb142',
          '#dc3545',
          '#6C3483',
          '#2C3A47',
          'rgb(88, 177, 159)',
          '#B33771',
          '#17a2b8',
          '#28a745',
          '#6610f2',
          '#e83e8c',
        ],
        borderWidth: 1,
      },
    ],
  };
  const data4 = {
    labels: chartData4.keys,
    datasets: [
      {
        label: '# of Votes',
        data: chartData4.values,
        backgroundColor: [
          '#2C3A47',
          '#28a745',
          '#F97F51',
          '#6610f2',
          '#e83e8c',
          '#B33771',
          '#dc3545',
          '#17a2b8',
          '#6C3483',
          'rgb(37, 204, 247)',
        ],
        borderColor: [
          '#2C3A47',
          '#28a745',
          '#F97F51',
          '#6610f2',
          '#e83e8c',
          '#B33771',
          '#dc3545',
          '#17a2b8',
          '#6C3483',
          'rgb(37, 204, 247)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Interested Program</h4>
            <Doughnut data={data1} />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Highest Qualification Attained</h4>
            <Doughnut data={data2} />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Mode of Engagement</h4>
            <Doughnut data={data3} />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h4 className="card-title">Stack</h4>
            <Doughnut data={data4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyStatistics2;
