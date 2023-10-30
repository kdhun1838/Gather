import { Col, Row } from "antd";
import React from "react";
import { styled } from "styled-components";
import {
  CarouselInfo,
  CommunityInfo,
  RegisterInfo,
  UserInfo,
} from "../../../types/adminTypes";

interface BoxProps {
  height?: number;
}
interface OwnProps {
  userInfo?: UserInfo;
  registerInfo?: RegisterInfo;
  communityInfo?: CommunityInfo;
  carouselInfo?: CarouselInfo;
  loading: boolean;
}

const AdminHome: React.FC<OwnProps> = (props) => {
  return (
    <>
      {props.loading ? (
        <>로딩중입니다.</>
      ) : (
        <>
          <div>
            <Row gutter={[16, 16]}>
              <Col span={18}>
                {/* TopLine 4개 통계 */}
                <Row gutter={15}>
                  <Col span={6}>
                    <Box height={7} className="top red">
                      <span>유저 수(오늘 가입자)</span>
                      <div>
                        {props.userInfo?.count}명 ({props.userInfo?.today}명)
                      </div>
                    </Box>
                  </Col>
                  <Col span={6}>
                    <Box height={7} className="top orange">
                      <span>모임 수(오늘 만든 모임)</span>
                      <div>
                        {props.registerInfo?.count}개 (
                        {props.registerInfo?.today}개)
                      </div>
                    </Box>
                  </Col>
                  <Col span={6}>
                    <Box height={7} className="top green">
                      <span>커뮤니티 수(오늘 작성된 게시글)</span>
                      <div>
                        {props.communityInfo?.count}개 (
                        {props.communityInfo?.today}개)
                      </div>
                    </Box>
                  </Col>
                  <Col span={6}>
                    <Box height={7} className="top blue">
                      <span>광고 수</span>
                      <div>{props.carouselInfo?.count}개</div>
                    </Box>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Box height={20}>방문자 차트</Box>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Box height={20}>모임 추이</Box>
                  </Col>
                  <Col span={12}>
                    <Box height={20}>커뮤니티 추이</Box>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={[16, 0]}>
                  <Col span={24}>
                    <Box height={20}>관리자</Box>
                  </Col>
                  <Col span={24}>
                    <Box height={27}>운영진 현황</Box>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

const Box = styled.div<BoxProps>`
  border-radius: 5px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  padding: 0.5rem 0.5rem 0.1rem 0.5rem;
  background-color: #fff;
  height: ${(props) => `${props.height}rem` || "20rem"};

  &.top {
    border-left: 3px solid transparent;
    background: lightgray;

    > span {
      font-weight: bold;
      padding-left: 0.2rem;
    }
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
      font-size: 1.5rem;
    }
  }

  &.red {
    border-left-color: red;
    background: #ffdde2;
  }

  &.orange {
    border-left-color: orange;
    background: #ffdd9f;
  }

  &.green {
    border-left-color: green;
    background: #bef8be;
  }

  &.blue {
    border-left-color: blue;
    background: #aeaef3;
  }
`;

export default AdminHome;
