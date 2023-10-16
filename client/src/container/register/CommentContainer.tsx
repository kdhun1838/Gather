import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../components/register/Comment";
import { RootState } from "../../modules";
import { changeComment, postComment } from "../../modules/register/action";

const CommentContainer = () => {
  const { registerComment, formData } = useSelector(
    (state: RootState) => state.register
  );
  const dispatch = useDispatch();
  const onChangeComment = useCallback(
    (data: { key: string; value: string | number }) => {
      dispatch(changeComment({ key: data.key, value: String(data.value) }));
    },
    [dispatch]
  );
  const onPostComment = useCallback(
    (comment: string, postId: number) => {
      dispatch(postComment(comment, postId));
    },
    [dispatch]
  );

  return (
    <div>
      <Comment
        onChangeComment={onChangeComment}
        onPostComment={onPostComment}
        comment={registerComment.comment}
        postId={formData.registerNum}
      />
    </div>
  );
};

export default CommentContainer;
