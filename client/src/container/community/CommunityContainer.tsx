import React from "react";
import Community from "../../components/community/Community";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { getPosts } from "../../modules/community/action";

const CommunityContainer = () => {
  const posts = useSelector((state: RootState) => state.community.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("디스패치 실행");
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Community posts={posts} />
    </div>
  );
};

export default CommunityContainer;
