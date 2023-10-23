import React from "react";
import styled from "styled-components";

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

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e1e1e1;
`;

const CommentDetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
  cursor: pointer;
`;

const UserNick = styled.div`
  color: #333;
  font-weight: 700;
`;

const CreatedTime = styled.div`
  font-size: 14px;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  color: #9f9f9f;
`;

const CommentDetail = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: break-all;
  overflow-wrap: break-all;
`;

const ReplyBox = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px;
  background-color: #9f9f9f;
`;

type CommentPorpsType = {
  replys: Record<string, any>;
  comment: string;
  reply: string;
  postId: number;
  replyBoxOpen: Record<number, boolean>;
  comments: string[];
  onChangeTextArea: (data: { key: string; value: string }) => void;
  onClickButton: (data: {
    userId: number;
    postId: number;
    comment: string;
  }) => void;
  showReplyBox: (commentIndex: number) => void;
  onClickReply: (data: {
    userId: number;
    postId: number;
    commentId: number;
    reply: string;
  }) => void;
};

const CommunityComment: React.FC<CommentPorpsType> = ({
  replys,
  comment,
  reply,
  replyBoxOpen,
  postId,
  comments,
  onChangeTextArea,
  onClickButton,
  showReplyBox,
  onClickReply,
}) => {
  return (
    <CommentBox>
      <CommentCount>
        댓글 <span>{comments?.length}</span>
      </CommentCount>

      <CommentInputBox>
        <ImgBox />
        <CommentTextArea
          name="comment"
          value={comment}
          onChange={(e) =>
            onChangeTextArea({
              key: e.target.name,
              value: e.target.value,
            })
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
        {comments &&
          comments?.map((comment: any, index: number) => (
            <Comment key={index}>
              <CommentDetailBox>
                <div>
                  <UserNick> {comment.User?.nick}</UserNick>
                  <CreatedTime> {comment?.createdAt}</CreatedTime>
                </div>
                <div>
                  <button onClick={() => showReplyBox(index)}>답글</button>
                  <button>신고</button>
                </div>
              </CommentDetailBox>
              <CommentDetail>{comment?.content}</CommentDetail>

              {replyBoxOpen[index] && (
                <>
                  <CommentTextArea
                    name="reply"
                    onChange={(e) =>
                      onChangeTextArea({
                        key: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                  <CommentButtonBox>
                    <CommentButton
                      onClick={() =>
                        onClickReply({
                          userId: 17,
                          postId,
                          commentId: comment?.commentNum,
                          reply,
                        })
                      }
                    >
                      답글 등록
                    </CommentButton>
                  </CommentButtonBox>
                </>
              )}

              {replys &&
                replys?.map((reply: any, index: number) => (
                  <>
                    {reply?.commentId === comment.commentNum && (
                      <ReplyBox key={index}>
                        <div>{reply.createdAt}</div>
                        <div> {reply.content}</div>
                      </ReplyBox>
                    )}
                  </>
                ))}
            </Comment>
          ))}
      </CommentsBox>
    </CommentBox>
  );
};

export default CommunityComment;
