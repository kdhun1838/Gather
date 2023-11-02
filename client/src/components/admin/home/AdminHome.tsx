import { Col, Row } from "antd";
import React from "react";
import { styled } from "styled-components";
import {
  CarouselInfo,
  CommunityInfo,
  RegisterInfo,
  UserInfo,
} from "../../../types/adminTypes";
import { Loading, LoadingImage } from "../../../container/auth/LoginForm";
import {
  UserOutlined,
  AppstoreOutlined,
  FileImageOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import AdminHomeVisitorContainer from "../../../container/admin/home/visitor/AdminHomeVisitorContainer";
import AdminHomeRegisterContainer from "../../../container/admin/home/register/AdminHomeRegisterContainer";

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
  const navigate = useNavigate();

  return (
    <>
      {props.loading ? (
        <Loading>
          <LoadingImage src="/loading.gif" alt="로딩 중" />
        </Loading>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              {/* TopLine 4개 통계 */}
              <Row gutter={15}>
                <Col span={6}>
                  <Box height={8} className="top first">
                    <div className="topzone">
                      <div className="topleft">
                        <span>유저수 ( 오늘 가입자 )</span>
                        <div>
                          {props.userInfo?.count}명 ({props.userInfo?.today}명)
                        </div>
                      </div>
                      <div className="topright">
                        <UserOutlined
                          style={{ color: "#a5f1f1", fontSize: "3rem" }}
                        />
                      </div>
                    </div>
                    <div
                      className="bottomzone"
                      onClick={() => navigate("/admin/user/chart")}
                    >
                      View More
                      <div style={{ marginLeft: "0.5rem" }}>
                        <RightSquareOutlined />
                      </div>
                    </div>
                    {/* <span>유저 수(오늘 가입자)</span>
                    <div>
                      {props.userInfo?.count}명 ({props.userInfo?.today}명)
                    </div> */}
                  </Box>
                </Col>
                <Col span={6}>
                  <Box height={8} className="top second">
                    <div className="topzone">
                      <div className="topleft">
                        <span>모임수 ( 오늘 작성글 )</span>
                        <div>
                          {props.registerInfo?.count}명 (
                          {props.registerInfo?.today}명)
                        </div>
                      </div>
                      <div className="topright">
                        <AppstoreOutlined
                          style={{ color: "#c0e0ff", fontSize: "3rem" }}
                        />
                      </div>
                    </div>
                    <div
                      className="bottomzone"
                      style={{ background: "#1f5688" }}
                      onClick={() => navigate("/admin/register/chart")}
                    >
                      View More
                      <div style={{ marginLeft: "0.5rem" }}>
                        <RightSquareOutlined />
                      </div>
                    </div>
                  </Box>
                </Col>
                <Col span={6}>
                  <Box height={8} className="top third">
                    <div className="topzone">
                      <div className="topleft">
                        <span>커뮤니티 수 ( 오늘 작성글 )</span>
                        <div>
                          {props.communityInfo?.count}명 (
                          {props.communityInfo?.today}명)
                        </div>
                      </div>
                      <div className="topright">
                        <AppstoreOutlined
                          style={{ color: "#dde2fd", fontSize: "3rem" }}
                        />
                      </div>
                    </div>
                    <div
                      className="bottomzone"
                      style={{ background: "#444a6d" }}
                      onClick={() => navigate("/admin/community/chart")}
                    >
                      View More
                      <div style={{ marginLeft: "0.5rem" }}>
                        <RightSquareOutlined />
                      </div>
                    </div>
                  </Box>
                </Col>
                <Col span={6}>
                  <Box height={8} className="top fourth">
                    <div className="topzone">
                      <div className="topleft">
                        <span>광고 수</span>
                        <div>{props.carouselInfo?.count}개</div>
                      </div>
                      <div className="topright">
                        <FileImageOutlined
                          style={{ color: "#ffd2d0", fontSize: "3rem" }}
                        />
                      </div>
                    </div>
                    <div
                      className="bottomzone"
                      style={{ background: "#993734" }}
                      onClick={() => navigate("/admin/register/chart")}
                    >
                      View More
                      <div style={{ marginLeft: "0.5rem" }}>
                        <RightSquareOutlined />
                      </div>
                    </div>
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Box height={20}>
                    <AdminHomeVisitorContainer />
                  </Box>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Box height={20}>
                    <AdminHomeRegisterContainer
                      registerInfo={props.registerInfo}
                    />
                  </Box>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row gutter={[0, 0]}>
                <Col span={24}>
                  <Box height={20}>
                    <AdminMember>
                      <div className="title">
                        <div className="title1">관리자현황</div>
                        <div
                          className="title2"
                          onClick={() => navigate("/admin/user/manage")}
                        >
                          관리
                        </div>
                      </div>
                      <div className="body">
                        {props.userInfo?.rows
                          .filter((item) => item.grade > 1)
                          .sort((a, b) => b.grade - a.grade)
                          .map((item) => (
                            <AdminMemberDetail key={item.id}>
                              <div style={{ minWidth: "10%" }}>
                                <RiAdminFill />
                              </div>
                              <div style={{ minWidth: "50%" }}>{item.id}</div>
                              <div style={{ minWidth: "40%" }}>
                                {item.grade === 3 ? (
                                  <div style={{ fontWeight: "bold" }}>
                                    최고관리자
                                  </div>
                                ) : (
                                  "관리자"
                                )}
                              </div>
                            </AdminMemberDetail>
                          ))}
                      </div>
                    </AdminMember>
                  </Box>
                </Col>
                <Col span={24}>
                  <Box height={31} style={{ background: "#fff790" }}>
                    ㅇㅇ
                  </Box>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

const Box = styled.div<BoxProps>`
  border-radius: 5px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  background-color: #fff;
  height: ${(props) => `${props.height}rem` || "20rem"};

  > .topzone {
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
    align-items: center;
    height: 80%;

    > .topleft {
      > span {
        display: flex;
        font-size: 0.8rem;
        margin: 0 0 0.5rem 0;
      }
      > div {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
    > .topright {
      display: flex;
      padding-top: 1rem;
      align-items: center;
    }
  }
  > .bottomzone {
    background: #006767;
    height: 20%;
    display: flex;
    justify-content: end;
    color: #faecec;
    padding-right: 1rem;
    align-items: center;
    border-radius: 0 0 5px 5px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }

  &.first {
    background: #00acac;
  }

  &.second {
    background: #348fe2;
  }

  &.third {
    background: #727cb6;
  }

  &.fourth {
    background: #ff5b57;
  }
`;

//관리자현황 스타일

const AdminMember = styled.div`
  padding: 1rem;
  /* display: flex; */

  > .title {
    display: flex;
    min-height: 20%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    > .title1 {
      font-weight: bold;
      font-size: 1.5rem;
    }
    > .title2 {
      cursor: pointer;
      transition: 1 ease;
      color: gray;
      font-size: 1rem;
      &:hover {
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }

  > .body {
    /* display: flex; */
    height: 20%;
    padding: 0 0 0 0.5rem;
  }
`;

const AdminMemberDetail = styled.div`
  margin: 0.5rem;
  display: flex;
  font-size: 1rem;

  > div {
    margin-right: 0.2rem;
  }
`;
export default AdminHome;
