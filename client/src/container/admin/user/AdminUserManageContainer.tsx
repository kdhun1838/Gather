import React from "react";
import AdminUserManage from "../../../components/admin/user/AdminUserManage";
import { users } from "../../../lib/api/user";
import { UserDetail } from "../../../modules/user/type";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import Swal from "sweetalert2";
import { deleteUser, updateUserGrade } from "../../../lib/api/admin";

const AdminUserManageContainer = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const [data, setData] = React.useState<UserDetail[]>([]);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      const response = await users();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userNum: number) => {
    Swal.fire({
      title: "회원 탈퇴",
      text: "이 회원을 탈퇴시키겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "탈퇴",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        setIsDelete(!isDelete);
        try {
          deleteUser(userNum);
        } catch (error) {
          console.error("에러:", error);
        }
      },
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "삭제 성공",
        });
      }
    });
  };
  const handleGradeUpdate = async (
    userNum: number,
    grade: number,
    id: string
  ) => {
    let updateMsg = "";
    if (grade === 1) {
      updateMsg = "등급 Up";
    } else {
      updateMsg = "등급 Down";
    }

    Swal.fire({
      title: `${updateMsg}`,
      text: `${id} 회원을 ${updateMsg} 하시겠습니까?`,
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "네",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        setIsDelete(!isDelete);
        try {
          updateUserGrade(userNum, grade);
        } catch (error) {
          console.error("에러", error);
        }
      },
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: `${updateMsg} 성공`,
        });
      }
    });
  };

  React.useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <div>
      <AdminUserManage
        data={data}
        user={user}
        handleDelete={handleDelete}
        handleGradeUpdate={handleGradeUpdate}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
      />
    </div>
  );
};

export default AdminUserManageContainer;
