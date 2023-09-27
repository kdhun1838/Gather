import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const ContainerBox = styled.div`
  width: 60%;
  margin: 0 auto;

  div + div {
    margin-top: 1rem;
  }
`;

const TitleBox = styled.div`
  margin-top: 3rem;
  padding: 10px;
  border-bottom: 2px solid gray;
  font-weight: bold;
  font-size: 25px;
  letter-spacing: -3px;
`;

const SelectBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  select {
    width: 100%;
    padding: 10px;
  }
`;

const EditorBox = styled.div`
  .ql-container {
    height: auto;
    min-height: 400px;
  }

  div + div {
    margin-top: 0rem;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 10px;
  }
`;

const ButtonBox = styled.div`
  float: right;

  button + button {
    margin-left: 1rem;
  }
`;

const Button = styled.button`
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

const CommunityWrite = () => {
  const options: string[] = ["선택사항", "후기", "질문", "잡담"];

  // 나중 db에서 가져와 유저가 참여한 프로젝트를 배열로 나열예정
  const enterProjects: string[] = ["야구", "사이트 개발"];

  const [selectOption, setSelectOption] = useState<string>(options[0]);

  const onChange = useCallback((e: any) => {
    setSelectOption(e.target.value);
  }, []);

  return (
    <ContainerBox>
      <TitleBox>글쓰기 기본정보를 입력해주세요 .</TitleBox>

      <SelectBox>
        <select onChange={onChange}>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        {selectOption === "후기" && (
          <>
            <select>
              {enterProjects.map((enterProject, index) => {
                return <option key={index}>{enterProject}</option>;
              })}
            </select>
          </>
        )}
      </SelectBox>

      <TitleBox>글쓰기 내용를 입력해주세요 .</TitleBox>

      <EditorBox>
        <p>제목</p>
        <input placeholder="글제목을 입력해주세요." />
        <ReactQuill />
      </EditorBox>

      <ButtonBox>
        <Button>글등록버튼</Button>
        <Button>취소버튼</Button>
      </ButtonBox>
    </ContainerBox>
  );
};

export default CommunityWrite;
