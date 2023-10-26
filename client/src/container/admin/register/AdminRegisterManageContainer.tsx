import React from "react";
import AdminRegisterManage from "../../../components/admin/register/AdminRegisterManage";
import { getRegister } from "../../../lib/api/admin";
import { ListDetailTypeWithUser } from "../../../modules/register/type";

const AdminRegisterManageContainer = () => {
  const [data, setData] = React.useState<ListDetailTypeWithUser[]>([]);

  const getData = async () => {
    try {
      const response = await getRegister();
      console.log("response=========", response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <AdminRegisterManage data={data} />
    </div>
  );
};

export default AdminRegisterManageContainer;
