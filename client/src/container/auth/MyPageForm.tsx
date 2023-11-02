import React, { useState, useEffect } from 'react';
import MyPage from '../../components/auth/MyPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { userupdate, check, userdel } from '../../modules/user/action';
import Swal from 'sweetalert2';
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));

  const [formData, setFormData] = useState(user);
  console.log('user=====>', formData);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (formdata: any) => {
    console.log('formdata=========>');
    Swal.fire({
      title: '회원정보',
      text: `회원정보를 수정하시겠습니까?`,
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '수정',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        dispatch(userupdate(formdata));
      },
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: '수정이 완료되었습니다.',
        });
      }
    });
  };

  const onDel = async () => {
    console.log('formdata=========>');
    Swal.fire({
      title: '회원탈퇴',
      text: `정말 회원탈퇴를 하시겠습니까?`,
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '확인',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        dispatch(userdel(user));
      },
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: '회원탈퇴가 완료되었습니다.',
        });
        navigate('/');
      }
    });
  };

  return (
    <MyPage
      user={formData}
      onSubmit={onSubmit}
      onDel={onDel}
      handleInputChange={handleInputChange}
    />
  );
};

export default MyPageForm;
