import React from "react";
import AdminCarouselManageContainer from "../../container/admin/carousel/AdminCarouselManageContainer";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";

const AdminCarouselManagePage = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminCarouselManageContainer />
      </AdminBody>
    </div>
  );
};

export default AdminCarouselManagePage;
