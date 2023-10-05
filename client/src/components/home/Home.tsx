import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import { Carousel } from "antd";

type OwnProps = {
  goWrite: () => void;
  userData: any;
  boardData: any;
  registerData: any;
};

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home: React.FC<OwnProps> = (props) => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Wrapper>ddd</Wrapper>
    </div>
  );
};

const Wrapper = styled(Responsive)``;

export default Home;
