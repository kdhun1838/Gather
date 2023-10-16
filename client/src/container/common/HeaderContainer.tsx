import React from "react";
import Header from "../../components/common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const HeaderContainer = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));

  return (
    <div>
      <Header user={user} />
    </div>
  );
};

export default HeaderContainer;
