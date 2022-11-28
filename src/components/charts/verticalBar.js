/** @format */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
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
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: 'black',
      align: 'end',
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

const VerticalBar = ({ data, handleChartClick }) => {
  return (
    <>
      <Bar
        style={{ cursor: 'pointer' }}
        data={data}
        plugins={[ChartDataLabels]}
        options={options}
        getElementAtEvent={handleChartClick}
      />
    </>
  );
};

export default VerticalBar;
