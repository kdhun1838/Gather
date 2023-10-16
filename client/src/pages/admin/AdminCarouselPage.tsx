import React from "react";
import AdminCarouselContainer from "../../container/admin/AdminCarouselContainer";
import AdminHeaderContainer from "../../container/admin/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";

const AdminCarouselPage = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminCarouselContainer />
      </AdminBody>
    </div>
  );
};

export default AdminCarouselPage;
