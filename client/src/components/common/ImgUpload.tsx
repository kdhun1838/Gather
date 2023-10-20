import React from "react";
import styled from "styled-components";
import { ImgArea } from "../admin/AdminCarousel";

const CustomFileUpload = styled.label`
  margin: 0.5rem 0 0 0;
  background-color: skyblue;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  transition: 0.3s ease;

  &:hover {
    background-color: #0073e6;
  }
`;

const Input = styled.input`
  display: none;
`;
const SelectedFileName = styled.div`
  font-size: 12px;
  margin-top: 0.5rem;
`;

interface ImgUploadProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
}

const ImgUpload: React.FC<ImgUploadProps> = (props) => {
  console.log("propsssssssssss", props);
  return (
    <div>
      <CustomFileUpload htmlFor="image-upload">이미지 선택</CustomFileUpload>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={props.handleFileChange}
      />
      {props.file ? (
        <>
          <SelectedFileName>선택된 파일: {props.file.name}</SelectedFileName>
        </>
      ) : (
        <div>선택된 파일이 없습니다. 파일을 선택해주세요</div>
      )}
    </div>
  );
};

export default ImgUpload;
