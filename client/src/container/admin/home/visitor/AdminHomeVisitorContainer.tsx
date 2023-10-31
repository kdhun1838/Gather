import React from "react";
import AdminHomeVisitor from "../../../../components/admin/home/visitor/AdminHomeVisitor";
import { getVisitor } from "../../../../lib/api/admin";

const AdminHomeVisitorContainer = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();

  const getInfo = async () => {
    try {
      setLoading(true);
      const response = await getVisitor();
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  console.log("data", data);

  return (
    <div>
      <AdminHomeVisitor data={data} loading={loading} />
    </div>
  );
};

export default AdminHomeVisitorContainer;
