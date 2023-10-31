import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface OwnProps {
  data: any;
  loading: boolean;
}

const AdminHomeVisitor: React.FC<OwnProps> = ({ data, loading }) => {
  const adjustData = (originalData: any) => {
    // Adjust data structure to fit the Line chart
    return originalData.map((entry: any) => {
      return {
        x: entry.date, // Use date as x-axis value
        totalCount: entry.total_count,
        userCount: entry.user_count,
        visitorCount: entry.visitor_count,
      };
    });
  };

  const newData = adjustData(data);
  return (
    <div style={{ height: "400px" }}>
      {loading ? (
        <>로딩</>
      ) : (
        <ResponsiveLine
          data={newData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          enablePoints={false} // Disable points on the line
          enableGridX={false}
          enableGridY={false}
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
            },
          ]}
        />
      )}
    </div>
  );
};

export default AdminHomeVisitor;
