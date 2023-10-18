import React, { useState } from "react";
import { Table, Space, Button, Modal, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { changeDate } from "../community/Community";
import { styled } from "styled-components";
import ImgUpload from "../common/ImgUpload";

// 데이터 구조를 기존의 DataType 대신에 받아온 데이터 구조로 변경
interface CarouselData {
  carouselNum: number;
  content: string;
  createdAt: string;
  href: string;
  img: { url: string; filename: string }[];
  updatedAt: string;
}

interface AdminCarouselProps {
  data: CarouselData[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (content: string, link: string) => void;
  file: File | null;
  initFile: () => void;
  getData: () => void;
}

const columns: ColumnsType<CarouselData> = [
  {
    title: "번호",
    dataIndex: "carouselNum",
    key: "carouselNum",
    width: "5%",
  },
  {
    title: "내용",
    dataIndex: "content",
    key: "content",
    width: "50%",
  },
  {
    title: "작성일",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "10%",
    render: (date) => changeDate(date),
  },
  {
    title: "링크",
    dataIndex: "href",
    key: "href",
    render: (text) => <a href={text}>{text}</a>,
    width: "10%",
  },
  {
    title: "액션",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>수정</a>
        <a>삭제</a>
      </Space>
    ),
    width: "10%",
  },
  {
    title: "이미지",
    dataIndex: "img",
    key: "img",
    render: (img) => (
      <>
        <img src={`/carousel/${img.filename}`} />
        {img.filename}
      </>
    ),
  },
];

const AdminCarousel: React.FC<AdminCarouselProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const showModal = () => {
    setContent("");
    setLink("");
    props.initFile();
    setModalVisible(true);
  };

  const handleOk = () => {
    props.handleUpload(content, link);
    setModalVisible(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setContent("");
    setLink("");
  };

  const onChangeContent = React.useCallback((input: string) => {
    setContent(input);
  }, []);
  const onChangeLink = React.useCallback((input: string) => {
    setLink(input);
  }, []);

  return (
    <>
      <ButtonArea>
        <Button type="primary" danger size="large" onClick={showModal}>
          추가하기
        </Button>
      </ButtonArea>
      <Table columns={columns} dataSource={props.data} />

      <Modal
        title="이미지 추가"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="내용 입력"
          onChange={(e) => onChangeContent(e.target.value)}
          value={content}
        />
        <Input
          placeholder="링크 입력"
          onChange={(e) => onChangeLink(e.target.value)}
          value={link}
        />
        <ImgUpload
          handleFileChange={props.handleFileChange}
          file={props.file}
        />
      </Modal>
    </>
  );
};

const ButtonArea = styled.div`
  display: flex;
  justify-content: end;
  margin: 0rem 1rem 1rem 0;
`;

export default AdminCarousel;
