import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        position: 'right',
        labels: {
            fontColor: "white",
            boxWidth: 10,
            padding: 10
        }
    }
    
  };
const DoughnutChart = ({data}) => (
  <div className="d-flex justify-content-center" >
   
    <Doughnut
    width="440"
    height="240"
    options={options}
    data={data} />
  </div>
);

export default DoughnutChart;