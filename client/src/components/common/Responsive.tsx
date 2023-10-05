import { styled } from "styled-components";

const ResponsiveBlock = styled.div<{ children: React.ReactNode }>`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 800px;
  }
  @media (max-width: 768px) {
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
