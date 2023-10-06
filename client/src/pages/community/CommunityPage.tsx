import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CommunityContainer from "../../container/community/CommunityContainer";
import CommunitySearchContainer from "../../container/community/CommunitySearchContainer";
import CommunityPopularPostsContainer from "../../container/community/CommunityPopularPostsContainer";

const CommunityBox = styled.div`
  min-height: 60rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const CommunityPage = () => {
  return (
    <CommunityBox>
      게시물 <Link to="/community/write">글쓰기버튼</Link>
      <CommunityPopularPostsContainer />
      <CommunitySearchContainer />
      <CommunityContainer />
    </CommunityBox>
  );
};

export default CommunityPage;
