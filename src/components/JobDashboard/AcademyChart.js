import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "../../utils/BaseOptionChart";

const CHART_DATA = [
  {
    name: "Members",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "Applicants",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: "Turn Over Rate",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
];

export default function AcademyChart({ data }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "14%" } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      "01/01/2022",
      "02/01/2022",
      "03/01/2022",
      "04/01/2022",
      "05/01/2022",
      "06/01/2022",
      "07/01/2022",
      "08/01/2022",
      "09/01/2022",
      "10/01/2022",
      "11/01/2022",
    ],
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
