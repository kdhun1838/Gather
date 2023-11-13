import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Home from '../../components/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import {
  getList,
  getPopularList,
  initSort,
  unloadForm,
} from '../../modules/register/action';
import { RootState } from '../../modules';

const HomeContainer: React.FC = () => {
  const { list, mainSort, detailSortName, search, loading } = useSelector(
    (state: RootState) => ({
      list: state.register.list.mainList,
      mainSort: state.register.list.sort.mainSort,
      detailSortName: state.register.list.sort.detailSort,
      search: state.register.list.sort.search,
      loading: state.loading['register/GET_LIST'],
    })
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickAddFavoritePost = React.useCallback((postId: number) => {
    // dispatch(addFavorite(postId));
  }, []);

  const onClickPost = React.useCallback(
    (postId: number) => {
      navigate(`/register/${postId}`);
    },
    [navigate]
  );

  React.useEffect(() => {
    dispatch(unloadForm());
  }, [dispatch]);

  return (
    <div>
      <Home
        posts={list}
        load={loading}
        onClickPost={onClickPost}
        onClickAddFavoritePost={onClickAddFavoritePost}
      />
    </div>
  );
};

export default HomeContainer;
