import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";

const Header = () => {
  return (
    <Wrapper>
      헤더~
      <div>
        <button>글쓰기</button>
        <button>로그인</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Responsive)`
  border: solid 1px black;
  display: flex;
  justify-content: space-between;
  height: 6rem;
  align-items: center;

  > div {
    display: flex;
    grid-gap: 30px;
    gap: 30px;
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
`;

export default Header;
