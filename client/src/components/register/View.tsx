import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import HeaderContainer from "../../container/common/HeaderContainer";
import CommentContainer from "../../container/register/CommentContainer";
import { changeComment } from "../../modules/register/action";
import { RegisterState } from "../../modules/register/type";

const PostWrap = styled.div`
  width: 100%;
  max-height: 200vh;
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
type ViewProps = {
  formData: {
    getFormData: {
      title: string;
      category: string;
      personnel: number;
      meeting: string;
      position: string;
      contact: string;
      period: string;
      content: string;
      view: number;
      state: number;
      createdAt: string;
      User: {
        nick: string;
        userNum: number;
      };
    };
  };
  user: {
    userNum: number;
  };
  onClose: (postId: number, state: number) => void;
  onDelete: (postId: number, e: FormEvent) => void;
  onGetOriginalForm: (originFormData: object) => void;
  postId: number;
  isAdmin?: boolean;
};
const View: React.FC<ViewProps> = ({
  formData,
  onClose,
  onDelete,
  onGetOriginalForm,
  postId,
  user,
  isAdmin,
}) => {
  const { getFormData } = formData;

  const changeDate = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    const hour = newDate.getHours().toString().padStart(2, "0");
    const minute = newDate.getMinutes().toString().padStart(2, "0");
    const second = newDate.getSeconds().toString().padStart(2, "0");

    const showDate = `${year}. ${month}. ${day} ${hour}:${minute}:${second}`;
    return showDate;
  };
  return (
    <PostWrap>
      {isAdmin ? <></> : <HeaderContainer />}
      <PostContainer>
        <Section>
          <h1>{getFormData?.title}</h1>
          <div className="firstInfo">
            <b>{getFormData?.User?.nick}</b>
            <div className="dateView">
              <p>{changeDate(getFormData?.createdAt)}</p>
              <p>조회수 {getFormData?.view}</p>
            </div>
          </div>
        </Section>
        <Section>
          <div className="secondInfo">
            <div>
              <h3>카테고리</h3>
              <b>{getFormData?.category}</b>
            </div>
            <div>
              <h3>모집인원</h3>
              <b>{getFormData?.personnel}명</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>모임장소</h3>
              <b>{getFormData?.meeting}</b>
            </div>
            <div>
              <h3>모집포지션</h3>
              <b>{getFormData?.position}</b>
            </div>
          </div>
          <div className="secondInfo">
            <div>
              <h3>연락방법</h3>
              <b>
                <a href="#">{getFormData?.contact}</a>
              </b>
            </div>
            <div>
              <h3>마감일자</h3>
              <b>{getFormData?.period}</b>
            </div>
          </div>
        </Section>
        <Section>
          <p className="content">{getFormData?.content}</p>
        </Section>
        <Section>
          <CommentContainer isAdmin={isAdmin} />
        </Section>
        {user?.userNum === formData?.getFormData?.User.userNum || isAdmin ? (
          <BtnSection>
            {formData?.getFormData?.state === 2 ? (
              <button
                onClick={() => onClose(postId, formData?.getFormData?.state)}
              >
                모집중으로 변경
              </button>
            ) : (
              <button
                onClick={(e) => onClose(postId, formData?.getFormData?.state)}
              >
                마감하기
              </button>
            )}
            <button onClick={() => onGetOriginalForm(formData.getFormData)}>
              수정
            </button>
            <button onClick={(e) => onDelete(postId, e)}>삭제</button>
          </BtnSection>
        ) : (
          <></>
        )}
      </PostContainer>
    </PostWrap>
  );
};

export default View;
