import styled from "styled-components";

export const ContainerBox = styled.div`
  width: 70%;
  margin: 0 auto;

  div {
    margin-top: 1rem;
  }
`;

export const NameTagBox = styled.p`
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;

export const TitleBox = styled.div`
  margin-top: 3rem;
  padding: 10px;
  border-bottom: 2px solid #f2f2f2;
  font-weight: bold;
  font-size: 25px;
  letter-spacing: -3px;
`;

export const SelectBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-items: center;

  select {
    width: 100%;
    padding: 10px;
  }
`;

export const EditorBox = styled.div`
  .ql-container {
    height: auto;
    min-height: 400px;
  }

  div {
    margin-top: 0rem;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 10px;
  }
`;

export const ButtonBox = styled.div`
  float: right;

  button + button {
    margin-left: 1rem;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`;
