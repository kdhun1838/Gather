import React from "react";
import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";
import { TableTitle, TableTitleBlock } from "../register/AdminHomeRegister";

interface OwnProps {
  data?: any;
}

const AdminHomeVisitor: React.FC<OwnProps> = (props) => {
  const formattedData = [
    {
      id: "총 방문자",
      data:
        props.data &&
        props.data.map((item: any) => ({
          x: item.date,
          y: item.total_count,
        })),
    },
    {
      id: "회원 방문자",
      data:
        props.data &&
        props.data.map((item: any) => ({
          x: item.date,
          y: item.user_count,
        })),
    },
    {
      id: "비회원 방문자",
      data:
        props.data &&
        props.data.map((item: any) => ({
          x: item.date,
          y: item.visitor_count,
        })),
    },
  ];

  return (
    <Wrapper>
      <TableTitleBlock>
        <TableTitle>방문자 통계(일주일)</TableTitle>
      </TableTitleBlock>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        enableGridX={true}
        enableGridY={true}
        colors={{ scheme: "nivo" }}
        enablePoints={true}
        pointSize={10}
        pointColor={{ from: "color", modifiers: [] }}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: -180,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
          },
        ]}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
  width: 100%;
  height: 90%;
`;

export default AdminHomeVisitor;
