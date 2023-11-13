import React from 'react';
import { Col, Row } from 'antd';
import { Box } from '../home/AdminHome';
import {
  TableTitle,
  TableTitleBlock,
} from '../home/register/AdminHomeRegister';
import AdminUserChartGradeContainer from '../../../container/admin/user/chart/AdminUserChartGradeContainer';
import AdminUserChartGenderContainer from '../../../container/admin/user/chart/AdminUserChartGenderContainer';
import AdminUserChartAgeContainer from '../../../container/admin/user/chart/AdminUserChartAgeContainer';
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
        <Col span={8}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>가입자 성비 차트</TableTitle>
            </TableTitleBlock>
            <AdminUserChartGenderContainer />
          </Box>
        </Col>
        <Col span={8}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>세대별 가입자 차트</TableTitle>
            </TableTitleBlock>
            <AdminUserChartAgeContainer />
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
