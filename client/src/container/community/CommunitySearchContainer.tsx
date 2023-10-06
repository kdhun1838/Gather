import React, { useCallback, useState, KeyboardEvent } from "react";
import CommunitySearch from "../../components/community/CommunitySearch";
import { useDispatch, useSelector } from "react-redux";
import { changeSortType, getPosts } from "../../modules/community/action";
import { RootState } from "../../modules";

const CommunitySearchContainer = () => {
  const dispatch = useDispatch();
  const { searchValue, mainSort } = useSelector((state: RootState) => ({
    searchValue: state.community.main.sort.search,
    mainSort: state.community.main.sort.mainSort,
  }));

  const [isClick, setIsClick] = useState("전체");

  const searchTypes: string[] = ["전체", "후기", "질문", "잡담"];

  const onClickSortButton = useCallback(
    (data: { key: string; value: string }) => {
      setIsClick(data.value);
      dispatch(changeSortType(data));
      dispatch(getPosts({ mainSort: data.value, search: searchValue }));
    },
    [dispatch, searchValue]
  );

  const onChange = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeSortType(data));
    },
    [dispatch]
  );

  const onKeyPress = useCallback(
    (
      e: KeyboardEvent<HTMLInputElement>,
      data: { key: string; value: string }
    ) => {
      if (e.key === "Enter") {
        console.log("Enter 키가 눌렸습니다.");
        dispatch(getPosts({ mainSort, search: data.value }));
      }
    },
    [dispatch, mainSort]
  );

  return (
    <>
      <CommunitySearch
        searchValue={searchValue}
        isClick={isClick}
        searchTypes={searchTypes}
        onClickSortButton={onClickSortButton}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  );
};

export default CommunitySearchContainer;
