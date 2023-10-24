import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityWritePage from "./pages/community/CommunityWritePage";
import CommunityPostPage from "./pages/community/CommunityPostPage";
import MyPagePage from "./pages/auth/MyPagePage";
import ViewPage from "./pages/Register/ViewPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminCarouselManagePage from "./pages/admin/AdminCarouselManagePage";
import AdminCarouselChartPage from "./pages/admin/AdminCarouselChartPage";
import AdminUserChartPage from "./pages/admin/AdminUserChartPage";
import AdminUserManagePage from "./pages/admin/AdminUserManagePage";
import AdminRegisterManagePage from "./pages/admin/AdminRegisterManagePage";
import AdminRegisterChartPage from "./pages/admin/AdminRegisterChartPage";
import AdminCommunityManagePage from "./pages/admin/AdminCommunityManagePage";
import AdminCommunityChartPage from "./pages/admin/AdminCommunityChartPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPagePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:postId" element={<ViewPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        <Route path="/community/:postId" element={<CommunityPostPage />} />
        {/* 관리자페이지 */}
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/user/manage" element={<AdminUserManagePage />} />
        <Route path="/admin/user/chart" element={<AdminUserChartPage />} />
        <Route
          path="/admin/register/manage"
          element={<AdminRegisterManagePage />}
        />
        <Route
          path="/admin/register/chart"
          element={<AdminRegisterChartPage />}
        />
        <Route
          path="/admin/community/manage"
          element={<AdminCommunityManagePage />}
        />
        <Route
          path="/admin/community/chart"
          element={<AdminCommunityChartPage />}
        />
        <Route
          path="/admin/carousel/manage"
          element={<AdminCarouselManagePage />}
        />
        <Route
          path="/admin/carousel/chart"
          element={<AdminCarouselChartPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
