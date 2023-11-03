import React from "react";
import { MessageType } from "../../../../types/adminTypes";
import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";

interface OwnProps {
  message?: MessageType[];
  onChangeMsg: (text: string) => void;
  onPostMsg: () => void;
  text: string;
}

const AdminHomeMessage = (props: OwnProps) => {
  return (
    <Container>
      <MessageBlock>
        {props.message &&
          props.message.map((item) => <div>{item.content}</div>)}
      </MessageBlock>
      <InputBlock>
        <InputBlock2>
          <Input
            placeholder="관리자들과 공유할 메모남겨주세요(100자 내외)"
            onChange={(e) => props.onChangeMsg(e.target.value)}
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
