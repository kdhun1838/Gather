import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCarouselChartContainer from "../../container/admin/carousel/AdminCarouselChartContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import AdminHomeVisitorContainer from "../../container/admin/home/visitor/AdminHomeVisitorContainer";

const AdminCarouselChartPage = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminCarouselChartContainer />
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

export default AdminCarouselChartPage;
