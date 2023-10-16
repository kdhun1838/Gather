import React from "react";
import styled from "styled-components";
import { PostType } from "./CommunityPost";

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 100px;
`;

const CommentCount = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
`;

const CommentInputBox = styled.div`
  display: flex;
  grid-gap: 15px;
  gap: 15px;
`;

const CommentButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 24px;
`;

const ImgBox = styled.div`
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const CommentTextArea = styled.textarea`
  font-family: inherit;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 2px solid #e1e1e1;
  border-radius: 16px;
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  resize: none;
`;

const CommentButton = styled.button`
  cursor: pointer;
  padding: 12px 24px;
  height: 40px;
  background: #333;
  border-radius: 50px;
  font-weight: 700;
  color: #fff;
  font-size: 16px;
`;

const CommentsBox = styled.ul`
  width: 100%;
`;

type CommentPorpsType = {
  comment: string;
  postId: number;
  post: {
    updatedPost: PostType;
    getComment: string[];
  };
  onChangeTextArea: (data: { key: string; value: string }) => void;
  onClickButton: (data: {
    userId: number;
    postId: number;
    comment: string;
  }) => void;
};

const CommunityComment: React.FC<CommentPorpsType> = ({
  comment,
  postId,
  post,
  onChangeTextArea,
  onClickButton,
}) => {
  const { getComment } = post;
  console.log(getComment);

  return (
    <CommentBox>
      <CommentCount>
        댓글 <span>{getComment?.length}</span>
      </CommentCount>

      <CommentInputBox>
        <ImgBox />
        <CommentTextArea
          name="comment"
          value={comment}
          onChange={(e) =>
            onChangeTextArea({ key: e.target.name, value: e.target.value })
          }
        />
      </CommentInputBox>

      <CommentButtonBox>
        <CommentButton
          onClick={() => onClickButton({ userId: 17, postId, comment })}
        >
          댓글 등록
        </CommentButton>
      </CommentButtonBox>
      <CommentsBox>
        {getComment?.map((comment: any, index: number) => (
          <li key={index}>{comment?.content}</li>
        ))}
      </CommentsBox>
    </CommentBox>
  );
};

export default CommunityComment;
