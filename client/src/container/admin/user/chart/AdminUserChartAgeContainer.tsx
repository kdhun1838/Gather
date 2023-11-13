import React from 'react';
import AdminUserChartAge from '../../../../components/admin/user/chart/AdminUserChartAge';
import { getUserChartage } from '../../../../lib/api/admin';
import { Loading, LoadingImage } from '../../../auth/LoginForm';
import { ChartWrapper } from '../../home/visitor/AdminHomeVisitorContainer';

const AdminUserChartAgeContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserChartage();
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
        <AdminUserChartAge data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminUserChartAgeContainer;
