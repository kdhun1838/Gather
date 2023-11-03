import React from "react";
import { MessageType } from "../../../../types/adminTypes";
import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser as fa } from "@fortawesome/free-regular-svg-icons";
import { changeDate } from "../../../community/Community";

interface OwnProps {
  message?: MessageType[];
  onChangeMsg: (text: string) => void;
  onPostMsg: () => void;
  onDeleteMsg: (messageNum: number) => void;
  text: string;
  grade: number;
}

const AdminHomeMessage = (props: OwnProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onPostMsg();
    }
  };

  return (
    <Container>
      <MessageBlock>
        {props.message &&
          props.message.map((item) => (
            <MessageDetailBlock key={item.messageNum}>
              <MessageUser>
                {item.User.grade === 3 ? (
                  <>
                    <div>
                      <FontAwesomeIcon icon={faCircleUser} size="lg" />
                      <div>{item.User.nick}</div>
                    </div>
                    <span>{changeDate(item.createdAt.toString())}</span>
                  </>
                ) : (
                  <>
                    <div>
                      <FontAwesomeIcon icon={fa} size="lg" />
                      <div>{item.User.nick}</div>
                    </div>
                    <span>{changeDate(item.createdAt.toString())}</span>
                  </>
                )}
              </MessageUser>
              <MessageContent>{item.content}</MessageContent>
              {props.grade === 3 ? (
                <MessageDelete
                  onClick={() => props.onDeleteMsg(item.messageNum)}
                >
                  X
                </MessageDelete>
              ) : (
                <></>
              )}
            </MessageDetailBlock>
          ))}
      </MessageBlock>
      <InputBlock>
        <InputBlock2>
          <Input
            placeholder="관리자들과 공유할 메모남겨주세요(50자 내외)"
            onChange={(e) => props.onChangeMsg(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SendOutlined
            style={{ cursor: "pointer" }}
            onClick={props.onPostMsg}
          />
        </InputBlock2>
      </InputBlock>
    </Container>
  );
};

const MessageDetailBlock = styled.div`
  margin: 0 0 0.5rem 0;
  background: #d4cc50;
  display: flex;
  height: 15%;
  border-radius: 5px;
  /* justify-content: space-between; */
`;
const MessageUser = styled.div`
  width: 35%;
  /* display: flex; */
  align-items: baseline;
  font-weight: bold;
  padding: 0.2rem 0 0 0.2rem;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;

    > div {
      margin-left: 0.1rem;
    }
  }
  > span {
    font-weight: normal !important;
    display: flex;
    /* justify-content: center; */
    margin: 0.5rem 0 0 0.5rem;
  }
`;
const MessageContent = styled.div`
  display: block;
  width: 60%;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
  overflow: hidden;
`;
const MessageDelete = styled.div`
  display: flex;
  width: 5%;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.3rem;
`;

const MessageBlock = styled.div`
  flex: 8.5;
`;

const InputBlock = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0 0.5rem 0.5rem;
`;
const InputBlock2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
  /* border: 1px solid black; */
`;

const Input = styled.input`
  border: none;
  background: none;
  font-size: 1rem;
  height: 1.2rem;
  border-bottom: 1px solid black;
  outline: none;
  /* max-width: 85%; */
  width: 92%;
`;

export default AdminHomeMessage;
