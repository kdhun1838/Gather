import React from "react";
import AdminCarousel from "../../components/admin/AdminCarousel";
import ImgUpload from "../../components/common/ImgUpload";
import { getCarousel } from "../../lib/api/admin";

const AdminCarouselContainer = () => {
  const [data, setData] = React.useState<any>(null);

  const getData = async () => {
    try {
      const response = await getCarousel();
      setData(response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  console.log("데이타", data);
  return (
    <div>
      {/* <ImgUpload /> */}
      <AdminCarousel data={data} />
    </div>
  );
};

export default AdminCarouselContainer;
