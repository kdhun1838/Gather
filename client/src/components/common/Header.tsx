import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "모임게시판",
  },
  {
    key: "2",
    label: "커뮤니티",
  },
];

const Header = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "orange",
            itemSelectedColor: "orange",
            itemHoverColor: "orange",
            horizontalItemMargin: "32222px",
            // cardPadding: "32",
          },
        },
      }}
    >
      <Wrapper>
        <div>
          로고
          <div>
            <button>로그인</button>
          </div>
        </div>
        <span>
          <Tabs defaultActiveKey="1" items={items} size="large" />
        </span>
      </Wrapper>
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

const CustomTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin-right: 40px;
  }
`;

export default Header;
