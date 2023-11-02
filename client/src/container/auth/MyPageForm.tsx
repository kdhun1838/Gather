import React, { useState } from "react";
import MyPage from "../../components/auth/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { userupdate, check, userupdateAdmin } from "../../modules/user/action";
import Swal from "sweetalert2";
import { createGlobalStyle } from "styled-components";
import { getUserDetail } from "../../lib/api/admin";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  isAdmin?: boolean;
  uNum?: number;
}

const MyPageForm: React.FC<OwnProps> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.isAdmin && props.uNum) {
      const userNum: number = Number(props.uNum);
      console.log(userNum);
      getUserDetail(userNum).then((response) => {
        setFormData(response.data);
      });
    }
  }, [props.isAdmin, props.uNum]);

  console.log("user=====>", formData);
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
          navigate("/admin/home");
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

  return (
    <MyPage
      user={formData}
      onSubmit={onSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

export default MyPageForm;
