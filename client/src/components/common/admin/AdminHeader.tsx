import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button";
import Responsive from "../../../styled/Responsive";
import LogoImage from "../../../images/Logo.png";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  position: fixed;
  left: 0;
  top: 50px;
  height: 100%;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #555;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  padding: 0;

  a {
    display: block;
    width: 100%;
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    color: #eee;
  }
`;

const LogoWrapper = styled(Responsive)`
  width: 100%;
  height: 50px;
  margin: 0 !important;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-left: 50px;
  }
  .right {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-top: 5px;
`;

const Spacing = styled.div`
  margin-left: 0.5rem;
`;

const Spacer = styled.div`
  height: 9rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const UserHi = styled.div`
  font-weight: normal;
`;

const activeStyle = {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
};

interface AdminProps {
  user: any;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminProps> = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <LogoWrapper>
          <Link to="/admin" className="logo">
            <Logo src={LogoImage} alt="Logo" />
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>
                {user.name}
                <UserHi>님 안녕하세요!</UserHi>
              </UserInfo>
              <Spacing />
              <Button onClick={onLogout}>로그아웃</Button>
              <Spacing />
              <Button to="/">유저페이지</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
              <Spacing />
              <Button to="/register">회원가입</Button>
            </div>
          )}
        </LogoWrapper>
      </HeaderBlock>
      <Wrapper>
        <NavLink
          to="/admin/user"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          유저 관리
        </NavLink>
        <NavLink
          to="/admin/register"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          모임게시판 관리
        </NavLink>
        <NavLink
          to="/admin/community"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          커뮤니티 관리
        </NavLink>
        <NavLink
          to="/admin/carousel"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          캐러셀 관리
        </NavLink>
      </Wrapper>
    </>
  );
};

export default AdminHeader;
