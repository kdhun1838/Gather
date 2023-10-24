import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Header from '../common/Header';

const MyPagediv = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 0 auto;
  border: 1px solid black;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const Nickname = styled.div`
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.78px;
  margin: 30px 0px 40px;
`;

const Inputnick = styled.div`
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
const StyledInput = styled.input`
  display: flex;
  width: 100%;
  font-size: 16px;
  min-height: 50px;
  padding: 15px 13px;
  align-items: flex-start;
  border-radius: 5px;
  border: 1px solid rbg(225, 226, 227);
`;

const MyPage: React.FC = () => {
  return (
    <MyPagediv>
      <Nickname>환영합니다</Nickname>
      <form>
        <Inputnick>이름</Inputnick>
        <StyledInput />
        <Inputnick>닉네임</Inputnick>
        <StyledInput />
        <Inputnick>이메일</Inputnick>
        <StyledInput />
        <Inputnick>전화번호</Inputnick>
        <StyledInput />
        <Inputnick>주소</Inputnick>
        <StyledInput />
        <Inputnick>성별</Inputnick>
        <StyledInput />
        <Button>프로필 저장</Button>
        <Button>회원탈퇴</Button>
      </form>
    </MyPagediv>
  );
};

export default MyPage;
