import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

// 스타일드 컴포넌트로 스타일링된 AuthFormBlock 정의
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;
const StyledInput = styled.input`
  flex: 1;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 수정: key 인자 제거
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  form: {
    id: string;
    password: string;
  };
}

const AuthForm: React.FC<textMapProps> = ({
  type,
  onChange,
  onSubmit,
  error,
  form,
}) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="id"
          name="id"
          placeholder="아이디"
          onChange={onChange}
          value={form.id}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="name"
            name="name"
            placeholder="이름"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="nick"
            name="nick"
            placeholder="닉네임"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder="E-mail"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="tel"
            name="tel"
            placeholder="전화번호"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="age"
            name="age"
            placeholder="나이"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="grade"
            name="grade"
            placeholder="성별"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="job"
            name="job"
            placeholder="직무"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="career"
            name="career"
            placeholder="경력"
            onChange={onChange}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="skill"
            name="skill"
            placeholder="관심스택"
            onChange={onChange}
          />
        )}
        {error && <ErrorMessage>에러 발생!</ErrorMessage>}
        <ButtonWithMarginTop>{text}</ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/signup">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
