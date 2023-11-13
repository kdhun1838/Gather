import React from 'react';
import AdminHomeRegister from '../../../../components/admin/home/register/AdminHomeRegister';
import { getWeekRegister } from '../../../../lib/api/admin';
import { RegisterInfo } from '../../../../types/adminTypes';

interface OwnProps {
  registerInfo?: RegisterInfo;
}

const AdminHomeRegisterContainer: React.FC<OwnProps> = (props) => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const response = await getWeekRegister();
    setData(response.data);
    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? <>로딩중입니다.</> : <AdminHomeRegister data={data} />}
    </div>
  );
};

export default AdminHomeRegisterContainer;
