import React from "react";
import styled from "styled-components";
import { changeDate } from "../community/Community";

const ListWrap = styled.div`
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .basicInfo {
    display: flex;

    b {
      margin-right: 30px;
      width: 100px;
    }
  }

  span {
    font-size: 14px;
    color: #aaa;
  }
`;

type CommentListProp = {
  formData: {
    getComment: CommentItem[];
  };
};

type CommentItem = {
  commentNum: number;
  userId: string;
  comment: string;
  createdAt: string;
  User: {
      nick: string;
  };
};

const CommentList: React.FC<CommentListProp> = ({ formData }) => {
  const { getComment } = formData;
    console.log("getComment?????", getComment)
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
    <ListWrap>
      {getComment &&
        getComment.map((commentItem: CommentItem) => (
          <List key={commentItem.commentNum}>
            <div className="basicInfo">
              <b>{commentItem.User.nick}</b>
              <p>{commentItem.comment}</p>
            </div>
            <span>{changeDate(commentItem.createdAt)}</span>
          </List>
        ))}
    </ListWrap>
  );
};

export default CommentList;
