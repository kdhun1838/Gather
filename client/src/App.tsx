import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityWritePage from "./pages/community/CommunityWritePage";
import CommunityPostPage from "./pages/community/CommunityPostPage";
import ViewPage from "./pages/Register/ViewPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminCarouselPage from "./pages/admin/AdminCarouselPage";
import CommunityEditPage from "./pages/community/CommunityEditPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:postId" element={<ViewPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        <Route path="/community/edit/:postId" element={<CommunityEditPage />} />
        <Route path="/community/:postId" element={<CommunityPostPage />} />
        {/* 관리자페이지 */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/carousel" element={<AdminCarouselPage />} />
      </Routes>
    </div>
  );
};

export default App;
