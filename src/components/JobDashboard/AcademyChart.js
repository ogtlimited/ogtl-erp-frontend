import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "../../utils/BaseOptionChart";

const CHART_DATA = [
  {
    name: "Applicants",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
  },
  {
    name: "Accepted Offers",
    type: "area",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
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
      "09/13/2022",
      "09/14/2022",
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
