import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import { changeDate } from '../../../community/Community';

interface OwnProps {
  data: any;
}

const AdminRegisterChartTable = (props: OwnProps) => {
  const columns = [
    {
      title: '번호',
      dataIndex: 'registerNum',
      key: 'registerNum',
      //   width: "10%",
      //   render: (registerNum: number) => <div>{registerNum}</div>,
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      //   width: "50%",
      //   render: (registerDataCount: number) => <div>{registerDataCount} 개</div>,
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      //   width: "50%",
      //   render: (registerDataCount: number) => <div>{registerDataCount} 개</div>,
    },
    {
      title: '조회수',
      dataIndex: 'view',
      key: 'view',
      sorter: (a: any, b: any) => {
        return a.view - b.view;
      },
      render: (view: number) => <div>{view} 회</div>,
    },
    {
      title: '작성자',
      dataIndex: 'nick',
      key: 'nick',
      //   width: "25%",
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => (
        <div>{changeDate(createdAt.toString())}</div>
      ),
      //   width: "25%",
    },
    {
      title: '마감일',
      dataIndex: 'period',
      key: 'period',
    },
  ];

  return (
    <div>
      <MyTable columns={columns} dataSource={props.data} pagination={false} />
    </div>
  );
};

const Wrapper = styled.div`
  min-width: 100%;
  display: flex;
`;

const MyTable = styled(Table)`
  width: 100%;
`;

export default AdminRegisterChartTable;
