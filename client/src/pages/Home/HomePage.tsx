import React from "react";
import HomeContainer from "../../container/home/HomeContainer";
import HeaderContainer from "../../container/common/HeaderContainer";
import HomePopularListContainer from "../../container/home/HomePopularListContainer";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <HomePopularListContainer />
      <HomeContainer />
    </div>
  );
};

export default HomePage;
