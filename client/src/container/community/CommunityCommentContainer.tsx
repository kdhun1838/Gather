import { useCallback, useState, useEffect } from "react";
import CommunityComment from "../../components/community/CommunityComment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import {
  addComment,
  addReply,
  changeForm,
  getComments,
  initReply,
  getReplys,
} from "../../modules/community/action";
import { useParams } from "react-router-dom";

const CommunityCommentContainer = () => {
  const { comments, comment, reply, replys, user, nestedReply } = useSelector(
    (state: RootState) => ({
      comments: state.community.post.getComments,
      comment: state.community.post.comment,
      reply: state.community.post.reply,
      replys: state.community.post.getReply,
      user: state.user.user,
      nestedReply: state.community.post.nestedReply,
    })
  );
  const [commentBoxOpen, setCommentBoxOpen] = useState<Record<number, boolean>>(
    {}
  );
  const [replyBoxOpen, setReplyBoxOpen] = useState<Record<number, boolean>>({});

  const dispatch = useDispatch();
  const params = useParams();
  const postId = Number(params.postId);

  const onChangeTextArea = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeForm({ name: "post", key: data.key, value: data.value }));
    },
    [dispatch]
  );

  const onClickButton = useCallback(
    (data: { postId: number; userId: number; comment: string }) => {
      dispatch(addComment(data));
    },
    [dispatch]
  );

  const showReplyBox = useCallback(
    (name: string, commentIndex: number) => {
      if (name === "comment") {
        dispatch(initReply("reply"));
        setCommentBoxOpen((prev: Record<number, boolean>) => {
          const newState = { ...prev };
          newState[commentIndex] = !prev[commentIndex];
          for (const key in newState) {
            if (key !== commentIndex.toString()) {
              newState[key] = false;
            }
          }
          return newState;
        });
      } else {
        dispatch(initReply("nestedReply"));
        setReplyBoxOpen((prev: Record<number, boolean>) => {
          const newState = { ...prev };
          newState[commentIndex] = !prev[commentIndex];
          for (const key in newState) {
            if (key !== commentIndex.toString()) {
              newState[key] = false;
            }
          }
          return newState;
        });
      }
    },
    [dispatch]
  );

  const onClickReply = useCallback(
    (data: {
      userId: number;
      postId: number;
      commentId: number;
      reply: string;
    }) => {
      dispatch(addReply(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getComments(postId));
    dispatch(getReplys(postId));
  }, [dispatch, postId]);

  return (
    <>
      <CommunityComment
        replys={replys}
        comment={comment}
        reply={reply}
        nestedReply={nestedReply}
        comments={comments}
        user={user}
        postId={postId}
        commentBoxOpen={commentBoxOpen}
        replyBoxOpen={replyBoxOpen}
        onChangeTextArea={onChangeTextArea}
        onClickButton={onClickButton}
        showReplyBox={showReplyBox}
        onClickReply={onClickReply}
      />
    </>
  );
};

export default CommunityCommentContainer;
