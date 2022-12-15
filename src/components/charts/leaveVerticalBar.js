/** @format */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
  responsive: true,
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

const LeaveVerticalBar = ({ data, handleChartClick }) => {
  return (
    <>
      <Bar
        // style={{ cursor: 'pointer' }}
        data={data}
        width={100}
        height={100}
        plugins={[ChartDataLabels]}
        options={options}
        getElementAtEvent={handleChartClick}
      />
    </>
  );
};

export default LeaveVerticalBar;
