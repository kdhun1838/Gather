import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  width: 140px;
  height: 50px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  font-weight: 1000;
  text-decoration: none;
  vertical-align: middle;
  word-spacing: -0.9px;
  border-radius: 6px;
  white-space: nowrap;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
  color: white;
  background-color: orange;
  cursor: pointer;
  position: relative;
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: white;
    transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  }

  &:before {
    left: 0;
    bottom: 0;
  }

  &:after {
    right: 0;
    top: 0;
  }

  &:hover {
    border-left: 2px solid white;
    border-right: 2px solid white;

    &:before,
    &:after {
      width: 100%;
    }
  }
`;

interface OwnType {
  children: string;
  onClick: () => void;
}

const Button: React.FC<OwnType> = ({ children, onClick }) => {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>;
};

export default Button;
