import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { changeSort } from "../../modules/register/action";

const HomeSearchContainer = () => {
  const dispatch = useDispatch();
  const { searchValue, mainSort } = useSelector((state: RootState) => ({
    searchValue: state.register.list.sort.search,
    mainSort: state.register.list.sort.mainSort,
  }));
  const [isClick, setIsClick] = React.useState("전체");
  const searchTypes: string[] = ["전체", "운동", "게임", "스터디", "기타"];

  const onClickSortButton = React.useCallback(
    (data: { key: string; value: string }) => {
      setIsClick(data.value);
      dispatch(changeSort(data));
      //   dispatch(getPosts({ mainSort: data.value, search: searchValue }));
    },
    [dispatch]
  );
  const onChange = React.useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeSort(data));
    },
    [dispatch]
  );

  return <div></div>;
};

export default HomeSearchContainer;
