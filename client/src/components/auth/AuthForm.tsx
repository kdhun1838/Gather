import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { AuthState, LoginState } from '../../modules/auth/type';
import DaumPostcode from 'react-daum-postcode';

// 스타일드 컴포넌트로 스타일링된 AuthFormBlock 정의
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
  .span {
    margin-bottom: 0.5rem;
  }
  .DaumPostcode {
    width: 200px;
    height: 200px;
  }
`;
const StyledInput = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: 0.3rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const textMap: Record<string, string> = {
  login: '로그인',
  register: '회원가입',
};

interface textMapProps {
  type: any;
  onChange: (data: { key: string; value: string | number }) => void; // 수정: key 인자 제거
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  form: AuthState | LoginState;
}

const AuthForm: React.FC<textMapProps> = ({
  type,
  onChange,
  onSubmit,
  error,
  form,
}) => {
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [address, setAddress] = useState('');

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
    onChange({ key: 'addr', value: data.address });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(value); // 주소 상태 업데이트
    onChange({ key: name, value });
  };

  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <div className="span">
          <span>아이디</span>
          <StyledInput
            autoComplete="id"
            name="id"
            placeholder="아이디"
            onChange={(e) => onChange({ key: 'id', value: e.target.value })}
            // value={type === 'register' ? form.register.id : form.login.id}
          />
        </div>
        <div className="span">
          <span>비밀번호</span>
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={(e) =>
              onChange({ key: 'password', value: e.target.value })
            }
            // value={
            //   type === 'register' ? form.register.password : form.login.password
            // }
          />
        </div>
        {type === 'register' && (
          <div className="span">
            <span>비밀번호 확인</span>
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={(e) =>
                onChange({ key: 'passwordConfirm', value: e.target.value })
              }
              // value={form.register.passwordConfirm}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>이름</span>
            <StyledInput
              autoComplete="name"
              name="name"
              placeholder="이름"
              onChange={(e) => onChange({ key: 'name', value: e.target.value })}
              // value={form.register.name}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>닉네임</span>
            <StyledInput
              autoComplete="nick"
              name="nick"
              placeholder="닉네임"
              onChange={(e) => onChange({ key: 'nick', value: e.target.value })}
              // value={form.register.nick}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>이메일</span>
            <StyledInput
              autoComplete="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) =>
                onChange({ key: 'email', value: e.target.value })
              }
              // value={form.register.email}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>전화번호</span>
            <StyledInput
              autoComplete="tel"
              name="tel"
              placeholder="전화번호"
              onChange={(e) => onChange({ key: 'tel', value: e.target.value })}
              // value={form.register.tel}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>생년월일</span>
            <StyledInput
              autoComplete="age"
              name="age"
              placeholder="생년월일"
              onChange={(e) => onChange({ key: 'age', value: e.target.value })}
              // value={form.register.age}
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>주소</span>
            <StyledInput
              autoComplete="addr"
              name="addr"
              placeholder="주소"
              onChange={handleAddressChange}
              value={address}
            />
            <button onClick={handleOpenAddressModal}>주소찾기</button>
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <span>상세주소</span>
            <StyledInput
              autoComplete="addr_detail"
              name="addr_detail"
              placeholder="상세주소"
              onChange={(e) =>
                onChange({ key: 'addr_detail', value: e.target.value })
              }
            />
          </div>
        )}
        {type === 'register' && (
          <div className="span">
            <div>성별</div>
            <input
              type="radio"
              name="gender"
              onChange={(e) =>
                onChange({ key: 'gender', value: e.target.value })
              }
              value={'남'}
            />
            남
            <input
              type="radio"
              name="gender"
              onChange={(e) =>
                onChange({ key: 'gender', value: e.target.value })
              }
              value={'여'}
            />
            여
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isAddressModalOpen && (
          <div className="DaumPostcode">
            <DaumPostcode
              onComplete={handleAddressComplete}
              autoClose
              style={{
                width: '400px',
                height: '300px',
                top: '40px',
                position: 'absolute',
                zIndex: 100,
                border: '1px solid #ccc',
              }}
            />
            <button onClick={handleCloseAddressModal}>닫기</button>
          </div>
        )}
        <ButtonWithMarginTop>{text}</ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <div>
            <Link to="/signup">회원가입</Link>
          </div>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
