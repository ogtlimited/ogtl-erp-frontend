import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Last 30', 'Last 60', 'Last 30', 'Last 90', 'Last 120', 'Greater than 120'],
  datasets: [
    {
      label: '# of Votes',
      data: [120000, 190000, 300000, 500000, 200000, 3000000],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        position: 'right',
        labels: {
            fontColor: "white",
            boxWidth: 20,
            padding: 20
        }
    }
    
  };
const DoughnutChart = () => (
  <div className="d-flex justify-content-center" >
   
    <Doughnut
    width="500"
    height="300"
    options={options}
    data={data} />
  </div>
);

export default DoughnutChart;