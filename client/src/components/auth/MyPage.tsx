import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Header from "../common/Header";
import DaumPostcode from "react-daum-postcode";

const MyPagediv = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 0 auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const Nickname = styled.div`
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.78px;
  margin: 30px 0px 40px;
`;

const Inputnick = styled.div`
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.28px;
`;
const StyledInput = styled.input`
  display: flex;
  width: 100%;
  font-size: 16px;
  min-height: 50px;
  padding: 15px 13px;
  align-items: flex-start;
  border-radius: 5px;
  border: 1px solid rbg(225, 226, 227);
`;

type MyPageProps = {
  user: any;
  onSubmit: (formdata: any) => Promise<void>;
  onDel: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyPage: React.FC<MyPageProps> = ({
  user,
  onSubmit,
  onDel,
  handleInputChange,
}) => {
  const handleProfileSave = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(user);
  };

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleOpenAddressModal = () => {
    setAddressModalOpen(true);
  };
  const handleCloseAddressModal = () => {
    setAddressModalOpen(false);
  };
  const handleAddressComplete = (data: any) => {
    // data에 대한 타입을 명시적으로 any 또는 실제 타입으로 지정
    setAddress(data.address); // 선택한 주소를 저장
    handleCloseAddressModal(); // 모달 닫기
    handleInputChange({
      target: {
        name: "addr",
        value: data.address,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress(value);
    handleInputChange({
      target: {
        name: name,
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <MyPagediv>
      <Nickname>환영합니다</Nickname>
      <form>
        <Inputnick>이름</Inputnick>
        <StyledInput
          name="name"
          value={user.name}
          onChange={(e) => handleInputChange(e)}
        />
        <Inputnick>닉네임</Inputnick>
        <StyledInput
          name="nick"
          value={user.nick}
          onChange={(e) => handleInputChange(e)}
        />
        <Inputnick>이메일</Inputnick>
        <StyledInput
          name="email"
          value={user.email}
          onChange={(e) => handleInputChange(e)}
        />
        <Inputnick>전화번호</Inputnick>
        <StyledInput name="tel" value={user.tel} onChange={handleInputChange} />
        <Inputnick>주소</Inputnick>
        <StyledInput
          name="addr"
          value={user.addr}
          onChange={(e) => handleAddressChange(e)}
        />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenAddressModal();
            }}
          >
            주소찾기
          </button>
        </div>
        <Inputnick>상세주소</Inputnick>
        <StyledInput
          name="addr_detail"
          onChange={(e) => handleInputChange(e)}
        />
        <Inputnick>성별</Inputnick>
        <div>
          <input
            type="radio"
            name="gender"
            value={"남"}
            checked={user.gender === "남"}
            onChange={(e) => handleInputChange(e)}
          />
          남
          <input
            type="radio"
            name="gender"
            value={"여"}
            checked={user.gender === "여"}
            onChange={(e) => handleInputChange(e)}
          />
          여
        </div>
        {isAddressModalOpen && (
          <div className="DaumPostcode">
            <DaumPostcode
              onComplete={handleAddressComplete}
              autoClose
              style={{
                width: "400px",
                height: "300px",
                top: "40px",
                position: "absolute",
                zIndex: 100,
                border: "1px solid #ccc",
              }}
            />
            <button onClick={handleCloseAddressModal}>닫기</button>
          </div>
        )}
        <Button onClick={handleProfileSave}>프로필 저장</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onDel();
          }}
        >
          회원탈퇴
        </Button>
      </form>
    </MyPagediv>
  );
};

export default MyPage;
