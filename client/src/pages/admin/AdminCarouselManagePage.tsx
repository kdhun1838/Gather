import React from "react";
import AdminCarouselManageContainer from "../../container/admin/carousel/AdminCarouselManageContainer";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminCarouselManagePage = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));

  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminCarouselManageContainer />
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

export default AdminCarouselManagePage;
