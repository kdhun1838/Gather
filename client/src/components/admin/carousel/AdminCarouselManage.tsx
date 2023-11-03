import React, { useState } from "react";
import { Col, Table, Space, Button, Modal, Input, ColorPicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { changeDate } from "../../community/Community";
import { styled } from "styled-components";
import ImgUpload from "../../common/ImgUpload";
import type { Color, ColorPickerProps } from "antd/lib/color-picker";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Checkbox } from "antd";
import { CarouselDiv, CarouselImg, CarouselText } from "../../common/Header";

export interface CarouselData {
  carouselNum: number;
  content: string;
  href: string;
  img: { url: string; filename: string };
  backgroundColor: string;
  count: number;
  onlyImg: number;
  textColor: string;
  createdAt: string;
  updatedAt: string;
}
const contentStyle: React.CSSProperties = {
  height: "5rem",
  color: "#fff",
  // lineHeight: "160px",
  textAlign: "center",
  // background: "orange",
};

const { TextArea } = Input;

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
  backgroundColor: Color | string;
  textColor: Color | string;
  formatHex: ColorPickerProps["format"];
  initColor: () => void;
  setBackgroundColor: (color: Color | string) => void;
  setTextColor: (color: Color | string) => void;
  setFormatHex: (format: ColorPickerProps["format"]) => void;
  onlyImg: boolean;
  changeOnlyImg: (e: CheckboxChangeEvent) => void;
  upsdateOnlyImg: (onlyImg: number) => void;
}

const AdminCarouselManage: React.FC<AdminCarouselProps> = (props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [carouselNum, setCarouselNum] = useState<number>(0);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
      width: "15%",
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
      title: "클릭 횟수",
      dataIndex: "count",
      key: "count",
      width: "7%",
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
      width: "8%",
    },
    {
      title: "미리보기",
      key: "see",
      render: (record) => (
        <div>
          {record.onlyImg === 0 ? (
            <div>
              <CarouselDiv
                style={{
                  ...contentStyle,
                  backgroundColor: `${record.backgroundColor}`,
                  // backgroundImage: `url(/carousel/${record.img.filename})`,
                  backgroundSize: "contain", // 이미지가 캐로셀에 맞게 크기 조정
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  // height: "100%", // 이미지의 높이를 캐로셀과 일치시킴
                  width: "100%", // 이미지의 너비를 캐로셀과 일치시킴
                }}
              >
                <CarouselText
                  style={{ color: `${record.textColor}` }}
                  dangerouslySetInnerHTML={{
                    __html: record.content.replace(/\n/g, "<br>"),
                  }}
                >
                  {/* {record.content} */}
                </CarouselText>
                <CarouselImg
                  style={{
                    backgroundImage: `url(/${record.img.filename})`,
                  }}
                ></CarouselImg>
              </CarouselDiv>
            </div>
          ) : (
            <div
              style={{
                ...contentStyle,
                backgroundColor: `${record.backgroundColor}`,
                backgroundImage: `url(/${record.img.filename})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "5rem",
              }}
            ></div>
          )}
        </div>
      ),
      width: "40%",
    },
  ];

  const showModal = () => {
    setContent("");
    setLink("");
    props.initFile();
    props.initColor();
    setModalVisible(true);
  };

  const showModalUpdate = (record: any) => {
    setContent(record.content);
    setLink(record.href);
    setCarouselNum(record.carouselNum);
    setIsUpdate(true);
    props.upsdateOnlyImg(record.onlyImg);
    props.setBackgroundColor(record.backgroundColor);
    props.setTextColor(record.textColor);
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
        <TextArea
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
        <Checkbox onChange={props.changeOnlyImg} checked={props.onlyImg}>
          이미지만 보이게하기
        </Checkbox>
        ;
        <br />
        <Space>
          <span>배경색: </span>
          <Col>
            <ColorPicker
              format={props.formatHex}
              value={props.backgroundColor}
              onChange={(color) => props.setBackgroundColor(color)}
              onFormatChange={props.setFormatHex}
            />
          </Col>
        </Space>
        <br />
        <Space>
          <span>글자색: </span>
          <Col>
            <ColorPicker
              format={props.formatHex}
              value={props.textColor}
              onChange={(color) => props.setTextColor(color)}
              onFormatChange={props.setFormatHex}
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

export default AdminCarouselManage;
