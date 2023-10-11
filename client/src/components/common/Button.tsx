import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  cyan?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  // 다른 필요한 속성들 추가 가능
}

const buttonStyle = css<ButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  height: 100%;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button<ButtonProps>`
  ${(props) => buttonStyle}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${(props) => buttonStyle}
`;

const Button: React.FC<ButtonProps> = ({ to, ...rest }) => {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <StyledButton {...rest} onClick={onClick} />;
};

export default Button;
