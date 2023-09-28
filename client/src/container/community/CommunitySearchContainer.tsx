import React from "react";
import CommunitySearch from "../../components/community/CommunitySearch";

const CommunitySearchContainer = () => {
  const searchTypes: string[] = ["전체", "후기", "질문", "잡담"];

  return (
    <>
      <CommunitySearch searchTypes={searchTypes} />
    </>
  );
};

export default CommunitySearchContainer;
