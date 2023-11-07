import React from "react";
import { ResponsiveLine } from "@nivo/line";

const AdminHomeVisitor = () => {
  const data = [
    {
      id: "japan",
      color: "hsl(352, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 267,
        },
        {
          x: "helicopter",
          y: 4,
        },
        {
          x: "boat",
          y: 295,
        },
        {
          x: "train",
          y: 220,
        },
        {
          x: "subway",
          y: 180,
        },
        {
          x: "bus",
          y: 91,
        },
        {
          x: "car",
          y: 7,
        },
        {
          x: "moto",
          y: 261,
        },
        {
          x: "bicycle",
          y: 17,
        },
        {
          x: "horse",
          y: 209,
        },
        {
          x: "skateboard",
          y: 89,
        },
        {
          x: "others",
          y: 47,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(213, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 136,
        },
        {
          x: "helicopter",
          y: 46,
        },
        {
          x: "boat",
          y: 233,
        },
        {
          x: "train",
          y: 278,
        },
        {
          x: "subway",
          y: 164,
        },
        {
          x: "bus",
          y: 153,
        },
        {
          x: "car",
          y: 277,
        },
        {
          x: "moto",
          y: 4,
        },
        {
          x: "bicycle",
          y: 195,
        },
        {
          x: "horse",
          y: 89,
        },
        {
          x: "skateboard",
          y: 296,
        },
        {
          x: "others",
          y: 73,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(351, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 137,
        },
        {
          x: "helicopter",
          y: 115,
        },
        {
          x: "boat",
          y: 60,
        },
        {
          x: "train",
          y: 69,
        },
        {
          x: "subway",
          y: 202,
        },
        {
          x: "bus",
          y: 214,
        },
        {
          x: "car",
          y: 138,
        },
        {
          x: "moto",
          y: 68,
        },
        {
          x: "bicycle",
          y: 134,
        },
        {
          x: "horse",
          y: 211,
        },
        {
          x: "skateboard",
          y: 46,
        },
        {
          x: "others",
          y: 281,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(29, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 209,
        },
        {
          x: "helicopter",
          y: 205,
        },
        {
          x: "boat",
          y: 171,
        },
        {
          x: "train",
          y: 273,
        },
        {
          x: "subway",
          y: 250,
        },
        {
          x: "bus",
          y: 219,
        },
        {
          x: "car",
          y: 163,
        },
        {
          x: "moto",
          y: 133,
        },
        {
          x: "bicycle",
          y: 271,
        },
        {
          x: "horse",
          y: 124,
        },
        {
          x: "skateboard",
          y: 90,
        },
        {
          x: "others",
          y: 89,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(281, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 227,
        },
        {
          x: "helicopter",
          y: 172,
        },
        {
          x: "boat",
          y: 149,
        },
        {
          x: "train",
          y: 48,
        },
        {
          x: "subway",
          y: 233,
        },
        {
          x: "bus",
          y: 57,
        },
        {
          x: "car",
          y: 58,
        },
        {
          x: "moto",
          y: 25,
        },
        {
          x: "bicycle",
          y: 191,
        },
        {
          x: "horse",
          y: 7,
        },
        {
          x: "skateboard",
          y: 140,
        },
        {
          x: "others",
          y: 215,
        },
      ],
    },
  ];

  return (
    <>
      dd
      <ResponsiveLine
        data={data}
        // margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default AdminHomeVisitor;
