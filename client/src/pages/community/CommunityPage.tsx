import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CommunityContainer from "../../container/community/CommunityContainer";
import CommunitySearchContainer from "../../container/community/CommunitySearchContainer";
import CommunityPopularPostsContainer from "../../container/community/CommunityPopularPostsContainer";
import HeaderContainer from "../../container/common/HeaderContainer";

// const CommunityBox = styled.div`
//   min-height: 60rem;
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto;
// `;

const CommunityPage = () => {
  return (
    <div>
      <HeaderContainer />
      <CommunityPopularPostsContainer />
      <CommunitySearchContainer />
      <CommunityContainer />
    </div>
  );
};

export default CommunityPage;
