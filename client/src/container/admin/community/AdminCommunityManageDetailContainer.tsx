import { useCallback, useEffect } from "react";
import CommunityPost from "../../../components/community/CommunityPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { deletePost, getPost } from "../../../modules/community/action";
import { useNavigate, useParams } from "react-router-dom";

const AdminCommunityManageDetailContainer: React.FC = () => {
  const { post, load, user } = useSelector((state: RootState) => ({
    post: state.community.post.getPost,
    load: state.loading,
    user: state.user.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const onClickPostEdit = useCallback(() => {
    navigate(`/admin/community/manage/edit/${postId}`);
  }, [navigate, postId]);

  const onClickDeletPost = useCallback(() => {
    dispatch(deletePost(postId));
    navigate("/admin/community/manage");
  }, [dispatch, navigate, postId]);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  return (
    <CommunityPost
      post={post}
      load={load}
      onClickBack={onClickBack}
      isAdmin={true}
      onClickPostEdit={onClickPostEdit}
      onClickDeletPost={onClickDeletPost}
      user={user}
    />
  );
};

export default AdminCommunityManageDetailContainer;
