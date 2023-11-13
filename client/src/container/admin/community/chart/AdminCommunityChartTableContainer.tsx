import React from "react";
import { getCommunityTable } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";
import AdminCommunityChartTable from "../../../../components/admin/community/chart/AdminCommunityChartTable";

const AdminCommunityChartTableContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCommunityTable();
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
          <AdminCommunityChartTable data={data} />
        </div>
      )}
    </ChartWrapper>
  );
};

export default AdminCommunityChartTableContainer;
