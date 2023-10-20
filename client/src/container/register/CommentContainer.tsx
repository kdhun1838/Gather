import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../../components/register/Comment";
import CommentList from "../../components/register/CommentList";
import { RootState } from "../../modules";
import {
  changeComment,
  getForm,
  postComment,
  unloadComment,
} from "../../modules/register/action";

const CommentContainer = () => {
  const { registerComment, formData, userId } = useSelector(
    (state: RootState) => ({
      registerComment: state.register.registerComment,
      formData: state.register.formData,
      userId: state.user,
    })
  );
  console.log("registerCom??????", userId);
  const params = useParams();
  const postId = Number(params.postId);
  const dispatch = useDispatch();

  const onChangeComment = useCallback(
    (data: { key: string; value: string | number }) => {
      dispatch(changeComment({ key: data.key, value: String(data.value) }));
    },
    [dispatch]
  );
  
  const onPostComment = useCallback(
    (comment: string, postId: number, userId: number) => {
      dispatch(postComment(comment, postId, userId));
      setTimeout(() => {
        dispatch(unloadComment());
        dispatch(getForm(postId));
      }, 100);
    },
    [dispatch]
  );

  return (
    <div>
      <Comment
        onChangeComment={onChangeComment}
        onPostComment={onPostComment}
        comment={registerComment.comment}
        postId={postId}
        userId={userId.user?.userNum}
      />
      <CommentList formData={formData} />
    </div>
  );
};

export default CommentContainer;
