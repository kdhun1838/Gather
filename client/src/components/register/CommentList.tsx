import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { changeDate } from "../community/Community";

const ListWrap = styled.div`
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const List = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
  .basicInfo {
    position: relative;
    b {
      font-size: 20px;
      width: 100px;
    }
    span {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      color: #aaa;
    }
    .commentBtn {
      position: absolute;
      right: 0;
      top: 0;

      button {
        &:last-child {
          margin-right: 5px;
        }
      }
    }
  }

  p {
    font-size: 22px;
  }
`;

type CommentListProp = {
  onGetOriginalComment: (originComment: object) => void;
  onChangeComment: (data: { key: string; value: string | number }) => void;
  formData: {
    getComment: CommentItem[];
  };
  userId: number;
  onModify: boolean;
  comment: string;
};

type CommentItem = {
  commentNum: number;
  userId: string;
  comment: string;
  createdAt: string;
  User: {
    nick: string;
    userNum: number;
  };
};

const CommentList: React.FC<CommentListProp> = ({
  onGetOriginalComment,
  onChangeComment,
  formData,
  userId,
  onModify,
  comment
}) => {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const { getComment } = formData;
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

  const handleEditComment = (commentItem: object, commentNum: number) => {
    onGetOriginalComment(commentItem);
    setEditCommentId(commentNum);
  }

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onChangeComment({key: "comment", value: value});
}

  return (
    <ListWrap>
      {getComment &&
        getComment.map((commentItem: CommentItem) => (
          <List key={commentItem.commentNum}>
            <div className="basicInfo">
              <b>{commentItem.User.nick}</b>
              <span>{changeDate(commentItem.createdAt)}</span>
              {commentItem.User.userNum === userId && (
                <div className="commentBtn">
                  <button>삭제</button>
                  <button onClick={() => handleEditComment(commentItem, commentItem.commentNum)}>
                    수정
                  </button>
                </div>
              )}
            </div>
            {onModify && commentItem.commentNum === editCommentId ? (
              <textarea
              rows={5}
              onChange={(e) =>
                handleChangeComment(e)
              }
              value={comment}
            />
            ) : (
              <p>{commentItem.comment}</p>
            )}
          </List>
        ))}
    </ListWrap>
  );
};

export default CommentList;
