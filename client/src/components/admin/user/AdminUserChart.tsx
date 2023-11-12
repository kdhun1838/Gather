import React from 'react';
import { Col, Row } from 'antd';
import { Box } from '../home/AdminHome';
import {
  TableTitle,
  TableTitleBlock,
} from '../home/register/AdminHomeRegister';
import AdminUserChartGradeContainer from '../../../container/admin/user/chart/AdminUserChartGradeContainer';
import AdminUserChartMonthContainer from '../../../container/admin/user/chart/AdminUserChartMonthContainer';
import AdminUserChartDayContainer from '../../../container/admin/user/chart/AdminUserChartDayContainer';

const AdminUserChart = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>유저 등급 차트</TableTitle>
            </TableTitleBlock>
            <AdminUserChartGradeContainer />
          </Box>
        </Col>
        <Col span={16}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>보류</TableTitle>
            </TableTitleBlock>
          </Box>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>달별 가입자 수 차트</TableTitle>
            </TableTitleBlock>
            <AdminUserChartMonthContainer />
          </Box>
        </Col>
        <Col span={12}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>일별 가입자 수 차트</TableTitle>
            </TableTitleBlock>
            <AdminUserChartDayContainer />
          </Box>
        </Col>
      </Row>
    </div>
  );
};

export default AdminUserChart;
