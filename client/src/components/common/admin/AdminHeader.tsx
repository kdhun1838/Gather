import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import Responsive from '../../../styled/Responsive';
import LogoImage from '../../../images/Logo.png';
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  FileImageOutlined,
  LineChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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
  background-color: #001529;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-left: 80px;
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

export const Spacing = styled.div`
  margin-left: 0.5rem;
`;

const Spacer = styled.div`
  height: 9rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  color: white;
  margin-right: 1rem;
`;

const UserHi = styled.div`
  font-weight: normal;
`;

const activeStyle = {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
};

interface AdminProps {
  user: any;
  onLogout: () => void;
}
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('관리자 홈', '/admin/home', <HomeOutlined />),
  getItem('유저 관리', '/admin/user', <UserOutlined />, [
    getItem('차트', '/admin/user/chart', <LineChartOutlined />),
    getItem('관리', '/admin/user/manage', <SettingOutlined />),
  ]),

  getItem('모임게시판 관리', '/admin/register', <AppstoreOutlined />, [
    getItem('차트', '/admin/register/chart', <LineChartOutlined />),
    getItem('관리', '/admin/register/manage', <SettingOutlined />),
  ]),

  getItem('커뮤니티 관리', '/admin/community', <AppstoreOutlined />, [
    getItem('차트', '/admin/community/chart', <LineChartOutlined />),
    getItem('관리', '/admin/community/manage', <SettingOutlined />),
  ]),
  getItem('캐러셀 관리', '/admin/carousel', <FileImageOutlined />, [
    getItem('차트', '/admin/carousel/chart', <LineChartOutlined />),
    getItem('관리', '/admin/carousel/manage', <SettingOutlined />),
  ]),
];

const AdminHeader: React.FC<AdminProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = React.useState<string>(location.pathname);
  const [openKeys, setOpenKeys] = React.useState(['/admin/home']);

  useEffect(() => {
    const pathname = location.pathname;
    const splitPathName = pathname.split(/(?=\/)/g);

    const openKey = [
      `${splitPathName[0]}${splitPathName[1]}`,
      `${splitPathName[0]}${splitPathName[1]}${splitPathName[2]}`,
    ];
    setOpenKeys(openKey);
    setCurrent(openKey[1]);
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return (
    <>
      <HeaderBlock>
        <LogoWrapper>
          <Link to="/admin/home" className="logo">
            <Logo src={LogoImage} alt="Logo" />
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>
                {user.name}
                <UserHi>님 안녕하세요!</UserHi>
              </UserInfo>
              <Spacing />
              <Button to="/">유저페이지</Button>
              <Spacing />
              <Button onClick={onLogout}>로그아웃</Button>
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
        <Menu
          theme="dark"
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={(openKeys) => setOpenKeys(openKeys)}
          style={{ width: '100%', height: '100%' }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Wrapper>
    </>
  );
};

export default AdminHeader;
