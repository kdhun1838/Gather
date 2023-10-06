import { styled } from "styled-components";

const ResponsiveBlock = styled.div<{ children: React.ReactNode }>`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1920px;
  margin: 0 auto;

  @media (max-width: 1920px) {
    width: 70%;
  }
  @media (max-width: 1024px) {
    width: 850px;
  }
  @media (max-width: 850px) {
    width: 100%;
  }
`;
interface ResponsiveProps {
  children: React.ReactNode;
}

const Responsive: React.FC<ResponsiveProps> = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
