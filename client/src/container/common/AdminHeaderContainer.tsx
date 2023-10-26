import React from "react";
import AdminHeader from "../../components/common/admin/AdminHeader";
import { RootState } from "../../modules";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/user/action";
import { useNavigate } from "react-router-dom";

const AdminHeaderContainer: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const grade = user.user.grade;
    console.log("grade", grade);

    if (grade === 1) {
      alert("관리자만 접근이 가능합니다");
      navigate("/");
    }
  }, [navigate, user.user.grade]);

  const onLogout = () => {
    navigate("/");
    dispatch(logout(user));
  };
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeader user={user.user} onLogout={onLogout} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminHeaderContainer;
