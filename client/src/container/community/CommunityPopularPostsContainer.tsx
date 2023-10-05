import CommunityPopularPosts from "../../components/community/CommunityPopularPosts";
import { RootState } from "../../modules";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPosts } from "../../modules/community/action";

const CommunityPopularPostsContainer = () => {
  const popularPost = useSelector(
    (state: RootState) => state.community.main.popularPosts
  );

  console.log(popularPost);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularPosts());
  }, [dispatch]);

  return (
    <>
      <CommunityPopularPosts />
    </>
  );
};

export default CommunityPopularPostsContainer;
