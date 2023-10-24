import React from "react";
import styled from "styled-components";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { Carousel } from "antd";
import Responsive from "../../styled/Responsive";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { logout } from "../../modules/user/action";
import Logo from "../../images/Logo.png";
import { UserState } from "../../modules/user/type";
import { Spacing } from "./admin/AdminHeader";

const items: TabsProps["items"] = [
  {
    key: "/",
    label: "모임게시판",
  },
  {
    key: "/community",
    label: "커뮤니티",
  },
];
const contentStyle: React.CSSProperties = {
  height: "320px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
};

interface HeaderProps {
  user: UserState;
  carouselData: any;
  onClickCarousel: (carouselNum: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  carouselData,
  onClickCarousel,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout(user));
  };
  const [currentLocation, setCurrentLocation] = React.useState<string>(
    location.pathname
  );

  const onChange = (key: string) => {
    navigate(key);
    setCurrentLocation(location.pathname);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "orange",
            itemSelectedColor: "orange",
            itemHoverColor: "orange",
            horizontalItemMargin: "32222px",
            cardPadding: "32",
          },
        },
      }}
    >
      <Wrapper>
        <div>
          <Link to="/">
            <LogoBlock src={Logo} />
          </Link>
          <div>
            {user.user ? (
              <div className="right">
                <UserInfo>{user.user.nick}님</UserInfo>
                {user.user.grade > 1 ? (
                  <Button to="/admin/home">관리자페이지</Button>
                ) : (
                  <div></div>
                )}
                <Spacing />
                <Button to="/mypage">마이페이지</Button>
                <Spacing />
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
            ) : (
              <div className="right">
                <Button to="/login">로그인</Button>
              </div>
            )}
          </div>
        </div>
        <span>
          <Tabs
            defaultActiveKey={currentLocation}
            items={items}
            size="large"
            onChange={onChange}
          />
        </span>
      </Wrapper>
      <Carousel
        autoplay
        style={{ height: "320px" }} // 캐로셀의 높이 설정
      >
        {carouselData &&
          carouselData.map((item: any) => (
            <a
              href={
                item.href.startsWith("http") ? item.href : `http://${item.href}`
              }
              target="_blank"
              rel="noopener noreferrer"
              key={item.carouselNum}
            >
              {item.onlyImg === 0 ? (
                <div onClick={() => onClickCarousel(item.carouselNum)}>
                  <CarouselDiv
                    style={{
                      ...contentStyle,
                      backgroundColor: `${item.backgroundColor}`,
                      // backgroundImage: `url(/carousel/${item.img.filename})`,
                      backgroundSize: "contain", // 이미지가 캐로셀에 맞게 크기 조정
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      // height: "100%", // 이미지의 높이를 캐로셀과 일치시킴
                      width: "100%", // 이미지의 너비를 캐로셀과 일치시킴
                    }}
                  >
                    <CarouselText
                      style={{ color: `${item.textColor}` }}
                      dangerouslySetInnerHTML={{
                        __html: item.content.replace(/\n/g, "<br>"),
                      }}
                    >
                      {/* {item.content} */}
                    </CarouselText>
                    <CarouselImg
                      style={{
                        backgroundImage: `url(/carousel/${item.img.filename})`,
                      }}
                    ></CarouselImg>
                  </CarouselDiv>
                </div>
              ) : (
                <div
                  style={{
                    ...contentStyle,
                    backgroundColor: `${item.backgroundColor}`,
                    backgroundImage: `url(/carousel/${item.img.filename})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100% ",
                    // objectFit: "fill",
                    // height: "100%",
                    // maxHeight: "320px",
                    // paddingTop: "100%", // 1:1 비율을 유지하도록 높이 설정
                  }}
                  onClick={() => onClickCarousel(item.carouselNum)}
                ></div>
              )}
            </a>
          ))}
      </Carousel>
    </ConfigProvider>
  );
};

export const CarouselDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3rem 0 3rem;
`;

export const CarouselText = styled.div`
  font-size: 120%;
  width: 50%;
  display: flex;
`;
export const CarouselImg = styled.div`
  width: 40%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Wrapper = styled(Responsive)`
  > div {
    display: flex;
    height: 6rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid orange;
    .right {
      display: flex;
      text-align: center;
    }
    > div > button {
      outline: none;
      border: none;
      background-color: #fff;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.125rem;
    }
  }
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin: 0 1rem 0 1rem;
`;

const LogoBlock = styled.img`
  height: 5.5rem;
`;

export default Header;
