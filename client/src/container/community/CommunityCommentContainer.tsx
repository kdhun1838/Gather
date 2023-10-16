import React, { useCallback } from "react";
import CommunityComment from "../../components/community/CommunityComment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { addCommnet, changeForm } from "../../modules/community/action";
import { useParams } from "react-router-dom";

const CommunityCommentContainer = () => {
  const { post, comment } = useSelector((state: RootState) => ({
    post: state.community.post.getPost,
    comment: state.community.post.comment,
  }));

  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const postId = Number(params.postId);

  const onChangeTextArea = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeForm({ name: "post", key: data.key, value: data.value }));
    },
    [dispatch]
  );

  const onClickButton = useCallback(
    (data: { postId: number; userId: number; comment: string }) => {
      dispatch(addCommnet(data));
    },
    [dispatch]
  );

  return (
    <>
      <CommunityComment
        comment={comment}
        post={post}
        postId={postId}
        onChangeTextArea={onChangeTextArea}
        onClickButton={onClickButton}
      />
    </>
  );
};

export default CommunityCommentContainer;
