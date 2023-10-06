import CommunityPopularPosts from "../../components/community/CommunityPopularPosts";
import { RootState } from "../../modules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPosts } from "../../modules/community/action";

const CommunityPopularPostsContainer = () => {
  const popularPosts = useSelector(
    (state: RootState) => state.community.main.popularPosts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularPosts());
  }, [dispatch]);

  return (
    <>
      <CommunityPopularPosts popularPosts={popularPosts} />
    </>
  );
};

export default CommunityPopularPostsContainer;
