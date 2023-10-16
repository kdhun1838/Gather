import React from "react";
import styled from "styled-components";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { Carousel } from "antd";
import Responsive from "../../styled/Responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { logout } from "../../modules/user/action";
import Logo from "../../images/Logo.png";
import { UserState } from "../../modules/user/type";

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
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "orange",
};

interface HeaderProps {
  user: UserState;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
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
                {user.user.grade > 2 ? (
                  <Link to="/admin">관리자페이지</Link>
                ) : (
                  <div></div>
                )}
                <UserInfo>{user.user.id}</UserInfo>
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
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
      </Carousel>
    </ConfigProvider>
  );
};

const Wrapper = styled(Responsive)`
  /* border: solid 1px black; */

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
      margin: ;
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

// const CustomTabs = styled(Tabs)`
//   .ant-tabs-tab {
//     margin-right: 40px;
//   }
// `;

const LogoBlock = styled.img`
  height: 5.5rem;
`;

export default Header;
