import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { useDispatch } from "react-redux";
import { getPopularList } from "../../modules/register/action";
import HomePopularList from "../../components/home/HomePopularList";
import { useNavigate } from "react-router-dom";

const HomePopularListContainer: React.FC = () => {
  const { popularList } = useSelector((state: RootState) => ({
    popularList: state.register.list.popularList,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getPopularList());
  }, [dispatch]);
  const goWrite = () => {
    navigate("/register");
  };

  return (
    <div>
      <HomePopularList goWrite={goWrite} popularList={popularList} />
    </div>
  );
};

export default HomePopularListContainer;
