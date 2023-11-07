import React from "react";
import { Table } from "antd";
import { styled } from "styled-components";

interface OwnProps {
  data: {
    date: string;
    registerDataCount: number;
    communityDataCount: number;
    userDataCount: number;
  }[];
}

const AdminHomeRegister: React.FC<OwnProps> = (props) => {
  // Define columns for the table
  const columns = [
    {
      title: "일자",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <div style={{ fontWeight: "bold" }}>{date}</div>
      ),
    },
    {
      title: "만든 모임 수",
      dataIndex: "registerDataCount",
      key: "registerDataCount",
      render: (registerDataCount: number) => <div>{registerDataCount} 개</div>,
    },
    {
      title: "만든 커뮤니티 수",
      dataIndex: "communityDataCount",
      key: "communityDataCount",
      render: (communityDataCount: number) => (
        <div>{communityDataCount} 개</div>
      ),
    },
    {
      title: "가입 수",
      dataIndex: "userDataCount",
      key: "userDataCount",
      render: (userDataCount: number) => <div>{userDataCount} 명</div>,
    },
  ];
  return (
    <div>
      <TableTitleBlock>
        <TableTitle>일자별 요약</TableTitle>
      </TableTitleBlock>
      <MyTable dataSource={props.data} columns={columns} pagination={false} />
    </div>
  );
};

export const TableTitleBlock = styled.div`
  padding: 0.3rem 0 0.3rem 0;

  border-bottom: 1px solid lightgray;
`;
export const TableTitle = styled.h2`
  margin: 0 0 0 3rem;
`;

const MyTable = styled(Table)`
  th {
    text-align: center !important;
  }
  tbody {
    tr {
      td {
        max-height: 5px !important;
        text-align: center;
        padding: 3px !important;
        /* font-weightimport register from '../../../../modules/register/reducer';
: bold; */
        /* font-size: 5px; */
        /* padding: 0 auto; */
        /* margin: 0; */
      }
      &:last-child {
        background-color: #f0f0f0; /* 마지막 행의 배경색 설정 */
      }
    }
  }
`;
export default AdminHomeRegister;
