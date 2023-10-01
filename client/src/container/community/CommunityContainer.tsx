import React, { useCallback, useEffect } from "react";
import Community from "../../components/community/Community";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { addFavorite, getPosts } from "../../modules/community/action";

const CommunityContainer = () => {
  const { posts, mainSort, detailSortName, search } = useSelector(
    (state: RootState) => ({
      posts: state.community.main.mainPosts,
      mainSort: state.community.main.sort.mainSort,
      detailSortName: state.community.main.sort.detailSort,
      search: state.community.main.sort.search,
    })
  );

  const dispatch = useDispatch();

  const onClickAddFavoritePost = useCallback(
    (postId: number) => {
      console.log(postId);
      dispatch(addFavorite(postId));
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("마운트");
    dispatch(
      getPosts({
        mainSort,
        detailSort: {
          time: detailSortName?.time,
          view: detailSortName?.view,
          like: detailSortName?.like,
        },
        search,
      })
    );
  }, [
    dispatch,
    detailSortName?.like,
    detailSortName?.time,
    detailSortName?.view,
    mainSort,
    posts?.length,
  ]);

  return (
    <div>
      <Community
        posts={posts}
        onClickAddFavoritePost={onClickAddFavoritePost}
      />
    </div>
  );
};

export default CommunityContainer;
