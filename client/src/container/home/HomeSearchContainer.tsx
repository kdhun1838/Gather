import React, { KeyboardEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { changeSort, getList } from "../../modules/register/action";
import HomeSearch from "../../components/home/HomeSearch";

const HomeSearchContainer = () => {
  const dispatch = useDispatch();
  const { searchValue, mainSort, detailSort, recruit } = useSelector(
    (state: RootState) => ({
      searchValue: state.register.list.sort.search,
      mainSort: state.register.list.sort.mainSort,
      detailSort: state.register.list.sort.detailSort,
      recruit: state.register.list.sort.recruit,
    })
  );
  const [isClick, setIsClick] = React.useState("전체");

  React.useEffect(() => {
    console.log("ㅇㅇㅇ", mainSort, detailSort, "sss", searchValue);
    dispatch(
      getList({
        mainSort,
        detailSort: {
          time: detailSort?.time,
          view: detailSort?.view,
          like: detailSort?.like,
        },
        search: searchValue,
        recruit,
      })
    );
  }, [
    dispatch,
    detailSort?.like,
    detailSort?.time,
    detailSort?.view,
    mainSort,
    recruit,
  ]);
  const searchTypes: string[] = ["전체", "운동", "게임", "스터디", "기타"];
  const onClickSortButton = React.useCallback(
    (data: { key: string; value: string }, e: MouseEvent) => {
      e.preventDefault();
      setIsClick(data.value);
      dispatch(changeSort(data));
      dispatch(getList({ mainSort: data.value, search: searchValue, recruit }));
    },
    [dispatch, searchValue]
  );
  const onChange = React.useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeSort(data));
    },
    [dispatch]
  );

  const onKeyPress = React.useCallback(
    (
      e: KeyboardEvent<HTMLInputElement>,
      data: { key: string; value: string }
    ) => {
      if (e.key === "Enter") {
        dispatch(getList({ mainSort, search: data.value, recruit }));
      }
    },
    [dispatch, mainSort, recruit]
  );
  return (
    <>
      <HomeSearch
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

export default HomeSearchContainer;
