import { useCallback, useEffect } from "react";
import CommunityPost from "../../components/community/CommunityPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { getPost } from "../../modules/community/action";
import { useNavigate, useParams } from "react-router-dom";

const CommunityPostContainer = () => {
  const post = useSelector((state: RootState) => state.community.post);
  const load = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId || "";

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getPost(Number(postId)));
  }, [dispatch, postId]);

  return <CommunityPost post={post} load={load} onClickBack={onClickBack} />;
};

export default CommunityPostContainer;
