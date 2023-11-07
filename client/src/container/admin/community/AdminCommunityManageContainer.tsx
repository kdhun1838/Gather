import React from "react";
import AdminCommunityManage from "../../../components/admin/community/AdminCommunityManage";
import { CommunityTypeWithUser } from "../../../modules/community/type";
import { getCommunityWithUser } from "../../../lib/api/admin";
import { useNavigate } from "react-router-dom";

const AdminCommunityManageContainer = () => {
  const [data, setData] = React.useState<CommunityTypeWithUser[]>([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getCommunityWithUser();
      console.log("response==========", response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const goDetail = (comNum: number) => {
    navigate(`/admin/community/manage/detail/${comNum}`);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AdminCommunityManage data={data} getData={getData} goDetail={goDetail} />
    </div>
  );
};

export default AdminCommunityManageContainer;
