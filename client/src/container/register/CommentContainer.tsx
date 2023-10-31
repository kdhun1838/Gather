import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../../components/register/Comment";
import CommentList from "../../components/register/CommentList";
import { RootState } from "../../modules";
import {
  changeComment,
  getForm,
  getOriginalComment,
  postComment,
  unloadComment,
} from "../../modules/register/action";

interface OwnProps {
  isAdmin?: boolean;
}

const CommentContainer: React.FC<OwnProps> = ({ isAdmin }) => {
  const [onModify, setOnModify] = useState(false);
  const { registerComment, formData, userId } = useSelector(
    (state: RootState) => ({
      registerComment: state.register.registerComment,
      formData: state.register.formData,
      userId: state.user,
    })
  );
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

  const onGetOriginalComment = (commentItem: object) => {
    const originComment = formData.getComment;
    setOnModify(true);
    dispatch(getOriginalComment(commentItem));
  };

  return (
    <div>
      {isAdmin ? (
        <></>
      ) : (
        <>
          <Comment
            onChangeComment={onChangeComment}
            onPostComment={onPostComment}
            comment={registerComment.comment}
            postId={postId}
            userId={userId.user?.userNum}
          />
        </>
      )}
      <CommentList
        onGetOriginalComment={onGetOriginalComment}
        onChangeComment={onChangeComment}
        formData={formData}
        userId={userId.user?.userNum}
        onModify={onModify}
        comment={registerComment.comment}
      />
    </div>
  );
};

export default CommentContainer;
