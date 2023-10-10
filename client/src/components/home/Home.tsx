import React from "react";
import styled from "styled-components";
import Responsive from "../../styled/Responsive";
import { Link } from "react-router-dom";
import Button from "../../styled/Button";

type OwnProps = {
  goWrite: () => void;
};

const Home: React.FC<OwnProps> = (props) => {
  return (
    <div>
      <Wrapper>
        <ButtonBlock>
          <Button onClick={() => props.goWrite()}>글쓰기</Button>
        </ButtonBlock>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled(Responsive)``;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Home;
