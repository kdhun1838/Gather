import React from "react";

type CommentProps = {
  onChangeComment: (data: { key: string; value: string | number }) => void;
  onPostComment: (comment: string, postId: number) => void;
  comment: string;
  postId: number;
};
const Comment: React.FC<CommentProps> = ({
  onChangeComment,
  onPostComment,
  comment,
  postId,
}) => {
  return (
    <div>
      <textarea
        rows={5}
        onChange={(e) =>
          onChangeComment({ key: "comment", value: e.target.value })
        }
      />
      <div className="commentBtn">
        <button onClick={() => onPostComment(comment, postId)}>등록</button>
      </div>
    </div>
  );
};

export default Comment;
