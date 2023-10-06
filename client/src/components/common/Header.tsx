import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "모임게시판",
  },
  {
    key: "2",
    label: "자유게시판",
  },
];

const Header = () => {
  return (
    <Wrapper>
      <div>
        로고
        <div>
          <button>로그인</button>
        </div>
      </div>
      <span>
        <CustomTabs defaultActiveKey="1" items={items} size="large" />
      </span>
    </Wrapper>
  );
};

const Wrapper = styled(Responsive)`
  /* border: solid 1px black; */

  > div {
    display: flex;
    height: 6rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
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
