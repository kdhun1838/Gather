import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type CommentProps = {
  onChangeComment: (data: { key: string; value: string | number }) => void;
  onPostComment: (comment: string, postId: number, userId: number) => void;
  comment: string;
  postId: number;
  userId: number;
};
const Comment: React.FC<CommentProps> = ({
  onChangeComment,
  onPostComment,
  comment,
  postId,
  userId,
}) => {
    const [commentValue, setCommentValue] = useState("");
    const navigate = useNavigate();

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        onChangeComment({key: "comment", value: value});
    }
    const handlePostComment = (e: FormEvent) => {
        if(!userId){
            e.preventDefault();
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            setCommentValue("");
            onPostComment(comment, postId, userId);
        }
    }
  return (
    <div>
      <textarea
        rows={5}
        onChange={(e) =>
          handleChangeComment(e)
        }
        value={comment}
      />
      <div className="commentBtn">
        <button onClick={handlePostComment}>등록</button>
      </div>
    </div>
  );
};

export default Comment;
