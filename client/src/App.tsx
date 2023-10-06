import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { boards } from "./lib/api/board";
import { users } from "./lib/api/user";
import RegisterPage from "./pages/Register/RegisterPage";
import { list } from "./lib/api/register";
import HomePage from "./pages/Home/HomePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
