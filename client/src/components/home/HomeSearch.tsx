import React, { KeyboardEvent, MouseEvent } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import SearchButton from "../../lib/button/SearchButton";
import ClickButton from "../../lib/button/ClickButton";
import Responsive from "../../styled/Responsive";

const SearchBox = styled(Responsive)`
  /* max-width: 1300px; */
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  /* margin-left: auto; */
  /* margin-right: auto; */
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
      color: #868e96;

      &.check {
        color: #444;
      }
    }
  }
`;

const SortTypeBox = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const SortType = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInputBox = styled.div`
  display: flex;
  width: 300px;
  height: 34px;
  padding: 0 20px;
  align-items: center;
  grid-gap: 10px;
  gap: 10px;
  border-radius: 36px;
  background: #f5f5f5;
  position: relative;

  input {
    border: none;
    background: transparent;
    outline: none;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    width: 20rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
  }

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`;

type HomeSearchType = {
  searchValue: string | undefined;
  isClick: string;
  searchTypes: string[];
  onClickSortButton: (
    data: { key: string; value: string },
    e: MouseEvent
  ) => void;
  onChange: (data: { key: string; value: string }) => void;
  onKeyPress: (
    e: KeyboardEvent<HTMLInputElement>,
    data: { key: string; value: string }
  ) => void;
};

type SearchType = {
  key: string;
  name: string;
  content: {
    [key: string]: string;
  };
};

const HomeSearch: React.FC<HomeSearchType> = ({
  searchValue,
  isClick,
  searchTypes,
  onClickSortButton,
  onChange,
  onKeyPress,
}) => {
  const time: SearchType = {
    key: "time",
    name: "시간",
    content: {
      newest: "최신순",
      latest: "오래된순",
    },
  };

  const view: SearchType = {
    key: "view",
    name: "조회수",
    content: {
      highest: "👀 높은순",
      lowest: "👀 낮은순",
    },
  };

  const like: SearchType = {
    key: "like",
    name: "좋아요수",
    content: {
      highest: "⭐ 높은순",
      lowest: "⭐ 낮은순",
    },
  };

  return (
    <>
      <SearchBox>
        <section>
          {searchTypes.map((searchType, index) => {
            return (
              <div
                key={index}
                className={isClick === searchType ? "check" : ""}
                onClick={(e: MouseEvent<HTMLDivElement>) =>
                  onClickSortButton({ key: "mainSort", value: searchType }, e)
                }
              >
                {searchType}
              </div>
            );
          })}
        </section>

        <SortTypeBox>
          <SortType>
            <SearchButton type="reset" object={time} isHome={true} />
            <SearchButton type="reset" object={view} isHome={true} />
            <SearchButton type="reset" object={like} isHome={true} />
            <ClickButton img="" value="모집중만보기" isFilter={true} />
          </SortType>
          <div>
            <SearchInputBox>
              <BiSearch />
              <input
                name="search"
                placeholder="제목, 글 내용을 검색해보세요."
                value={searchValue}
                onChange={(e) =>
                  onChange({
                    key: e.target.name,
                    value: e.target.value,
                  })
                }
                onKeyDown={(e) =>
                  onKeyPress(e, { key: "search", value: String(searchValue) })
                }
              />
            </SearchInputBox>
          </div>
        </SortTypeBox>
      </SearchBox>
    </>
  );
};

export default HomeSearch;
