import React from "react";
import { getRegisterTable } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";
import AdminRegisterChartTable from "../../../../components/admin/register/chart/AdminRegisterChartTable";

const AdminRegisterChartTableContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRegisterTable();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ChartWrapper>
      {loading ? (
        <Loading>
          <LoadingImage src="/loading.gif" alt="로딩 중" />
        </Loading>
      ) : (
        <div
          style={{
            minWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AdminRegisterChartTable data={data} />
        </div>
      )}
    </ChartWrapper>
  );
};

export default AdminRegisterChartTableContainer;
