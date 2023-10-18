import React, { useState } from "react";
import { Table, Space, Button, Modal, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { changeDate } from "../community/Community";
import { styled } from "styled-components";

// 데이터 구조를 기존의 DataType 대신에 받아온 데이터 구조로 변경
interface CarouselData {
  carouselNum: number;
  content: string;
  createdAt: string;
  href: string;
  img: { url: string; filename: string }[];
  updatedAt: string;
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
    width: "20%",
  },
];

const AdminCarousel: React.FC<{ data: CarouselData[] }> = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    // 모달에서 확인 버튼을 눌렀을 때 수행할 작업 추가
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const uploadProps = {
    // 이미지 업로드 설정 추가
    name: "file",
    action: "https://your-upload-endpoint.com", // 이미지 업로드를 처리할 서버 엔드포인트
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <ButtonArea>
        <Button type="primary" danger size="large" onClick={showModal}>
          추가하기
        </Button>
      </ButtonArea>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="이미지 추가"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="내용 입력" />
        <Input placeholder="링크 입력" />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>이미지 업로드</Button>
        </Upload>
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
