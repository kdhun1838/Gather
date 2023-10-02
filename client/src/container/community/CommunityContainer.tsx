import React, { useCallback, useEffect } from "react";
import Community from "../../components/community/Community";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import {
  addFavorite,
  getPost,
  getPosts,
  initForm,
} from "../../modules/community/action";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onClickAddFavoritePost = useCallback(
    (postId: number) => {
      console.log(postId);
      dispatch(addFavorite(postId));
    },
    [dispatch]
  );

  const onClickPost = useCallback(
    (postId: number) => {
      navigate(`/community/${postId}`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(initForm());
  }, []);

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
        onClickPost={onClickPost}
        onClickAddFavoritePost={onClickAddFavoritePost}
      />
    </div>
  );
};

export default CommunityContainer;
