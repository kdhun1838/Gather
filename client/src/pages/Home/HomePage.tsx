import React from "react";
import HomeContainer from "../../container/home/HomeContainer";
import HeaderContainer from "../../container/common/HeaderContainer";
import HomePopularListContainer from "../../container/home/HomePopularListContainer";
import HomeSearchContainer from "../../container/home/HomeSearchContainer";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <HomePopularListContainer />
      <HomeSearchContainer />
      <HomeContainer />
    </div>
  );
};

export default HomePage;
