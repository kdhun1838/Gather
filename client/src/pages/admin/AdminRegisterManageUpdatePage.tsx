import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import AdminRegisterManageUpdateContainer from "../../container/admin/register/AdminRegisterManageUpdateContainer";

const AdminRegisterManageUpdatePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminRegisterManageUpdateContainer />
          </AdminBody>
        </>
      ) : (
        <>
          <AdminHeaderContainer />
        </>
      )}
    </div>
  );
};

export default AdminRegisterManageUpdatePage;
