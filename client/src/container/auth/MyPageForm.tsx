import React, { useState, useEffect } from "react";
import MyPage from "../../components/auth/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import {
  userupdate,
  check,
  userdel,
  logout,
  userupdateAdmin,
} from "../../modules/user/action";
import Swal from "sweetalert2";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "../../lib/api/admin";

interface OwnProps {
  isAdmin?: boolean;
  uNum?: number;
  setIsModalOpen?: (tf: boolean) => void;
  handleCancel?: () => void;
}

const MyPageForm: React.FC<OwnProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const [formData, setFormData] = useState(user);

  React.useEffect(() => {
    if (props.isAdmin && props.uNum) {
      const userNum: number = Number(props.uNum);
      console.log(userNum);
      getUserDetail(userNum).then((response) => {
        console.log("dddd", response.data);
        setFormData(response.data);
      });
    }
  }, [props.isAdmin, props.uNum]);

  console.log("user=====>", formData);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (formdata: any) => {
    console.log("formdata=========>");
    if (props.isAdmin) {
      Swal.fire({
        title: "회원정보",
        text: `회원정보를 수정하시겠습니까?`,
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "수정",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          dispatch(userupdateAdmin(formdata));
        },
      }).then((res) => {
        if (res.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: "수정이 완료되었습니다.",
          });
          // navigate("/admin/home");
          // props.setIsModalOpen && props.setIsModalOpen(false);
          props.handleCancel && props.handleCancel();
        }
      });
    } else {
      Swal.fire({
        title: "회원정보",
        text: `회원정보를 수정하시겠습니까?`,
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "수정",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          dispatch(userupdate(formdata));
        },
      }).then((res) => {
        if (res.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: "수정이 완료되었습니다.",
          });
          navigate("/");
        }
      });
    }
  };

  const onDel = async () => {
    console.log("formdata=========>");
    Swal.fire({
      title: "회원탈퇴",
      text: `정말 회원탈퇴를 하시겠습니까?`,
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        dispatch(userdel(user));
        setTimeout(() => {
          dispatch(logout(user));
        }, 200);
      },
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "회원탈퇴가 완료되었습니다.",
        });
        navigate("/");
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
