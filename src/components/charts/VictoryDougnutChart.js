import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { useWindowSize } from "react-hooks-window-size";

const getData = (percent) => {
  return [
    { x: 1, y: percent },
    { x: 2, y: 100 - percent },
  ];
};

const VictoryDougnutChart = ({ percent }) => {
  const [data, setData] = useState(getData(percent));
  const size = useWindowSize();

  useEffect(() => {
    setData(getData(percent));
  }, [percent]);

  return (
    <div className="victoryDoughnut">
      <svg
        viewBox="0 0 400 400"
        width={size.width > 968 ? "120px" : "60px"}
        weight={size.width > 968 ? "65%" : "45%"}
      >
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={130}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "#407AF6" : "#FF4F4F";
                return datum.x === 1 ? color : "#EFEFEF";
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percent }}>
          {(newProps) => (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={`${Math.round(newProps.percent)}%`}
              style={{ fontSize: 70, fontWeight: "500", fontFamily: "Roboto" }}
            />
          )}
        </VictoryAnimation>
      </svg>
    </div>
  );
};

export default VictoryDougnutChart;
