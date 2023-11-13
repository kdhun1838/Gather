import React from 'react';
import AdminHome from '../../../components/admin/home/AdminHome';
import { getTopInfo } from '../../../lib/api/admin';
import {
  CarouselInfo,
  CommunityInfo,
  RegisterInfo,
  UserInfo,
} from '../../../types/adminTypes';

const AdminHomeContainer = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const [registerInfo, setRegisterInfo] = React.useState<RegisterInfo>();
  const [communityInfo, setCommunityInfo] = React.useState<CommunityInfo>();
  const [carouselInfo, setCarouselInfo] = React.useState<CarouselInfo>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getTopInfoData = async () => {
    try {
      setLoading(true);
      const response = await getTopInfo();
      setUserInfo(response.data.userData);
      setRegisterInfo(response.data.registerData);
      setCommunityInfo(response.data.communityData);
      setCarouselInfo(response.data.carouselData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getTopInfoData();
  }, []);
  return (
    <div>
      <AdminHome
        userInfo={userInfo}
        registerInfo={registerInfo}
        communityInfo={communityInfo}
        carouselInfo={carouselInfo}
        loading={loading}
      />
    </div>
  );
};

export default AdminHomeContainer;
