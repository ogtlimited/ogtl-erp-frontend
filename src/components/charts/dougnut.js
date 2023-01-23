/** @format */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    position: 'right',
    labels: {
      fontColor: 'white',
      boxWidth: 10,
      padding: 10,
    },
  },

  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: true,
      color: 'black',
      align: 'center',
      padding: {
        right: 2,
      },
      labels: {
        padding: { top: 10 },
        title: {
          font: {
            weight: 'bold',
          },
        },
        value: {
          color: '#00000080',
        },
      },
    },
  },
};

const DoughnutChart = ({ data, handleChartClick }) => (
  <div className="employee-gender-pie">
    <Doughnut
      style={{ cursor: 'pointer' }}
      options={options}
      data={data}
      plugins={[ChartDataLabels]}
      getElementAtEvent={handleChartClick}
    />
  </div>
);

export default DoughnutChart;
