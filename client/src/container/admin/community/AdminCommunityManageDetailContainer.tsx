import { useCallback, useEffect } from "react";
import CommunityPost from "../../../components/community/CommunityPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { getPost } from "../../../modules/community/action";
import { useNavigate, useParams } from "react-router-dom";

const AdminCommunityManageDetailContainer: React.FC = () => {
  const post = useSelector((state: RootState) => state.community.post.getPost);
  const load = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  return (
    <CommunityPost
      post={post}
      load={load}
      onClickBack={onClickBack}
      isAdmin={true}
    />
  );
};

export default AdminCommunityManageDetailContainer;
