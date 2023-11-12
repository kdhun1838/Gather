import React from 'react';
import { Col, Row } from 'antd';
import { Box } from '../home/AdminHome';
import {
  TableTitle,
  TableTitleBlock,
} from '../home/register/AdminHomeRegister';
import AdminCommunityChartCategoryContainer from '../../../container/admin/community/chart/AdminCommunityChartCategoryContainer';
import AdminCommunityChartMonthContainer from '../../../container/admin/community/chart/AdminCommunityChartMonthContainer';
import AdminCommunityChartDayContainer from '../../../container/admin/community/chart/AdminCommunityChartDayContainer';
const AdminCommunityChart = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>카테고리별 게시글</TableTitle>
            </TableTitleBlock>
            <AdminCommunityChartCategoryContainer />
          </Box>
        </Col>
        <Col span={16}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>조회수 Top 게시글</TableTitle>
            </TableTitleBlock>
          </Box>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>월별 게시글</TableTitle>
            </TableTitleBlock>
            <AdminCommunityChartMonthContainer />
          </Box>
        </Col>
        <Col span={12}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>일별 게시글</TableTitle>
            </TableTitleBlock>
            <AdminCommunityChartDayContainer />
          </Box>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCommunityChart;
