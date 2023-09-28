import React from "react";
import styled from "styled-components";

const SearchBox = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  padding: 0px 20px;

  section {
    display: flex;

    div {
      display: flex;
      align-items: center;
      margin-right: 1.5rem;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.5rem;
      color: #444;
    }
  }
`;

const SortType = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;

  div:first-child {
    display: flex;
    gap: 10px;

    div {
      width: 140px;
      height: 38px;
    }
  }
`;

type CommunityPropType = {
  searchTypes: string[];
};

const CommunitySearch: React.FC<CommunityPropType> = ({ searchTypes }) => {
  return (
    <>
      <SearchBox>
        <section>
          {searchTypes.map((searchType) => {
            return <div>{searchType}</div>;
          })}
        </section>
        <SortType>
          <div>
            <div>정렬</div>
            <div>좋아요</div>
          </div>
          <div>
            <div>검색창</div>
          </div>
        </SortType>
      </SearchBox>
    </>
  );
};

export default CommunitySearch;
