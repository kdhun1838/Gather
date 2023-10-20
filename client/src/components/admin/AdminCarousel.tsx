import React, { useState } from "react";
import { Col, Table, Space, Button, Modal, Input, ColorPicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { changeDate } from "../community/Community";
import { styled } from "styled-components";
import ImgUpload from "../common/ImgUpload";
import type { Color, ColorPickerProps } from "antd/lib/color-picker";

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
  handleUpload: (
    content: string,
    link: string,
    isUpdate: boolean,
    carouselNum: number
  ) => void;
  file: File | null;
  initFile: () => void;
  getData: () => void;
  handleDelete: (carouselNum: number) => void;
  setFile: (file: File | null) => void;
}

const AdminCarousel: React.FC<AdminCarouselProps> = (props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [carouselNum, setCarouselNum] = useState<number>(0);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<Color | string>(
    "#000"
  );
  const [textColor, setTextColor] = useState<Color | string>("#FFF");
  const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");

  const backgroundString = React.useMemo(
    () =>
      typeof backgroundColor === "string"
        ? backgroundColor
        : backgroundColor.toHexString(),
    [backgroundColor]
  );
  const textString = React.useMemo(
    () => (typeof textColor === "string" ? textColor : textColor.toHexString()),
    [textColor]
  );
  // React.useEffect(() => {
  //   console.log("색깔", textString, "배경", backgroundString);
  // }, [textString, backgroundString]);
  const initColor = () => {
    setTextColor("#FFF");
    setBackgroundColor("#000");
  };

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
          <ActionButton onClick={() => showModalUpdate(record)}>
            수정
          </ActionButton>
          <ActionButton onClick={() => props.handleDelete(record.carouselNum)}>
            삭제
          </ActionButton>
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
          <ImgArea src={`/carousel/${img.filename}`} />
        </>
      ),
      width: "10%",
    },
  ];

  const showModal = () => {
    setContent("");
    setLink("");
    props.initFile();
    initColor();
    setModalVisible(true);
  };

  const showModalUpdate = (record: any) => {
    setContent(record.content);
    setLink(record.href);
    setCarouselNum(record.carouselNum);
    setIsUpdate(true);
    console.log("record============", content, link, carouselNum);
    setModalVisible(true);
  };

  const handleOk = () => {
    if (isUpdate) {
      props.handleUpload(content, link, isUpdate, carouselNum);
      setIsUpdate(false);
    } else {
      props.handleUpload(content, link, isUpdate, carouselNum);
    }
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
        <Space>
          <span>배경색: </span>
          <Col>
            <ColorPicker
              format={formatHex}
              value={backgroundColor}
              onChange={(color) => setBackgroundColor(color)}
              onFormatChange={setFormatHex}
            />
          </Col>
        </Space>
        <br />
        <Space>
          <span>글자색: </span>
          <Col>
            <ColorPicker
              format={formatHex}
              value={textColor}
              onChange={(color) => setTextColor(color)}
              onFormatChange={setFormatHex}
            />
          </Col>
        </Space>
      </Modal>
    </>
  );
};

const ButtonArea = styled.div`
  display: flex;
  justify-content: end;
  margin: 0rem 1rem 1rem 0;
`;

export const ImgArea = styled.img`
  height: 3rem;
`;

const ActionButton = styled.div`
  color: #1677ff;
  cursor: pointer;

  &:hover {
    color: darkblue;
    font-weight: bold;
  }
`;

export default AdminCarousel;
