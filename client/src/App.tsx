import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { boards } from "./lib/api/board";
import { users } from "./lib/api/user";
import RegisterPage from "./pages/RegisterPage";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityWritePage from "./pages/community/CommunityWritePage";

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [boardData, setBoardData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await users();
      const boardResponse = await boards();
      setUserData(response.data);
      setBoardData(boardResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
      </Routes>
    </div>
  );
};

export default App;
