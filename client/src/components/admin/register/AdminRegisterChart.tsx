import React from "react";
import { Col, Row } from "antd";
import { Box } from "../home/AdminHome";
import {
  TableTitle,
  TableTitleBlock,
} from "../home/register/AdminHomeRegister";
import AdminRegisterChartCategoryContainer from "../../../container/admin/register/chart/AdminRegisterChartCategoryContainer";
import AdminRegisterChartMonthContainer from "../../../container/admin/register/chart/AdminRegisterChartMonthContainer";
import AdminRegisterChartDayContainer from "../../../container/admin/register/chart/AdminRegisterChartDayContainer";

const AdminRegisterChart = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>카테고리별 게시글</TableTitle>
            </TableTitleBlock>
            <AdminRegisterChartCategoryContainer />
          </Box>
        </Col>
        <Col span={16}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>조회수 Top 게시글(표)</TableTitle>
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
            <AdminRegisterChartMonthContainer />
          </Box>
        </Col>
        <Col span={12}>
          <Box height={24}>
            <TableTitleBlock>
              <TableTitle>일별 게시글</TableTitle>
            </TableTitleBlock>
            <AdminRegisterChartDayContainer />
          </Box>
        </Col>
      </Row>
    </div>
  );
};

export default AdminRegisterChart;
