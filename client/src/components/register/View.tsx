import { Content } from "antd/es/layout/layout";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import HeaderContainer from "../../container/common/HeaderContainer";
import { getForm } from "../../modules/register/action";
import { RegisterState } from "../../modules/register/type";

const PostWrap = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
`;
const PostContainer = styled.div`
  width: 900px;
  margin: 30px auto 0;
  padding: 20px;
  background: #fff;
`;

const Section = styled.div`
  padding: 30px 0;
  border-bottom: 2px solid #eee;

  .firstInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .secondInfo {
    display: flex;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
    div {
      display: flex;
      width: 50%;

      h3 {
        font-size: 24px;
        margin-right: 15px;
      }
      b {
        font-size: 24px;
      }
    }
  }
  h1 {
    padding: 5px;
    font-size: 48px;
  }
`;
type ViewProps = {
  formData: RegisterState;
};
const View: React.FC<ViewProps> = ({ formData }) => {
  console.log("aaaaaa", formData);
  const {
    title,
    category,
    personnel,
    meeting,
    position,
    contact,
    period,
    content,
  } = formData.formData;
  return (
    <PostWrap>
      <HeaderContainer />
      <PostContainer>
        <Section>
          <div className="firstInfo">
            <b>NickName</b>
            <p>2023-10-04</p>
          </div>
          <h1>{title}</h1>
        </Section>
        <Section>
          <div className="secondInfo">
            <div>
              <h3>카테고리</h3>
              <b>{category}</b>
            </div>
            <div>
              <h3>모집인원</h3>
              <b>{personnel}명</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>모임장소</h3>
              <b>{meeting}</b>
            </div>
            <div>
              <h3>모집포지션</h3>
              <b>{position}</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>연락방법</h3>
              <b>
                <a href="javascript:void(0)">{contact}</a>
              </b>
            </div>
            <div>
              <h3>마감일자</h3>
              <b>{period}까지</b>
            </div>
          </div>
        </Section>
        <Section>
          <p>{content}</p>
        </Section>
      </PostContainer>
    </PostWrap>
  );
};

export default View;
