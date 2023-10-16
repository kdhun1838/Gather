import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeRecruit } from "../../modules/register/action";

type ClickButtonProps = {
  img?: string;
  value: string;
  isFilter: boolean;
};

const ClickButtonBox = styled.div`
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

  &.check {
    border: 1px solid rgb(0, 185, 174);
    color: rgb(0, 185, 174);
  }

  span {
    margin: 0 3px 4px 0;
  }
`;

const ClickButton: React.FC<ClickButtonProps> = ({ img, value, isFilter }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(isFilter);

  const onClick = useCallback(() => {
    setChecked((prev) => !prev);
    if (isFilter) {
      dispatch(changeRecruit());
    }
  }, [dispatch, isFilter]);

  return (
    <ClickButtonBox onClick={onClick} className={checked ? "check" : ""}>
      <span>{img}</span>
      {value}
    </ClickButtonBox>
  );
};

export default ClickButton;
