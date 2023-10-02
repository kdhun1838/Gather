import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { boards } from "./lib/api/board";
import { users } from "./lib/api/user";
import RegisterPage from "./pages/RegisterPage";
import { list } from "./lib/api/register";
import Home from "./pages/Home";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityWritePage from "./pages/community/CommunityWritePage";
import CommunityPostPage from "./pages/community/CommunityPostPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        <Route path="/community/:postId" element={<CommunityPostPage />} />
      </Routes>
    </div>
  );
};

export default App;
