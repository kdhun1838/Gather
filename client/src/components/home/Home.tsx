import React from "react";
import styled from "styled-components";
import Responsive from "../../styled/Responsive";

type OwnProps = {
  goWrite: () => void;
  // userData: any;
  // boardData: any;
  // registerData: any;
};

const Home: React.FC<OwnProps> = (props) => {
  return (
    <div>
      <Wrapper>ddd</Wrapper>
    </div>
  );
};

const Wrapper = styled(Responsive)``;

export default Home;
