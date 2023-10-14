import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDeailType, initDetail } from "../../modules/community/action";
import styled from "styled-components";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RootState } from "../../modules";
import { initSort, changeDetailSort } from "../../modules/register/action";

const ButtonBox = styled.div`
  -webkit-box-align: center;
  align-items: center;
  border-radius: 36px;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 38px;
  position: relative;
  transition: all 100ms ease 0s;
  box-sizing: border-box;
  width: 150px;
  height: 38px;
  background: white;
  border: 1px solid rgb(227, 227, 227);
  outline: 0px !important;
  color: rgb(100, 100, 100);

  &:hover {
    border: 1px solid rgb(209, 209, 209);
  }

  &.check {
    color: rgb(0, 185, 174);
  }
`;

const OptionName = styled.div`
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
  color: inherit;
`;

const SvgBox = styled.div`
  color: rgb(204, 204, 204);
  display: flex;
  padding: 8px;
  transition: color 150ms ease 0s;
  box-sizing: border-box;
`;

const ListBox = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: inherit;
  border: inherit;
  border-radius: 20px;
  padding: 20px 18px;
  font-weight: bold;
  z-index: 1;
  background-color: white;
  color: rgb(100, 100, 100);

  li {
    cursor: pointer;
    padding: 10px 0;

    &:hover {
      color: #333;
    }
  }
`;

type OptionProps = {
  type: string;
  object: {
    key: string;
    name: string;
    content: {
      [key: string]: string;
    };
  };
  isHome: boolean;
};

const SearchButton: React.FC<OptionProps> = ({ type, object, isHome }) => {
  const dispatch = useDispatch();
  const [showOptionsBox, setShowOptionsBox] = useState<boolean>(false);
  const [buttonName, setButtonName] = useState<string>(object.name);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const { detailSort, detailHomeSort } = useSelector((state: RootState) => ({
    detailSort: state.community.main.sort.detailSort,
    detailHomeSort: state.register.list.sort.detailSort,
  }));

  const time: string = isHome
    ? detailHomeSort?.time || ""
    : detailSort?.time || "";
  const view: string = isHome
    ? detailHomeSort?.view || ""
    : detailSort?.view || "";
  const like: string = isHome
    ? detailHomeSort?.like || ""
    : detailSort?.like || "";

  const onClickShowOptionsBox = useCallback(() => {
    setShowOptionsBox(!showOptionsBox);
  }, [showOptionsBox]);

  const onClickOutside = useCallback((e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setShowOptionsBox(false);
    }
  }, []);

  const onClickList = useCallback(
    (e: any, key: string) => {
      const content = e.target.textContent;
      if (!isHome) {
        dispatch(initDetail());
        dispatch(changeDeailType({ key: object.key, value: key }));
        setButtonName(content);
      } else {
        dispatch(initSort());
        dispatch(changeDetailSort({ key: object.key, value: key }));
        setButtonName(content);
      }
    },
    [dispatch, object.key, isHome]
  );

  const resetButton = useCallback(
    (type: string) => {
      if (type === "reset") {
        if (time === "") {
          if (object.key === "time") {
            setButtonName(object.name);
          }
        }

        if (view === "") {
          if (object.key === "view") {
            setButtonName(object.name);
          }
        }

        if (like === "") {
          if (object.key === "like") {
            setButtonName(object.name);
          }
        }
      }
    },
    [like, object.key, object.name, time, view]
  );

  //버튼과 리스트 외 다른 곳을 클릭했을 때 리스트가 사라지게 하는 함수
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    resetButton(type);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [
    like,
    object.key,
    object.name,
    onClickOutside,
    time,
    view,
    resetButton,
    type,
  ]);

  return (
    <ButtonBox
      ref={optionRef}
      onClick={onClickShowOptionsBox}
      className={buttonName !== object.name ? "check" : ""}
    >
      <OptionName>{buttonName}</OptionName>
      <SvgBox>
        <HiOutlineChevronDown />
      </SvgBox>
      {showOptionsBox && (
        <ListBox>
          <ul>
            {Object.keys(object.content).map((key, index) => (
              <li onClick={(e) => onClickList(e, key)} key={index}>
                {object.content[key]}
              </li>
            ))}
          </ul>
        </ListBox>
      )}
    </ButtonBox>
  );
};

export default SearchButton;
