import { isEmpty, merge } from "lodash";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "../../utils/BaseOptionChart";
import axiosInstance from "../../services/api";
import moment from "moment";
import { object } from "prop-types";




// export default function AcademyChart({ data }) {
export default function AcademyChart() {
  const [data, setData] = useState([])
  const [applicationDate, setApplicationDate] = useState([])
  const [numbersOfApplicants, setNumbersOfApplicants] = useState([])
  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        setData(res.data.data)
        setApplicationDate(res.data.data.map(item => (item.application_date) ))
      })
    }

   
    useEffect(() => {
      fetchAcademyApplicants();
    }, [data]);

    const getOnlyDate = applicationDate.map(item=>(moment(item).format("MM/DD/YY")))
    const sortedDate = getOnlyDate.sort()
    const eachDate = sortedDate.map(item=> (item))

    let uniqueDateCount = {};
    for (let i=0; i<sortedDate.length; i++){
      let num = sortedDate[i]

      uniqueDateCount[num] = uniqueDateCount[num] ? uniqueDateCount[num] + 1 : 1

    }
   
    const CHART_DATA = [
      {
        name: "Applicants",
        type: "area",
        data: Object.values(uniqueDateCount),
      },
      {
        name: "Accepted Offers",
        type: "area",
        data: Object.values(uniqueDateCount),
      },
    ];
        
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "14%" } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: Object.keys(uniqueDateCount),
  
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} request`;
          }
          return y;
        },
      },
    },
  });

  return (
    <>
      <ReactApexChart
        type="line"
        series={CHART_DATA}
        options={chartOptions}
        height={364}
      />
    </>
  );
}
