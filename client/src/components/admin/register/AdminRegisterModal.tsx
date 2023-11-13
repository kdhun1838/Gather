import React from 'react';
import { ListDetailTypeWithUser } from '../../../modules/register/type';
import { changeDate } from '../../community/Community';
import CommentContainer from '../../../container/register/CommentContainer';
import styled from 'styled-components';

interface OwnProps {
  data: ListDetailTypeWithUser | null;
}

const AdminRegisterModal: React.FC<OwnProps> = (props) => {
  return (
    <PostWrap>
      <PostContainer>
        <Section>
          <h1>{props.data?.title}</h1>
          <div className="firstInfo">
            <b>{props.data?.nick}</b>
            <div className="dateView">
              {props.data?.createdAt && (
                <p>{changeDate(props.data.createdAt.toString())}</p>
              )}
              <p>조회수 {props.data?.view}</p>
            </div>
          </div>
        </Section>
        <Section>
          <div className="secondInfo">
            <div>
              <h3>카테고리</h3>
              <b>{props.data?.category}</b>
            </div>
            <div>
              <h3>모집인원</h3>
              <b>{props.data?.personnel}명</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>모임장소</h3>
              <b>{props.data?.meeting}</b>
            </div>
            <div>
              <h3>모집포지션</h3>
              <b>{props.data?.position}</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>연락방법</h3>
              <b>
                <a href="#">{props.data?.contact}</a>
              </b>
            </div>
            <div>
              <h3>마감일자</h3>
              <b>{props.data?.period}</b>
            </div>
          </div>
        </Section>
        <Section>
          <p className="content">{props.data?.content}</p>
        </Section>
        <Section>
          <CommentContainer isAdmin={true} />
        </Section>

        <BtnSection>
          <button>마감하기</button>
          <button>수정</button>
          <button>삭제</button>
        </BtnSection>
      </PostContainer>
    </PostWrap>
  );
};

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

export const Section = styled.div`
  padding: 30px 0;
  border-bottom: 2px solid #eee;

  .firstInfo {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .dateView {
      display: flex;
      text-align: right;

      p {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
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
  .content {
    word-wrap: break-word;
  }
  textarea {
    padding: 15px;
    width: 100%;
    resize: none;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 18px;
  }
  .commentBtn {
    margin: 10px 0 30px;
    button {
      float: right;
      padding: 5px 10px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  button {
    margin-right: 10px;
    padding: 5px 10px;
    font-size: 18px;
    background: #fff;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default AdminRegisterModal;
