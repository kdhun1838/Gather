import React from "react";
import HomeContainer from "../../container/home/HomeContainer";
import HeaderContainer from "../../container/common/HeaderContainer";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <HomeContainer />
    </div>
  );
};

export default HomePage;
