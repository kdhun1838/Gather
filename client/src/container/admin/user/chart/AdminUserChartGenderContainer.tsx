import React from 'react';
import AdminUserChartGender from '../../../../components/admin/user/chart/AdminUserChartGender';
import { getUserChartgender } from '../../../../lib/api/admin';
import { Loading, LoadingImage } from '../../../auth/LoginForm';
import { ChartWrapper } from '../../home/visitor/AdminHomeVisitorContainer';

const AdminUserChartGenderContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserChartgender();
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
        <AdminUserChartGender data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminUserChartGenderContainer;
