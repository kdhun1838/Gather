import React from "react";
import AdminUserManage from "../../../components/admin/user/AdminUserManage";
import { users } from "../../../lib/api/user";
import { UserDetail } from "../../../modules/user/type";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";

const AdminUserManageContainer = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const [data, setData] = React.useState<UserDetail[]>([]);

  const getData = async () => {
    try {
      const response = await users();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    console.log("데이타", data);
  }, [data]);

  return (
    <div>
      <AdminUserManage data={data} user={user} />
    </div>
  );
};

export default AdminUserManageContainer;
