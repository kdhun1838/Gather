import React, { KeyboardEvent } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { time } from "console";

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
      color: #868e96;

      &.check {
        color: #444;
      }
    }
  }
`;

const SortType = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;

  .flexBox {
    display: flex;
    gap: 10px;
  }
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

const DetailSortButtonBox = styled.div`
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 36px;
  box-shadow: none;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 38px;
  position: relative;
  transition: all 100ms ease 0s;
  box-sizing: border-box;
  background: white;
  border: 1px solid rgb(227, 227, 227);
  outline: 0px !important;
  width: 140px;
  height: 38px;
  cursor: pointer;

  &:hover {
    border: 1px solid rgb(209, 209, 209);
  }

  .nameTag {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex: 1 1 0%;
    flex-wrap: wrap;
    padding: 2px 8px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 38px;
    margin-left: 8px;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.03em;
    color: rgb(100, 100, 100);

    div {
      color: rgb(100, 100, 100);
      margin-left: 2px;
      margin-right: 2px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
      font-weight: 500;
    }
  }
`;

const ListBox = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: inherit;
  height: auto;
  min-height: 100px;
  border: inherit;
  border-radius: 20px;
  z-index: 1;
  background-color: white;
  padding: 20px;
  font-weight: bold;
`;

const SvgBox = styled.div`
  color: rgb(204, 204, 204);
  display: flex;
  padding: 8px;
  transition: color 150ms ease 0s;
  box-sizing: border-box;
`;

const FavoritesBox = styled.div`
  display: flex;
  height: 38px;
  padding: 0px 22px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 36px;
  border: 1px solid rgb(227, 227, 227);
  color: rgb(100, 100, 100);
  background: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border: 1px solid rgb(209, 209, 209);
  }

  span {
    font-size: 18px;
    margin-right: 4px;
    margin-bottom: 3px;
  }
`;

type CommunityPropType = {
  searchValue: string | undefined;
  isClick: string;
  searchTypes: string[];
  detialTypes: string[];
  onClickSortButton: (data: { key: string; value: string }) => void;
  onChange: (data: { key: string; value: string }) => void;
  onKeyPress: (
    e: KeyboardEvent<HTMLInputElement>,
    data: { key: string; value: string }
  ) => void;
};

const CommunitySearch: React.FC<CommunityPropType> = ({
  searchValue,
  isClick,
  searchTypes,
  detialTypes,
  onClickSortButton,
  onChange,
  onKeyPress,
}) => {
  const lists = [
    ["최신순,오래된순"],
    ["높은순", "낮은순"],
    ["높은순", "낮은순"],
  ];

  return (
    <>
      <SearchBox>
        <section>
          {searchTypes.map((searchType, index) => {
            return (
              <div
                key={index}
                className={isClick === searchType ? "check" : ""}
                onClick={() =>
                  onClickSortButton({ key: "mainSort", value: searchType })
                }
              >
                {searchType}
              </div>
            );
          })}
        </section>

        <SortType>
          <div className="flexBox">
            {detialTypes.map((detialType, index) => (
              <DetailSortButtonBox key={index}>
                <div className="nameTag">{detialType}</div>
                <SvgBox>
                  <FaAngleDown />
                </SvgBox>
                <ListBox>
                  {lists.map((list, index) => {
                    console.log(list);
                    return <div key={index}>{list[index]}</div>;
                  })}
                </ListBox>
              </DetailSortButtonBox>
            ))}
            <FavoritesBox>
              <span>⭐</span> 즐겨찾기
            </FavoritesBox>
          </div>
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
        </SortType>
      </SearchBox>
    </>
  );
};

export default CommunitySearch;
